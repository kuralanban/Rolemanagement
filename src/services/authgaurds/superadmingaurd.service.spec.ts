import { TestBed } from '@angular/core/testing';
import { SuperadmingaurdService } from './superadmingaurd.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PermissionsService } from '../permissions.service';
import { CommonService } from '../common.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SuperadmingaurdService', () => {
  let service: SuperadmingaurdService;
  let router: Router;
  let permissionsService: PermissionsService;
  let commonService: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatSnackBarModule],
      providers: [
        SuperadmingaurdService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        PermissionsService,
        CommonService,
      ],
    });

    service = TestBed.inject(SuperadmingaurdService);
    router = TestBed.inject(Router);
    permissionsService = TestBed.inject(PermissionsService);
    commonService = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if adminStatus returns true', () => {
    spyOn(permissionsService, 'adminStatus').and.returnValue(true);

    const result = service.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toBe(true);
  });

  it('should navigate to "/home/user" and show a notification if adminStatus returns false', () => {
    spyOn(permissionsService, 'adminStatus').and.returnValue(false);
    spyOn(commonService, 'openCustomSnackbar');

    const result = service.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['/home/user']);
    expect(commonService.openCustomSnackbar).toHaveBeenCalledWith('Access Denied');
  });
});
