import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pft-case-study-page',
  imports: [RouterLink],
  templateUrl: './pft.html',
})
export class PftCaseStudyPage {
  constructor() {
    const meta = inject(Meta);
    const title = 'Structurally valid, physiologically impossible | Standfast Systems';
    const description =
      'A vendor-neutral PFT-to-EHR interface: SQL to conformant HL7 v2.5.1 ORU^R01 over MLLP, with a three-layer conformance gate that quarantines a structurally valid message whose FEV1 exceeds its FVC.';
    const image = 'https://standfastsystems.com/assets/case-studies/pft-quarantine.png';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({
      property: 'og:url',
      content: 'https://standfastsystems.com/case-studies/pft-hl7-interface',
    });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
