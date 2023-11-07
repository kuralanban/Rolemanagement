import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let router: Router;
  let commonService: CommonService;
  let permissionsService: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [LoginComponent],
      providers: [FormBuilder],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    commonService = TestBed.inject(CommonService);
    permissionsService = TestBed.inject(PermissionsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loginForm with required form controls', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
  });

  it('should set hide to true by default', () => {
    expect(component.hide).toBeTruthy();
  });

  it('should navigate to /auth/signup when routeToRegister is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.routeToRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['auth/signup']);
  });
});
