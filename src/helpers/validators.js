export const sameAs = (field, getValues, message) => (value) => {
  const compareTo = getValues()[field];
  return value === compareTo || message;
}


export const requiredExchangeableSelect = (field, getValues, message) => (value) => {
  // eslint-disable-next-line
  return getValues()[field] != "" || message;
}