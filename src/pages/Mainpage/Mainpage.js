import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import "./Mainpage.css"

import Tiers from "../Tiers/Tiers.js"
import Listcoin from "../Listcoin/Listcoin.js"
import Default from "../Default/Default.js"
import Levelup from "../Levelup/Levelup.js"
import Treasury from "../Treasury/Treasury.js"
import NavBar from "../../components/NavBar/NavBar.js"
import Footer from "../../components/Footer/Footer.js"
import Details from "../../pages/Details/Details"
import PromotePage from "../../pages/PromotePage/PromotePage.js"
import RequireWallet from "../../components/RequireWallet/RequireWallet"
import WalletEntry from "../WalletEntry/WalletEntry"

import { WalletProvider } from "../../context"

const MainShell = () => (
  <div className="mainPage">
    <NavBar />
    <div className="mainDiv">
      <Outlet />
    </div>
    <Footer />
  </div>
)

export const Mainpage = () => {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WalletEntry />} />
          <Route element={<MainShell />}>
            <Route
              path="/home"
              element={
                <RequireWallet>
                  <Default />
                </RequireWallet>
              }
            />
            <Route
              path="/listcoin"
              element={
                <RequireWallet>
                  <Listcoin data="" />
                </RequireWallet>
              }
            />
            <Route
              path="/tiers"
              element={
                <RequireWallet>
                  <Tiers />
                </RequireWallet>
              }
            />
            <Route
              path="/details/:id"
              element={
                <RequireWallet>
                  <Details />
                </RequireWallet>
              }
            />
            <Route
              path="/levelup"
              element={
                <RequireWallet>
                  <Levelup />
                </RequireWallet>
              }
            />
            <Route
              path="/treasury"
              element={
                <RequireWallet>
                  <Treasury />
                </RequireWallet>
              }
            />
            <Route
              path="/promote"
              element={
                <RequireWallet>
                  <PromotePage />
                </RequireWallet>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  )
}

export default Mainpage
