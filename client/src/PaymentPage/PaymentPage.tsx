import { Button } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const PaymentPage = () => {
    const {user} = useSelector(state => state.user)
    const [auctions,setAuctions] = useState([])
    const getPendingPayments = async () => {
        console.log(user)
        const response = await axios.post('http://localhost:3000/api/v1/getPendingPayments',{bidderEmail:user.email},{
            headers: { 'Content-Type': 'application/json' },
            withCredentials:true
        })
        setAuctions(response.data.auctions)
    }

    const handleCkeckOut = async (price,auctionId) => {
        try {
            const key =  "rzp_test_mmgwnpxo4XgLkR"
    
          const {
            data: { order },
          } = await axios.post("http://localhost:3000/api/v1/checkout", {
            amount: price
          });
    
          const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name:"DigiFarm",
            description: "Complete payment",
            image:
              "https://res.cloudinary.com/ddao02zyw/image/upload/v1708774359/kisan_gvq9ja.jpg",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.contact,
            },
            notes: {
              address: "DigiFarm -Rajkot ",
            },
            theme: {
              color: "#16262A",
            },
          };
          
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
          await axios.post('http://localhost:3000/api/v1/setpayment',{auctionId},{
            headers: {'Content-Type': 'application/json'},
            withCredentials:true
          })
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getPendingPayments()
    },[user])

  return (
    <div>
      Pending Payements
      {auctions.map((auction) => {
        return <div> 
            {
                <Button onClick={()=>{handleCkeckOut(auction.bidPrice,auction._id)}}>
                    clickHere
                </Button>
            }
        </div>
      })}
    </div>
  )
}

export default PaymentPage
