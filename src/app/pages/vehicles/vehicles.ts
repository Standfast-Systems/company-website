import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { VehicleDataService, VehicleRow, fmtMoney } from './data.service';

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
