import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutGuestComponent } from '../../../theme/layout/guest/layouts/layout-guest/layout-guest.component';
import { FormsModule } from '@angular/forms';
import { CleanHeaderComponent } from '../../../theme/layout/guest/containers/clean-header/clean-header.component';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,NgbCollapseModule,FontAwesomeModule,HttpClientModule,LayoutGuestComponent,CleanHeaderComponent],
  templateUrl: './url-shortener.component.html',
  styleUrl: './url-shortener.component.scss'
})
export class UrlShortenerComponent {
  longUrl: string = '';
  shortUrl: string | null = null;
  shortenUrl(): void {
    if (this.longUrl) {
      // Basic URL shortening logic (replace with API integration)
      this.shortUrl = `https://short.ly/${btoa(this.longUrl).slice(0, 8)}`;
    } else {
      alert('Please enter a valid URL!');
    }
  }

}
