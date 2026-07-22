import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-insights-page',
  templateUrl: './insights.html',
})
export class InsightsPage {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content:
        'Long-form thinking from Standfast Systems. Start with our launch thesis: The Patient Shouldn\'t Be the Integration Layer.',
    });
  }
}
