import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UpdateInstrumentComponent } from './update-instrument.component';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateInstrumentComponent', () => {
  let component: UpdateInstrumentComponent;
  let fixture: ComponentFixture<UpdateInstrumentComponent>;
  let permissionService: PermissionsService;
  let commonService: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule, FormsModule, ReactiveFormsModule],
      declarations: [UpdateInstrumentComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(UpdateInstrumentComponent);
    component = fixture.componentInstance;
    permissionService = TestBed.inject(PermissionsService);
    commonService = TestBed.inject(CommonService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the InstrumentForm', () => {
    expect(component.InstrumentForm).toBeDefined();
  });



  it('should call deleteRole() and set deleteWarn to true', () => {
    component.deleteWarn = false;

    component.deleteRole();

    expect(component.deleteWarn).toBe(true);
  });

  it('should call cancel() and close the dialog', () => {
    const closeAllSpy = spyOn(component.dialog, 'closeAll');

    component.cancel();

    expect(closeAllSpy).toHaveBeenCalled();
  });
});
