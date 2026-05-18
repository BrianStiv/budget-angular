import { Component } from '@angular/core';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './banner.component.html',
})
export class BannerComponent {}
