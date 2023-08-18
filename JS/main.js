
const fromCurrencySelect = document.getElementById("inputCurrencyFrom");
const toCurrencySelect = document.getElementById("inputCurrencyTo");

document.addEventListener("DOMContentLoaded", function() {
    // Populate the dropdowns with currency options
    // Set button click event handler
    document.getElementById('buttonCurrency').addEventListener('click', getCurrencyExchangeRates);
});

for (let currencyCode in currencies) {
    const option = document.createElement("option");
    option.value = currencyCode;
    option.textContent = currencies[currencyCode];
    fromCurrencySelect.appendChild(option);
}

for (let currencyCode in currencies) {
    const option = document.createElement("option");
    option.value = currencyCode;
    option.textContent = currencies[currencyCode];
    toCurrencySelect.appendChild(option);
}

async function getCurrencyExchangeRates() {
    const from = fromCurrencySelect.value;
    const to = toCurrencySelect.value;
    
    const url = `https://apidojo-booking-v1.p.rapidapi.com/currency/get-exchange-rates?base_currency=${from}&languagecode=en-us`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5906a63127msh9a02863741e8683p12bbbcjsn6c05059d8427',
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        // console.log(response);
        let toCurrency;
        const result = await response.json();
        const exchangeRates = result.exchange_rates
        for (let currency of exchangeRates ){
            if(currency.currency === to){
                toCurrency = currency;
            }
        }
        const exchangeRate = toCurrency.exchange_rate_buy
        const resultElem = document.getElementById('currencyResult')
        resultElem.innerText = `Result: ${exchangeRate}`
    } catch (error) {
        console.error(error);
    }
}
