import "./Default.css"
import React from "react"
import { useNavigate } from "react-router-dom"

import Promoted from "../../components/PromotedCoins/Promoted"
import Filter from "../../components/Filter/Filter"

import diamondImg from "../../assets/img/diamond.png"
import rubyImg from "../../assets/img/ruby.png"
import emeraldImg from "../../assets/img/emerald.png"
import flightImg from "../../assets/img/flight.png"
import ethereumIcon from "../../assets/img/ethereum.svg"
import binanceIcon from "../../assets/img/binance.svg"

export const Default = () => {
  const navigate = useNavigate()

  return (
    <div className="dashboardPage">
      {/* Hero Section */}
      <section className="heroSection">
        <div className="heroContent">
          <div className="heroTextArea">
            <div className="heroBadge">
              <span className="heroBadgeDot"></span>
              <span>Live on Ethereum Mainnet</span>
            </div>
            <h1 className="heroTitle">
              Discover, Vote &<br />
              <span className="heroTitleGradient">Promote Tokens</span>
            </h1>
            <p className="heroDescription">
              The community-driven platform for listing new tokens, voting on your
              favorites, and boosting visibility through tier-based promotion.
            </p>
            <div className="heroBtnRow">
              <div className="heroBtnPrimaryWrap">
                <button className="heroBtnPrimary" onClick={() => navigate("/listcoin")}>
                  List Your Coin
                </button>
              </div>
              <button className="heroBtnSecondary" onClick={() => navigate("/promote")}>
                Promote Token
              </button>
            </div>
          </div>
          <div className="heroVisual">
            <div className="heroCardStack">
              <div className="heroFloatingCard heroCard1">
                <img src={diamondImg} alt="Diamond" />
                <div>
                  <span className="heroCardLabel">Diamond Tier</span>
                  <span className="heroCardValue">500+ Votes</span>
                </div>
              </div>
              <div className="heroFloatingCard heroCard2">
                <img src={rubyImg} alt="Ruby" />
                <div>
                  <span className="heroCardLabel">Ruby Tier</span>
                  <span className="heroCardValue">250+ Votes</span>
                </div>
              </div>
              <div className="heroFloatingCard heroCard3">
                <img src={emeraldImg} alt="Emerald" />
                <div>
                  <span className="heroCardLabel">Emerald Tier</span>
                  <span className="heroCardValue">Free Listing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="quickStatsSection">
        <div className="quickStatItem">
          <div className="quickStatIcon">
            <img src={ethereumIcon} alt="ETH" />
          </div>
          <div className="quickStatText">
            <span className="quickStatLabel">Ethereum</span>
            <span className="quickStatVal">Supported</span>
          </div>
        </div>
        <div className="quickStatDivider"></div>
        <div className="quickStatItem">
          <div className="quickStatIcon">
            <img src={binanceIcon} alt="BSC" />
          </div>
          <div className="quickStatText">
            <span className="quickStatLabel">BSC</span>
            <span className="quickStatVal">Supported</span>
          </div>
        </div>
        <div className="quickStatDivider"></div>
        <div className="quickStatItem">
          <div className="quickStatIcon rocketIcon">
            <img src={flightImg} alt="Promote" />
          </div>
          <div className="quickStatText">
            <span className="quickStatLabel">Promotion</span>
            <span className="quickStatVal">3 Tiers</span>
          </div>
        </div>
        <div className="quickStatDivider"></div>
        <div className="quickStatItem">
          <div className="quickStatIconText">5</div>
          <div className="quickStatText">
            <span className="quickStatLabel">Daily Votes</span>
            <span className="quickStatVal">Per Wallet</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="howItWorksSection">
        <h2 className="sectionTitle">How It Works</h2>
        <div className="stepsRow">
          <div className="stepCardWrap">
            <div className="stepCard">
              <div className="stepNumber">01</div>
              <h3>List Your Coin</h3>
              <p>Submit your token with contract address, logo, and social links. Choose your tier to get started.</p>
            </div>
          </div>
          <div className="stepConnector">
            <div className="stepConnectorLine"></div>
          </div>
          <div className="stepCardWrap">
            <div className="stepCard">
              <div className="stepNumber">02</div>
              <h3>Community Votes</h3>
              <p>Users connect their wallets and vote for tokens they believe in. Each vote costs 0.0035 ETH.</p>
            </div>
          </div>
          <div className="stepConnector">
            <div className="stepConnectorLine"></div>
          </div>
          <div className="stepCardWrap">
            <div className="stepCard">
              <div className="stepNumber">03</div>
              <h3>Climb the Tiers</h3>
              <p>Earn votes to reach Ruby (250) and Diamond (500) tiers for maximum visibility and promotion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promoted Coins Table */}
      <Promoted title="Promoted" filter="promoted" caption="" />

      {/* All Coins with Filter */}
      <Filter />
    </div>
  )
}

export default Default
