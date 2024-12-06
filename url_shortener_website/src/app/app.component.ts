import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DattaConfig } from './app-config';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { Location, NgClass, isPlatformBrowser } from '@angular/common';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { BreadcrumbsComponent } from './theme/shared/components/breadcrumbs/breadcrumbs.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faCircle } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Fixed typo: `styleUrl` -> `styleUrls`
})
export class AppComponent {
  title = 'url_shortener_portal';

  constructor(library: FaIconLibrary) {
    library.addIcons(faTwitter, faGithub, faBars, faCircle);
    library.addIcons(faFacebookF); // Register only `facebook-f` icon
    library.addIconPacks(fas,fab);
  }

}
