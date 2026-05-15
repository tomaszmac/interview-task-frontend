import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getStops } from '@/api/stopsApi';
import { useTimetableStore } from '@/store/timetableStore';
import type { StopTimeRecord } from '@/types/timetable';

vi.mock('@/api/stopsApi', () => ({
  getStops: vi.fn()
}));

const records: StopTimeRecord[] = [
  { line: 20, stop: 'Museum', order: 2, time: '12:10' },
  { line: 7, stop: 'Central', order: 1, time: '09:30' },
  { line: 7, stop: 'Park', order: 2, time: '11:00' }
];

describe('timetableStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.mocked(getStops).mockReset();
  });

  it('fetches timetable records and exposes sorted bus lines', async () => {
    vi.mocked(getStops).mockResolvedValue(records);
    const store = useTimetableStore();

    await store.fetchStops();

    expect(store.records).toEqual(records);
    expect(store.busLines).toEqual([7, 20]);
    expect(store.hasLoaded).toBe(true);
    expect(store.isLoading).toBe(false);
    expect(store.errorMessage).toBeNull();
  });

  it('reuses loaded data unless a forced refresh is requested', async () => {
    vi.mocked(getStops)
      .mockResolvedValueOnce(records)
      .mockResolvedValueOnce([
        { line: 1, stop: 'Depot', order: 1, time: '06:00' }
      ]);
    const store = useTimetableStore();

    await store.fetchStops();
    await store.fetchStops();

    expect(getStops).toHaveBeenCalledTimes(1);
    expect(store.busLines).toEqual([7, 20]);

    await store.fetchStops(true);

    expect(getStops).toHaveBeenCalledTimes(2);
    expect(store.busLines).toEqual([1]);
  });

  it('surfaces API failures through a dismissible error message', async () => {
    vi.mocked(getStops).mockRejectedValue(new Error('Network failed'));
    const store = useTimetableStore();

    await store.fetchStops();

    expect(store.records).toEqual([]);
    expect(store.hasLoaded).toBe(false);
    expect(store.isLoading).toBe(false);
    expect(store.errorMessage).toBe('Unable to load timetable data');

    store.dismissError();

    expect(store.errorMessage).toBeNull();
  });
});
