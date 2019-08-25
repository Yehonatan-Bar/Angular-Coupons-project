import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/Coupon';
import { Purchase } from '../models/Purchase';
import { NullAstVisitor } from '@angular/compiler';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  public root = {
  purchase:null,
  companyPurchases:null
  }
  constructor(private http:HttpClient) {
     }
     private token = <number><unknown>sessionStorage.getItem("token");
     public addPurchase(purchase, token: number): void { 
      let observable = this.http.post(`http://localhost:8080/Purchases?token=${token}`,purchase );
            observable.subscribe(
        res => {
          // alert("succeded!!! horey!!! " );
        },
                err => {
          alert( "Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message);
           }   )
      }

      public getAllPurchases(token): Observable<Purchase[]>{ 
        return this.http.get<Purchase[]>(`http://localhost:8080/Purchases/?token=${token}`);
    }

      // byCompanyId?companyId=${companyID}&token=${token}` );
     public getCompanyPurchase(token: number, companyId:number): void { 
      let observable = this.http.get<Purchase[]>(`http://localhost:8080/Purchases/byCompanyId?companyId=${companyId}&token=${token}`);
            observable.subscribe(
        res => {
          this.root.companyPurchases = res;
          // alert("this.root.companyPurchases = " /*+ this.root.companyPurchases.purchase.couponID*/);
        },
                err => {
          alert( "Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message);
           }   )
      }

      
    }