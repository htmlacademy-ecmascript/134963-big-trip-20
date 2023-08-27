import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

import {Duration} from '../const.js';
import {getRandomInteger } from '../utils/common.js';

const humanizeTripDueDate = (dueDate, dateFrom) => dueDate ? dayjs(dueDate).format(dateFrom) : '';

const getDate = ({next}) => {
  let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(0, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day').toDate();
  }

  return date;
};

const dateDiff = (date1, date2) => {
  const diff = dayjs.duration(dayjs(date1).diff(dayjs(date2)));
  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();

  if (diff.asMilliseconds() < 0) {
    return 'Ошибка: отрицательная длительность';
  }

  let result = '';
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
};


export {
  humanizeTripDueDate,
  dateDiff,
  getDate
};
