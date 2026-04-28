import "./Levelup.css"
import React from "react"

export const Levelup = () => {
  const services = [
    { icon: "design", title: "Graphic Design", desc: "Logos, banners, brand identity, and marketing materials for your token project." },
    { icon: "web", title: "Web Development", desc: "Landing pages, dApps, and full-stack web3 applications built to scale." },
    { icon: "marketing", title: "Marketing", desc: "Strategic campaigns, influencer outreach, and community growth plans." },
    { icon: "ama", title: "AMA Sessions", desc: "Professional hosted AMA sessions across Telegram and Discord communities." },
    { icon: "nft", title: "NFT Solutions", desc: "NFT artwork, smart contract deployment, and marketplace integration." },
    { icon: "blockchain", title: "Blockchain Dev", desc: "Smart contracts, tokenomics design, auditing, and cross-chain development." },
  ]

  return (
    <div className="levelPage">
      <div className="levelHeader">
        <span className="levelBadge">Agency Services</span>
        <h1>Level Up Your Project</h1>
        <p>Full-service blockchain agency to take your token project to the next level</p>
      </div>

      <div className="levelGrid">
        {services.map((s, i) => (
          <div className="levelCardOuter" key={i}>
            <div className="levelCard">
              <div className="levelCardNum">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="levelCta">
        <div className="levelCtaInner">
          <h2>Ready to get started?</h2>
          <p>Contact us to discuss your project needs and get a custom quote.</p>
          <button className="levelCtaBtn" onClick={() => window.open("https://t.me/", "_blank")}>
            Contact on Telegram
          </button>
        </div>
      </div>
    </div>
  )
}

export default Levelup
