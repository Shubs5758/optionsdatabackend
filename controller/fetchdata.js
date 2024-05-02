const fetchOptionData = require("../middleware/fetchoptionsdata");
exports.fetchdata = async (req, res) => {
  const symbol = JSON.parse(req.query.symbol); // Get the symbol from the query parameters
  const strikeprice = JSON.parse(req.query.strikeprice); // Get the strike price from the query parameters
  console.log(strikeprice);
  const expiryDate = req.query.expiryDate; // Get the expiry date from the query parameters
  console.log(req.query.expiryDate);

  if (!symbol) {
    return res.status(400).json({ error: "Symbol parameter is required" });
  }
  const results = await Promise.all(
    symbol.map(async (symbol) => {
      return await fetchOptionData.fetchOptionData(symbol);
    })
  );
  console.log(results);
  //   const data = await fetchOptionData.fetchOptionData(symbol);

  const CEData = results.CE.find(
    (option) =>
      option.strikePrice === strikeprice && option.expiryDate === expiryDate
  );
  const PEData = results.PE.find(
    (option) =>
      option.strikePrice === strikeprice && option.expiryDate === expiryDate
  );

  console.log(CEData);
  console.log(PEData);
  let finaldata = [CEData, PEData];
  if (finaldata) {
    res.status(200).json(finaldata);
  } else {
    res.status(500).json({ error: "Failed to fetch option data" });
  }
};
