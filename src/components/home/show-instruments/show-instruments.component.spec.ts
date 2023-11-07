import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowInstrumentsComponent } from './show-instruments.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { UpdateInstrumentComponent } from '../update-instrument/update-instrument.component';
import { HttpClientModule } from '@angular/common/http';

describe('ShowInstrumentsComponent', () => {
  let component: ShowInstrumentsComponent;
  let fixture: ComponentFixture<ShowInstrumentsComponent>;
  let mockMatDialog: MatDialog;
  let mockMatDialogRef: MatDialogRef<any>;

  beforeEach(() => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule,HttpClientModule],
      declarations: [ShowInstrumentsComponent],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
      ],
    });
    fixture = TestBed.createComponent(ShowInstrumentsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getInstruments method on ngOnInit', () => {
    const getInstrumentsSpy = spyOn(component, 'getInstruments');
    component.ngOnInit();
    expect(getInstrumentsSpy).toHaveBeenCalled();
  });

  it('getInstruments should populate instruments array on success', () => {
    const mockData = { data: [{ id: 1, name: 'Instrument 1' }] };
    spyOn(component.permissionServie, 'getInstruments').and.returnValue(of(mockData));
    component.getInstruments();
    expect(component.instruments).toEqual(mockData.data);
  });

  // it('showInstruction should open MatDialog with the expected configuration', () => {
  //   const instrument = { id: 1, name: 'Instrument 1' };
  //   spyOn(mockMatDialog, 'open').and.returnValue(mockMatDialogRef);
  //   component.showInstruction(instrument);
  //   expect(mockMatDialog.open).toHaveBeenCalledWith(UpdateInstrumentComponent, {
  //     panelClass: 'center-dialog',
  //     data: instrument,
  //   });
  // });

  it('toggleNavbar should set isNavbarSubject to true', () => {
    spyOn(component.commonService.isNavbarSubject, 'next');
    component.toggleNavbar();
    expect(component.commonService.isNavbarSubject.next).toHaveBeenCalledWith(true);
  });
});
