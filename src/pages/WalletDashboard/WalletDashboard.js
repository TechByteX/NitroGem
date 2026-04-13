import "./WalletDashboard.css"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import logoImg from "../../assets/img/nitrogem.png"
import { AppContext } from "../../context"
import { connectWithProvider } from "../../helpers/wallet"
import { describeInjectedWallets } from "../../helpers/injectedWallets"
import { NotificationManager } from "react-notifications"

export const WalletDashboard = () => {
  const navigate = useNavigate()
  const { handleWalletAddress } = useContext(AppContext)
  const [wallets, setWallets] = useState([])
  const [connectingName, setConnectingName] = useState("")

  const refreshWallets = useCallback(() => {
    setWallets(describeInjectedWallets())
  }, [])

  useEffect(() => {
    refreshWallets()
    const onFocus = () => refreshWallets()
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [refreshWallets])

  const onPickWallet = async (provider, name) => {
    setConnectingName(name)
    try {
      const res = await connectWithProvider(provider)
      handleWalletAddress(res.address)
      if (!res.address) {
        NotificationManager.warning(res.status || "Could not connect wallet.")
      } else {
        NotificationManager.success(`Connected with ${name}`)
        navigate("/home", { replace: true })
      }
    } catch (e) {
      NotificationManager.error(e?.message || "Connection error")
    } finally {
      setConnectingName("")
    }
  }

  return (
    <div className="walletDashboardPage">
      <div className="walletDashboardInner">
        <img className="walletDashboardLogo" src={logoImg} alt="" />
        <h1 className="walletDashboardBrand">NitroGem</h1>
        <p className="walletDashboardTagline">
          Discover, vote on, and promote tokens — connect a wallet to open your dashboard.
        </p>
        <p className="walletDashboardContinue">Connect a wallet to continue</p>
        <div className="walletDashboardPanel">
          <p className="walletDashboardSubtitle">
            Choose a browser wallet you have installed (MetaMask, Rabby, Phantom, and others).
          </p>
          {wallets.length > 0 ? (
            <div className="walletDashboardOptionGrid">
              {wallets.map(({ provider, name }, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="walletDashboardOptionBtn"
                  disabled={Boolean(connectingName)}
                  onClick={() => onPickWallet(provider, name)}
                >
                  {connectingName === name ? "Connecting…" : `Continue with ${name}`}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <p className="walletDashboardHint">No Ethereum wallet detected in this browser.</p>
              <div className="walletDashboardInstallRow">
                <a
                  className="walletDashboardInstallLink"
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MetaMask
                </a>
                <a
                  className="walletDashboardInstallLink"
                  href="https://rabby.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rabby
                </a>
                <a
                  className="walletDashboardInstallLink"
                  href="https://phantom.app/download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Phantom
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletDashboard
