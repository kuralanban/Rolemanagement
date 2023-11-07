// import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';
// import { AssignRoleComponent } from './assign-role.component';
// import { MatDialogModule, MatDialog } from '@angular/material/dialog';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
// import { of } from 'rxjs';
// import { PermissionsService } from 'src/services/permissions.service';
// import { CommonService } from 'src/services/common.service';

// describe('AssignRoleComponent', () => {
//   let component: AssignRoleComponent;
//   let fixture: ComponentFixture<AssignRoleComponent>;
//   let dialog: MatDialog;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, ReactiveFormsModule],
//       declarations: [AssignRoleComponent],
//       providers: [MatDialog, FormBuilder,PermissionsService,CommonService],
//     });

//     // Create the component
//     fixture = TestBed.createComponent(AssignRoleComponent);
//     component = fixture.componentInstance;

//     // Get the MatDialog instance
//     dialog = TestBed.inject(MatDialog);

//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize instrumentForm and selectedRole', () => {
//     component.ngOnInit();
//     expect(component.instrumentForm).toBeDefined();
//     expect(component.selectedRole).toEqual('');
//   });

//   it('should call onSubmit method', fakeAsync(() => {
//     // Mock the form data
//     const formData = { name: 'John Doe', email: 'john@example.com', role: 'engineer' };

//     // Set the form values
//     component.instrumentForm.setValue(formData);

//     const updateUserRoleSpy = spyOn(component.permissionService, 'updateUserRole').and.returnValue(of({}));
//     const closeAllSpy = spyOn(dialog, 'closeAll');
//     const openCustomSnackbarSpy = spyOn(component.commonService, 'openCustomSnackbar');

//     component.onSubmit();
//     tick(); // Wait for the Observable to resolve

//     expect(updateUserRoleSpy).toHaveBeenCalledWith(component.data._id, formData.role);
//     expect(closeAllSpy).toHaveBeenCalled();
//     expect(openCustomSnackbarSpy).toHaveBeenCalledWith('Role Assigned Successfully !');
//   }));

//   it('should call cancel method', fakeAsync(() => {
//     const closeAllSpy = spyOn(dialog, 'closeAll');

//     component.cancel();
//     tick(); // Wait for the asynchronous code in cancel() to complete

//     expect(closeAllSpy).toHaveBeenCalled();
//   }));

//   it('should set selectedRole on onchangeDetected', () => {
//     const roleValue = 'manager';
//     const event = { target: { value: roleValue } };

//     component.onchangeDetected(event);

//     expect(component.selectedRole).toEqual(roleValue);
//   });

//   it('should call getAllRoles method', fakeAsync(() => {
//     const getRolesSpy = spyOn(component.permissionService, 'getRoles').and.returnValue(of({ data: [] }));

//     component.getAllRoles();
//     tick(); // Wait for the Observable to resolve

//     expect(getRolesSpy).toHaveBeenCalled();
//     expect(component.roles).toEqual([]);
//   }));
// });
