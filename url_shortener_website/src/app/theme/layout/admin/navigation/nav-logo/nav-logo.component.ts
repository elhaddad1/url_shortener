// Angular imports
import { NgClass, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-logo',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent {
  // Public props
  @Input() navCollapsed!: boolean;
  @Output() NavCollapse = new EventEmitter<void>();
  windowWidth?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Check if running in the browser before accessing `window`
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    } else {
      this.windowWidth = undefined; // Fallback for SSR
    }
  }

  // Public method
  navCollapse() {
    if (this.windowWidth && this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }
}
