export const isObject = function(item) {
    return typeof item === 'object' && item !== null && item.toString() === {}.toString();
  };
