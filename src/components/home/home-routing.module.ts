import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowInstrumentsComponent } from './show-instruments/show-instruments.component';
import { UserhomePageComponent } from './userhome-page/userhome-page.component';
import { SuperadmingaurdService } from 'src/services/authgaurds/superadmingaurd.service';
import { LogingaurdService } from 'src/services/authgaurds/logingaurd.service';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate: [SuperadmingaurdService]},
  {path:'instruments',component:ShowInstrumentsComponent,canActivate: [SuperadmingaurdService]},
  {path:'user',component:UserhomePageComponent,canActivate: [LogingaurdService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
