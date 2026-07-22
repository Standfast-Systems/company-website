import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { AboutPage } from './pages/about/about';
import { CapabilitiesPage } from './pages/capabilities/capabilities';
import { InsightsPage } from './pages/insights/insights';
import { VehiclesPage } from './pages/vehicles/vehicles';
import { ContactPage } from './pages/contact/contact';
import { NotFoundPage } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Standfast Systems | Health data that finally connects',
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'About | Standfast Systems',
  },
  {
    path: 'capabilities',
    component: CapabilitiesPage,
    title: 'Capabilities | Standfast Systems',
  },
  {
    path: 'insights',
    component: InsightsPage,
    title: 'Insights | Standfast Systems',
  },
  {
    path: 'vehicles',
    component: VehiclesPage,
    title: 'Federal Vehicle Landscape | Standfast Systems',
  },
  {
    path: 'contact',
    component: ContactPage,
    title: 'Contact | Standfast Systems',
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'Page not found | Standfast Systems',
  },
];
