import { Link } from "react-router-dom"
import logo from "../assets/Logo.png"
import notification from "../assets/icon/notifications.png"

const Navbar = () => {
  return (
    <div className="bg-[#FCEEF8] shadow-md shadow-[#d8d8d8] w-full fixed py-3 z-50">
        <div className="container mx-auto flex items-center justify-between">
            <div>
                <img src={logo} alt="Logo Image"/>
            </div>
            <div className=" flex items-center">
                <li><Link to="/" className="bg-white px-3 py-1 ml-2 rounded-full text-[#CB0881] font-medium hover:shadow-nav-shadow">Home</Link></li>
                <li><Link to="/market" className="bg-white px-3 py-1 ml-2 rounded-full text-[#CB0881] font-medium hover:shadow-nav-shadow">Market</Link></li>
                <li><Link to="/trade" className="bg-white px-3 py-1 ml-2 rounded-full text-[#CB0881] font-medium hover:shadow-nav-shadow">Trade</Link></li>
                <li><Link to="/affilate" className="bg-white px-3 py-1 ml-2 rounded-full text-[#CB0881] font-medium hover:shadow-nav-shadow">Affiliate</Link></li>
                <li><Link to="/wallet" className="bg-white px-3 py-1 ml-2 rounded-full text-[#CB0881] font-medium hover:shadow-nav-shadow">Wallet</Link></li>
                <li><Link className="ml-2">
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary"></span> 
                    <div className="grid place-items-center"><img src={notification} alt="notification-icon"/></div>
                </div>
                </Link></li>
            </div>
        </div>
    </div>
  )
}

export default Navbar