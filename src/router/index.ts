import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import BusLinesPage from '@/features/bus-lines/BusLinesPage.vue';
import StopsPage from '@/features/stops/StopsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'bus-lines',
    component: BusLinesPage
  },
  {
    path: '/stops',
    name: 'stops',
    component: StopsPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
