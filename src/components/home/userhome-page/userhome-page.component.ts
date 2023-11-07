import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-userhome-page',
  templateUrl: './userhome-page.component.html',
  styleUrls: ['./userhome-page.component.css']
})
export class UserhomePageComponent implements OnInit {
  public rolePermissions: any = [];
  public isMobile$ = this.commonService.isMobile$;

  constructor(
    private permissionSerice: PermissionsService,
    private commonService: CommonService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.getRolePermissions();
  }
  public getRolePermissions() {
    const token = this.userService.getTokenValues();

    this.permissionSerice
      .getCurrentRoleDetail(token.role)
      .subscribe({
        next: (data: any) => {
          this.rolePermissions=data.data.instrumentPermissions

        },
        error: err => {}
      });
  }
  public toggleNavbar(): void {
    this.commonService.isNavbarSubject.next(true);
  }
}
