class Forex {
  constructor() {
    this.currencyOneSelect = document.querySelector('#currency-one-select');
    this.currencyTwoSelect = document.querySelector('#currency-two-select');
    this.currencyOneInput = document.querySelector('#currency-one-input');
    this.currencyTwoInput = document.querySelector('#currency-two-input');
    this.currencyMeta = document.querySelector('.currency-meta');
    this.btnSwap = document.querySelector('.btn-swap');
  }

  getForexData() {
    let currencyOne = this.currencyOneSelect.value;
    let currencyTwo = this.currencyTwoSelect.value;

    let currencyMeta = this.currencyMeta;
    let inputOne = this.currencyOneInput;
    let inputTwo = this.currencyTwoInput;

    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[currencyTwo];
        currencyMeta.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
        inputTwo.value = (inputOne.value * rate).toFixed(2);
      });
  }

  swapCurrency() {
    const temp = this.currencyOneSelect.value;
    this.currencyOneSelect.value = this.currencyTwoSelect.value;
    this.currencyTwoSelect.value = temp;
  }
}

const forex = new Forex();
export default forex;