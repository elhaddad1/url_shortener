import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../../../utility/config.service';
import { AuthUtilsService } from '../../services/auth-utils.service';
import { UtilityService } from '../../../../utility/utility.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, ConfigService, AuthUtilsService, UtilityService]
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private dialog: MatDialog,private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { openSignUpDialog: () => void }) { }

  onSubmit() {
    this.authService.login$(this.credentials);
  }


  // Switch to the Register dialog
  openRegister() {
    this.dialogRef.close(); // Close current dialog
    this.data.openSignUpDialog(); // Call the parent’s `openSignUpDialog` method
  }

}
