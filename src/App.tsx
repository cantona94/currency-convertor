import React from 'react';
import { Block } from './Block';
import './index.scss';

const myHeaders = new Headers();
myHeaders.append("apikey", "vZIHHjfga1xtoNL2YD4tGNqUl38FWcdo");

const requestOptions = {
  headers: myHeaders
};

function App(): JSX.Element {
  const [fromCurrency, setFromCurrency] = React.useState("USDRUB");
  const [toCurrency, setToCurrency] = React.useState("USDBMD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  // const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef(null);

  React.useEffect(() => {
    fetch('https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP,RUB', requestOptions)
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates);
        ratesRef.current = json.quotes;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить данные!');
      });
  }, []);

  const onChangeFromPrice = (value: number) => {
    if (ratesRef.current) {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setToPrice(parseFloat(result.toFixed(2)));
      setFromPrice(value);
    }
  };

  const onChangeToPrice = (value: number) => {
    if (ratesRef.current) {
      const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
      setFromPrice(parseFloat(result.toFixed(2)));
      setToPrice(value);
    }
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);


  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
