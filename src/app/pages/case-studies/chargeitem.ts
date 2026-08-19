import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chargeitem-case-study-page',
  imports: [RouterLink],
  templateUrl: './chargeitem.html',
})
export class ChargeItemCaseStudyPage {
  constructor() {
    const meta = inject(Meta);
    const title = 'Zero errors, wrong twice | Standfast Systems';
    const description =
      'A working FHIR R4 ChargeItem pipeline logged 412 accepted and zero errors. Full-volume reconciliation against the source ledger found an unbilled treatment and a duplicate charge the interface reported as success.';

    const image = 'https://standfastsystems.com/assets/case-studies/chargeitem-reconciliation.png';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({
      property: 'og:url',
      content: 'https://standfastsystems.com/case-studies/chargeitem-reconciliation',
    });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
