import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from "../../assets/icon/back.png";
import plus from "../../assets/icon/plus.png";
import WallatNav from "../../components/WallatNav";

const SpotHistory = () => {
    const navigate = useNavigate();
    const data = [
        {
            id: "2544646",
            stack: "0.3327",
            date: "12 June 2024",
            time: "05:23 AM",
            bonus: "8% Spot Generation 2nd Level ",
            type: "Spot Generated Bonus"
        },
        // ...additional data
    ];

    return (
        <div className="container mx-auto pt-28 pb-12 px-4 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="flex items-start">
                    <img 
                        src={back} 
                        className="mr-4 h-4 w-4 cursor-pointer" 
                        onClick={() => navigate(-1)} 
                        alt="Back"
                    />
                    <div>
                        <WallatNav />
                        <p className="text-[#CB0881] font-semibold mt-4 sm:mt-10 text-xl sm:text-2xl">Spot History</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 sm:mt-10 ml-0 sm:ml-9">
                <button className="px-4 py-2 sm:px-5 sm:py-2 mr-4 bg-[#FCEEF8] border-b-[1px] border-[#CB0881] rounded-t-md text-xs sm:text-sm">
                    All
                </button>
                <button className="px-4 py-2 sm:px-5 sm:py-2 mr-4 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md text-xs sm:text-sm">
                    In
                </button>
                <button className="px-4 py-2 sm:px-5 sm:py-2 mr-4 bg-[#f1f1f2] hover:bg-[#FCEEF8] border-b-[1px] hover:border-[#CB0881] rounded-t-md text-xs sm:text-sm">
                    Out
                </button>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 sm:mt-10">
                {data.map((val, ind) => (
                    <div className="w-full sm:w-6/12 lg:w-4/12 text-black" key={ind}>
                        <div className="bg-[#FCEEF8] mb-6 sm:mb-8 px-4 sm:px-6 py-4 sm:py-5 rounded-md shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center justify-between font-semibold text-xs sm:text-sm">
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="truncate">{val.id}</p>
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:justify-start">
                                    <img src={plus} className="mr-2 h-4 w-4" alt="Plus" />
                                    <p>{val.stack}</p>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <p>{val.date}</p>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <p>{val.time}</p>
                                </div>
                            </div>
                            <p className="text-center mt-4 sm:mt-5 font-semibold text-xs sm:text-sm">{val.bonus}</p>
                            <p className="text-center mt-2 sm:mt-3 font-semibold text-xs sm:text-sm">{val.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpotHistory;
