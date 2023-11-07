import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonService } from 'src/services/common.service';
import { PermissionsService } from 'src/services/permissions.service';
import { of } from 'rxjs';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let commonService: CommonService;
  let permissionsService: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule, MatDialogModule, NgxPaginationModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [HomeComponent, UserDetailsComponent],
      providers: [CommonService, PermissionsService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(CommonService);
    permissionsService = TestBed.inject(PermissionsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllRoles on ngOnInit', () => {
    const getRolesSpy = spyOn(permissionsService, 'getRoles').and.returnValue(of({ data: [] }));
    component.ngOnInit();

    expect(getRolesSpy).toHaveBeenCalled();
    expect(component.roles).toEqual([]);
  });

  it('should trigger updates and call getAllRoles when updateRoles$ emits', fakeAsync(() => {
    const getRolesSpy = spyOn(permissionsService, 'getRoles').and.returnValue(of({ data: [] }));
    component.ngOnInit();

    // Assuming your PermissionsService uses a Subject for updateRoles$
    permissionsService.updateRolesState.next(undefined);
    tick();

    expect(getRolesSpy).toHaveBeenCalledTimes(4); // The initial call and the one from the update.
}));


  it('should get role assigned to count on ngOnInit', () => {
    const roleAssignedToCountData = [{ role: 'Role1', count: 5 }, { role: 'Role2', count: 3 }];
    spyOn(permissionsService, 'getRoles').and.returnValue(of({ data: roleAssignedToCountData }));

    component.ngOnInit();

    expect(component.roleAssignedToCount).toEqual(roleAssignedToCountData);
  });

});
