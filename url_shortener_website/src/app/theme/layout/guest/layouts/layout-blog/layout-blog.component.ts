import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthUtilsService } from '../../../../../app/auth/services/auth-utils.service';
import { UtilityService } from '../../../../../utility/utility.service';
import { NavigationService } from '../../services';
import { FooterComponent } from '../../containers/footer/footer.component';
import { TopNavComponent } from '../../containers/top-nav/top-nav.component';

@Component({
    selector: 'sb-layout-blog',
    standalone:true,
    providers:[NavigationService,AuthUtilsService,UtilityService,HttpClient],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-blog.component.html',
    styleUrls: ['layout-blog.component.scss'],
    imports: [FooterComponent,TopNavComponent],
})
export class LayoutBlogComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
