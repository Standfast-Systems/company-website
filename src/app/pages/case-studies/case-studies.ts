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
    const meta = inject(Meta);
    const title = 'Case studies | Standfast Systems';
    const description =
      'Working clean-room prototypes on open healthcare standards: a Da Vinci PAS conformance gateway verified with Inferno, a FHIR ChargeItem pipeline proven by full-volume reconciliation, a PFT-to-EHR HL7 v2 interface with a clinical plausibility gate, and a coexistence layer that retires a legacy EHR intake with one config flag.';
    const image = 'https://standfastsystems.com/assets/case-studies/conformance-board-v4.png';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:url', content: 'https://standfastsystems.com/case-studies' });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
