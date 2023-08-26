import dayjs from 'dayjs';

function sortByPriceDesc (point1, point2) {
  return point2.basePrice - point1.basePrice;
}

function sortByTimeDesc(point1, point2) {
  const durationPoint1 = dayjs(point1.dateTo).valueOf() - dayjs(point1.dateFrom).valueOf();
  const durationPoint2 = dayjs(point2.dateTo).valueOf() - dayjs(point2.dateFrom).valueOf();

  return durationPoint2 - durationPoint1;
}

function sortByDateFrom(point1, point2) {
  const date1 = dayjs(point1.dateFrom).valueOf();
  const date2 = dayjs(point2.dateFrom).valueOf();
  return date1 - date2;
}
export{sortByPriceDesc , sortByTimeDesc, sortByDateFrom};
