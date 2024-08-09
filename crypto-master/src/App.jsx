import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Profile from "./pages/profile/Profile"
import AddFund from "./pages/profile/AddFund"
import Deposit from "./pages/profile/Deposit"
import Exchange from "./pages/profile/Exchange"
import ScrollToTop from "./components/ScrollToTop"
import Trade from "./pages/trade/Trade"
import Transfer from "./pages/trade/Transfer"
import Login from "./Shared/Login"
import SignIn from "./Shared/SignIn"
import ForgotPass from "./Shared/ForgotPass"
import SignUp from "./Shared/SignUp"
import Affilate from "./pages/Affilete/Affilate"
import TradeHistory from "./pages/trade/TradeHistory"
import Wallet from "./pages/wallet/Wallet"
import WalletTransfer from "./pages/wallet/WalletTransfer"
import SpotHistory from "./pages/wallet/SpotHistory"
import Funding from "./pages/wallet/Funding"
import FundWithdraw from "./pages/wallet/FundWithdraw"
import FundTransfer from "./pages/wallet/FundTransfer"
import FundingHistory from "./pages/wallet/FundingHistory"
import Ots from "./pages/wallet/Ots"
import Rewards from "./pages/wallet/Rewards"
import AffileteTeam from "./pages/Affilete/AffileteTeam"

function App() {
  return (
    <div>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signIn" element={<SignIn></SignIn>}></Route>
        <Route path="/forgot" element={<ForgotPass></ForgotPass>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="/" element={<Profile/>}/>
        <Route path="/add-fund" element={<AddFund/>}/>
        <Route path="/deposit" element={<Deposit/>}/>
        <Route path="/exchange" element={<Exchange/>}/>
        <Route path="/trade" element={<Trade/>}/>
        <Route path="/affilate" element={<Affilate></Affilate>}/>
        <Route path="/affilete-team" element={<AffileteTeam></AffileteTeam>}/>
        <Route path="/trade/transfer" element={<Transfer/>}/>
        <Route path="/trade/history" element={<TradeHistory/>}/>
        <Route path="/wallet" element={<Wallet/>}/>
        <Route path="/wallet/transfer" element={<WalletTransfer/>}/>
        <Route path="/wallet/spot/history" element={<SpotHistory/>}/>
        <Route path="/wallet/funding" element={<Funding/>}/>
        <Route path="/wallet/withdraw" element={<FundWithdraw></FundWithdraw>}/>
        <Route path="/wallet/fund-transfer" element={<FundTransfer></FundTransfer>}/>
        <Route path="/wallet/funding-history" element={<FundingHistory></FundingHistory>}/>
        <Route path="/wallet/ots" element={<Ots></Ots>}/>
        <Route path="/wallet/rewards" element={<Rewards></Rewards>}/>
      </Routes>
    </div>
  )
}

export default App