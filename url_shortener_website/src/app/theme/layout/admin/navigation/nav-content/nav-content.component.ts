// Angular imports
import { Component, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';

// Project imports
import { NavigationItem } from '../navigation';
import { environment } from '../../../../../../environments/environment';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [NavCollapseComponent, NavItemComponent, NavGroupComponent, NgScrollbarModule],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss'],
  providers: [NavigationItem],
})
export class NavContentComponent {
  // Public properties
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;
  @Output() onNavCollapsedMob = new EventEmitter<void>();
  navigation: any;
  windowWidth?: number;

  // Constructor
  constructor(
    public nav: NavigationItem,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // Browser check for window access
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    } else {
      this.windowWidth = undefined; // Fallback for SSR
    }

    this.navigation = this.nav.get();
  }

  // Public methods

  /**
   * Handles mobile navigation collapse
   */
  navMob() {
    if (this.windowWidth && this.windowWidth < 992) {
      const navigationElement = document.querySelector('app-navigation.pcoded-navbar');
      if (navigationElement?.classList.contains('mob-open')) {
        this.onNavCollapsedMob.emit();
      }
    }
  }

  /**
   * Handles clicks on navigation items to activate the current route
   */
  fireOutClick() {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Avoid DOM manipulation in SSR
    }

    let currentUrl = this.location.path();
    const link = `a.nav-link[href='${currentUrl}']`;
    const element = document.querySelector(link);

    if (element) {
      const parent = element.parentElement;
      const upParent = parent?.parentElement?.parentElement;
      const lastParent = upParent?.parentElement;

      if (parent?.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('pcoded-trigger', 'active');
      } else if (upParent?.classList.contains('pcoded-hasmenu')) {
        upParent.classList.add('pcoded-trigger', 'active');
      } else if (lastParent?.classList.contains('pcoded-hasmenu')) {
        lastParent.classList.add('pcoded-trigger', 'active');
      }
    }
  }
}
