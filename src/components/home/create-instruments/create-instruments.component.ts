import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';

@Component({
  selector: 'app-create-instruments',
  templateUrl: './create-instruments.component.html',
  styleUrls: ['./create-instruments.component.css']
})
export class CreateInstrumentsComponent {
  public InstrumentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public permissionService: PermissionsService,
    private dialog:Dialog,
    public commonService:CommonService

  ) {}

  ngOnInit(): void {
    this.InstrumentForm = this.fb.group({
      InstrumentName: ['',Validators.required],
      ComputerHostName: ['',Validators.required],
      ApplicationName:[''],
      Location:['']
    });
  }



  public onSubmit() {
    this.permissionService.createInstrument(this.InstrumentForm.value).subscribe({
      next:()=>{
    this.dialog.closeAll();
    this.permissionService.triggerInstrumentRoles();
    this.commonService.openCustomSnackbar(`Role Created Successfully !`)
  }
    })
  }
  public cancel(){
    this.dialog.closeAll();
  }
}
