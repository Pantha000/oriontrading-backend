import React from 'react';
import { useNavigate } from 'react-router-dom';

const WalletNav = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row">
            <button onClick={()=>navigate(-1)}
            className="px-5 py-2 mb-4 md:mr-8 rounded-md"><i className="ri-arrow-left-line  font-bold"></i>
            </button>
            <button
                onClick={() => navigate('/wallet')}
                className="px-5 py-2 mb-4 md:mb-0 md:mr-8 rounded-md bg-[#FCEEF8] border-[1px] border-[#CB0881]"
            >
                Spot
            </button>
            <button
                onClick={() => navigate('/wallet/funding')}
                className="px-5 py-2 mb-4 md:mb-0 md:mr-8 rounded-md bg-[#f1f1f1]"
            >
                Funding
            </button>
            <button
                onClick={() => navigate('/wallet/ots')}
                className="px-5 py-2 mb-4 md:mb-0 md:mr-8 rounded-md bg-[#CB084B] text-white"
            >
                OTS P2P
            </button>
            <button
                onClick={() => navigate('/wallet/rewards')}
                className="px-5 py-2 mb-4 md:mb-0 md:mr-8 rounded-md bg-[#000] text-white"
            >
                Rewards
            </button>
        </div>
    );
};

export default WalletNav;
