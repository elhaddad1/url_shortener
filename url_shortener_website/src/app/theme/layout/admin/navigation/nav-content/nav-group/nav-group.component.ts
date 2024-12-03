// Angular imports
import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';

// Project imports
import { NavigationItem } from '../../navigation';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { NavCollapseComponent } from '../nav-collapse/nav-collapse.component';

@Component({
  selector: 'app-nav-group',
  standalone: true,
  imports: [NavCollapseComponent, NavItemComponent],
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent implements OnInit {
  // Public properties
  @Input() item!: NavigationItem;

  // Constructor
  constructor(
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  // Lifecycle hook
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Prevent DOM access on the server
    }

    let currentUrl = this.location.path();
    /* Uncomment if using baseHref:
    if (this.location['_baseHref']) {
      currentUrl = this.location['_baseHref'] + this.location.path();
    }
    */
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
