import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }

  public isNavbarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isNavbar$: Observable<boolean> = this.isNavbarSubject.asObservable();
  public isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  // To toggle the isNavbar$ value to render a slide navbar for mobile screen
  public toggleNavbar(): void {
    this.isNavbarSubject.next(!this.isNavbarSubject.value);
  }
    // TO show a snackbar and notify the user
  public openCustomSnackbar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar'];
    config.duration = 5000;
    config.verticalPosition = 'top';

    this.snackBar.open(message, `close`,config);
  }
}
