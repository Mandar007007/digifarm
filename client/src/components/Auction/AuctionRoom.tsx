import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as io from "socket.io-client";
import MyTimer from "./Timer";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";
const socket = io.connect("http://localhost:3000");
import { motion } from "framer-motion";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";

const AuctionRoom = () => {
  const [expirTime, setExpirTime] = useState(null);
  const [bidderEmail,setBidderEmail] = useState("teamm2d007@gmail.com")
  const [auction, setAuction] = useState({
    _id: "",
    userId: "",
    cropName: "",
    winner: "",
    expireTime: "",
    bidPrice: "",
    currentBidder: "",
  });
  const navigate = useNavigate();
  const [ placeBidAmount , setPlaceBidAmount] = useState<Number>(1);

  const [bids, setBids] = useState<{ bidAmount: number }[]>([]);

  const [chat, setChat] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [bidder, setBidder] = useState("No Bidder");
  const auc = useSelector((state: any) => state.user.auction);
  const user = useSelector((state: any) => state.user.user);
  const [history, setHistory] = useState<string[]>([]);

  const [emailData , setEmailData] = useState({
    email : bidderEmail,
    subject: "Auction Winner Confirmation",
    winnerName: auction.currentBidder,
    cropName: "Baajro",
    finalBidAmount: "500",
    auctionDate: "2022-02-15",
    ownerAccountDetails: "Owner's Bank Account Details",
  })

  const onExpire = async () => {
    setEmailData(emailData)
    console.log("onExpire",bidderEmail)
    const data = emailData
    data.email = bidderEmail
    console.log("email Data ",data)
    setEmailData(data);

    try {
        setBids(bids);
      navigate("/");
      await axios.post("http://localhost:3000/api/v1/sendmail" , data ,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      console.log("mail send to user");
      navigate("/auction");

    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async () => {
    try {
      socket.emit("message-passed", { auction_id: auc._id, message: message });
    } catch (e) {
      console.log("error" + e);
    }
  };

  useEffect(() => {
    setAuction(auc)
    
    const expireT = new Date(auc?.expireTime).getTime();
    setExpirTime(expireT as any);
    socket.emit("joinAuction", { auctionId: auc?._id, userId: user?._id });
    setBidder(auc?.bidder);
  }, [auc]);

  useEffect(() => {
    socket.on("updateAuction", (updatedAuction: any) => {
      setBidder(updatedAuction.bidder);
      setAuction({
        ...updatedAuction.updatedAuction,
        winner: "",
      });
      setBidderEmail(updatedAuction.bidderEmail)

      socket.on("message-to-all", (data) => {

        const chat = data.message;
        console.log(chat);
        setChat((chat) => {
          return [...chat, data.message];
        });
      });

      const currentTime = new Date().toLocaleTimeString();
      const message = ${currentTime} Bid from ${updatedAuction.bidder} of Amount ${updatedAuction.updatedAuction.bidPrice};

      
      setHistory((prevHistory) => [...prevHistory, message]);
      
    console.log(auc);

    });

    return () => {
      socket.off("updateAuction");
      socket.off("message-to-all");
    };
  }, []);

  const placeBid = (amount: Number) => {
    // const nextBidAmount = Math.max(amount, auction?.bidPrice || 0) + 50; // Ensure the bid amount is at least 50 more than the current bid
    // console.log(nextBidAmount)
    console.log(amount)
    socket.emit("placeBid", { auction: auction, bidAmount: amount, bidder: user.name, bidderEmail: user.email});
  };
// md sm lg 
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 className="text-3xl ">Auction Room of {auction?.cropName}</h1>
      <div className="flex  flex-col md:flex-row   overflow-x-hidden mx-2 ">
      
        <div className="glassy-effect p-4 shadow-md rounded-md m-2 lg:w-[500px]  w-full ">
          <p>Current Bidder: {bidder} </p>
          <p>Current Price: {auction?.bidPrice} </p>
          <Input bg={"white"} w={"auto"} color={"black"} type="Number" onChange={(e) => setPlaceBidAmount(parseInt(e.target.value, 10))} ></Input>
          <Button
            className="m-4"
            onClick={() =>
              placeBid(
                placeBidAmount
              )
            }
          >
          
            Place Bid
          </Button>
          <div className="flex  space-x-2 justify-center mb-4">

          <Button onClick={() =>
              placeBid(
                bids.length > 0 ? bids[bids.length - 1].bidAmount + 50 : 50
              )
            }>+50</Button>
          <Button onClick={() =>
              placeBid(
                bids.length > 0 ? bids[bids.length - 1].bidAmount + 100 : 100
              )
            }>+100</Button>
          <Button
          onClick={() =>
            placeBid(
              bids.length > 0 ? bids[bids.length - 1].bidAmount + 200 : 200
            )
          }>+200</Button>
          <Button
          onClick={() =>
            placeBid(
              bids.length > 0 ? bids[bids.length - 1].bidAmount + 500 : 500
            )
          }>+500</Button>
          </div>
          {expirTime && (
            <MyTimer expiryTimestamp={expirTime} onExpire={onExpire} />
          )}
        </div>
        {/* w-[500px]  */}
        <div className="glassy-effect h-[500px]  lg:w-[500px] w-full   p-4 shadow-md rounded-md m-2  ">
        <Tabs variant='enclosed'>
          <div></div>
          <TabList>
            <Tab color={"white"} >Histoy</Tab>
            <Tab color={"white"}>Live chat</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="">
                <h1 className="text-xl font-semibold m-1 mb-3">
                  History of Auction
                </h1>
                <div className=" overflow-y-auto h-[350px]">
                  {history.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className=""
                    >
                      <p
                        key={index}
                        className="bg-gray-200 text-black my-2 p-1 w-2/3 mx-auto rounded-md text-sm shadow-md"
                      >
                        {message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="">
                <h1 className="text-xl font-semibold m-1 mb-3">Live Chat</h1>
                <div className=" overflow-y-auto h-[320px]">
                  {chat.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className=""
                    >
                      <p
                        key={index}
                        className="bg-gray-200 text-black my-2 p-1 w-2/3 mx-auto rounded-md text-sm shadow-md"
                      >
                        {message}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 m-1">

              <Input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="text-black "
              value={message}
              bg={"white"}
            ></Input>

            <Button onClick={sendMessage}>send</Button>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>

        </div>
      </div>
      
    </div>
  );
};

export default AuctionRoom;