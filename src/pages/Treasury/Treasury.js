import "./Treasury.css"
import React, { useEffect, useState } from "react"
import Promoted from "../../components/PromotedCoins/Promoted"
import { ENVS } from "../../helpers/configurations"
import { ethers } from "ethers"
import axios from "axios"

import diamondImg from "../../assets/img/diamond.png"
import rubyImg from "../../assets/img/ruby.png"
import emeraldImg from "../../assets/img/emerald.png"

export const Treasury = () => {
  const [bnbBalance, setBNBBalance] = useState("--")
  const [bnbRaw, setBNBRaw] = useState("--")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBNBValueFunc = async () => {
      try {
        const infuraProvider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await infuraProvider.getBalance(ENVS.TREASURY_ADDR)
        const formattedBnb = parseFloat(ethers.utils.formatUnits(balance, 18)).toFixed(4)
        setBNBRaw(formattedBnb + " ETH")

        let qs = `?symbol=ETH&convert=USD`
        let res = await axios.get(
          "https://agile-cove-74302.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest" +
            qs,
          {
            headers: { "X-CMC_PRO_API_KEY": ENVS.CMC_KEY },
          }
        )

        let price = res.data.data["ETH"]?.quote.USD.price
        if (price !== undefined) {
          let usdValue = parseFloat(formattedBnb) * price
          setBNBBalance("$" + usdValue.toFixed(2))
        } else {
          setBNBBalance(formattedBnb + " ETH")
        }
      } catch (e) {
        console.log("Treasury balance fetch error:", e)
        setBNBBalance("--")
        setBNBRaw("--")
      } finally {
        setLoading(false)
      }
    }

    getBNBValueFunc()
  }, [])

  return (
    <div className="treasuryPage">
      {/* Page Header */}
      <div className="treasuryHeaderSection">
        <h1 className="treasuryTitle">Buy Back Treasury</h1>
        <p className="treasurySubtitle">
          Community-driven treasury powering token buybacks and ecosystem growth
        </p>
      </div>

      {/* Treasury Balance Card */}
      <div className="treasuryBalanceCardWrapped">
        <div className="treasuryBalanceCard">
          <div className="treasuryBadgeWrapped">
            <div className="treasuryBadge">
              <span>Treasury Status</span>
            </div>
          </div>

          <div className="treasuryBalanceContent">
            <div className="balanceMainRow">
              <div className="balanceUsdSection">
                <span className="balanceLabel">Total Value (USD)</span>
                <span className={`balanceValueUsd ${loading ? "balancePulse" : ""}`}>
                  {loading ? "Loading..." : bnbBalance}
                </span>
              </div>
              <div className="balanceDivider"></div>
              <div className="balanceNativeSection">
                <span className="balanceLabel">Native Balance</span>
                <span className={`balanceValueNative ${loading ? "balancePulse" : ""}`}>
                  {loading ? "Loading..." : bnbRaw}
                </span>
              </div>
            </div>

            <div className="treasuryAddressRow">
              <span className="addressLabel">Treasury Wallet</span>
              <span className="addressValue">{ENVS.TREASURY_ADDR}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="treasuryStatsRow">
        <div className="statCardWrapped">
          <div className="statCard">
            <img src={emeraldImg} alt="Emerald" className="statIcon" />
            <div className="statInfo">
              <span className="statLabel">Emerald Tier</span>
              <span className="statValue">Free</span>
            </div>
          </div>
        </div>
        <div className="statCardWrapped">
          <div className="statCard">
            <img src={rubyImg} alt="Ruby" className="statIcon" />
            <div className="statInfo">
              <span className="statLabel">Ruby Tier</span>
              <span className="statValue">{ENVS.RUBY_TIRE_FEE} ETH</span>
            </div>
          </div>
        </div>
        <div className="statCardWrapped">
          <div className="statCard">
            <img src={diamondImg} alt="Diamond" className="statIcon" />
            <div className="statInfo">
              <span className="statLabel">Diamond Tier</span>
              <span className="statValue">{ENVS.DIAMOND_TIRE_FEE} ETH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vote Tracker Table */}
      <Promoted title="Vote Tracker" filter="weeklyCount" caption="Weekly Ranking" />

      {/* How It Works */}
      <div className="treasuryInfoCardWrapped">
        <div className="treasuryInfoCard">
          <div className="treasuryBadgeWrapped infoBadgePosition">
            <div className="treasuryBadge">
              <span>How It Works</span>
            </div>
          </div>

          <div className="infoGrid">
            <div className="infoItem">
              <div className="infoNumber">01</div>
              <div className="infoText">
                <h3>Vote Fees Collected</h3>
                <p>Every vote costs {ENVS.NORMAL_VOTE_FEE} ETH, which goes directly to the treasury wallet.</p>
              </div>
            </div>
            <div className="infoItem">
              <div className="infoNumber">02</div>
              <div className="infoText">
                <h3>Treasury Grows</h3>
                <p>Tier purchases and vote fees accumulate, building a strong community reserve.</p>
              </div>
            </div>
            <div className="infoItem">
              <div className="infoNumber">03</div>
              <div className="infoText">
                <h3>Token Buybacks</h3>
                <p>Treasury funds are used for strategic buybacks, supporting token price and holders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Treasury
