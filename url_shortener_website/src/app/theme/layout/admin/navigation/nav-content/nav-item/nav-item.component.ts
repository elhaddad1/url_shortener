import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationItem } from '../../navigation';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [NgClass, RouterLinkActive, RouterLink],
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent {
  @Input() item!: NavigationItem;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  closeOtherMenu(event: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Avoid DOM manipulation on the server
    }

    const ele = event.target as HTMLElement;
    const parent = ele?.parentElement;
    const upParent = parent?.parentElement?.parentElement;
    const lastParent = upParent?.parentElement;

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    sections.forEach((section) => {
      section.classList.remove('active');
      section.classList.remove('pcoded-trigger');
    });

// Call the method with safe fallbacks
this.addActiveClasses(parent || null, upParent || null, lastParent || null);

    const navbar = document.querySelector('app-navigation.pcoded-navbar');
    if (navbar?.classList.contains('mob-open')) {
      navbar.classList.remove('mob-open');
    }
  }

  private addActiveClasses(
    parent: HTMLElement | null | undefined,
    upParent: HTMLElement | null | undefined,
    lastParent: HTMLElement | null | undefined
  ): void {
    if (parent?.classList.contains('pcoded-hasmenu')) {
      parent.classList.add('pcoded-trigger', 'active');
    } else if (upParent?.classList.contains('pcoded-hasmenu')) {
      upParent.classList.add('pcoded-trigger', 'active');
    } else if (lastParent?.classList.contains('pcoded-hasmenu')) {
      lastParent.classList.add('pcoded-trigger', 'active');
    }
  }
}
