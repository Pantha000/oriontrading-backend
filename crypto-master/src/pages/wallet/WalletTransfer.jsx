import p2p from "../../assets/icon/p2p.png";
import WallatNav from "../../components/WallatNav";

const WalletTransfer = () => {
  return (
    <div className="pt-28 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
      <WallatNav />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-8/12">
          <div className="w-full mt-10">
            <p className="font-semibold text-[#CB0881] text-lg md:text-xl">Transfer from Spot</p>
            <div className="mt-5">
              <label className="font-semibold text-sm sm:text-base">From Wallet</label>
              <select className="border-[1px] border-[#CB0881] py-2 px-4 rounded-md w-full mt-2 text-sm sm:text-base">
                <option>AI</option>
                <option>Stake</option>
                <option>Features</option>
                <option>Funding</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="font-semibold text-sm sm:text-base">Amount</label>
              <input
                type="text"
                placeholder="Enter Amount"
                className="border-[1px] border-[#CB0881] py-2 px-4 rounded-md w-full mt-2 text-sm sm:text-base"
              />
            </div>
            <div>
              <button className="px-6 py-2 bg-[#CB0881] rounded-full text-white font-medium mt-10 text-sm sm:text-base">
                Transfer
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 mt-8 lg:mt-0">
          <div className="bg-[#FCEEF8] p-4 sm:p-5 rounded-md">
            <div className="flex items-center justify-between">
              <p className="text-md sm:text-lg font-medium text-[#CB0881]">P2P Trading</p>
              <img src={p2p} alt="P2P Trading" className="w-12 h-12" />
            </div>
            <p className="mt-3 text-sm sm:text-base">
              Engage in peer-to-peer (P2P) trading on the TB20 network by connecting directly with other users to buy and sell assets without intermediaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTransfer;
