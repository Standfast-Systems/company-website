import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFile } from 'node:fs/promises';

// Prerender one page per vehicle by enumerating slugs from the data snapshot,
// so /vehicles/<slug> deep links are real files on GitHub Pages.
async function vehicleParams(): Promise<Array<{ slug: string }>> {
  const raw = await readFile('public/data/vehicles.json', 'utf-8');
  const parsed = JSON.parse(raw) as { vehicles: Array<{ slug: string }> };
  return parsed.vehicles.map(({ slug }) => ({ slug }));
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'vehicles/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: vehicleParams,
  },
  {
    path: 'vehicles/:slug/orders',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: vehicleParams,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
