
const chechCurrencies = async (req,res,next)=>{
    const {body} = req;
    if(!body.currency){
        return res.status(403).json({ error: "Please enter the currency" });
    }
    if(body.currency !== 'bitcoin' && body.currency !== 'ethereum' ){
        return res.status(403).json({ error: "Enter either bitcoin or ethereum as a currency" });
    }
    req.currency = body.currency;
    next()

}
export default chechCurrencies;