function comparePointPrice(point1, point2) {
  return point1.basePrice - point2.basePrice;
}

function calculateDateRangeDifference(point1, point2) {
  const durationPoint1 = point1.dateTo - point1.dateFrom;
  const durationPoint2 = point2.dateTo - point2.dateFrom;

  return durationPoint2 - durationPoint1;
}

export{comparePointPrice, calculateDateRangeDifference};
