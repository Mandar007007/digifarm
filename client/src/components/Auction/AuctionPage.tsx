import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Reveal from "../Reveal";
import { Button  } from "@chakra-ui/react";
import * as io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddButton from "../Upload/Add";

export default function Auction({ isLoggedIn, user }: any) {
  const socket = io.connect("http://localhost:3000");
  // const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState([]);

  const gotoAuction = async (data: any) => {
    if (isLoggedIn) {
      try {
        dispatch({
          type: "SET_AUCTION",
          payload: {
            _id: data._id,
            userId: data.userId,
            cropName: data.cropName,
            winner: data.winner,
            expireTime: data.expireTime,
            bidPrice: data.bidPrice,
          },
        });

        socket.emit("joinAuction", {
          auctionId: data._id,
          userId: data.userId,
        });
        console.log("joined auction", data._id);

        navigate("/auctionPage");
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.error("Please Login to continue");
    }
  };

  const getAuctions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auctions",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setAuctions(response.data.auctions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuctions();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Live Auctions</h1>

      <div className="grid grid-cols-2 gap-3">
        {auctions.map((auction: any) => {
          // console.log(auction);

          if (auction && auction.expireTime) {
            const expireTime = new Date(auction.expireTime).getTime();

            if (!isNaN(expireTime) && Date.now() <= expireTime) {
              return (
                <Reveal>
                  <div className="glassy-effect  border-zinc-800 border-2 flex flex-col items-center justify-between p-7 max-w-[600px] rounded-md ">
                    <h2 className="text-2xl ">
                      Name :{" "}
                      <span className="font-semibold">{auction.cropName}</span>
                    </h2>
                    <img src={auction.cropImage?.url} className="h-48 rounded-md m-4" alt="" />
                    <p className="description m-2">
                      <span className="font-semibold">Description : </span>
                      {auction.desc}
                    </p>
                    {/* <p>{auction.userId.populate().name}</p> */}
                    <Button
                      className="btn"
                      onClick={() =>
                        gotoAuction({
                          _id: auction._id,
                          userId: auction.userId,
                          cropName: auction.cropName,
                          expireTime: auction.expireTime,
                          bidPrice: auction.bidPrice,
                          winner: null,
                          bidder: user.name,
                        })
                      }
                      p={1}
                    >
                      Go to Auction
                    </Button>

                    {/* <MyTimer expiryTimestamp={expireTime} onExpire={onExpire} /> */}
                  </div>
                </Reveal>
              );
            }
          }

          return null;
        })}
      </div>

      <AddButton user={user}/>
    </div>
  );
}
