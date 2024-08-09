import { useNavigate } from "react-router-dom";
import p2p from "../../assets/icon/p2p.png";
import WallatNav from "../../components/WallatNav";

const Wallet = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container mx-auto pt-28 pb-12 px-4">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-8/12">
                        <WallatNav />
                        <p className="font-medium mt-10">0.00 USDT</p>
                        <button 
                            onClick={() => navigate("/wallet/transfer")} 
                            className="bg-[#CB0881] px-20 py-2 mr-8 rounded-md text-white mt-5 md:mt-20"
                        >
                            Transfer
                        </button>
                        <button 
                            onClick={() => navigate("/wallet/spot/history")} 
                            className="bg-[#CB0881] px-20 py-2 mr-8 rounded-md text-white mt-5 md:mt-20"
                        >
                            History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
