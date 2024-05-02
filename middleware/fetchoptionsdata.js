const axios = require("axios");

exports.fetchOptionData = async (symbol) => {
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
};
