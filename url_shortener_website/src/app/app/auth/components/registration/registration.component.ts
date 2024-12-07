import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../../../utility/config.service';
import { UtilityService } from '../../../../utility/utility.service';
import { AuthUtilsService } from '../../services/auth-utils.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers:[AuthService,ConfigService,AuthUtilsService,UtilityService]
})
export class RegistrationComponent {
  data = { name: '', email: '', password: '' };

  constructor(private authService: AuthService,private dialog: MatDialog,private dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData: { openSignInDialog: () => void }) {}
  
  onSubmit() {
    this.authService.register(this.data);
  }
    // Switch to the Login dialog
    openLogin() {
      this.dialogRef.close(); // Close current dialog
      this.parentData.openSignInDialog(); // Call parent method
    }
  
  
}
