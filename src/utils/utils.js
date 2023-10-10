import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const humanizeTripDueDate = (dueDate, dateFrom) => dueDate ? dayjs(dueDate).format(dateFrom) : '';

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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export {
  capitalizeFirstLetter,
  humanizeTripDueDate,
  dateDiff,
  isDatesEqual
};
