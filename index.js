require("dotenv").config();
const express = require("express");
const Moralis = require("moralis").default;

const app = express();
const port = 3000;

app.use(express.json())

app.post("/getAddressNFTs", async (req, res) => {
  if (!req.body.address) {
    return res.status(400).json({ error: 'Adddress missing' })
  }
  try {
    const address = req.body.address;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x1",
      format: "decimal",
      mediaItems: false,
      address,
      normalizeMetadata: true,
    });
    const data = response.raw;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
