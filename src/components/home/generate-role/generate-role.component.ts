import { Dialog } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
@Component({
  selector: 'app-generate-role',
  templateUrl: './generate-role.component.html',
  styleUrls: ['./generate-role.component.css']
})
export class GenerateRoleComponent implements OnInit {
  public roleForm!: FormGroup;
  public instruments: Array<any> = [];
  public roleDetails: any = {
    role: '',
    instrumentPermissions: []
  };
  @Output() onSubmitTriggered = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public permissionService: PermissionsService,
    private dialog:Dialog,
    public cdRef: ChangeDetectorRef,
    public commonService:CommonService

  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      roleName: [''],
      instrumentPermissions: new FormGroup({})
    });
    this.getRoleDetails();
  }

  public getRoleDetails() {
    this.permissionService.getInstruments().subscribe({
      next: (data: any) => {
        this.instruments = data.data;
        this.instruments.map(a => {
          const rolePermissionsFormGroup = this.roleForm.get(
            'instrumentPermissions'
          ) as FormGroup;
          rolePermissionsFormGroup.addControl(
            a.instrumentName,
            new FormControl(false)
          );
          this.roleDetails.instrumentPermissions.push({
            instrumentName: a.instrumentName,
            instrument_id: a._id,
            permissionStatus: false
          });
        });
        this.cdRef.detectChanges();

      }
    });
  }
  public togglePermissions(permission: any) {
    const permissionToUpdate = this.roleDetails.instrumentPermissions.find((a:any) => a.instrument_id === permission.instrument_id);
    if (permissionToUpdate) {
      permissionToUpdate.permissionStatus = !permissionToUpdate.permissionStatus;
    }
  }

  public onSubmit() {
    this.roleDetails.role=this.roleForm.value.roleName

    this.permissionService.createRole(this.roleDetails).subscribe({
      next:()=>{
    this.dialog.closeAll();
    this.permissionService.triggerUpdateRoles();
    this.commonService.openCustomSnackbar(`Role Created Successfully !`)

      }
    })
  }
  public cancel(){
    this.dialog.closeAll();
  }
}
// component.roleDetails.role=({ roleName: 'Role 1' });
