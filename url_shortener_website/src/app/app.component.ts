import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DattaConfig } from './app-config';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { Location, NgClass, isPlatformBrowser } from '@angular/common';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { BreadcrumbsComponent } from './theme/shared/components/breadcrumbs/breadcrumbs.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NavigationComponent,
    NavBarComponent,
    BreadcrumbsComponent,
    ConfigurationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fixed typo: `styleUrl` -> `styleUrls`
})
export class AppComponent {
  title = 'url_shortener_portal';
  navCollapsed: any;
  navCollapsedMob?: boolean;
  windowWidth?: number;

  constructor(private location: Location, @Inject(PLATFORM_ID) private platformId: object) {
    let currentUrl = this.location.path();

    // Access `window` only if in browser
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
      this.navCollapsed = this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
    } else {
      this.windowWidth = undefined; // No `window` on the server
      this.navCollapsed = false;
    }

    this.navCollapsedMob = false;
  }

  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar')!.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    const navigationElement = document.querySelector('app-navigation.pcoded-navbar');
    if (navigationElement?.classList.contains('mob-open')) {
      navigationElement.classList.remove('mob-open');
    }
  }
}
