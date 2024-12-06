import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthUtilsService } from '../../../../../app/auth/services/auth-utils.service';
import { NavigationService } from '../../services';
import { UtilityService } from '../../../../../utility/utility.service';

@Component({
    selector: 'sb-top-nav',
    standalone: true,
    imports: [CommonModule,NgbCollapseModule,NgbNavModule,FontAwesomeModule,RouterModule,HttpClientModule],
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
    providers:[NavigationService,AuthUtilsService,UtilityService,HttpClient]
})
export class TopNavComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    isLoggedIn = false;
    isOnPost = false;
    isMenuCollapsed = true;

    constructor(
        private navigationService: NavigationService,
        private authUtilsService: AuthUtilsService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.subscription.add(
            this.navigationService.currentComponent$().subscribe(currentComponentName => {
                this.isOnPost = currentComponentName === 'PostComponent';
            })
        );
        this.subscription.add(
            this.authUtilsService.isLoggedIn$().subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
            })
        );

        this.authUtilsService.checkToken();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    editPost() {
        this.router.navigateByUrl(`/edit/${this.route.snapshot.params['post']}`);
    }
}
