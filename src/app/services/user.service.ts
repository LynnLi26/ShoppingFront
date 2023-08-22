import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'https://myshoppingwebapi.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  registerUser(user : User){
    const body = {
      "username" : user.Username,
      "password": user.Password
    };
    return this.http.post(this.rootUrl+'api/User/add',body, {headers: {'content-type': 'application/json'}});
  }

  userLogin(user : User){
    const body = {
      "Username" : user.Username,
      "Password" : user.Password
    };
    return this.http.post(this.rootUrl+'api/User/check-password',body,{headers:{'content-type' : 'application/json'}});
  }
}
