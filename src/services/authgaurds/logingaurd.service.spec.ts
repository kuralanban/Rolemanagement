import { TestBed } from '@angular/core/testing';
import { LogingaurdService } from './logingaurd.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PermissionsService } from '../permissions.service';
import { CommonService } from '../common.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LogingaurdService', () => {
  let service: LogingaurdService;
  let router: Router;
  let permissionsService: PermissionsService;
  let commonService: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MatSnackBarModule],
      providers: [
        LogingaurdService,
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

    service = TestBed.inject(LogingaurdService);
    router = TestBed.inject(Router);
    permissionsService = TestBed.inject(PermissionsService);
    commonService = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if loginStatus returns true', () => {
    spyOn(permissionsService, 'loginStatus').and.returnValue(true);

    const result = service.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toBe(true);
  });

  it('should navigate to "auth" and show a notification if loginStatus returns false', () => {
    spyOn(permissionsService, 'loginStatus').and.returnValue(false);
    spyOn(commonService, 'openCustomSnackbar');

    const result = service.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['auth']);
    expect(commonService.openCustomSnackbar).toHaveBeenCalledWith('Kindly Login, To access home !');
  });
});
