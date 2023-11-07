import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InstrumentPermissionsComponent } from './instrument-permissions/instrument-permissions.component';
import { GenerateRoleComponent } from './generate-role/generate-role.component';
import { CreateInstrumentsComponent } from './create-instruments/create-instruments.component';
import { ShowInstrumentsComponent } from './show-instruments/show-instruments.component';
import { UpdateInstrumentComponent } from './update-instrument/update-instrument.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { UserhomePageComponent } from './userhome-page/userhome-page.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HomeComponent,
    UserDetailsComponent,
    InstrumentPermissionsComponent,
    GenerateRoleComponent,
    CreateInstrumentsComponent,
    ShowInstrumentsComponent,
    UpdateInstrumentComponent,
    AssignRoleComponent,
    UserhomePageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
})
export class HomeModule { }
