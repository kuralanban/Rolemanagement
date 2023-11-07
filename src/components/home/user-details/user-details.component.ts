import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import userDetails from 'src/interface/user.interface'
import { PermissionsService } from 'src/services/permissions.service';
import { UserService } from 'src/services/user.service';
import { AssignRoleComponent } from '../assign-role/assign-role.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public userDetails:Array<userDetails>=[
  ]
  public roles1=['engineer','senior engineer','manager']
  public roles: Array<any> = [];

  public currentPage:number=1;
  public selectedRole:string='';
  public totalPages:Array<number>=[10,15,20]
  public itemsPerPage = 5;
  public searchValue:string='empty'
    constructor(private userServie:UserService,
      public dialog: MatDialog,
      private permissionService:PermissionsService){}
  ngOnInit(): void {
    this.getUserDetails();
    this.getAllRoles();

  }
  public getUserDetails(){
    this.userServie.getUserDetails(this.searchValue,this.currentPage,this.itemsPerPage).subscribe({
      next:(data:any)=>{
        this.userDetails=data.userDetails
      }
    })
  }
  public searchUsers(event:any){
    this.searchValue=event.target.value;
    if(this.searchValue!==''){
      this.getUserDetails()
    }
    if(this.searchValue==''){
      this.searchValue='empty'
      this.getUserDetails()
    }

  }
  public assignRole(userdata:object){
    const dialogRef = this.dialog.open(AssignRoleComponent, {
      panelClass: 'center-dialog',
      data:userdata
    });
    dialogRef.afterClosed().subscribe();
  }
  public getAllRoles() {
    this.permissionService.getRoles().subscribe({
      next: (data: any) => {
        this.roles=data.data
      },
      error: error => {}
    });
  }
  public onPageChange(event: any): void {
    this.currentPage =event;
    this.getUserDetails();
  }
  public onchangeDetected(event: any) {
    this.itemsPerPage = event.target.value;
this.getUserDetails();
  }
}
