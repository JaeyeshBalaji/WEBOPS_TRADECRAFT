document.addEventListener("DOMContentLoaded", function() {
    // Selecting form elements
    const symbolInput = document.getElementById("symbol");

    function plotCandlestickChart(candleData) {
        // Plot candlestick graph using TradingView
        new TradingView.widget({
            "autosize": true,                    
            "symbol": "IBM",
            "interval": "5",
            "timezone": "Asia/Kolkata", // Indian Standard Time
            "theme": "light",
            "style": "1",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_legend": true,
            "container_id": "candlestick-chart",
            "datafeed": {
                "data": candleData,
                "datafeed": null,
                "symbol": "IBM",
                "barSpacing": 1,
                "session": "24x7",
                "volumePaneSize": "medium"
            },
            "library_path": "https://s3.tradingview.com/tv.js",
            "client_id": "tradingview.com",
            "custom_css_url": "",
            "loading_screen": {
                "backgroundColor": "#f1f3f6"
            }
        });
    }    

    // Function to generate the URL
    function generateURL() {
        const baseURL = "https://www.alphavantage.co/query";
        const functionType = "TIME_SERIES_INTRADAY";
        const symbol = symbolInput.value;
        const interval = "5min";
        const outputSize = "full";
        const apiKey = "X4O0BNJ6TBAUHF5L";

        const url = `${baseURL}?function=${functionType}&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${apiKey}`;

        return url;
    }

    // Function to fetch data and plot chart
    function fetchDataAndPlotChart() {
        const url = generateURL();
        fetch(url)
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                // Extract relevant data
                const timeSeriesData = data['Time Series (5min)'];
                const candleData = [];
    
                // Convert data into candlestick format
                for (const key in timeSeriesData) {
                    const candle = [
                        new Date(key).getTime(), // Timestamp
                        parseFloat(timeSeriesData[key]['1. open']), // Open
                        parseFloat(timeSeriesData[key]['2. high']), // High
                        parseFloat(timeSeriesData[key]['3. low']), // Low
                        parseFloat(timeSeriesData[key]['4. close']) // Close
                    ];
                    candleData.push(candle);
                }
    
                // Plot candlestick chart
                plotCandlestickChart(candleData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Adding event listener to the form
    document.getElementById("intraday-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        fetchDataAndPlotChart();
    });
    
    // Initial data fetch and chart plot
    fetchDataAndPlotChart();
});
