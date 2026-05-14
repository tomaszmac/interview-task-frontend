export type BusLineNumber = number;
export type TimeString = string;
export type SortDirection = 'asc' | 'desc';

export interface StopTimeApiRecord {
  line: BusLineNumber;
  stop: string;
  order: number;
  time: TimeString;
}

export type StopTimeRecord = StopTimeApiRecord;

export interface BusStop {
  name: string;
  order: number;
  lines?: BusLineNumber[];
}
