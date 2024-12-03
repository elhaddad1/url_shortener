// Angular imports
import { Component, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { DattaConfig } from '../../../../app-config';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from './nav-content/nav-content.component';
import {  isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavContentComponent, NavLogoComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // Public props
  @Output() NavCollapse = new EventEmitter<void>();
  @Output() NavCollapsedMob = new EventEmitter<void>();
  navCollapsed: any;
  navCollapsedMob = false;
  windowWidth?: number;

  // Constructor
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Check if running in the browser before accessing `window`
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
      this.navCollapsed = this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
    } else {
      this.windowWidth = undefined; // Fallback for SSR
      this.navCollapsed = false;
    }
  }

  // Public methods
  navCollapse() {
    if (this.windowWidth && this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth && this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
