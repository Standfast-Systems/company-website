import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

// Placeholder route for the Federal Vehicle Landscape tool (phase-2 fast follow).
// The real tool is static-JSON-backed; when it lands, replace this component's
// template with the tool shell and load its data from public/assets.
@Component({
  selector: 'app-vehicles-page',
  imports: [RouterLink],
  templateUrl: './vehicles.html',
})
export class VehiclesPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'The Federal Vehicle Landscape: a fast, visual map of federal contract vehicles relevant to health-IT work. Coming soon from Standfast Systems.',
    });
  }
}
