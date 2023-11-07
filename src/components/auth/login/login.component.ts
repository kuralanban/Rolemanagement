import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide = true;
  public invalidCredetials:boolean=false;

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService:UserService,
    private notification:CommonService,
    private permissionService:PermissionsService,
    private route:Router) {
    // Initialize the loginForm with form controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/),
        this.passwordPatternValidator]]
    });
  }
// A custom validator to satisfy the password rules
  public passwordPatternValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!/(?=.*[A-Z])/.test(control.value)) {
      return { uppercase: true };
    }
    if (!/(?=.*[a-z])/.test(control.value)) {
      return { lowercase: true };
    }
    if (!/(?=.*[0-9])/.test(control.value)) {
      return { number: true };
    }
    if (!/(?=.*[!@#\$%\^&\*])/.test(control.value)) {
      return { specialCharacter: true };
    }
    return null;
  }
  // Function to handle form submission
  public onSubmit() {
      this.userService.signIn(this.loginForm.value).subscribe({
        next:(data:any)=>{
        this.userService.setTokenValues(data.userData);
        const token = this.userService.getTokenValues();
        if(token.role==='administrator'){
          localStorage.setItem('superadmin','true')
          this.permissionService.isSuperAdmin$=true;
          this.route.navigate(['/home'])
        }
        else{
          this.route.navigate(['/home/user'])
        }
        },
        error:(err)=>{
          this.invalidCredetials=true;
          this.notification.openCustomSnackbar('Invalid credetials !');
        }
      })

  }
  public routeToRegister(){
    this.route.navigate(['auth/signup'])
  }
}
