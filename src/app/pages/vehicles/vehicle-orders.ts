import { Component, OnDestroy, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { VehicleDataService, Order, PodEntry, VehicleDetail, fmtMoney } from './data.service';

// Level 2: task orders on a vehicle, filtered to a prime (?company=) or to
// the orders whose delivery team includes a sub (?sub=). Level 3 is the team
// drawer: the order's subcontractors.
@Component({
  selector: 'app-vehicle-orders-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './vehicle-orders.html',
})
export class VehicleOrdersPage implements OnInit, OnDestroy {
  private data = inject(VehicleDataService);
  private route = inject(ActivatedRoute);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private sub?: Subscription;

  readonly fmtMoney = fmtMoney;
  d = signal<VehicleDetail | null>(null);
  slug = signal('');
  company = signal('');
  subFilter = signal('');
  q = signal('');
  err = signal('');
  drawer = signal<Order | null>(null);

  rows = computed<Order[]>(() => {
    const d = this.d();
    if (!d) return [];
    let rows = d.orders;
    if (this.company()) rows = rows.filter((o) => o.company === this.company());
    if (this.subFilter()) {
      rows = rows.filter((o) => (d.pods[o.piid] || []).some((p) => p.sub_name === this.subFilter()));
    }
    const q = this.q().toLowerCase();
    if (q) rows = rows.filter((o) => (o.description + ' ' + o.piid + ' ' + o.company).toLowerCase().includes(q));
    return rows;
  });
  total = computed(() => this.rows().reduce((a, o) => a + (o.amount || 0), 0));

  ngOnInit() {
    this.sub = combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(async ([p, qp]) => {
      this.company.set(qp.get('company') || '');
      this.subFilter.set(qp.get('sub') || '');
      const slug = p.get('slug') || '';
      this.slug.set(slug);
      if (!this.isBrowser) return;
      try {
        this.d.set(await this.data.vehicle(slug));
        this.err.set('');
      } catch (e) { this.err.set(String((e as Error).message || e)); }
    });
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  pod(o: Order): PodEntry[] { return this.d()?.pods[o.piid] || []; }
}
