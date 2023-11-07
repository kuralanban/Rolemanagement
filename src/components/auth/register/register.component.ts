import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'; // Import FormBuilder and Validators
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public hide = true;
  public invalidCredetials: boolean = false;
  public roles: Array<any> = [];

  // Create a FormGroup to manage form controls
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: CommonService,
    private permissionService: PermissionsService,
    private route: Router
  ) {
    // Initialize the registerForm with form controls and validators
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
          ),
          this.passwordPatternValidator
        ]
      ],
      username: [''],
      role: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.getAllRoles();
  }
  public getAllRoles() {
    this.permissionService.getRoles().subscribe({
      next: (data: any) => {
       data.data.map((a:any)=>{
        this.roles.push(a.role)

        });
      },
      error: error => {}
    });
  }

  public passwordPatternValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
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
    if(this.registerForm.valid){
      this.userService.signUp(this.registerForm.value).subscribe({
        next:()=>{
          this.notification.openCustomSnackbar('Registration success')
          this.route.navigate(['auth'])
        },
        error:()=>{}
      })
    }
    else{
      this.notification.openCustomSnackbar('Please enter valid details')
    }
  }
  public routeToSignin(){
    this.route.navigate(['auth'])
  }
}
