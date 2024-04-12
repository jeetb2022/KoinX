const fetchCompanies = async (req,res)=>{
    try {
        const {currency} = req;
        const currencyData = await fetchCompanydata(currency);
        const companies = currencyData.map((company)=>{
            return company.name;
        });
        res.status(200).json(companies);
    } catch (error) {
        res.status(403).json({ error :`${error}`});
    }
}

const fetchCompanydata = async (currency) => {
try {
    const url = `${process.env.COINGECKO_API_BASE_URL}/companies/public_treasury/${currency}`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    return (responseJSON.companies)
} catch (error) {
    throw new Error(error);
}
};

export default fetchCompanies;
