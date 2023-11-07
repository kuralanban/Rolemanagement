import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateInstrumentsComponent } from 'src/components/home/create-instruments/create-instruments.component';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  public showNavBar = false;
  public isMobile: boolean = false;
  public isNavbar$ = this.commonService.isNavbar$;
  public error:any;
  constructor(
    public commonService: CommonService,
    private matDialoag: MatDialog,
    private route: Router,
    public permissionService: PermissionsService,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.permissionService.adminStatus();
    this.checkScreenSize();
    this.navbarStatus();
  }
  public checkScreenSize() {
    this.isMobile = window.innerWidth < 1054;
    if (this.isMobile) {
      this.commonService.isMobileSubject.next(true);
    } else {
      this.commonService.isMobileSubject.next(false);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  public hideNavbarView() {
    this.commonService.isNavbarSubject.next(false);
    this.commonService.isNavbar$.subscribe(
      (data: any) => (this.showNavBar = data)
    );
  }
  public showNaveBar() {
    this.showNavBar = true;
  }
  public navbarStatus() {
    this.commonService.isNavbar$.subscribe(
      (data: any) => (this.showNavBar = data)
    );
  }
  public createInstrument() {
    const dialogRef = this.matDialoag.open(CreateInstrumentsComponent, {
      panelClass: 'center-dialog'
    });
    dialogRef.afterClosed().subscribe();
  }
  public routeToInstrument() {
    this.route.navigateByUrl('/home/instruments');
  }
  public routeToHome() {
    this.route.navigateByUrl('/home');
  }
  public routeToUserHome() {
    this.route.navigateByUrl('/home/user');
  }
  public routeToSignIn() {
    this.route.navigateByUrl('/auth');
  }
  public logout(){
    const user=this.userService.getTokenValues();
    this.userService.logout({email:user.email}).subscribe({
      next:()=>{
        this.commonService.openCustomSnackbar('Logout Succeed')
        localStorage.clear();
        this.permissionService.adminStatus();
      this.route.navigate(['auth']);
    }
  })
  }
}
