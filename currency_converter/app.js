let amt = document.querySelector('#amount');
let fromCurr = document.querySelector('#fromCurrency');
let toCurr = document.querySelector('#toCurrency');
let convertBtn = document.querySelector('#convertBtn');
let result = document.querySelector('#result');
let selects = document.querySelectorAll('.select');
for( let select of selects ) {
    for(currCode in countryList) {
        let option = document.createElement('option');
        option.value = currCode;
        option.textContent = currCode;
        select.appendChild(option);
        if(currCode === "USD" && select.id === "fromCurrency") {
            option.selected = true; 
        } else if (currCode === "INR" && select.id === "toCurrency") {
            option.selected = true;
        }
    }
}
selects.forEach((select) => {
    select.addEventListener('change', (e) => {
        let selectedCurr = e.target.value;  
        if(e.target.id === "fromCurrency") {
            document.querySelector('#flagfrom').src = `https://flagsapi.com/${countryList[selectedCurr]}/flat/64.png`;
        } else {
            document.querySelector('#flagto').src = `https://flagsapi.com/${countryList[selectedCurr]}/flat/64.png`;
        }      
    });
});
const getRates = async () => {
    let amount = parseFloat(amt.value);
    let from = fromCurr.value;
    let to = toCurr.value;  
    // fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    //     .then(response => response.json())
    //     .then(data => {  
    //         let rate = data.rates[to];
    //         let convertedAmount = (amount * rate).toFixed(2);
    //         result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    //     })
    //     .catch(error => {
    //         result.textContent = "Error fetching exchange rates.";
    //         console.error('Error:', error);
    //     }); 
    if (isNaN(amount)) {
        result.textContent = "Please enter a valid amount.";
        return;
    }    
        try {
            let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            let data = await response.json();
            let rate = data.rates[to];
            let convertedAmount = (amount * rate).toFixed(2);
            result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } catch (error) {
            result.textContent = "Error fetching exchange rates.";
            console.error('Error:', error);
        }
}
convertBtn.addEventListener('click', getRates);

