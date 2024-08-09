import React from 'react';
import WallatNav from '../../components/WallatNav';
import { useNavigate } from 'react-router-dom';
import back from "../../assets/icon/back.png"
import plus from "../../assets/icon/plus.png"

const FundingHistory = () => {
    const navigate = useNavigate()
    const data = [
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% Spot Generation 2nd Level ",
            type:"Spot Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% Spot Generation 2nd Level ",
            type:"Spot Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% Spot Generation 2nd Level ",
            type:"Spot Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% Spot Generation 2nd Level ",
            type:"Spot Generated Bonus"
        },
        {
            id:"2544646",
            stack:"0.3327",
            date:"12 June 2024",
            time:"05:23 AM",
            bonus:"8% Spot Generation 2nd Level ",
            type:"Spot Generated Bonus"
        },
        
    ]
    console.log(data)
    return (
        <div className="container mx-auto pt-28 pb-12">
        <div className="flex justify-between items-start">
           <div className="flex items-start">
                <img src={back} className="mr-4  h-4 w-4 cursor-pointer" onClick={()=>navigate(-1)}/>
                <div>
                    <WallatNav></WallatNav>
                    <p className="text-[#CB0881] font-semibold mt-10 text-xl">funding History</p>
                </div>
           </div>
           
        </div>
        <div className="ml-9 flex  mt-10">
            <button className=" px-5 py-2 mr-8   bg-[#FCEEF8] border-b-[1px] border-[#CB0881] rounded-t-md">All</button>
            <button className=" px-5 py-2 mr-8 bg-[#f1f1f2]  focus:bg-[#FCEEF8] border-b-[1px] focus:border-[#CB0881] rounded-t-md">In</button>
            <button className=" px-5 py-2 mr-8 bg-[#f1f1f2]  focus:bg-[#FCEEF8] border-b-[1px] focus:border-[#CB0881] rounded-t-md">Out</button>
            <button className=" px-5 py-2 mr-8 bg-[#f1f1f2]  focus:bg-[#FCEEF8] border-b-[1px] focus:border-[#CB0881] rounded-t-md">Withdraw record</button>
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
    );
};

export default FundingHistory;