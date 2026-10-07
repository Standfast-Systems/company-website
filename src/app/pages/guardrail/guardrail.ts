import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guardrail-page',
  imports: [RouterLink],
  templateUrl: './guardrail.html',
})
export class GuardrailPage {
  constructor() {
    const meta = inject(Meta);
    const title = 'Standfast Guardrail | Standfast Systems';
    const description =
      'A free tool that watches each HL7 v2 source feeding a health information exchange every day and tells your team which source changed, what changed, and what it is likely to cost in manual review. Runs inside your environment and keeps no raw PHI.';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    const image = 'https://standfastsystems.com/assets/sf-guardrail/3-hub-review-chart.png';

    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({ property: 'og:url', content: 'https://standfastsystems.com/sf-guardrail' });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
