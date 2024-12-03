// Angular imports
import { Component, Input, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Project import
import { NavigationItem } from '../../../layout/admin/navigation/navigation';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'], // Fixed typo: styleUrl -> styleUrls
  providers: [NavigationItem], // Add the service here
})
export class BreadcrumbsComponent implements OnDestroy {
  @Input() type: string = '';

  navigation: any;
  breadcrumbList: Array<any> = [];
  navigationList: any;

  private destroy$ = new Subject<void>(); // For managing subscriptions

  constructor(
    private _router: Router,
    public nav: NavigationItem,
    private titleService: Title
  ) {
    this.navigation = this.nav.get();

    // Subscribe to router events and set breadcrumbs dynamically
    this._router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const activeLink = event.urlAfterRedirects;
        this.breadcrumbList.length = 0;
        this.filterNavigation(activeLink);
      });
  }

  /**
   * Filters navigation data to update the breadcrumb list based on the active route.
   * @param activeLink - The currently active route URL.
   */
  filterNavigation(activeLink: string): void {
    let result: any = [];
    let title = 'Welcome';

    this.navigation.forEach((item: any) => {
      if (item.type === 'item' && item.url === activeLink) {
        result = [
          { url: item.url, title: item.title, breadcrumbs: item.breadcrumbs ?? true, type: item.type }
        ];
        title = item.title;
      } else if (item.type === 'group' && item.children) {
        item.children.forEach((child: any) => {
          if (child.type === 'item' && child.url === activeLink) {
            result = [
              { url: child.url, title: child.title, breadcrumbs: child.breadcrumbs ?? true, type: child.type }
            ];
            title = child.title;
          } else if (child.type === 'collapse' && child.children) {
            child.children.forEach((grandChild: any) => {
              if (grandChild.type === 'item' && grandChild.url === activeLink) {
                result = [
                  { url: child.url, title: child.title, breadcrumbs: child.breadcrumbs ?? true, type: child.type },
                  { url: grandChild.url, title: grandChild.title, breadcrumbs: grandChild.breadcrumbs ?? true, type: grandChild.type }
                ];
                title = grandChild.title;
              }
            });
          }
        });
      }
    });

    this.navigationList = result;
    this.titleService.setTitle(`${title} | Datta Able Angular Template`);
  }

  /**
   * Clean up subscriptions to avoid memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
