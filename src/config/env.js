const PORT = process.env.PORT || 3000;
const BINANCE_API = {
    spot:"https://api.binance.com/api/v3",
    futures:"https://fapi.binance.com/fapi/v1",
    coinfutures:"https://dapi.binance.com/dapi/v1",
};
module.exports = { PORT, BINANCE_API };