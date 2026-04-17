import "./NavBar.css"

import React, { useEffect, useContext, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"

import logoImg from "../../assets/img/nitrogem.png"

import { connectWallet, getCurrentWalletConnected } from "../../helpers/wallet"
import { getInjectedEthereumProviders } from "../../helpers/injectedWallets"
import { getWeb3Eip1193Provider } from "../../helpers/activeWeb3Provider"
import { NotificationManager } from "react-notifications"
import { AppContext } from "../../context"

export const NavBar = () => {
  const { walletAddress, handleWalletAddress, handleDisconnectWallet } = useContext(AppContext)
  const [hasInjectedWallet, setHasInjectedWallet] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const initDatas = async () => {
      const installed = getInjectedEthereumProviders().length > 0
      setHasInjectedWallet(installed)
      const { address } = await getCurrentWalletConnected()
      handleWalletAddress(address)
    }
    initDatas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const eth = getWeb3Eip1193Provider()
    if (!eth || !eth.on) return undefined

    const onAccountsChanged = (accounts) => {
      if (accounts.length) {
        handleWalletAddress(accounts[0])
      } else {
        void handleDisconnectWallet()
      }
    }

    const onChainChanged = () => {
      window.location.reload()
    }

    eth.on("accountsChanged", onAccountsChanged)
    eth.on("chainChanged", onChainChanged)

    return () => {
      if (eth.removeListener) {
        eth.removeListener("accountsChanged", onAccountsChanged)
        eth.removeListener("chainChanged", onChainChanged)
      }
    }
  }, [handleWalletAddress, handleDisconnectWallet, walletAddress])

  const onConnectWalletHandler = useCallback(async () => {
    const walletResponse = await connectWallet()
    handleWalletAddress(walletResponse.address)
    if (!walletResponse.address && walletResponse.status) {
      NotificationManager.warning(walletResponse.status)
    }
  }, [handleWalletAddress])

  const onDisconnectWalletHandler = async () => {
    await handleDisconnectWallet()
    setMobileOpen(false)
    navigate("/", { replace: true })
    NotificationManager.info("Wallet disconnected")
  }

  const walletLabel = () => {
    if (!hasInjectedWallet) return "Install Wallet"
    if (walletAddress === "") return "Connect Wallet"
    return walletAddress.substring(0, 6) + "..." + walletAddress.substring(38)
  }

  const walletAction = () => {
    if (!hasInjectedWallet) return () => window.open("https://metamask.io/download.html", "_blank")
    if (walletAddress === "") return onConnectWalletHandler
    return onDisconnectWalletHandler
  }

  return (
    <nav className="navBar">
      <div className="navInner">
        {/* Logo */}
        <div className="navLogo" onClick={() => navigate("/home")}>
          <img src={logoImg} alt="NitroGem" />
          <span className="navBrandName">NitroGem</span>
        </div>

        {/* Desktop Links */}
        <div className={`navLinks ${mobileOpen ? "navLinksOpen" : ""}`}>
          <Link to="/home" className="navLink" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/treasury" className="navLink" onClick={() => setMobileOpen(false)}>Treasury</Link>
          <Link to="/levelup" className="navLink" onClick={() => setMobileOpen(false)}>Level Up</Link>
          <Link to="/promote" className="navLink" onClick={() => setMobileOpen(false)}>Promote</Link>
        </div>

        {/* Right Actions */}
        <div className="navActions">
          <Link to="/listcoin" className="navListCoinBtn" onClick={() => setMobileOpen(false)}>
            List Coin
          </Link>
          <button className="navWalletBtn" onClick={walletAction()}>
            <span className="walletDot"></span>
            {walletLabel()}
          </button>
          {/* Mobile hamburger */}
          <button className="navHamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
