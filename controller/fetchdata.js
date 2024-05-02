const fetchOptionData = require("../middleware/fetchoptionsdata");
exports.fetchdata = async (req, res) => {
  const symbol = JSON.parse(req.query.symbol); // Get the symbol from the query parameters
  const strikeprice = JSON.parse(req.query.strikeprice); // Get the strike price from the query parameters
  console.log(strikeprice);
  const expiryDate = JSON.parse(req.query.expiryDate); // Get the expiry date from the query parameters
  console.log(req.query.expiryDate);

  if (!symbol) {
    return res.status(400).json({ error: "Symbol parameter is required" });
  }
  const results = await Promise.all(
    symbol.map(async (symbol) => {
      const data = await fetchOptionData.fetchOptionData(symbol);
      return { symbol, data };
    })
  );
  console.log(results);
  //   const data = await fetchOptionData.fetchOptionData(symbol);
  const data1 = results.map(({ symbol, data }) => {
    const CEData = data.CE.find(
      (option) =>
        option.strikePrice === strikeprice[0] &&
        option.expiryDate === expiryDate[0]
    );
    const PEData = data.PE.find(
      (option) =>
        option.strikePrice === strikeprice[0] &&
        option.expiryDate === expiryDate[0]
    );

    console.log(`CEData for ${symbol}: `, CEData);
    console.log(`PEData for ${symbol}: `, PEData);

    return { symbol, finaldata: [CEData, PEData] };
  });

  console.log("data1", data1);
  //   const CEData = results.CE.find(
  //     (option) =>
  //       option.strikePrice === strikeprice && option.expiryDate === expiryDate
  //   );
  //   const PEData = results.PE.find(
  //     (option) =>
  //       option.strikePrice === strikeprice && option.expiryDate === expiryDate
  //   );

  //   console.log(CEData);
  //   console.log(PEData);
  let finaldata = [CEData, PEData];
  if (finaldata) {
    res.status(200).json(finaldata);
  } else {
    res.status(500).json({ error: "Failed to fetch option data" });
  }
};
