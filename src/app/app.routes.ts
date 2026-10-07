import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { AboutPage } from './pages/about/about';
import { CapabilitiesPage } from './pages/capabilities/capabilities';
import { CaseStudiesPage } from './pages/case-studies/case-studies';
import { PriorAuthCaseStudyPage } from './pages/case-studies/prior-auth';
import { ChargeItemCaseStudyPage } from './pages/case-studies/chargeitem';
import { PftCaseStudyPage } from './pages/case-studies/pft';
import { InteropCaseStudyPage } from './pages/case-studies/interop';
import { InsightsPage } from './pages/insights/insights';
import { VehiclesPage } from './pages/vehicles/vehicles';
import { VehicleDetailPage } from './pages/vehicles/vehicle-detail';
import { VehicleOrdersPage } from './pages/vehicles/vehicle-orders';
import { ContactPage } from './pages/contact/contact';
import { GuardrailPage } from './pages/guardrail/guardrail';
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
    path: 'case-studies',
    component: CaseStudiesPage,
    title: 'Case studies | Standfast Systems',
  },
  {
    path: 'case-studies/prior-auth-gateway',
    component: PriorAuthCaseStudyPage,
    title: 'Case study: Prior authorization gateway | Standfast Systems',
  },
  {
    path: 'case-studies/chargeitem-reconciliation',
    component: ChargeItemCaseStudyPage,
    title: 'Case study: ChargeItem reconciliation | Standfast Systems',
  },
  {
    path: 'case-studies/pft-hl7-interface',
    component: PftCaseStudyPage,
    title: 'Case study: PFT HL7 interface | Standfast Systems',
  },
  {
    path: 'case-studies/coexistence-cutover',
    component: InteropCaseStudyPage,
    title: 'Case study: Coexistence to cutover | Standfast Systems',
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
    path: 'vehicles/:slug',
    component: VehicleDetailPage,
    title: 'Federal Vehicle Landscape | Standfast Systems',
  },
  {
    path: 'vehicles/:slug/orders',
    component: VehicleOrdersPage,
    title: 'Federal Vehicle Landscape | Standfast Systems',
  },
  {
    path: 'contact',
    component: ContactPage,
    title: 'Contact | Standfast Systems',
  },
  {
    path: 'sf-guardrail',
    component: GuardrailPage,
    title: 'Standfast Guardrail | Standfast Systems',
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'Page not found | Standfast Systems',
  },
];
