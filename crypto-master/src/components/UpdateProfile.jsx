import close from "../assets/icon/close.png"
import password from "../assets/icon/password.png"

const UpdateProfile = () => {
  return (
    <div className="fixed top-0 left-0 h-[100%] w-[100%] bg-background-opacity flex justify-center items-center overflow-y-auto py-10">
        <div className="bg-white w-5/12 px-10 py-10 mt-20">
            <div className="flex justify-between">
                <div className="flex items-center bg-[#CB084B] px-5 py-2 rounded-md">
                    <p className="text-white text-sm  font-medium">Update Information </p>
                    <img src={password} className="ml-5"/>
                </div>
                <button><img src={close}/></button>
            </div>
            <div className="w-[95%] mt-10">
                <div> 
                    <label className="font-semibold text-sm">Email</label>
                    <input type="email" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Real Name</label>
                    <input type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Gender</label>
                    <select className="border-[1px] border-[#CB084B] text-[#CB084B]  w-full py-1 px-4 rounded-md mt-2">
                        <option className=" text-[#CB084B] text-semibold">MALE</option>
                        <option className=" text-[#CB084B] text-semibold">FEMALE</option>
                        <option className=" text-[#CB084B] text-semibold">OTHERS</option>
                    </select>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">City</label>
                    <input type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Phone Number</label>
                    <input type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="mt-2">
                    <label className="font-semibold text-sm">Address</label>
                    <input type="text" className="border-[1px] border-[#CB084B] w-full py-1 px-4 rounded-md mt-2"/>
                </div>
                <div className="w-full">
                    <button className="bg-[#CB084B] mx-auto block px-8 py-2 rounded-full text-white text-xs mt-4">Update</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfile