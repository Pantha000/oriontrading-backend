import back from "../../assets/icon/back.png"
import profile3 from "../../assets/pro.jpg"
import { useNavigate } from "react-router-dom"
import token from "../../assets/icon/assignment_late.png"
import swap from "../../assets/icon/swap_horiz.png"
import { useState } from "react"




const Exchange = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState(1000.00)
  const [second, setSecond]  = useState(10.00)

  const [firstCurrency, setFirstCurrency] = useState("BZIT")
  const [secondCurrency, setSecondCurrency] = useState("USDT")

  const exchange = ()=>{
    
  }
  return (
    <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                <img src={back} className="mr-4 cursor-pointer" onClick={()=>navigate(-1)}/>
                <div>
                    <p className="font-semibold text-lg text-[#CB087D]">Exchange Token</p>
                    <div className="flex items-center mt-10">
                        <img src={token} className="mr-2"/>
                        <p>Lorem ipsum dolor sit amet, consectetur et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerco</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <img src={token} className="mr-2"/>
                        <p>Lorem ipsum dolor sit amet, consectetur et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerco</p>
                    </div>
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
        <div className="ml-12 w-9/12 flex items-center mt-10">
           <div className=" mr-5 w-6/12">
                <p className="text-md font-semibold mb-2">Tokens to Exchange</p>
                <label className="input input-bordered border-[#CB0881] flex items-center gap-2">
                    <input type="text" className="grow w-5/12" placeholder="10.00" value={first} onChange={(e)=>setFirst(e.target.value)}/>
                    <p className="text-[#CB0881]">{firstCurrency}</p>
                </label>
           </div> 
           <div className="mr-5 cursor-pointer">
                <img src={swap}/>
           </div>
           <div className="w-6/12">
                <p className="text-md font-semibold mb-2">Get Amount</p>
                <label className="input input-bordered border-[#CB0881] flex items-center gap-2">
                    <input type="text" className="grow " placeholder="1000.00" value={second} onChange={(e)=>setSecond(e.target.value)} />
                    <p className="text-[#CB0881]">{secondCurrency}</p>
                </label>
           </div>
        </div>
        <div className="ml-12 mt-10">
            <p className="text-md font-semibold mt-20 "><span className="text-[#CB0881] font-semibold">Exchange Charge :</span><span className="text-[#CB0881] font-semibold ml-5 mr-4">5%</span><span>add with BZIT</span></p>
            <p className="text-sm mt-5 font-medium text-md"><span className="text-[#CB0881] font-semibold">Charge Amount :</span><span className="text-[#CB0881] font-semibold ml-5 mr-4">50.00</span> <span>BZIT</span></p>
            <p className="text-sm mt-5 font-medium text-md"><span className="text-[#CB0881] font-semibold">Final Payment: </span><span className="text-[#CB0881] font-semibold ml-5 mr-4">1050.00</span> <span>BZIT</span></p>
            <p className="text-sm mt-5 font-medium"><span className="text-[#CB0881] font-semibold ">Get Paid: </span><span className="text-[#CB0881] font-semibold ml-5 mr-4">101150.00</span> <span>BZIT</span></p>
        </div>
        <div className="ml-12 mt-16 w-6/12">
            <div className="mt-5">
                <button className="px-10 py-2 bg-[#CB0881] rounded-full text-white font-medium">Confirm Now</button>
            </div>
        </div>
    </div>
  )
}

export default Exchange