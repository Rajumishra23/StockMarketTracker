const searchBtn = document.getElementById("search-btn"); const stockSearch = document.getElementById("stock-search");
searchBtn.addEventListener("click", () => { console.log(stockSearch.value); });

async function fetchStockData(stockSymbol) {
    const apiKey = "5E8JYNELARQI673N"; 
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); 

        const metaData = data["Meta Data"];
        const timeSeries = data["Time Series (1min)"];
        const lastRefreshed = metaData["3. Last Refreshed"];
        const latestData = timeSeries[lastRefreshed];

        const openPrice = latestData["1. open"];
        const closePrice = latestData["4. close"];
        const highPrice = latestData["2. high"];
        const lowPrice = latestData["3. low"];
        const volume = latestData["5. volume"];
        
        document.getElementById("symbol").textContent = `Stock Symbol: ${metaData["2. Symbol"]}`;
        document.getElementById("open").textContent = `Opening Price: $${openPrice}`;
        document.getElementById("close").textContent = `Closing Price: $${closePrice}`;
        document.getElementById("high").textContent = `High Price: $${highPrice}`;
        document.getElementById("low").textContent = `Low Price: $${lowPrice}`;
        document.getElementById("volume").textContent = `Volume: ${volume}`;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        document.getElementById("symbol").textContent = "Error fetching stock data. Please try again.";
    }
}

searchBtn.addEventListener("click", () => {
    const stockSymbol = stockSearch.value.trim();
    if (stockSymbol) {
        fetchStockData(stockSymbol); 
    } else {
        alert("Please enter a valid stock symbol!");
    }
});
