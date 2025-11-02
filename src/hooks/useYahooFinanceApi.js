import { useState, useEffect } from "react";
// import yahooFinance from "yahoo-finance2";

export const useYahooFinanceApi = () => {
    const [stockData, setStockData] = useState(null);

    // const getCurrency = async () => {
    //     try {
    //         const result = await yahooFinance.chart("MAREL.IC", { interval: "1wk", range: "5y" });
    //         console.log(result);
    //         setStockData(result);  
    //     } catch (error) {
    //         console.error("Error fetching stock data:", error);
    //     }
    // };

    // useEffect(() => {
    //     getCurrency();
    // }, []);

    return { stockData };
};
