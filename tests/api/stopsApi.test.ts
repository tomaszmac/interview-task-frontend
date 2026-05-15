import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { API_BASE_URL, getStops } from '@/api/stopsApi';
import type { StopTimeRecord } from '@/types/timetable';

const axiosMocks = vi.hoisted(() => {
  const get = vi.fn();
  const create = vi.fn(() => ({
    get
  }));

  return { create, get };
});

vi.mock('axios', () => ({
  default: {
    create: axiosMocks.create
  }
}));

describe('stopsApi', () => {
  beforeEach(() => {
    axiosMocks.get.mockReset();
  });

  it('configures the API client for the local json-server port', async () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: API_BASE_URL
    });
    expect(API_BASE_URL).toBe('http://localhost:3000');
  });

  it('loads stop records from the /stops endpoint', async () => {
    const records: StopTimeRecord[] = [
      { line: 7, stop: 'Central', order: 1, time: '09:30' }
    ];

    axiosMocks.get.mockResolvedValue({ data: records });

    await expect(getStops()).resolves.toEqual(records);
    expect(axiosMocks.get).toHaveBeenCalledWith('/stops');
  });
});
