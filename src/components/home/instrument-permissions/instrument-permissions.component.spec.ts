import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InstrumentPermissionsComponent } from './instrument-permissions.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { PermissionsService } from 'src/services/permissions.service';
import { CommonService } from 'src/services/common.service';
import { Dialog } from '@angular/cdk/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MatDialogRefMock {
  close(): void {
    // Do nothing for now
  }
}

describe('InstrumentPermissionsComponent', () => {
  let component: InstrumentPermissionsComponent;
  let fixture: ComponentFixture<InstrumentPermissionsComponent>;
  let mockCommonService: CommonService;
  let mockPermissionService: PermissionsService;
  let mockDialog: Dialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [InstrumentPermissionsComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    mockCommonService = TestBed.inject(CommonService);
    mockPermissionService = TestBed.inject(PermissionsService);
    mockDialog = TestBed.inject(Dialog);

    fixture = TestBed.createComponent(InstrumentPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.roleForm).toBeDefined();
    expect(component.roleForm.get('roleName')).toBeDefined();
    expect(component.roleForm.get('instrumentPermissions')).toBeDefined();
  });

  it('should get role details', () => {
    const mockData = {
      role: 'Test Role',
      instrumentPermissions: [{ instrument_id: 1, permissionStatus: true }]
    };

    spyOn(mockPermissionService, 'getCurrentRoleDetail').and.returnValue(of({ data: mockData }));

    component.getRoleDetails();

    expect(component.roleDetails.role).toBe(mockData.role);
    expect(component.roleDetails.instrumentPermissions).toEqual(mockData.instrumentPermissions);
  });

  it('should toggle permissions', () => {
    component.roleDetails.instrumentPermissions = [{ instrument_id: 1, permissionStatus: true }];

    component.togglePermissions({ instrument_id: 1 });

    expect(component.roleDetails.instrumentPermissions[0].permissionStatus).toBe(false);
  });


  it('should delete role with confirmation', fakeAsync(() => {
    component.deleteWarn = true;

    spyOn(mockPermissionService, 'deleteRole').and.returnValue(of({}));
    const openCustomSnackbarSpy = spyOn(mockCommonService, 'openCustomSnackbar');

    component.data = { _id: '123' };
    component.deleteRole();
    tick();

    expect(mockPermissionService.deleteRole).toHaveBeenCalledWith('123');
    expect(openCustomSnackbarSpy).toHaveBeenCalledWith('Role Deleted Successfully !');
  }));


  it('should toggle delete warning', () => {
    component.toggledelete();

    expect(component.deleteWarn).toBe(false);
  });

  it('should close the dialog on cancel', () => {
    const closeAllSpy = spyOn(mockDialog, 'closeAll');

    component.cancel();

    expect(closeAllSpy).toHaveBeenCalled();
  });
});
