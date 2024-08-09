import close from "../assets/icon/close.png"
import  selfie from "../assets/selfie.png"
import back from "../assets/nid-back.png"
import front from "../assets/nid-font.png"

const VerifyAccount = () => {
  return (
    <div className="fixed top-0 left-0 h-[100%] w-[100%] bg-background-opacity flex justify-center items-center">
        <div className="bg-white w-6/12 px-10 py-10">
            <div className="flex justify-between">
                <div className="flex items-center  ">
                    <p className="text-[#CB084B] text-md font-medium">Verify Your Account </p>
                </div>
                <button><img src={close}/></button>
            </div>
            <div className="flex mt-5 items-center">
                <div className="mr-5 cursor-pointer">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                    />
                    <label htmlFor="file-upload">
                        <img src={front}/>
                    </label>
                </div>
                <div className="mr-5 cursor-pointer">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                    />
                    <label htmlFor="file-upload">
                        <img src={back}/>
                    </label>
                </div>
                <div className="cursor-pointer">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                    />
                    <label htmlFor="file-upload">
                        <img src={selfie}/>
                    </label>
                </div>
            </div>
            <div className="w-[85%] mt-10">
                <div> 
                    <label className="font-semibold text-sm">Document Type</label>
                    {/* <input /> */}
                    <select className="border-[1px] border-[#CB084B] text-[#CB084B]  w-full py-1 px-4 rounded-md mt-2">
                        <option className=" text-[#CB084B] text-semibold">NID</option>
                    </select>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Document Number</label>
                    <input type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2"> 
                    <label className="font-semibold text-sm">Date of Birth</label>
                    {/* <input /> */}
                    <input type="date" className="border-[1px] border-[#CB084B] text-[#CB084B]  w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="w-full">
                    <button className="bg-[#CB084B] block px-8 py-2 rounded-full text-white text-xs mt-4">Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyAccount