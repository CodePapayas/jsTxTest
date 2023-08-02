function divideArrayByFactor(arr, factor) {
    if (!Array.isArray(arr)) {
      return [Number((arr / factor).toFixed(3))];
    }
  
    const dividedArray = arr.map((element) => {
      const x = Number(element) / factor;
      return Number(x.toFixed(3));
    });
  
    return dividedArray;
  }

  module.exports = {
    divideArrayByFactor
  }
  