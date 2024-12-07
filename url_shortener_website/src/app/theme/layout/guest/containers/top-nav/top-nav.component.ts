import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthUtilsService } from '../../../../../app/auth/services/auth-utils.service';
import { NavigationService } from '../../services';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../../../app/auth/components/login/login.component';
import { RegistrationComponent } from '../../../../../app/auth/components/registration/registration.component';

@Component({
    selector: 'sb-top-nav',
    standalone: true,
    imports: [
        CommonModule,
        NgbCollapseModule,
        NgbNavModule,
        FontAwesomeModule,
        RouterModule,
        MatDialogModule,
    ],
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
    providers: [NavigationService, AuthUtilsService],
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
        private router: Router,
        private dialog: MatDialog // Add MatDialog service
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
        this.router.navigateByUrl(`/edit/${this.route.snapshot.params['post']}`);
    }

    // Open Sign In Dialog
    openSignInDialog(): void {
        this.dialog.closeAll(); // Close all existing dialogs
        this.dialog.open(LoginComponent, {
            width: '400px',
            data: {
                openSignUpDialog: () => this.openSignUpDialog(),
            },
        });
    }

    // Open Sign Up Dialog
    openSignUpDialog(): void {
        this.dialog.closeAll(); // Close all existing dialogs
        this.dialog.open(RegistrationComponent, {
            width: '400px',
            data: {
                openSignInDialog: () => this.openSignInDialog(),
            },
        });
    }
}
