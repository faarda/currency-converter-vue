const getCurrencyFromCode = (currencyList, code ) => {
  return currencyList.find((currency) => {
    return currency.code === code
  });
}

export {
  getCurrencyFromCode
}