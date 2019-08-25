import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private token = <number><unknown>sessionStorage.getItem("token");
  private  customerId = <number><unknown>sessionStorage.getItem("id");
  
  public customerInService:Customer = null;

  
  public root = {
    customer: null,
    user: null,
    amount: null,
    purchases: null,
    coupon: null,
    max_price: null,
    category: null,
    all_coupons: null,
    all_companies: null,
    all_customers: null,
    one_coupon: null
  }

  // customer;
  constructor(private http:HttpClient) { }



  
  public createCustomer( customer:Customer): void { 
    alert("in servise/createCustomer")
    let observable = this.http.post(`http://localhost:8080/Customers/register`,customer );
          observable.subscribe(
      res => {
      },
              err => {
        alert( "Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message);
         }   )
    }
  

    public getCustomer(customerId,token): Observable<Customer>{
      return this.http.get<Customer>(`http://localhost:8080/Customers/${customerId}?token=${token}`);
  }

    public adminGetCustomer(): Observable<Customer>{
      return this.http.get<Customer>(`http://localhost:8080/Customers/${this.customerId}?token=${this.token}`);
  }

  
//    public getCompany(): Observable<Company>{
//      alert("in company.sevice/getCompany(): this.companyID: " + this.companyId + "   this.token:  " + this.token)
//      return this.http.get<Company>(`http://localhost:8080/Companies/${this.companyId}?token=${this.token}`);
// }
//   public getAllCustomers(): Observable<Customer[]>{
//     return this.http.get<Customer[]>(`http://localhost:8080/Customers/?token=${this.token}`);
// }

public getAllCustomers(token): void { 
  //  alert ("getAllCompanies() service");
  let obs =  this.http.get<Customer[]>(`http://localhost:8080/Customers/?token=${token}` );
  obs.subscribe(
    res => {
      // alert("obs.subscribe");
        this.root.all_customers = res;
      },
    err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message +
     "\nthis.companyId = " + this.customerId + " \nthis.token = " + this.token)      );
  }

// public getCustomer(): void { 
  

//   let obs =  this.http.get<Customer>(`http://localhost:8080/Customers/${this.customerId}?token=${this.token}` );
  
//   obs.subscribe(
//     res => {
//       alert("succeded!!! horey!!! "  + " Customer name: "+ res.custEmail + " userPassword: " + res.user.password);

//       this.customerInService = res;
// alert("in service/getCustomer(): this.root.customer.custName = " +  this.root.customer.custName);
//     },
//     err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)

//   );

// }

public updateCustomer (customer:Customer){
  // alert("in servise/updateCustomer: customer.custName = " + customer.custEmail )
  let observable = this.http.put(`http://localhost:8080/Customers/?token=${this.token}`,customer );
  
  observable.subscribe(
    res => {
      // alert("succeded!!! horey!!! ");

      this.root.customer = res;

    },
    err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)

  );
}



public createUser(user:User): void { 
  let observable = this.http.post(`http://localhost:8080/users?token=${this.token}`,user );
        observable.subscribe(
    res => {
      // alert("succeded!!! horey!!! user name: " + this.root.user.userName);
    },
            err => {
      alert( "Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message);
       }   )
  }



}
