import { fireEvent, render, screen, within } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { vi } from 'vitest';
import { getStops } from '@/api/stopsApi';
import BusLinesPage from '@/features/bus-lines/BusLinesPage.vue';
import type { StopTimeRecord } from '@/types/timetable';

vi.mock('@/api/stopsApi', () => ({
  getStops: vi.fn()
}));

const records: StopTimeRecord[] = [
  { line: 7, stop: 'Museum', order: 3, time: '12:10' },
  { line: 7, stop: 'Central', order: 1, time: '09:30' },
  { line: 8, stop: 'Depot', order: 1, time: '06:00' },
  { line: 7, stop: 'Park', order: 2, time: '11:00' },
  { line: 7, stop: 'Park', order: 2, time: '08:15' }
];

describe('BusLinesPage', () => {
  it('shows ordered line stops and sorted stop times after selections', async () => {
    vi.mocked(getStops).mockResolvedValue(records);

    render(BusLinesPage, {
      global: {
        plugins: [createPinia()]
      }
    });

    await fireEvent.click(await screen.findByRole('button', { name: '7' }));

    const stopsTable = screen.getByRole('table', {
      name: 'Bus stops for selected line'
    });

    expect(within(stopsTable).getAllByRole('cell').map((cell) => cell.textContent)).toEqual([
      'Central',
      'Park',
      'Museum'
    ]);

    await fireEvent.click(within(stopsTable).getByRole('button', { name: 'Park' }));

    const timesTable = screen.getByRole('table', {
      name: 'Departure times for selected stop'
    });

    expect(within(timesTable).getAllByRole('cell').map((cell) => cell.textContent)).toEqual([
      '08:15',
      '11:00'
    ]);
  });
});
