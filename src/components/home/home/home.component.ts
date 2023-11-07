import { Component, OnInit } from '@angular/core';
import roleDetails from 'src/interface/role.interface';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { InstrumentPermissionsComponent } from '../instrument-permissions/instrument-permissions.component';
import { MatDialog } from '@angular/material/dialog';
import { GenerateRoleComponent } from '../generate-role/generate-role.component';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isMobile$ = this.commonService.isMobile$;
  public roles: Array<roleDetails> = [];
  public roleAssignedToCount:Array<any>=[];

  constructor(
    private commonService: CommonService,
    private permissionService: PermissionsService,
    public dialog: MatDialog,
    private route:Router
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.triggerUpdates();
    this.toGetRoleAssignedToCount();
  }
  public toggleNavbar(): void {
    this.commonService.isNavbarSubject.next(true);
  }

  public getAllRoles() {
    this.permissionService.getRoles().subscribe({
      next: (data: any) => {
        this.roles=data.data

      },
      error: error => {}
    });
  }
  public editRole(role: object) {
    const dialogRef = this.dialog.open(InstrumentPermissionsComponent, {
      panelClass: 'center-dialog',
      data:role
    });
    dialogRef.afterClosed().subscribe();
  }
  public createRole() {
    const dialogRef = this.dialog.open(GenerateRoleComponent, {
      panelClass: 'center-dialog',
    });
    dialogRef.afterClosed().subscribe();
  }
public triggerUpdates(){
  this.permissionService.updateRoles$.pipe(skip(1)) .subscribe(({
    next:()=>{
      this.getAllRoles()
    }
  }));
}
public toGetRoleAssignedToCount(){
this.permissionService.getRoles().subscribe({
  next:(data:any)=>{
    this.roleAssignedToCount=data.data

  },
  error:()=>{}
})
}
}
