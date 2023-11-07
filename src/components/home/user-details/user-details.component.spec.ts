import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { of, throwError } from 'rxjs';
import { PermissionsService } from 'src/services/permissions.service';
import { UserService } from 'src/services/user.service';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;
  let permissionsService: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, NgxPaginationModule],
      declarations: [UserDetailsComponent],
      providers: [UserService, PermissionsService],
    });
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    permissionsService = TestBed.inject(PermissionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserDetails on ngOnInit', () => {
    const getUserDetailsSpy = spyOn(component, 'getUserDetails');
    component.ngOnInit();
    expect(getUserDetailsSpy).toHaveBeenCalled();
  });

  it('should get user details', () => {
    const mockUserDetails: any[] = [{ id: 1, name: 'User 1' }];
    spyOn(userService, 'getUserDetails').and.returnValue(of({ userDetails: mockUserDetails }));
    component.getUserDetails();
    expect(component.userDetails).toEqual(mockUserDetails);
  });



  it('should search for users', () => {
    const searchValue = 'Test User';
    const getUserDetailsSpy = spyOn(component, 'getUserDetails');
    component.searchUsers({ target: { value: searchValue } });
    expect(component.searchValue).toBe(searchValue);
    expect(getUserDetailsSpy).toHaveBeenCalled();
  });

  it('should clear search and get user details', () => {
    const getUserDetailsSpy = spyOn(component, 'getUserDetails');
    component.searchValue = 'Test User';
    component.searchUsers({ target: { value: '' } });
    expect(component.searchValue).toBe('empty');
    expect(getUserDetailsSpy).toHaveBeenCalled();
  });



  it('should get all roles', () => {
    const mockRoles = [{ id: 1, name: 'Engineer' }];
    spyOn(permissionsService, 'getRoles').and.returnValue(of({ data: mockRoles }));
    component.getAllRoles();
    expect(component.roles).toEqual(mockRoles);
  });

  it('should handle errors when getting roles', () => {
    spyOn(permissionsService, 'getRoles').and.returnValue(throwError('Error'));
    component.getAllRoles();

  });

});
