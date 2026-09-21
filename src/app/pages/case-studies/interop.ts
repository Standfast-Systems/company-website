import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-interop-case-study-page',
  imports: [RouterLink],
  templateUrl: './interop.html',
})
export class InteropCaseStudyPage {
  constructor() {
    const meta = inject(Meta);
    const title = 'Turn the old system off with a config flag | Standfast Systems';
    const description =
      'A coexistence layer that conforms a legacy HL7 v2 feed into US Core FHIR 7.0.0 without touching the source system, quarantines a PHQ-9 every generic validator passes, then retires the legacy intake with one config flag while downstream stays unchanged.';
    const image = 'https://standfastsystems.com/assets/case-studies/interop-flip.png';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({
      property: 'og:url',
      content: 'https://standfastsystems.com/case-studies/coexistence-cutover',
    });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
