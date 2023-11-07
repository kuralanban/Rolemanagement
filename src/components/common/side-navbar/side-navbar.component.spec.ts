import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavbarComponent } from './side-navbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonService } from 'src/services/common.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { PermissionsService } from 'src/services/permissions.service';

describe('SideNavbarComponent', () => {
  let component: SideNavbarComponent;
  let fixture: ComponentFixture<SideNavbarComponent>;
  let router:Router;
  let commonService:CommonService
  let userService: UserService;
  let permissionService: PermissionsService;
  beforeEach(() => {


    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatSnackBarModule,MatDialogModule,MatSidenavModule,BrowserAnimationsModule, ],
      declarations: [SideNavbarComponent]
    });
    fixture = TestBed.createComponent(SideNavbarComponent);
    component = fixture.componentInstance;
    commonService=TestBed.inject(CommonService);
    userService = TestBed.inject(UserService);
    permissionService = TestBed.inject(PermissionsService);
    router=TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set showNavBar to true when calling showNaveBar', () => {
    component.showNaveBar();
    expect(component.showNavBar).toBeTruthy();
  });
  it('should navigate to home',()=>{
    spyOn(router,'navigateByUrl')
    component.routeToHome();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home')
  })
  it('should navigate to /auth',()=>{
    spyOn(router,'navigateByUrl')
    component.routeToSignIn();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth')
  })
  it('should navigate to home/user',()=>{
    spyOn(router,'navigateByUrl')
    component.routeToUserHome();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home/user')
  })
  it('should navigate to home/instruments',()=>{
    spyOn(router,'navigateByUrl')
    component.routeToInstrument();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home/instruments')
  })

});
