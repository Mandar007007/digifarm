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
            const key =  import.meta.env.VITE_KEY
    
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

    <div className="">
    <div className=" my-10 md:px-10 px-0 py-5 glassy-effect-new rounded-md ">
        <div className="flex flex-col overflow-x-scroll min-w-[200px]  mx-6">
            <div className="">
                <div className=" grid grid-cols-8 " >
                    <div className=" col-span-3 border-b border-blue-gray-50 py-3 md:px-6 px-3 ">
                        <p className="block antialiased  font-sans sm:text-[13px] text-[10px] font-bold uppercase text-blue-gray-400">Crops</p>
                    </div>
                    <div className=" col-span-2 border-b border-blue-gray-50 py-3 md:px-6 px-3">
                        <p className="block antialiased font-sans sm:text-[13px] text-[10px] font-bold uppercase text-blue-gray-400">Bid Amount</p>
                    </div>
                    <div className=" col-span-3 border-b border-blue-gray-50 py-3 md:px-6 px-3">
                        <p className="block antialiased font-sans sm:text-[13px] text-[10px] font-bold uppercase text-blue-gray-400">status</p>
                    </div>
                </div>
            </div>

            <div className=" overflow-y-scroll h-[300px] ">
                {auctions.map((auction) => {
                    return (
                        <>
                            <div className=" grid grid-cols-8" >
                                <div className=" col-span-3 py-3 md:px-6 px-3 border-b border-blue-gray-50">
                                    <div className=" flex items-center justify-center ">
                                        <img src={auction.cropImage?.url} className="inline-block relative object-cover object-center w-12 h-12 rounded-md mr-5" />
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">{auction.cropName}</p>
                                    </div>
                                </div>
                                <div className=" col-span-2 py-3 md:px-6 px-3 border-b border-blue-gray-50 flex items-center justify-center">
                                    <p className="block antialiased font-sans text-xs font-normal text-blue-gray-600">800 Rs</p>
                                </div>
                                <div className=" col-span-3 py-3 md:px-6 px-3 border-b border-blue-gray-50 flex items-center justify-center">
                                    {!auction.completedPayment ? (
                                    <button 
                                      onClick={()=>{handleCkeckOut(auction.bidPrice, auction._id)}}
                                      type="button" 
                                      className="text-white bg-gradient-to-br rounded-sm from-green-800 to-green-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium text-sm md:px-5 px-1 py-2.5 text-center">
                                        Pay
                                    </button>
                                    ):(
                                    <p className="block antialiased font-sans text-xs font-normal text-blue-gray-600">Paid</p>
                                    )
                                    }
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    </div>
</div>

    // <div>
    //   Pending Payements



    //   {auctions.map((auction) => {
    //     return <div> 
    //         {
    //             <Button onClick={()=>{handleCkeckOut(auction.bidPrice,auction._id)}}>
    //                 clickHere
    //             </Button>
    //         }
    //     </div>
    //   })}
    // </div>
  )
}

export default PaymentPage
