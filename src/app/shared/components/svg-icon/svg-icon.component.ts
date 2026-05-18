import { Component, input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as icons from '../../icons';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  template: `<span [innerHTML]="iconSvg" [class]="sizeClass"></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content:;
      }
      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      span ::ng-deep svg {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class SvgIconComponent {
  private readonly sanitizer = inject(DomSanitizer);
  name = input.required<string>();
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  get sizeClass(): string {
    const sizes: Record<string, string> = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    };
    return sizes[this.size()] ?? sizes['md'];
  }

  get iconSvg(): SafeHtml {
    const iconName = `${this.name()}Icon` as keyof typeof icons;
    const svg = icons[iconName] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
