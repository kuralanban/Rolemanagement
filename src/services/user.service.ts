import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

    // TO get userdetails
  public getUserDetails(searchValue:string,page:number,itemsPerPage:number) {
    return this.http.get(`${environment.baseUrl}/${environment.baseUser}/${searchValue}/${page}/${itemsPerPage}`);
  }
    // TO search a user in table
  public searchusers(username: string,currentPage:number,itemsPerPage:number) {
    return this.http.get(`${environment.baseUrl}/${environment.searchUser}/${username}/${currentPage}/${itemsPerPage}`);
  }
    // TO validate a user data
  public signIn(userData: object) {
   return this.http.post(`${environment.baseUrl}/${environment.signIn}`, userData);
  }
    // TO set the token in local storage
  public setTokenValues(token:string){
  localStorage.setItem('token',token);
  }
    // TO get the token values from storage and decoding it
  public getTokenValues(): any {
    const token = localStorage.getItem('token');
    const decode = jwt_decode(token!) ;
    return decode;
  }
    // To create a new user
  public signUp(userData:object){
    return this.http.post(`${environment.baseUrl}/${environment.signUp}`, userData);
  }
    // TO update the active status to false ( Logout )
  public logout(userEmail:object){
    return this.http.patch(`${environment.baseUrl}/${environment.baseUser}`,userEmail);

  }
}
