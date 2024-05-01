const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());


async function fetchOptionData(symbol) {
  const url = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;
  console.log(url);
  try {
    const response = await axios.get(url, {
      headers: {
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    });
    const data = response.data;
    const ceAndPeData = {
      CE: data.records.data.map((record) => ({
        strikePrice: record.strikePrice,
        expiryDate: record.expiryDate,
        CE: record.CE,
      })),
      PE: data.records.data.map((record) => ({
        strikePrice: record.strikePrice,
        expiryDate: record.expiryDate,
        PE: record.PE,
      })),
    };
    return ceAndPeData;
  } catch (error) {
    console.error("Error fetching option data:", error);
    return null;
  }
}

app.get("/option-data", async (req, res) => {
    const symbol = req.query.symbol; // Get the symbol from the query parameters
    const strikeprice = JSON.parse(req.query.strikeprice); // Get the strike price from the query parameters
    console.log(strikeprice);
    const expiryDate = req.query.expiryDate; // Get the expiry date from the query parameters
    console.log(req.query.expiryDate);

    if (!symbol) {
      return res.status(400).json({ error: "Symbol parameter is required" });
    }
  
    const data = await fetchOptionData(symbol);

    const CEData = data.CE.find(option => option.strikePrice === strikeprice && option.expiryDate === expiryDate);
    const PEData = data.PE.find(option => option.strikePrice === strikeprice && option.expiryDate === expiryDate);

    console.log(CEData);
    console.log(PEData);
    let finaldata = [CEData, PEData];
    if (finaldata) {
      res.json(finaldata);
    } else {
      res.status(500).json({ error: "Failed to fetch option data" });
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
