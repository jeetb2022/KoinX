
const checkCrypto = async (req,res,next)=>{
    const {body} = req;
    if(body.fromCurrency === undefined || body.toCurrency === undefined || body.date === undefined){
        return res.status(403).json({ error: "Please enter all data" });
    }
    req.fromCurrency = body.fromCurrency;
    req.toCurrency = body.toCurrency;
    req.date = body.date;
    next()

}
export default checkCrypto;