const USD_TO_INR_RATE = 83;

export const convertUSDToINR = (usdAmount) => {
  return Math.round(usdAmount * USD_TO_INR_RATE);
};

export const formatINR = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatUSD = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export const convertAndFormatUSDToINR = (usdAmount) => {
  const inrAmount = convertUSDToINR(usdAmount);
  return formatINR(inrAmount);
}; 