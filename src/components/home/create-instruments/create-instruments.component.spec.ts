import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CreateInstrumentsComponent } from './create-instruments.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('CreateInstrumentsComponent', () => {
  let component: CreateInstrumentsComponent;
  let fixture: ComponentFixture<CreateInstrumentsComponent>;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatSnackBarModule, FormsModule, ReactiveFormsModule],
      declarations: [CreateInstrumentsComponent],
      providers: [MatDialog, FormBuilder],
    });

    // Create the component
    fixture = TestBed.createComponent(CreateInstrumentsComponent);
    component = fixture.componentInstance;

    // Get the MatDialog instance
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize InstrumentForm', () => {
    component.ngOnInit();
    expect(component.InstrumentForm).toBeDefined();
  });

  it('should call onSubmit method', fakeAsync(() => {
    const createInstrumentSpy = spyOn(component.permissionService, 'createInstrument').and.returnValue(of({}));
    const closeAllSpy = spyOn(dialog, 'closeAll');
    const triggerInstrumentRolesSpy = spyOn(component.permissionService, 'triggerInstrumentRoles');
    const openCustomSnackbarSpy = spyOn(component.commonService, 'openCustomSnackbar');

    component.onSubmit();
    tick(); // Wait for the Observable to resolve

    expect(createInstrumentSpy).toHaveBeenCalled();
    // expect(closeAllSpy).toHaveBeenCalled();
    expect(triggerInstrumentRolesSpy).toHaveBeenCalled();
    expect(openCustomSnackbarSpy).toHaveBeenCalledWith('Role Created Successfully !');
  }));


});
