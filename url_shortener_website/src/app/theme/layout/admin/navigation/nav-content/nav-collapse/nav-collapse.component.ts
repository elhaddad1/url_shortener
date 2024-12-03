import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { NavigationItem } from '../../navigation';
import { RouterLinkActive } from '@angular/router';
import { NavGroupComponent } from '../nav-group/nav-group.component';
import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-nav-collapse',
  standalone: true,
  imports: [RouterLinkActive, NavGroupComponent, NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class NavCollapseComponent {
  @Input() item!: NavigationItem;
  visible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  navCollapse(event: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Avoid DOM manipulation on the server
    }

    this.visible = !this.visible;
    let parent = event.target?.parentElement;

    if (!parent) return;

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    sections.forEach((section) => {
      if (section !== parent) {
        section.classList.remove('pcoded-trigger');
      }
    });

    this.toggleParentMenus(parent);
    parent.classList.toggle('pcoded-trigger');
  }

  private toggleParentMenus(parent: HTMLElement): void {
    // Ensure variables are only assigned HTMLElement or null
    let firstParent: HTMLElement | null = parent.parentElement || null;
    let preParent: HTMLElement | null = parent.parentElement?.parentElement || null;
  
    while (firstParent?.classList.contains('pcoded-hasmenu')) {
      firstParent.classList.add('pcoded-trigger');
      // Explicitly assign null if the chain results in undefined
      firstParent = firstParent.parentElement?.parentElement?.parentElement || null;
    }
  
    while (preParent?.classList.contains('pcoded-submenu')) {
      preParent.parentElement?.classList.add('pcoded-trigger');
      preParent = preParent.parentElement?.parentElement?.parentElement || null;
    }
  }
  
}
