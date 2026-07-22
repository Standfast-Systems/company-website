import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class HomePage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Standfast Systems, LLC is a veteran-founded software firm modernizing how clinical systems talk to each other. VistA to Oracle Health, built on FHIR, sustainment-first, with behavioral health at the center.',
    });
  }
}
