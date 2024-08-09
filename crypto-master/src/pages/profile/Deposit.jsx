import back from "../../assets/icon/back.png"
import profile3 from "../../assets/pro.jpg"
import { Link, useNavigate } from "react-router-dom"
import {QRCodeSVG} from 'qrcode.react';
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";



const Deposit = () => {
    const navigate = useNavigate()
    const [copied, setCopied] = useState(false)
    const depositLink = `hkhusfhfi./orangetour.com/review/explore`
  return (
    <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                <img src={back} className="mr-4 cursor-pointer" onClick={()=>navigate(-1)}/>
                <div>
                    <p className="font-semibold text-lg text-[#CB087D]">Balance Request</p>
                    <QRCodeSVG value={``} className="mt-4"/>
                </div>
           </div>
           <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#CB087D]">
                    <img src={profile3} alt="Profile Image"/>
                </div>
                <div className="ml-10">
                    <p className="font-bold  text-xl">MD. Omar Faruk</p>
                    <p className="text-[#CB087D]">Beginner</p>
                </div>
            </div>
        </div>
        <div className="flex ml-12 mt-5">
            <p className="border-[1px] border-[#CB087D] rounded-md px-5 py-2">{depositLink}</p>
            <CopyToClipboard text={depositLink}><button onClick={()=>setCopied(true)} className="bg-[#CB087D] px-5 py-1 rounded-md ml-5 text-white   ">{copied ? "Copied" : "Copy"}</button></CopyToClipboard>
        </div>
        <div className="ml-12 mt-10">
            <Link to="/deposit" className="bg-[#CB0881] px-8 py-3 rounded-full text-xs text-white">Deposit Now</Link>
            <p className="text-md font-semibold mt-20 ">Network: TRC 20</p>
            <p className="text-sm mt-5 font-medium">Currency: USDT</p>
            <p className="text-sm font-semibold mt-4 text-[#CB0881] ">Note: Only TRC 20 Wallet Allowed</p>
        </div>
        <div className="ml-12 mt-16 w-6/12">
            <div className="flex justify-around">
                <div className="mr-2">
                    <label className="text-md font-semibold">Amount</label>
                    <input className="border-[1px] border-[#CB0881] px-4 py-[6.9px] rounded-md mt-1" type="text" placeholder="Type Amount"/>
                </div>
                <div className="mr-2">
                    <label className="text-md font-semibold">Transaction ID</label>
                    <input className="border-[1px] border-[#CB0881] px-4 py-[6.9px] rounded-md mt-1" type="text" placeholder="Type Your TxID"/>
                </div>
                <div className="mr-2">
                    <label className="text-md font-semibold">Transaction Proof</label>
                    <input className="border-[1px] border-[#CB0881] px-4 py-1 rounded-md mt-1" type="file" placeholder="Type Your TxID"/>
                </div>
            </div>
            <div className="mt-5">
                <button className="px-10 py-2 bg-[#CB0881] rounded-full text-white font-medium">Submit Request</button>
                <button className="px-10 py-2 bg-[#FCEEF8] rounded-full text-[#CB0881] font-semibold ml-5" onClick={()=>navigate("/")}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default Deposit