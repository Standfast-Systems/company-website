import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleDataService, VehicleDetail, fmtMoney } from './data.service';

// Level 1: one vehicle's seats (primes) and teaming tier (the subs who carry
// delivery weight). Seat click -> that prime's orders; sub click -> the orders
// whose teams include that sub.
@Component({
  selector: 'app-vehicle-detail-page',
  imports: [RouterLink],
  templateUrl: './vehicle-detail.html',
})
export class VehicleDetailPage implements OnInit, OnDestroy {
  private data = inject(VehicleDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private sub?: Subscription;

  readonly fmtMoney = fmtMoney;
  d = signal<VehicleDetail | null>(null);
  slug = signal('');   // from the route, never from data shape
  err = signal('');

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug') || '';
      this.slug.set(slug);
      if (!this.isBrowser) return;
      try {
        this.d.set(await this.data.vehicle(slug));
        this.err.set('');
      } catch (e) { this.err.set(String((e as Error).message || e)); }
    });
  }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  openSeat(company: string) {
    this.router.navigate(['/vehicles', this.slug(), 'orders'], { queryParams: { company } });
  }

  openSub(name: string) {
    this.router.navigate(['/vehicles', this.slug(), 'orders'], { queryParams: { sub: name } });
  }

  pct(part: number, whole: number): string {
    return whole > 0 && part > 0 ? Math.round((part / whole) * 100) + '%' : '';
  }
}
