export const compactNumberFormatConverter=(num)=> {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B"; // Billion
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M"; // Million
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K"; // Thousand
    } else {
      return num.toString(); // Less than 1K, return as is
    }
  }