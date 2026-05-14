import {
  filterStops,
  getAllStops,
  getSortedBusLines,
  getStopsForLine,
  getTimesForStop,
  timeToMinutes
} from '@/domain/timetable';
import type { BusStop, StopTimeRecord } from '@/types/timetable';

const records: StopTimeRecord[] = [
  { line: 102, stop: 'Gamma', order: 3, time: '09:10' },
  { line: 100, stop: 'Central', order: 2, time: '14:05' },
  { line: 100, stop: 'Alpha', order: 1, time: '7:05' },
  { line: 101, stop: 'Łagiewniki', order: 4, time: '11:00' },
  { line: 100, stop: 'Central', order: 2, time: '08:30' },
  { line: 100, stop: 'Beta', order: 3, time: '06:55' },
  { line: 101, stop: 'Alpha', order: 2, time: '12:10' },
  { line: 101, stop: 'Łagiewniki', order: 4, time: '06:45' }
];

describe('timetable domain helpers', () => {
  it('returns unique bus lines sorted in ascending order', () => {
    expect(getSortedBusLines(records)).toEqual([100, 101, 102]);
  });

  it('returns unique stops for a line sorted by order without mutating records', () => {
    const original = [...records];

    expect(getStopsForLine(records, 100)).toEqual([
      { name: 'Alpha', order: 1, lines: [100] },
      { name: 'Central', order: 2, lines: [100] },
      { name: 'Beta', order: 3, lines: [100] }
    ]);
    expect(records).toEqual(original);
  });

  it('supports descending stop order', () => {
    expect(getStopsForLine(records, 100, 'desc')).toEqual([
      { name: 'Beta', order: 3, lines: [100] },
      { name: 'Central', order: 2, lines: [100] },
      { name: 'Alpha', order: 1, lines: [100] }
    ]);
  });

  it('returns times for a selected line and stop sorted chronologically', () => {
    expect(getTimesForStop(records, 100, 'Central')).toEqual(['08:30', '14:05']);
  });

  it('returns all unique stops for the stops page with related lines', () => {
    expect(getAllStops(records)).toEqual([
      { name: 'Alpha', order: 1, lines: [100, 101] },
      { name: 'Beta', order: 3, lines: [100] },
      { name: 'Central', order: 2, lines: [100] },
      { name: 'Gamma', order: 3, lines: [102] },
      { name: 'Łagiewniki', order: 4, lines: [101] }
    ]);
  });

  it('filters stops by trimmed, case-insensitive, diacritic-insensitive query', () => {
    const stops: BusStop[] = getAllStops(records);

    expect(filterStops(stops, '  LAG  ')).toEqual([
      { name: 'Łagiewniki', order: 4, lines: [101] }
    ]);
    expect(filterStops(stops, '')).toEqual(stops);
    expect(filterStops(stops, '')).not.toBe(stops);
  });

  it('converts timetable strings to minutes and places invalid values last', () => {
    expect(timeToMinutes('7:05')).toBe(425);
    expect(timeToMinutes('14:05')).toBe(845);
    expect(timeToMinutes('not-a-time')).toBe(Number.POSITIVE_INFINITY);
  });
});
