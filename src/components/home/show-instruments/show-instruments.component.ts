import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { UpdateInstrumentComponent } from '../update-instrument/update-instrument.component';
import { skip } from 'rxjs/internal/operators/skip';

@Component({
  selector: 'app-show-instruments',
  templateUrl: './show-instruments.component.html',
  styleUrls: ['./show-instruments.component.css']
})
export class ShowInstrumentsComponent implements OnInit {

public instruments:Array<any>=[]
public isMobile$ = this.commonService.isMobile$;

constructor(public commonService: CommonService,
  public permissionServie:PermissionsService,
  private matDialoag:MatDialog){}

ngOnInit(): void {
this.getInstruments();
this.triggerUpdates();

}
public getInstruments(){
  this.permissionServie.getInstruments().subscribe({
    next:(data:any)=>{
      this.instruments=data.data
    },
    error:()=>{}
  })
}
public showInstruction(instrument:object){
  const dialogRef = this.matDialoag.open(UpdateInstrumentComponent, {
    panelClass: 'center-dialog',
    data:instrument
  });
  dialogRef.afterClosed().subscribe();
}
public toggleNavbar(): void {
  this.commonService.isNavbarSubject.next(true);
}
public triggerUpdates(){
  this.permissionServie.updateInstrument$.subscribe(({
    next:()=>{
      this.getInstruments()
    }
  }));
}
}
