const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {capitalizeFirstLetter, getRandomInteger, getRandomArrayElement, updateItem };


