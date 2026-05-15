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
      { key: '100:1', name: 'Alpha', order: 1, lines: [100] },
      { key: '100:2', name: 'Central', order: 2, lines: [100] },
      { key: '100:3', name: 'Beta', order: 3, lines: [100] }
    ]);
    expect(records).toEqual(original);
  });

  it('supports descending stop order', () => {
    expect(getStopsForLine(records, 100, 'desc')).toEqual([
      { key: '100:3', name: 'Beta', order: 3, lines: [100] },
      { key: '100:2', name: 'Central', order: 2, lines: [100] },
      { key: '100:1', name: 'Alpha', order: 1, lines: [100] }
    ]);
  });

  it('keeps duplicate stop names at different route positions', () => {
    const duplicateStopRecords: StopTimeRecord[] = [
      { line: 200, stop: 'Museum', order: 5, time: '10:00' },
      { line: 200, stop: 'Central', order: 2, time: '10:05' },
      { line: 200, stop: 'Museum', order: 3, time: '10:10' },
      { line: 200, stop: 'Arena', order: 4, time: '10:15' },
      { line: 200, stop: 'Museum', order: 3, time: '10:20' },
      { line: 201, stop: 'Museum', order: 1, time: '11:00' }
    ];

    expect(getStopsForLine(duplicateStopRecords, 200, 'asc')).toEqual([
      { key: '200:2', name: 'Central', order: 2, lines: [200] },
      { key: '200:3', name: 'Museum', order: 3, lines: [200] },
      { key: '200:4', name: 'Arena', order: 4, lines: [200] },
      { key: '200:5', name: 'Museum', order: 5, lines: [200] }
    ]);
    expect(getStopsForLine(duplicateStopRecords, 200, 'desc')).toEqual([
      { key: '200:5', name: 'Museum', order: 5, lines: [200] },
      { key: '200:4', name: 'Arena', order: 4, lines: [200] },
      { key: '200:3', name: 'Museum', order: 3, lines: [200] },
      { key: '200:2', name: 'Central', order: 2, lines: [200] }
    ]);
  });

  it('returns times for a selected line and stop sorted chronologically', () => {
    expect(getTimesForStop(records, 100, '100:2')).toEqual(['08:30', '14:05']);
  });

  it('returns times for one route position when stop names repeat', () => {
    const duplicateStopRecords: StopTimeRecord[] = [
      { line: 200, stop: 'Museum', order: 5, time: '10:00' },
      { line: 200, stop: 'Museum', order: 3, time: '10:10' },
      { line: 200, stop: 'Museum', order: 3, time: '10:20' }
    ];

    expect(getTimesForStop(duplicateStopRecords, 200, '200:3')).toEqual([
      '10:10',
      '10:20'
    ]);
    expect(getTimesForStop(duplicateStopRecords, 200, '200:5')).toEqual(['10:00']);
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

  it('keeps all-stops sorting alphabetical while storing minimum order and merged lines', () => {
    const unsortedRecords: StopTimeRecord[] = [
      { line: 30, stop: 'Żabiniec', order: 8, time: '09:00' },
      { line: 20, stop: 'Borek', order: 4, time: '09:05' },
      { line: 10, stop: 'Álfa', order: 6, time: '09:10' },
      { line: 20, stop: 'Żabiniec', order: 2, time: '09:15' },
      { line: 10, stop: 'Centrum', order: 1, time: '09:20' }
    ];

    expect(getAllStops(unsortedRecords)).toEqual([
      { name: 'Álfa', order: 6, lines: [10] },
      { name: 'Borek', order: 4, lines: [20] },
      { name: 'Centrum', order: 1, lines: [10] },
      { name: 'Żabiniec', order: 2, lines: [20, 30] }
    ]);
    expect(getAllStops(unsortedRecords, 'desc').map((stop) => stop.name)).toEqual([
      'Żabiniec',
      'Centrum',
      'Borek',
      'Álfa'
    ]);
  });

  it('converts timetable strings to minutes and places invalid values last', () => {
    expect(timeToMinutes('7:05')).toBe(425);
    expect(timeToMinutes('14:05')).toBe(845);
    expect(timeToMinutes('not-a-time')).toBe(Number.POSITIVE_INFINITY);
  });
});
