import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/Coupon';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  // private token = <number><unknown>sessionStorage.getItem("token");
  // private  customerId = <number><unknown>sessionStorage.getItem("id");
private allowAlert:boolean=true;
  constructor(private http:HttpClient) {
   
   }

  public root = {
    customer: null,
    company:null,
    user: null,
    amount: null,
    purchases: null,
    coupon: null,
    max_price: null,
    category: null,
    all_coupons: null,
    all_purchusable_coupons: null,
    one_coupon: null,
    compnays_coupons:null,
  }

  
public getAllCustomerCoupons(customerId: number, token: number): void { 
  
                                         
  let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/byTheCustomerId?customerId=${customerId}&token=${token}` );
  
  observable.subscribe(
    res => {
      this.root.all_coupons = res;
    },
        err => {
      // setTimeout(  () =>  { this.allowAlert = false;} ,1000 );
       alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message);

      
    }
  );


}

showCompanyCoupons(companyID:number, token:number){
  let obs =  this.http.get<Coupon[]>(`http://localhost:8080/coupons/byCompanyId?companyId=${companyID}&token=${token}` );
  obs.subscribe(
res => {
     this.root.compnays_coupons = res;
  },
err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)
);
 }


public getAllCoupons(token: number): void { 
    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/?token=${token}` );
    observable.subscribe(
    res => {
        this.root.all_purchusable_coupons = res;
    },
        err => {
      if (this.allowAlert) {alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)};

      
    }
  );


}

public createCoupon(token: number,coupon:Coupon){
  let obs =  this.http.post<Coupon>(`http://localhost:8080/coupons/?token=${token}`, coupon );
  obs.subscribe(
res => {
  // alert("sucseed to do the post")
    this.root.coupon.couponID = res;
    // alert("sucseed to save the res. coupond id is: " +  this.root.coupon.couponID);
  },
err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)
);

}
public updateCoupon(token: number,coupon:Coupon){
  // alert("got to updateCoupon in service")
  let obs =  this.http.put<Coupon>(`http://localhost:8080/coupons/?token=${token}`, coupon );
  obs.subscribe(
res => {
  // alert("sucseed to do the post")
    this.root.coupon.couponID = res;
    // alert("sucseed to save the res. coupond id is: " +  this.root.coupon.couponID);
  },
err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)
);

}



public deleteCoupons(token:number, id:number): void { 
  
  
  let observable = this.http.delete(`http://localhost:8080/coupons/${id}/?token=${token}`);
  
  observable.subscribe(
    res => {
      // alert("coupon No: " +id+ " deleted successfully!");

    },
    
    err => {
      if (this.allowAlert) {alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)};

      
    }
  );
  }
}