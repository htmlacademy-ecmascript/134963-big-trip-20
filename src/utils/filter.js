import dayjs from 'dayjs';
import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter((event) => dayjs(event.dateFrom).isAfter(dayjs())), // Этот метод указывает, находится ли объект Day.js после другого предоставленного дато-временного значения.
  [FilterType.PAST]: (events) => events.filter((event) => dayjs(event.dateFrom).isSame(dayjs())), //Этот метод указывает, совпадает ли объект Day.js с другим указанным дато-временным значением.
  [FilterType.PRESENT]: (events) => events.filter((event) => dayjs(event.dateFrom).isBefore(dayjs())), //Этот метод указывает, находится ли объект Day.js перед другим предоставленным дато-временным значением.
};

export {filter};

