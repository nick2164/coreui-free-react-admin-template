import React from 'react';
import Login from "./views/Login/Login";

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const VoicemailBoxes = React.lazy(() => import('./views/VoicemailBoxes'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/voicemailbox', name: 'Telefonsvarer', component: VoicemailBoxes },
  { path: '/statistics', name: 'Statistik', component: Dashboard },
  { path: '/recordings', name: 'Gemte samtaler', component: Dashboard },
  { path: '/audit', name: 'Handlingsoversigt', component: Dashboard },
];

export default routes;
