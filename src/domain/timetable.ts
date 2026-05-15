import type {
  BusLineNumber,
  BusStop,
  RouteStop,
  RouteStopKey,
  SortDirection,
  StopTimeRecord,
  TimeString
} from '@/types/timetable';

const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';

function directionMultiplier(direction: SortDirection): number {
  return direction === 'desc' ? -1 : 1;
}

function normalizeForSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[łŁ]/g, 'l')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pl');
}

function compareStops(a: BusStop, b: BusStop, direction: SortDirection): number {
  const byOrder = a.order - b.order;
  const byName = a.name.localeCompare(b.name, 'pl');

  return (byOrder || byName) * directionMultiplier(direction);
}

function compareStopNames(
  a: BusStop,
  b: BusStop,
  direction: SortDirection
): number {
  return a.name.localeCompare(b.name, 'pl') * directionMultiplier(direction);
}

function uniqueSortedLines(lines: Iterable<BusLineNumber>): BusLineNumber[] {
  return Array.from(new Set(lines)).sort((a, b) => a - b);
}

function getRouteStopKey(line: BusLineNumber, order: number): RouteStopKey {
  return `${line}:${order}`;
}

export function getSortedBusLines(records: StopTimeRecord[]): BusLineNumber[] {
  const lines = records.map((record) => record.line);

  return uniqueSortedLines(lines);
}

export function getStopsForLine(
  records: StopTimeRecord[],
  line: BusLineNumber,
  direction: SortDirection = DEFAULT_SORT_DIRECTION
): RouteStop[] {
  const stopsByPosition = new Map<RouteStopKey, RouteStop>();

  records.forEach((record) => {
    if (record.line !== line) {
      return;
    }

    const key = getRouteStopKey(record.line, record.order);

    if (!stopsByPosition.has(key)) {
      stopsByPosition.set(key, {
        key,
        name: record.stop,
        order: record.order,
        lines: [line]
      });
    }
  });

  return Array.from(stopsByPosition.values()).sort((a, b) =>
    compareStops(a, b, direction)
  );
}

export function getTimesForStop(
  records: StopTimeRecord[],
  line: BusLineNumber,
  stopKey: RouteStopKey
): TimeString[] {
  return records
    .filter(
      (record) =>
        record.line === line &&
        getRouteStopKey(record.line, record.order) === stopKey
    )
    .map((record) => record.time)
    .sort((a, b) => timeToMinutes(a) - timeToMinutes(b));
}

export function getAllStops(
  records: StopTimeRecord[],
  direction: SortDirection = DEFAULT_SORT_DIRECTION
): BusStop[] {
  const stopsByName = new Map<
    string,
    { name: string; order: number; lines: Set<BusLineNumber> }
  >();

  records.forEach((record) => {
    const existing = stopsByName.get(record.stop);

    if (!existing) {
      stopsByName.set(record.stop, {
        name: record.stop,
        order: record.order,
        lines: new Set([record.line])
      });
      return;
    }

    existing.order = Math.min(existing.order, record.order);
    existing.lines.add(record.line);
  });

  return Array.from(stopsByName.values())
    .map((stop) => ({
      name: stop.name,
      order: stop.order,
      lines: uniqueSortedLines(stop.lines)
    }))
    .sort((a, b) => compareStopNames(a, b, direction));
}

export function filterStops(stops: BusStop[], query: string): BusStop[] {
  const normalizedQuery = normalizeForSearch(query.trim());

  if (!normalizedQuery) {
    return [...stops];
  }

  return stops.filter((stop) =>
    normalizeForSearch(stop.name).includes(normalizedQuery)
  );
}

export function timeToMinutes(time: TimeString): number {
  const [hoursPart, minutesPart] = time.split(':');
  const hours = Number(hoursPart);
  const minutes = Number(minutesPart);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return Number.POSITIVE_INFINITY;
  }

  return hours * 60 + minutes;
}
