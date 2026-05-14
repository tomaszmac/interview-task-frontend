import axios from 'axios';
import type { StopTimeRecord } from '@/types/timetable';

export const API_BASE_URL = 'http://localhost:3000';

const stopsApiClient = axios.create({
  baseURL: API_BASE_URL
});

export async function getStops(): Promise<StopTimeRecord[]> {
  const response = await stopsApiClient.get<StopTimeRecord[]>('/stops');

  return response.data;
}
