import { NgClass, isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DattaConfig } from '../../../app-config';
import { ConfigurationComponent } from '../../../theme/layout/admin/configuration/configuration.component';
import { NavBarComponent } from '../../../theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from '../../../theme/layout/admin/navigation/navigation.component';
import { BreadcrumbsComponent } from '../../../theme/shared/components/breadcrumbs/breadcrumbs.component';
import { SpinnerComponent } from '../../../theme/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    RouterOutlet,
    SpinnerComponent,
    NgClass,
    NavigationComponent,
    NavBarComponent,
    BreadcrumbsComponent,
    ConfigurationComponent
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'] // Corrected typo: `styleUrl` -> `styleUrls`
})
export class DashboardContainerComponent {
  title = 'url_shortener_portal';
  navCollapsed: any;
  navCollapsedMob?: boolean;
  windowWidth?: number;

  constructor(private location: Location, @Inject(PLATFORM_ID) private platformId: object) {
    const currentUrl = this.location.path(); // Angular's Location path method is correct here.

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
