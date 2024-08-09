import close from "../assets/icon/close.png"
import password from "../assets/icon/password.png"

const PhoneNumber = () => {
  return (
    <div className="fixed top-0 left-0 h-[100%] w-[100%] bg-background-opacity flex justify-center items-center">
        <div className="bg-white w-5/12 px-10 py-10">
            <div className="flex justify-between">
                <div className="flex items-center bg-[#CB084B] px-5 py-2 rounded-md">
                    <p className="text-white text-sm  font-medium">Phone Number </p>
                    <img src={password} className="ml-5"/>
                </div>
                <button><img src={close}/></button>
            </div>
            <div className="w-[95%] mt-10">
                <div> 
                    <label className="font-semibold text-sm">Phone Number</label>
                    <input className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">OTP Code</label>
                    <input className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div>
                    <p className="text-xs text-right mt-2 font-medium">Sent OTP Code to Email</p>
                </div>
                <div className="w-full">
                    <button className="bg-[#CB084B] mx-auto block px-8 py-2 rounded-full text-white text-xs mt-4">Change</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PhoneNumber