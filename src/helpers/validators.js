export const sameAs = (field, getValues, message) => (value) => {
  const compareTo = getValues()[field];
  return value === compareTo || message;
}