import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutGuestComponent } from '../../../theme/layout/guest/layouts/layout-guest/layout-guest.component';
import { CleanHeaderComponent } from '../../../theme/layout/guest/containers/clean-header/clean-header.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule,RouterModule,NgbCollapseModule,FontAwesomeModule,HttpClientModule,LayoutGuestComponent,CleanHeaderComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  selectPlan(plan: string): void {
    alert(`You selected the ${plan} plan!`);
    // Logic to handle subscription, e.g., redirect to payment gateway.
  }
}
