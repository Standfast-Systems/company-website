import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.html',
})
export class ContactPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Contact Standfast Systems, LLC. If you design, buy, regulate, or live inside health systems, we would like to hear from you.',
    });
  }
}
