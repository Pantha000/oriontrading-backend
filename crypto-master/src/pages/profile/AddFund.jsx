import back from "../../assets/icon/back.png"
import deposit from "../../assets/deposit.png"
import profile3 from "../../assets/pro.jpg"
import { Link, useNavigate } from "react-router-dom"


const AddFund = () => {
    const navigate = useNavigate()
  return (
    <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                <img src={back} className="mr-4 cursor-pointer" onClick={()=>navigate(-1)}/>
                <img src={deposit}/>
           </div>
           <div className="flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#CB087D]">
                    <img src={profile3} alt="Profile Image"/>
                </div>
                <div className="ml-10">
                    <p className="font-bold  text-xl">Md Biplab Miah</p>
                    <p className="text-[#CB087D]">Beginner</p>
                </div>
            </div>
        </div>
        <div className="ml-12 mt-10">
            <Link to="/deposit" className="bg-[#CB0881] px-8 py-3 rounded-full text-xs text-white">Deposit Now</Link>
            <p className="text-md font-semibold mt-20 text-[#CB0881]">All History</p>
            <p className="text-sm mt-5">0 items found</p>
            <p className="text-sm font-medium mt-4"><span>Amount</span><span>USD $</span><span>0.00</span></p>
        </div>
        <div className="ml-12 mt-16 w-6/12">
            <div>
                <button className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">All</button>
                <button className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">Pending</button>
                <button className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">Paid</button>
                <button className="bg-[#F1F1F1] px-5 py-1 mr-8 rounded-md">Rejected</button>
            </div>
            <div className="bg-[#FCEEF8] mt-10 rounded-lg shadow-box-shadow min-h-36 flex justify-center items-center">
                <p className="text-xl font-bold text-[#CB0881] text-center">No Report Found</p>
            </div>
        </div>
    </div>
  )
}

export default AddFund