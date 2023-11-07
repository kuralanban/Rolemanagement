import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrls: ['./assign-role.component.css']
})
export class AssignRoleComponent {
  public instrumentForm!: FormGroup;
  public selectedRole: string = '';
  public roles: Array<any> = [];
  public roles1=['engineer','senior engineer','manager']

  constructor(
    private fb: FormBuilder,
    public permissionService: PermissionsService,
    private dialog:Dialog,
    private cdRef: ChangeDetectorRef,
    public commonService:CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  ngOnInit(): void {
    this.getAllRoles();
    this.instrumentForm = this.fb.group({
      name: [''],
      email: [''],
      role: [this.data.userRole]
    });
  }



  public onSubmit() {
    this.permissionService.updateUserRole(this.data._id,this.instrumentForm.value.role).subscribe({
      next:()=>{
    this.dialog.closeAll();
    this.commonService.openCustomSnackbar(`Role Assigned Successfully !`)
  }
    })
  }
  public cancel(){
    this.dialog.closeAll();
  }
  public onchangeDetected(event: any) {
    this.selectedRole = event.target.value;


  }
  public getAllRoles() {
    this.permissionService.getRoles().subscribe({
      next: (data: any) => {
        this.roles=data.data
      },
      error: error => {}
    });
  }
}
