import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-case-studies-page',
  imports: [RouterLink],
  templateUrl: './case-studies.html',
})
export class CaseStudiesPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Case study: a FHIR to X12 prior authorization gateway built to Da Vinci PAS 2.0.1, the version named by CMS-0057-F, and verified against the Inferno Da Vinci PAS Test Kit.',
    });
  }
}
