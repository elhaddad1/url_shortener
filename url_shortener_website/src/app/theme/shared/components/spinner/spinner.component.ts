import { Component, Input, OnDestroy, Inject, ViewEncapsulation, PLATFORM_ID } from '@angular/core';
import { Spinkit } from './spinkits';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss', './spinkit-css/sk-line-material.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;
  public Spinkit = Spinkit;

  @Input() public backgroundColor = '#1dc4e9';
  @Input() public spinner = Spinkit.skLine;

  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.router.events.subscribe(
        (event) => {
          if (event instanceof NavigationStart) {
            this.isSpinnerVisible = true;
          } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
            this.isSpinnerVisible = false;
          }
        },
        () => {
          this.isSpinnerVisible = false;
        }
      );
    } else {
      // Set spinner to false for SSR
      this.isSpinnerVisible = false;
    }
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
  }
}
