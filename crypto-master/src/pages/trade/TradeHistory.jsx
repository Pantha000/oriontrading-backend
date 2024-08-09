import back from "../../assets/icon/back.png"
import profile3 from "../../assets/pro.jpg"
import {  useNavigate } from "react-router-dom"
import plus from "../../assets/icon/plus.png"


const TradeHistory = () => {
    const navigate = useNavigate()
    const data = [
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% AI Generation 2nd Level ",
            type:"AI Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% AI Generation 2nd Level ",
            type:"AI Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% AI Generation 2nd Level ",
            type:"AI Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% AI Generation 2nd Level ",
            type:"AI Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% AI Generation 2nd Level ",
            type:"AI Generated Bonus"
        },
        
    ]
    console.log(data)
  return (
    <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                <img src={back} className="mr-4  h-4 w-4 cursor-pointer" onClick={()=>navigate(-1)}/>
                <div>
                    <div>
                        <button className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">All</button>
                        <button className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">In</button>
                        <button className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">Out</button>
                        <button className="bg-[#f1f1f1] px-5 py-2 mr-8 rounded-md focus:bg-[#FCEEF8] border-[1px] focus:border-[#CB0881]">Team Bonus</button>
                    </div>
                    <input type="date" className="bg-[#FCEEF8] border-[#CB0881] border-[1px] w-full py-2 px-5 rounded-lg mt-10"/>
                    <p className="text-[#CB0881] font-semibold mt-5">Total : $ 185 USDT</p>
                </div>
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
        <div className="flex flex-wrap ml-8 mt-10">
            { data.map((val, ind)=>{
                return <div className="w-6/12 text-black" key={ind} >
                <div className="w-[95%] bg-[#FCEEF8] mb-8 px-6 py-5  rounded-md">
                   <div className="flex items-center justify-around font-semibold text-sm">
                        <div>
                            <p>{val.id}</p>
                        </div>
                        <div className="flex items-center">
                            <img src={plus} className="mr-2 mt-[-3px]"/>
                            <p>{val.stack}</p>
                        </div>
                        <div className="">
                            <p>{val.date}</p>
                        </div>
                        <div className="">
                            <p>{val.time}</p>
                        </div>
                   </div>
                   <p className="text-center mt-5 font-semibold text-sm">{val.bonus}</p>
                   <p  className="text-center mt-3 font-semibold text-sm">{val.type}</p>
                </div>
            </div>
            })}
            
        </div>
       
    </div>
  )
}

export default TradeHistory