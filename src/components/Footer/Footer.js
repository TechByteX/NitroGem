import "./Footer.css"
import logoImg from "../../assets/img/nitrogem.png"
import React from "react"
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div className="footerBrand">
          <div className="footerBrandMark">
            <img src={logoImg} alt="NitroGem" className="footerLogo" />
            <span className="footerBrandName">NitroGem</span>
          </div>
          <p className="footerTagline">
            The community-driven platform for discovering, voting, and promoting tokens.
          </p>
        </div>

        <div className="footerColGroup">
          <div className="footerCol">
            <h4>Platform</h4>
            <Link to="/">Home</Link>
            <Link to="/listcoin">List Coin</Link>
            <Link to="/promote">Promote</Link>
            <Link to="/treasury">Treasury</Link>
          </div>
          <div className="footerCol">
            <h4>Services</h4>
            <Link to="/levelup">Level Up</Link>
            <span>Staking</span>
            <span>Launchpad</span>
            <span>Airdrop</span>
          </div>
          <div className="footerCol">
            <h4>Resources</h4>
            <span>Documentation</span>
            <span>API</span>
            <span>Support</span>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <span>&copy; 2026 NitroGem. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
