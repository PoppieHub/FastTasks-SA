import InfoOnExchangeRates from './pages/infoOnExchangeRates/InfoOnExchangeRates.svelte';
import './assets/styles/layout/layout.css';
import './pages/infoOnExchangeRates/InfoOnExchangeRates.css';

const infoOnExchangeRates = new InfoOnExchangeRates({
  // @ts-ignore
  target: document.querySelector('#InfoOnExchangeRates'),
});

export default InfoOnExchangeRates;
