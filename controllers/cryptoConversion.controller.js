
const cryptoConvert = async (req,res)=>{

        const {toCurrency,fromCurrency,date} = req;
        try {
            const fromCurrencyPrice= await
            fetchCurrencyData(fromCurrency,date)
            const toCurrencyPrice= await 
            fetchCurrencyData(toCurrency,date);
            const exchangeRate = fromCurrencyPrice / toCurrencyPrice;

            res.status(200).json({exchangeRate:exchangeRate})
        } catch (error) {
            res.status(403).json({ error :`Error in fetching the COINGECKO API `});
        }

        
}



const fetchCurrencyData = async (currency, date) => {
    try {
        const url = `${process.env.COINGECKO_API_BASE_URL}/coins/${currency}/history?date=${date}&localization=false`;
        const response = await fetch(url);
        const responseJSON = await response.json();

        return (responseJSON.market_data.current_price.inr)
    } catch (error) {
        throw new Error(error);
    }
};




export default cryptoConvert;
