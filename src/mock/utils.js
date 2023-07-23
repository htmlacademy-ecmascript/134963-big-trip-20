import dayjs from 'dayjs';
import {Duration} from './const.js';

const DATE_FORMAT = 'YYYY-MM-DD';
const EVENT_DATE = 'MMM D';
const TIME_FORMAT = 'hh mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeYearDueData(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizePointDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(EVENT_DATE) : '';
}

//Функция для часового перевода
function humanizeTimeDueData(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function getDiffData(dueData1, dueData2) {
  const firstData = dayjs(dueData1);
  const secondData = dayjs(dueData2);

  //метод diff вычисляет разницу между двумя датами.
  return secondData.diff(firstData);
}

function getDate({next}) {
  let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(0, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export {getRandomArrayElement, getRandomInteger, humanizePointDueDate, humanizeTimeDueData, humanizeYearDueData, getDiffData, getDate};
