import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Correct Router import
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from '../../../services/nav.services';
import { AuthUtilsService } from '../../auth/services/auth-utils.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { UtilityService } from '../../../utility/utility.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TopNavComponent } from '../../../theme/layout/guest/containers/top-nav/top-nav.component';
import { FooterComponent } from '../../../theme/layout/guest/containers/footer/footer.component';
import { LayoutBlogComponent } from '../../../theme/layout/guest/layouts/layout-blog/layout-blog.component';
import { CleanBlogHeaderComponent } from '../../../theme/layout/guest/containers/clean-blog-header/clean-blog-header.component';

@Component({
  selector: 'app-usr-home',
  standalone: true,
  imports: [CommonModule,RouterModule,NgbCollapseModule,FontAwesomeModule,HttpClientModule,LayoutBlogComponent,CleanBlogHeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Corrected typo: `styleUrl` -> `styleUrls`
  providers:[NavigationService,AuthUtilsService,UtilityService,HttpClient]
})
export class HomeComponent {
  faCoffee = faCoffee;
  subscription: Subscription = new Subscription();
  isLoggedIn = false;
  isOnPost = false;
  isMenuCollapsed = true;

  posts$!: Observable<any[]>;
  
  constructor(
    private navigationService: NavigationService,
    private authUtilsService: AuthUtilsService,
    private route: ActivatedRoute,
    private router: Router // Angular Router
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.navigationService.currentComponent$().subscribe((currentComponentName) => {
        this.isOnPost = currentComponentName === 'PostComponent';
      })
    );
    this.subscription.add(
      this.authUtilsService.isLoggedIn$().subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      })
    );

    this.authUtilsService.checkToken();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editPost() {
    //this.router.navigateByUrl(`/edit/${this.route.snapshot.params['post']}`);
  }
}
