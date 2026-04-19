import TierCard from "../../components/TierCard/TierCard"

import emeraldImg from "../../assets/img/emerald.png"
import rubyImg from "../../assets/img/ruby.png"
import diamondImg from "../../assets/img/diamond.png"

import { useLocation } from "react-router-dom"
import React from "react"

import "./Tiers.css"

export const Tiers = () => {
  const location = useLocation()
  const listingInfo = location.state.info
  const id = location.state.id

  const EmeraldTier = {
    headerString: "Emerald Tier",
    color: "#22c55e",
    buyAmount: "FREE",
    buyAmountInt: 0,
    nitrogemAmount: 0,
    image: emeraldImg,
    mainStrings: [
      "Listing on NitroGem Platform",
      "Upgradable to Ruby or Diamond tier at any time",
      "Promotable on NitroGem platform",
    ],
  }

  const RubyTier = {
    headerString: "Ruby Tier",
    color: "#ef4444",
    buyAmount: "0.5 BNB",
    buyAmountInt: "0.5",
    nitrogemAmount: 250,
    image: rubyImg,
    mainStrings: [
      "Notification sent to Telegram channel (6K+ members)",
      "250 Votes included",
      "5% discount on advertising packages",
      "5% discount on Level Up agency services",
      "Promotable on NitroGem Platform",
    ],
  }

  const DiamondTier = {
    headerString: "Diamond Tier",
    color: "#43b5e6",
    buyAmount: "1 BNB",
    buyAmountInt: "1",
    nitrogemAmount: 500,
    image: diamondImg,
    mainStrings: [
      "Sent to 12+ Telegram channels (20K+ members)",
      "Qualifies for NitroGem buyback + burn competition",
      "500 Votes included",
      "10% discount on advertising packages",
      "5% discount on Level Up agency services",
    ],
  }

  return (
    <div className="tiersPage">
      <div className="tiersHeader">
        <h1>Choose Your Tier</h1>
        <p>Select a listing tier for your token on NitroGem</p>
      </div>
      <div className="tiersGrid">
        <TierCard type="emerald" data={EmeraldTier} info={listingInfo} id={id} />
        <TierCard type="ruby" data={RubyTier} info={listingInfo} id={id} />
        <TierCard type="diamond" data={DiamondTier} info={listingInfo} id={id} />
      </div>
    </div>
  )
}

export default Tiers
