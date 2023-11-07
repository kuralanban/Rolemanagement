import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GenerateRoleComponent } from './generate-role.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('GenerateRoleComponent', () => {
  let component: GenerateRoleComponent;
  let fixture: ComponentFixture<GenerateRoleComponent>;
  let dialog: MatDialog;

  beforeEach(() => {
    const mockDialog = {
      closeAll: jasmine.createSpy('closeAll')
    };
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, FormsModule, ReactiveFormsModule],
      declarations: [GenerateRoleComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        FormBuilder
      ],
    });

    fixture = TestBed.createComponent(GenerateRoleComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize roleForm', () => {
    component.ngOnInit();
    expect(component.roleForm).toBeDefined();
  });

  it('should call getRoleDetails method'), fakeAsync(() => {
    const getInstrumentsSpy = spyOn(component.permissionService, 'getInstruments').and.returnValue(of({ data: [] }));
    const detectChangesSpy = spyOn(component.cdRef, 'detectChanges');

    component.getRoleDetails();
    tick();

    expect(getInstrumentsSpy).toHaveBeenCalled();
    expect(detectChangesSpy).toHaveBeenCalled();
    expect(component.instruments.length).toBe(0);
  });

  it('should call togglePermissions method', () => {
    component.roleDetails.instrumentPermissions = [{ instrument_id: 1, permissionStatus: true }];
    component.togglePermissions({ instrument_id: 1 });

    expect(component.roleDetails.instrumentPermissions[0].permissionStatus).toBe(false);
  });


});
