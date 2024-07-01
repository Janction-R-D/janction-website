export const formatThouNumber = (number) => {
  const numberStr = number.toString();
  const [integerPart, decimalPart] = numberStr.split('.');
  const integerLength = integerPart.length;
  let thousands = '';
  let hundreds = '';

  let decimal = decimalPart || '';

  if (number > 99999.99) {
    const kValue = (number / 1000).toFixed(2); // 保留两位小数
    return {
      thousands: kValue + 'K',
      hundreds: '',
      decimal: '',
    };
  } else {
    if (integerLength > 3) {
      thousands = integerPart.slice(0, integerLength - 3);
      hundreds = ',' + integerPart.slice(integerLength - 3);
    } else {
      hundreds = integerPart;
    }

    // 返回结果对象
    return {
      thousands,
      hundreds,
      decimal: '.' + (decimal || '00'),
    };
  }
};
