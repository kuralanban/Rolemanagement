import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonRoutingModule } from './common-routing.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SideNavbarComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    CommonRoutingModule,
    MatExpansionModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports:[
SideNavbarComponent
  ]
})
export class myCommonModule { }
