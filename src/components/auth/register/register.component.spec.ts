import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/services/user.service';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let commonService: CommonService;
  let permissionsService: PermissionsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule,MatSnackBarModule],
      declarations: [RegisterComponent],
      providers: [
        UserService,
        CommonService,
        PermissionsService,
        { provide: Router, useClass: Router } // Replace with your Router service
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    commonService = TestBed.inject(CommonService);
    permissionsService = TestBed.inject(PermissionsService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.signUp and navigate on successful registration', fakeAsync(() => {
    const userData = {
      // Add user data as needed
    };

    spyOn(userService, 'signUp').and.returnValue(of({ userData }));
    const navigateSpy = spyOn(router, 'navigate');
    const openCustomSnackbarSpy = spyOn(commonService, 'openCustomSnackbar');

    component.registerForm.patchValue({
      email: 'test@example.com',
      password: 'Password1!',
      username: 'testuser',
      role: 'user'
    });

    component.onSubmit();
    tick();

    expect(userService.signUp).toHaveBeenCalledOnceWith(component.registerForm.value);
    expect(navigateSpy).toHaveBeenCalledWith(['auth']);
    expect(openCustomSnackbarSpy).toHaveBeenCalledOnceWith('Registration success');
  }));

});
