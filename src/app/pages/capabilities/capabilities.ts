import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-capabilities-page',
  templateUrl: './capabilities.html',
})
export class CapabilitiesPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Core competencies of Standfast Systems, LLC: legacy modernization, EHR and clinical data integration, FHIR and HL7 interoperability, Section 508 accessibility, and application security. Includes GovCon quick facts.',
    });
  }
}
