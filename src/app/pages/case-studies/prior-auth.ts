import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-prior-auth-case-study-page',
  imports: [RouterLink],
  templateUrl: './prior-auth.html',
})
export class PriorAuthCaseStudyPage {
  constructor() {
    const meta = inject(Meta);
    const title = 'Prior authorization, translated | Standfast Systems';
    const description =
      'A FHIR to X12 prior authorization gateway built to Da Vinci PAS 2.0.1, the version named by CMS-0057-F, and verified against the Inferno PAS test kit: 11 passing tests to 39 without modifying the payer.';
    const image = 'https://standfastsystems.com/assets/case-studies/conformance-board-v4.png';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({
      property: 'og:url',
      content: 'https://standfastsystems.com/case-studies/prior-auth-gateway',
    });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
