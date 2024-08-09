import React from 'react';
import roadmap from "../assets/roadmap.png"
const RoadMap = () => {
    return (
        <div className="border-t-2  absolute border-[#CB0881] py-6 w-[100%] ">
        <div className="container mx-auto ">
            <p className="font-semibold text-lg text-[#CB0881]">Orion Trading Roadmap</p>
            <div className="flex justify-center">
                <img src={roadmap}/>
            </div>
        </div>
    </div>
    );
};

export default RoadMap;