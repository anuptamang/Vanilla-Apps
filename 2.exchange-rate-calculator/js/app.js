import forex from './Forex.js';

forex.currencyOneSelect.addEventListener('change', () => {
  forex.getForexData();
});

forex.currencyOneInput.addEventListener('input', () => {
  forex.getForexData();
});

forex.currencyTwoSelect.addEventListener('change', () => {
  forex.getForexData();
});


forex.currencyTwoInput.addEventListener('input', () => {
  forex.getForexData();
});

forex.btnSwap.addEventListener('click', () => {
  forex.swapCurrency();
  forex.getForexData();
});

forex.getForexData();