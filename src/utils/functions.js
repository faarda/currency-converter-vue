const getCurrencyFromCode = (currencyList, code) => {
  return currencyList.find((currency) => {
    return currency.code === code;
  });
};

const numberWithCommas = (number) => {
  return number > 9_999_999_999
    ? Number(number).toExponential(4)
    : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getDigitsLength = (number) => {
  return String(number).length;
};

const currenciesToCommaSeparatedList = (currencies) => {
  return currencies.map(({ code }) => code).join(",");
};

export {
  getCurrencyFromCode,
  numberWithCommas,
  getDigitsLength,
  currenciesToCommaSeparatedList,
};
