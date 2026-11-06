import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

interface Sprint {
  label: string;
  weeks: string;
  points: number;
  lines: number;
}

// Per-sprint totals from Azure DevOps (completed story points) and GitHub
// (net lines shipped to the main branch, both shared codebases combined).
// Sprint 26.07 has a generated-file batch stripped out; 26.13 is a partial final week.
const SPRINTS: Sprint[] = [
  { label: '26.01', weeks: 'W01-02', points: 32, lines: 12873 },
  { label: '26.02', weeks: 'W03-04', points: 42, lines: 22206 },
  { label: '26.03', weeks: 'W05-06', points: 41, lines: 36597 },
  { label: '26.04', weeks: 'W07-08', points: 47, lines: 44203 },
  { label: '26.05', weeks: 'W09-10', points: 54, lines: 29192 },
  { label: '26.06', weeks: 'W11-12', points: 60, lines: 93101 },
  { label: '26.07', weeks: 'W13-14', points: 55, lines: 74125 },
  { label: '26.08', weeks: 'W15-16', points: 68, lines: 61245 },
  { label: '26.09', weeks: 'W17-18', points: 65, lines: 56485 },
  { label: '26.10', weeks: 'W19-20', points: 67, lines: 52217 },
  { label: '26.11', weeks: 'W21-22', points: 75, lines: 22556 },
  { label: '26.12', weeks: 'W23-24', points: 64, lines: 26017 },
  { label: '26.13', weeks: 'W25-26', points: 70, lines: 20338 },
];

const W = 960;
const H = 460;
const M = { top: 56, right: 72, bottom: 64, left: 60 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const POINTS_MAX = 80;
const LINES_MAX = 100000;

@Component({
  selector: 'app-ai-modernization-case-study-page',
  imports: [RouterLink],
  templateUrl: './ai-modernization.html',
})
export class AiModernizationCaseStudyPage {
  readonly width = W;
  readonly height = H;
  readonly margin = M;
  readonly plotW = PLOT_W;
  readonly plotH = PLOT_H;
  readonly baseY = M.top + PLOT_H;
  readonly sprints = SPRINTS;

  private readonly slot = PLOT_W / SPRINTS.length;
  readonly barW = 36;

  readonly ticks = [0, 1, 2, 3, 4].map((i) => ({
    y: this.baseY - (PLOT_H * i) / 4,
    left: (POINTS_MAX * i) / 4,
    right: (LINES_MAX * i) / 4 / 1000 + 'k',
  }));

  readonly bars = SPRINTS.map((s, i) => {
    const h = (s.points / POINTS_MAX) * PLOT_H;
    const cx = M.left + this.slot * (i + 0.5);
    return { ...s, cx, x: cx - this.barW / 2, y: this.baseY - h, h };
  });

  readonly dots = SPRINTS.map((s, i) => ({
    cx: M.left + this.slot * (i + 0.5),
    cy: this.baseY - (s.lines / LINES_MAX) * PLOT_H,
  }));

  readonly linePath = this.dots.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.cx},${d.cy}`).join(' ');

  readonly peak = this.dots[5];

  fmt(n: number): string {
    return n.toLocaleString('en-US');
  }

  constructor() {
    const meta = inject(Meta);
    const title = 'More output, less new code | Standfast Systems';
    const description =
      'AI-assisted delivery on a behind-schedule enterprise modernization, measured sprint by sprint across 13 sprints. Employee work at Total Quality Logistics: sustained velocity up about 1.5x with defect rates flat, while code volume fell from its peak.';
    const image = 'https://standfastsystems.com/assets/brand/Standfast_LI_ArticleCover.png';

    meta.updateTag({ name: 'description', content: description });
    meta.updateTag({ property: 'og:title', content: title });
    meta.updateTag({ property: 'og:description', content: description });
    meta.updateTag({ property: 'og:image', content: image });
    meta.updateTag({
      property: 'og:url',
      content: 'https://standfastsystems.com/case-studies/ai-assisted-modernization',
    });
    meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    meta.updateTag({ name: 'twitter:image', content: image });
  }
}
