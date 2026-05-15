import { fireEvent, render, screen, within } from '@testing-library/vue';
import TimetableTable from '@/components/ui/TimetableTable.vue';
import LineStopsPanel from '@/features/bus-lines/LineStopsPanel.vue';
import StopTimesPanel from '@/features/bus-lines/StopTimesPanel.vue';
import StopsSearch from '@/features/stops/StopsSearch.vue';
import type { RouteStop } from '@/types/timetable';

describe('StopsSearch', () => {
  it('emits v-model updates from the search input', async () => {
    const { emitted } = render(StopsSearch, {
      props: {
        modelValue: ''
      }
    });

    await fireEvent.update(screen.getByRole('searchbox'), 'Central');

    expect(emitted()['update:modelValue']).toEqual([['Central']]);
  });

  it('moves from inactive placeholder state to active floating-label state on focus', async () => {
    const { container } = render(StopsSearch, {
      props: {
        modelValue: ''
      }
    });

    const input = screen.getByRole('searchbox');
    const label = screen.getByText('Search');

    expect(input).toHaveAttribute('placeholder', 'Search...');
    expect(label).toHaveClass('opacity-0');
    expect(container.querySelector('img[aria-hidden="true"]')).toBeInTheDocument();

    await fireEvent.focus(input);

    expect(input).toHaveAttribute('placeholder', '');
    expect(label).toHaveClass('opacity-100');
    expect(container.querySelector('img[aria-hidden="true"]')).not.toBeInTheDocument();
  });
});

describe('TimetableTable and SortButton', () => {
  it('exposes the active sort direction and next sort action accessibly', async () => {
    const { emitted, rerender } = render(TimetableTable, {
      props: {
        ariaLabel: 'All bus stops',
        heading: 'Bus Stops',
        sortDirection: 'asc',
        sortLabel: 'bus stops'
      },
      slots: {
        default: '<tr><td>Central</td></tr>'
      }
    });

    const table = screen.getByRole('table', { name: 'All bus stops' });
    const header = within(table).getByRole('columnheader');
    const button = within(table).getByRole('button', {
      name: 'Sort bus stops descending'
    });

    expect(header).toHaveAttribute('aria-sort', 'ascending');

    await fireEvent.click(button);

    expect(emitted()['toggle-sort']).toHaveLength(1);

    await rerender({
      ariaLabel: 'All bus stops',
      heading: 'Bus Stops',
      sortDirection: 'desc',
      sortLabel: 'bus stops'
    });

    expect(header).toHaveAttribute('aria-sort', 'descending');
    expect(
      within(table).getByRole('button', { name: 'Sort bus stops ascending' })
    ).toBeInTheDocument();
  });
});

describe('LineStopsPanel', () => {
  const stops: RouteStop[] = [
    { key: '10:1', name: 'Central', order: 1, lines: [10] },
    { key: '10:2', name: 'Museum', order: 2, lines: [10] }
  ];

  it('renders stops in a table, marks the selected stop, and emits selection', async () => {
    const { emitted } = render(LineStopsPanel, {
      props: {
        line: 10,
        stops,
        selectedStopKey: '10:1',
        sortDirection: 'asc'
      }
    });

    const table = screen.getByRole('table', {
      name: 'Bus stops for selected line'
    });
    const selectedStop = within(table).getByRole('button', {
      name: 'Central'
    });

    expect(selectedStop).toHaveAttribute('aria-current', 'true');

    await fireEvent.click(within(table).getByRole('button', { name: 'Museum' }));

    expect(emitted()['select-stop']).toEqual([['10:2']]);
  });
});

describe('StopTimesPanel', () => {
  it('renders departure times as table rows', () => {
    render(StopTimesPanel, {
      props: {
        stop: 'Central',
        times: ['08:15', '12:05', '17:45']
      }
    });

    const table = screen.getByRole('table', {
      name: 'Departure times for selected stop'
    });

    expect(within(table).getAllByRole('cell').map((cell) => cell.textContent)).toEqual([
      '08:15',
      '12:05',
      '17:45'
    ]);
  });

  it('supports duplicate departure times without duplicate key warnings', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const { rerender } = render(StopTimesPanel, {
      props: {
        stop: 'Central',
        times: ['08:15', '12:05', '17:45']
      }
    });

    await rerender({
      stop: 'Central',
      times: ['08:15', '08:15', '12:05']
    });

    expect(
      warnSpy.mock.calls.some(([message]) =>
        String(message).includes('Duplicate keys found during update')
      )
    ).toBe(false);

    warnSpy.mockRestore();
  });
});
