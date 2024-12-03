import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'feather icon-home',
    children: [
      {
        id: 'dashboard-home',
        title: 'Home',
        type: 'item',
        url: '/dashboard/home',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'dashboard-analytics',
        title: 'Analytics',
        type: 'item',
        url: '/dashboard/analytics',
        icon: 'feather icon-pie-chart',
        classes: 'nav-item',
      },
      {
        id: 'dashboard-create-link',
        title: 'Create Link',
        type: 'item',
        url: '/dashboard/create-link',
        icon: 'feather icon-link',
        classes: 'nav-item',
      },
      {
        id: 'dashboard-link-list',
        title: 'Link List',
        type: 'item',
        url: '/dashboard/link-list',
        icon: 'feather icon-list',
        classes: 'nav-item',
      },
      {
        id: 'dashboard-container',
        title: 'Dashboard Container',
        type: 'item',
        url: '/dashboard/dashboard-container',
        icon: 'feather icon-grid',
        classes: 'nav-item',
      },
    ],
  },
];


@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
