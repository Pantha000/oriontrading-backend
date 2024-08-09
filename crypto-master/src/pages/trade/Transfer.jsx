import stack from "../../assets/icon/stacks.png"
import robot from "../../assets/robot.png"
import back from "../../assets/icon/back.png"

import { useNavigate } from "react-router-dom"

const Transfer = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className="container mx-auto pt-28 pb-12">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <img src={back} className="mr-4 h-5 w-5 cursor-pointer" onClick={()=>navigate(-1)}/>
                    <p className="text-xl text-[#CB087D] font-semibold">Transfer from AI</p>
                </div>
                <div className="flex items-center">
                    <img src={stack}/>
                    <p className="text-[#CB087D] font-semibold ml-3">Level : <span>0</span></p>
                </div>
            </div>
            <div className="mt-8 ml-9">
                <p className="font-medium text-md">AI Balance: <span>0.00</span> USDT</p>
            </div>
            <div className="flex items-center justify-between ml-8">
                <div className="w-7/12">
                    <div>
                        <div>
                            <label className="font-semibold text-md">From Wallet</label>
                            <p className="border-[1px] border-[#CB0881] py-[7px] px-5 rounded-md mt-2">AI</p>
                        </div>
                        <div className="mt-5">
                            <label className="font-semibold text-md">To Wallet</label>
                            <select className="border-[1px] border-[#CB0881] py-2 px-5 rounded-md w-full mt-2">
                                <option>Spot</option>
                                <option>Funding</option>
                            </select>
                        </div>
                        <div className="mt-5">
                            <label className="font-semibold text-md">Amount</label>
                            <input type="text" placeholder="Enter Amount" className="border-[1px] border-[#CB0881] py-2 px-5 rounded-md w-full mt-2"/>
                        </div>
                        <div className="mt-5">
                            <button className="px-10 py-2 bg-[#CB0881] rounded-full text-white font-medium">Transfer</button>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 flex justify-center">
                    <img  src={robot}/>
                </div>
            </div>
        </div>
        <div className="border-t-2 border-[#CB0881] py-20 w-[100%] ">
            <div className="container mx-auto  ">
               <div className="w-8/12 flex justify-between ml-8">
                    <button className="py-2 w-4/12 bg-[#CB0881] rounded-lg text-white font-medium">Profit Ratio</button>
                    <button className="py-2 w-5/12 ml-4 bg-[#CB0881] rounded-lg text-white font-medium">Proposed Information</button>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Transfer