  getExchangeRates();


function getExchangeRates() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "78TelXbpEsGUPvx9Gi22RIARGlznijHi");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
  .then(response => response.json())
  .then(data => {
    // Process the exchange rates data
    processExchangeRates(data)
  })
  .catch(error => console.log('error', error));
}

function processExchangeRates(data) {
    const rates = data.rates;
    const baseCurrency = data.base;
  
    // Create an object with all available currencies
    const currencies = {
      [baseCurrency]: 1, // Set base currency rate to 1
      ...rates
    };
  
    // Add currency options to dropdown menus
    const fromDropdown = document.getElementById('from');
    const toDropdown = document.getElementById('to');
    for (const currency in currencies) {
      const option = document.createElement('option');
      option.value = currency;
      option.text = currency;
      fromDropdown.appendChild(option);
      toDropdown.appendChild(option.cloneNode(true));
    }
  
    // Save exchange rates data for later use
    localStorage.setItem('exchangeRates', JSON.stringify(currencies));
  }

  function convertCurrency() {
    let json = JSON.stringify(localStorage.getItem('exchangeRates'));
    let Rates = JSON.parse(JSON.parse(json));
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const rate = Rates[toCurrency] / Rates[fromCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  }