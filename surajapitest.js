const express = require("express");
const { ethers } = require("ethers");

const app = express();
const PORT = 4000;

app.get("/surajapitest", async (req, res) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider("https://eth.llamarpc.com");
    const blockNumber = await provider.getBlockNumber();

    console.log("Latest Block:", blockNumber);

    res.json({
      message: "API Working",
      blockNumber: blockNumber
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});