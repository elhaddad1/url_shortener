import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CleanHeaderComponent } from '../../../theme/layout/guest/containers/clean-header/clean-header.component';
import { LayoutGuestComponent } from '../../../theme/layout/guest/layouts/layout-guest/layout-guest.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,RouterModule,NgbCollapseModule,FontAwesomeModule,HttpClientModule,LayoutGuestComponent,CleanHeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
