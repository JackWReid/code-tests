export function formatCurrency(num, currency = 'gbp') {
  var currencyMark;
  switch (currency) {
    case 'gbp':
      currencyMark = '£'; break;
    case 'usd':
      currencyMark = '$'; break;
    case 'eur':
      currencyMark = '€'; break;
    default:
      console.error("Couldn't find the currency marker to use.");
      currencyMark = '?'; break;
  }

  return currencyMark + num;
}

export function formatQuantity(quantity, currency) {
  if (quantity === null){
    return '';
  }

  else {
    return formatCurrency(quantity, currency);
  }
}

export function formatPercent(den, num) {
  var value = num / den;
  return Math.round(value * 100) + '%';
}

export function formatAgo(time) {
  if (time === null){
    return 'some time ago.';
  }
}
