import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.html',
})
export class AboutPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Standfast Systems is a veteran-founded, senior-led software firm specializing in federal health-IT modernization and healthcare data interoperability.',
    });
  }
}
