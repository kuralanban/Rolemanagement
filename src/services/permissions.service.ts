import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient) {}

  public isSuperAdmin$:boolean=false;
  public updateRolesState = new BehaviorSubject<void>(undefined);
  public updateRoles$ =this.updateRolesState.asObservable();
  public updateInstrumentState = new BehaviorSubject<void>(undefined);
  public updateInstrument$ =this.updateInstrumentState.asObservable();

    // These two functions are to trigger a component function while the api is updated and to show the data resposively to the user
  public triggerUpdateRoles() {
    this.updateRolesState.next(undefined);
  }
  public triggerInstrumentRoles() {
    this.updateInstrumentState.next(undefined);
  }
    // TO get all roles
  public getRoles() {
    return this.http.get(`${environment.baseUrl}/${environment.baseRole}`);
  }
    // TO get all the instruments
  public getInstruments() {
    return this.http.get(`${environment.baseUrl}/${environment.baseInstrument}`);
  }
    // TO get the current role details
  public getCurrentRoleDetail(currentRole: string) {
    return this.http.get(`${environment.baseUrl}/${environment.baseRole}/${currentRole}`);
  }
    // TO update a role
  public updateRolePermissions(roleForm: object, _id: string) {
    return this.http.put(
      `${environment.baseUrl}/${environment.baseRole}/${_id}`,
      roleForm
    );
  }
    // TO delete a role
  public deleteRole(_id: string) {
    return this.http.delete(`${environment.baseUrl}/${environment.baseRole}${_id}`);
  }
    // TO create a role
  public createRole(roleData:object){
    return this.http.post(`${environment.baseUrl}/${environment.baseRole}`,roleData)
  }

    // TO create a instrument
  public createInstrument(instrument:object){
    return this.http.post(`${environment.baseUrl}/${environment.baseInstrument}`,instrument)
  }
    // TO update a instrument
  public updateInstrument(roleForm: object, _id: string) {
    return this.http.put(
      `${environment.baseUrl}/${environment.baseInstrument}/${_id}`,
      roleForm
    );
  }
    // TO delete a instrument
  public deleteInstrument(_id: string) {
    return this.http.delete(`${environment.baseUrl}/${environment.baseInstrument}/${_id}`);
  }
    // TO search a instrument
  public searchInstruments(username:string){
    return this.http.get(`${environment.baseUrl}/${environment.baseInstrument}/${username}`)
    }
    // TO update the user role
    public updateUserRole(userId: string, newRole: string) {
      const body = { role: newRole };
      return this.http.patch(`${environment.baseUrl}/${environment.baseUser}/${userId}`, body);
    }
    // TO check the user logged in is a admin or not by token
    public adminStatus=()=>{
      const admin=localStorage.getItem('superadmin')

      if(admin){
        if(JSON.parse(admin)){

          this.isSuperAdmin$=true;
          return true
        }
      }
      else{
        this.isSuperAdmin$=false;
      }
      return false
    }
    // TO check the user is logged in or not by token
    public loginStatus=()=>{
      const user=localStorage.getItem('token')
      if(user){
          return true
        }
      else{
        return false
      }
    }
}
