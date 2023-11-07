import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';

@Component({
  selector: 'app-update-instrument',
  templateUrl: './update-instrument.component.html',
  styleUrls: ['./update-instrument.component.css']
})
export class UpdateInstrumentComponent {
  public InstrumentForm!: FormGroup;
  public deleteWarn:boolean=false;

  constructor(
    private fb: FormBuilder,
    public permissionService: PermissionsService,
    public dialog:Dialog,
    public commonService:CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {}

  ngOnInit(): void {
    this.InstrumentForm = this.fb.group({
      InstrumentName: [this.data.instrumentName,Validators.required],
      ComputerHostName: [this.data.ComputerHostName,Validators.required],
      ApplicationName:[this.data.ApplicationName],
      Location:[this.data.Location||'']
    });
  }



  public onSubmit() {
    this.permissionService.updateInstrument(this.InstrumentForm.value,this.data._id).subscribe({
      next:()=>{
    this.permissionService.triggerInstrumentRoles();
    this.dialog.closeAll();
    this.commonService.openCustomSnackbar(`Role updated Successfully !`)
      }
    })
  }
  public deleteRole() {

    if(this.deleteWarn===true){
      this.permissionService.deleteInstrument(this.data._id).subscribe({
        next: () => {
          this.dialog.closeAll();
          this.permissionService.triggerInstrumentRoles();
          this.commonService.openCustomSnackbar(`Role Deleted Successfully !`)
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
}
