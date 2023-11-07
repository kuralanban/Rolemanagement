import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionsService } from 'src/services/permissions.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import roleForm from 'src/interface/role.interface';
import { Dialog } from '@angular/cdk/dialog';
import { CommonService } from 'src/services/common.service';
@Component({
  selector: 'app-instrument-permissions',
  templateUrl: './instrument-permissions.component.html',
  styleUrls: ['./instrument-permissions.component.css']
})
export class InstrumentPermissionsComponent implements OnInit {
  public roleForm!: FormGroup;
  public instruments: Array<any> = [];
  public deleteWarn:boolean=false
  // public dataObj=this.data.data[0]
  public roleDetails: any = {
    role: '',
    instrumentPermissions: []
  };

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionService: PermissionsService,
    private dialog:Dialog,
    private cdRef: ChangeDetectorRef,

    private commonService:CommonService
  ) {

  }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      roleName: [''],
      instrumentPermissions: new FormGroup({})
    });
    this.getRoleDetails();
  }

  public getRoleDetails() {
    this.permissionService.getCurrentRoleDetail(this.data.role).subscribe({
      next: (data: any) => {
        this.roleDetails.role = data.data.role;
        this.roleDetails.instrumentPermissions =
          data.data.instrumentPermissions;
        this.cdRef.detectChanges();

      }
    });
  }

  public togglePermissions(permission: any) {
    const permissionToUpdate = this.roleDetails.instrumentPermissions.find(
      (a: any) => a.instrument_id === permission.instrument_id
    );
    if (permissionToUpdate) {
      permissionToUpdate.permissionStatus = !permissionToUpdate.permissionStatus;
    }
  }

  public onSubmit() {
    this.roleDetails.role = this.roleForm.value.roleName;

    this.permissionService
      .updateRolePermissions(this.roleDetails, this.data._id)
      .subscribe({next:()=>{
        this.dialog.closeAll();
        this.commonService.openCustomSnackbar(`Role Updated Successfully !`)
        this.permissionService.triggerUpdateRoles();

      }});
  }
  public deleteRole() {

    if(this.deleteWarn===true){

      this.permissionService.deleteRole(this.data._id).subscribe({
        next: () => {
          this.dialog.closeAll();
          this.commonService.openCustomSnackbar(`Role Deleted Successfully !`)
          this.permissionService.triggerUpdateRoles();
        },
        error: () => {}
      });
    }
    else{
      this.deleteWarn=true;
    }
  }
  public cancel(){
    this.dialog.closeAll();
  }
  public toggledelete(){
    this.deleteWarn=false;
  }
}
