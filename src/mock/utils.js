import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {Duration} from './const.js';

dayjs.extend(duration);

const humanizeTripDueDate = (dueDate, dateFrom) => dueDate ? dayjs(dueDate).format(dateFrom) : '';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getDate = ({next}) => {
  let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(0, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day');
  }

  return date;
};

const dateDiff = (date1, date2) => {
  let answer = '';
  const dateDifferent = date1.diff(date2, 'm');
  const dateDay = Math.floor(dateDifferent / 1440);
  const answerH = dateDifferent - dateDay * 1440;
  const dateHour = Math.floor(answerH / 60);
  const dateMinute = answerH - dateHour * 60;
  if (dateDifferent < 0) {
    return 'wrong date';
  } else {
    if (dateDay !== 0) {
      answer = `${dateDay}d `;
    }
    if (dateHour !== 0) {
      answer += `${dateHour}h ` ;
    }
    if (dateMinute !== 0) {
      answer += `${dateMinute}m` ;
    }
    return answer;
  }
};

export {
  getRandomArrayElement,
  getRandomInteger,
  humanizeTripDueDate,
  dateDiff,
  getDate
};
