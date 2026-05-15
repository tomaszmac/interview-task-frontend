import { fireEvent, render, screen, within } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { vi } from 'vitest';
import { getStops } from '@/api/stopsApi';
import StopsPage from '@/features/stops/StopsPage.vue';
import type { StopTimeRecord } from '@/types/timetable';

vi.mock('@/api/stopsApi', () => ({
  getStops: vi.fn()
}));

const records: StopTimeRecord[] = [
  { line: 7, stop: 'Museum', order: 3, time: '12:10' },
  { line: 7, stop: 'Central', order: 1, time: '09:30' },
  { line: 8, stop: 'Depot', order: 1, time: '06:00' },
  { line: 9, stop: 'Łagiewniki', order: 2, time: '10:00' },
  { line: 7, stop: 'Central', order: 1, time: '13:45' }
];

function renderStopsPage() {
  return render(StopsPage, {
    global: {
      plugins: [createPinia()]
    }
  });
}

function getVisibleStopNames() {
  const table = screen.getByRole('table', { name: 'All bus stops' });

  return within(table)
    .getAllByRole('cell')
    .map((cell) => cell.textContent);
}

describe('StopsPage', () => {
  it('shows unique stops sorted ascending and filters from the search input', async () => {
    vi.mocked(getStops).mockResolvedValue(records);

    renderStopsPage();

    await screen.findByRole('table', { name: 'All bus stops' });

    expect(getVisibleStopNames()).toEqual([
      'Central',
      'Depot',
      'Łagiewniki',
      'Museum'
    ]);

    await fireEvent.update(screen.getByRole('searchbox'), '  lag  ');

    expect(getVisibleStopNames()).toEqual(['Łagiewniki']);
  });

  it('supports descending sort and shows a no-results edge state for unmatched search', async () => {
    vi.mocked(getStops).mockResolvedValue(records);

    renderStopsPage();

    await screen.findByRole('table', { name: 'All bus stops' });
    await fireEvent.click(
      screen.getByRole('button', { name: 'Sort bus stops descending' })
    );

    expect(getVisibleStopNames()).toEqual([
      'Museum',
      'Łagiewniki',
      'Depot',
      'Central'
    ]);

    await fireEvent.update(screen.getByRole('searchbox'), 'missing stop');

    expect(screen.getByText('No bus stops found')).toBeInTheDocument();
    expect(screen.queryByRole('table', { name: 'All bus stops' })).not.toBeInTheDocument();
  });
});
