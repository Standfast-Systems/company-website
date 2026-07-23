import { Injectable } from '@angular/core';

// The landscape tool reads only the static snapshot exported by the private
// research pipeline (landscape-safe columns only; the exporter is purity-tested).
// No server, no live API, nothing writable.

export interface VehicleRow {
  vehicle: string; slug: string; orders_n: number; primes: number; total: number;
  active: number; sub_flow: number; pods_mapped: number;
}
export interface Seat {
  company: string; orders_n: number; total: number; active: number;
  subbed_out: number; first_order: string; latest_order: string;
}
export interface TopSub { sub_name: string; total: number; pods: number; primes: number; }
export interface Order {
  piid: string; company: string; amount: number; start_date: string; end_date: string;
  award_type: string; description: string;
}
export interface PodEntry { sub_name: string; amount: number; action_date: string; txns: number; }
export interface VehicleDetail {
  generated_at: string; vehicle: string; slug: string;
  orders_n: number; primes: number; total: number; active: number; sub_flow: number;
  seats: Seat[]; top_subs: TopSub[]; orders: Order[]; pods: Record<string, PodEntry[]>;
}

@Injectable({ providedIn: 'root' })
export class VehicleDataService {
  private cache = new Map<string, unknown>();

  private async get<T>(url: string): Promise<T> {
    if (this.cache.has(url)) return this.cache.get(url) as T;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`could not load ${url} (${res.status})`);
    const data = await res.json();
    this.cache.set(url, data);
    return data as T;
  }

  // Absolute URLs: fetch resolves against the document URL, not <base href>,
  // and these load from nested routes like /vehicles/:slug/orders.
  vehicles() { return this.get<{ generated_at: string; vehicles: VehicleRow[] }>('/data/vehicles.json'); }
  vehicle(slug: string) { return this.get<VehicleDetail>(`/data/vehicle/${slug}.json`); }
}

/** $389.7M-style compact money. */
export function fmtMoney(n: number | null | undefined): string {
  const v = Number(n) || 0;
  const abs = Math.abs(v);
  if (abs >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'B';
  if (abs >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
  if (abs >= 1e3) return '$' + (v / 1e3).toFixed(0) + 'k';
  return '$' + v.toFixed(0);
}
