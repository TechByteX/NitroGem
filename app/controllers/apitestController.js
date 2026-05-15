const { ethers } = require('ethers');
const path = require('path');
const NitroGemAbi = require(path.join(__dirname, '..', '..', 'src', 'helpers', 'abis', 'NitroGem.json'));

const NITROGEM_ADDRESS = '0x2E2eC85f95a20FA0ACde32719679Bc3a75D1E918';
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const USDC_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
];

const RPC_ENDPOINTS = [
  'https://ethereum.publicnode.com',
  'https://cloudflare-eth.com',
  'https://eth.llamarpc.com',
];

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)),
  ]);
}

async function getWorkingProvider() {
  for (const url of RPC_ENDPOINTS) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(url);
      const network = await withTimeout(provider.getNetwork(), 5000, `probe ${url}`);
      return { provider, url, chainId: network.chainId };
    } catch (e) {
      console.log('  RPC unreachable:', url, '-', e.message);
    }
  }
  throw new Error('No working RPC endpoint');
}

module.exports = {
  async read(req, res) {
    console.log('\n========================================');
    console.log('  /apitest invoked — fetching on-chain data');
    console.log('========================================');

    try {
      const { provider, url, chainId } = await getWorkingProvider();
      console.log('RPC endpoint :', url);
      console.log('Chain ID     :', chainId);
      console.log('Contract     :', NITROGEM_ADDRESS, '(NitroGem)');

      const code = await provider.getCode(NITROGEM_ADDRESS);
      const deployed = code && code !== '0x';
      console.log('Deployed?    :', deployed ? 'yes' : 'no (no bytecode at this address)');

      const balanceWei = await provider.getBalance(NITROGEM_ADDRESS);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      console.log('ETH balance  :', balanceEth, 'ETH');

      const result = {
        rpc: url,
        chainId,
        contract: NITROGEM_ADDRESS,
        deployed,
        ethBalance: balanceEth,
      };

      if (deployed) {
        const contract = new ethers.Contract(NITROGEM_ADDRESS, NitroGemAbi, provider);

        const [owner, paused, treasury, rubyPrice, diamondPrice, totalMinted, tier0Eth, tier0Reward] =
          await Promise.all([
            contract.owner(),
            contract.paused(),
            contract.treasury(),
            contract.rubyTierPrice(),
            contract.diamondTierPrice(),
            contract.totalCreditsMinted(),
            contract.creditAmounts(0),
            contract.creditRewards(0),
          ]);

        console.log('owner()              :', owner);
        console.log('paused()             :', paused);
        console.log('treasury()           :', treasury);
        console.log('rubyTierPrice()      :', ethers.utils.formatEther(rubyPrice), 'ETH');
        console.log('diamondTierPrice()   :', ethers.utils.formatEther(diamondPrice), 'ETH');
        console.log('totalCreditsMinted() :', totalMinted.toString());
        console.log('creditAmounts(0)     :', ethers.utils.formatEther(tier0Eth), 'ETH');
        console.log('creditRewards(0)     :', tier0Reward.toString(), 'credits');

        Object.assign(result, {
          owner,
          paused,
          treasury,
          rubyTierPriceEth: ethers.utils.formatEther(rubyPrice),
          diamondTierPriceEth: ethers.utils.formatEther(diamondPrice),
          totalCreditsMinted: totalMinted.toString(),
          firstCreditTier: {
            ethAmount: ethers.utils.formatEther(tier0Eth),
            creditsGiven: tier0Reward.toString(),
          },
        });
      } else {
        console.log('Skipping NitroGem reads — no code at this address on mainnet.');
      }

      console.log('\n--- Reading a known-deployed contract (USDC) ---');
      console.log('Contract     :', USDC_ADDRESS, '(USDC)');
      const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
      const [usdcName, usdcSymbol, usdcDecimals, usdcSupply] = await Promise.all([
        usdc.name(),
        usdc.symbol(),
        usdc.decimals(),
        usdc.totalSupply(),
      ]);
      const usdcSupplyFormatted = ethers.utils.formatUnits(usdcSupply, usdcDecimals);
      console.log('name()        :', usdcName);
      console.log('symbol()      :', usdcSymbol);
      console.log('decimals()    :', usdcDecimals);
      console.log('totalSupply() :', usdcSupplyFormatted, usdcSymbol);

      result.usdc = {
        address: USDC_ADDRESS,
        name: usdcName,
        symbol: usdcSymbol,
        decimals: usdcDecimals,
        totalSupply: usdcSupplyFormatted,
      };

      console.log('========================================\n');
      res.status(200).json({ error: false, data: result });
    } catch (err) {
      console.error('apitest error:', err.message);
      res.status(500).json({ error: true, message: err.message });
    }
  },
};
