import { Injectable } from '@angular/core';
import {LoginUser} from '../models/LoginUser';
import {UserDataClient} from '../models/UserDataClient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient , private router: Router) { }
private token = <number><unknown>sessionStorage.getItem("token");

public root = {
  user: null,
 }

  public Login(loginData: LoginUser): void {
// alert("before  let obs");
    let obs =  this.http.post<UserDataClient>("http://localhost:8080/users/login",loginData );
    // alert("before obs.subscribe.  loginData.password: " +  loginData.password + "  loginData.userName: " + loginData.userName);
      obs.subscribe(        
      res => {

        // alert("succeded " + res.clientType + " id: "+ res.companyID + " token: " + res.token);
  
        sessionStorage.setItem("token", res.token + "");

        if (res.clientType == "CUSTOMER")
          this.router.navigate(["customer"]);

        else if (res.clientType == "COMPANY") {
          // alert ("companyID = " + res.companyID)
          sessionStorage.setItem("companyID", res.companyID + "");
          this.router.navigate(["company"]);
        }

        else
          this.router.navigate(["admin"]);

        sessionStorage.setItem("id", res.id + "");

      },
      err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
  
      )
    }


    public createUser( user:User): void { 
      // alert("in servise/createUser");
      let observable = this.http.post(`http://localhost:8080/users/register`,user );
            observable.subscribe(
        res => {
          // alert("succeded!!! horey!!! user name: " + this.root.user.userName);
        },
                err => {
          alert( "Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message);
           }   )
      }
    
      

      public deleteUser(token,userID:number){
  
        let observable = this.http.delete(`http://localhost:8080/users/${userID}/?token=${token}`);
        
        observable.subscribe(
          res => {
            // alert("company No: " +userID+ " deleted successfully!");
            
                },
          err => alert("Oh crap !.... Error in deleteCompany! Status: " + err.status + ", Message: " + err.message)
      
        );
      }

      public getAllUsers(token): Observable<User[]>{ 
        return this.http.get<User[]>(`http://localhost:8080/users/?token=${token}`);
    }
    
}
