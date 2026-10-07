import { Component, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { VehicleDataService, VehicleGroup, VehicleRow, fmtMoney } from './data.service';

// Level 0: the contract vehicles and their shape.
@Component({
  selector: 'app-vehicles-page',
  imports: [RouterLink],
  templateUrl: './vehicles.html',
})
export class VehiclesPage implements OnInit {
  private data = inject(VehicleDataService);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly fmtMoney = fmtMoney;
  rows = signal<VehicleRow[]>([]);
  generatedAt = signal('');
  err = signal('');

  // Section order on the page. Owner group comes from the snapshot; anything
  // unlabelled lands in Government-wide so it never vanishes.
  readonly SECTIONS: { key: VehicleGroup; label: string; hint: string }[] = [
    { key: 'VA', label: 'VA vehicles', hint: 'VA-held IDIQs: T4NG, CEDAR and SPRUCE, IHT, EHRM' },
    {
      key: 'Gov-wide',
      label: 'Government-wide vehicles',
      hint: 'GSA schedules and GWACs: Alliant 2, VETS 2, SEWP V, CIO-SP3',
    },
  ];
  // Within a section, iterations of one program stay adjacent (T4 -> T4NG -> T4NG2):
  // lineages ordered by their biggest member's total, generations oldest first.
  sections = computed(() =>
    this.SECTIONS.map((s) => ({
      ...s,
      rows: this.orderByLineage(this.rows().filter((v) => (v.group || 'Gov-wide') === s.key)),
    })).filter((s) => s.rows.length),
  );

  private orderByLineage(rows: VehicleRow[]): VehicleRow[] {
    const peak = new Map<string, number>();
    for (const v of rows) {
      const k = v.lineage || v.vehicle;
      peak.set(k, Math.max(peak.get(k) ?? 0, v.total || 0));
    }
    return [...rows].sort((a, b) => {
      const ka = a.lineage || a.vehicle, kb = b.lineage || b.vehicle;
      if (ka !== kb) return (peak.get(kb)! - peak.get(ka)!) || ka.localeCompare(kb);
      return (a.gen ?? 0) - (b.gen ?? 0);
    });
  }

  // A later generation of the row above it, rendered indented under its predecessor.
  continues(v: VehicleRow): boolean { return (v.gen ?? 0) > 0; }

  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'The Federal Vehicle Landscape: a free, static explorer of federal contract vehicles built from public USAspending data. Every seat, every task order, and the subcontractor teams that deliver the work.',
    });
  }

  async ngOnInit() {
    if (!this.isBrowser) return;
    try {
      const d = await this.data.vehicles();
      this.rows.set(d.vehicles);
      this.generatedAt.set(d.generated_at);
    } catch (e) { this.err.set(String((e as Error).message || e)); }
  }

  open(v: VehicleRow) { this.router.navigate(['/vehicles', v.slug]); }
}
