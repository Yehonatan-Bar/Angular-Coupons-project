import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company';
import { Admin } from '../models/Admin';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private token = <number><unknown>sessionStorage.getItem("token");
  private  companyId = <number><unknown>sessionStorage.getItem("companyID");
  
  constructor(private http: HttpClient) {  }
  public company:Company;
  public root = {
    company: null,
    admin: null,
    allCompanies:null,
    companysUsers:null
   }


   public getCompany(): Observable<Company>{
    //  alert("in company.sevice/getCompany(): this.companyID: " + this.companyId + "   this.token:  " + this.token)
     return this.http.get<Company>(`http://localhost:8080/Companies/${this.companyId}?token=${this.token}`);
}
  //  public getCompany(): void { 
  //   alert("in company.sevice/getCompany() method.    this.companyId: " + this.companyId + "   this.token:  " + this.token)
  //     let obs =  this.http.get<Company>(`http://localhost:8080/Companies/${this.companyId}?token=${this.token}` );
  //       obs.subscribe(
  //     res => {
  //       alert("succeded!!! horey!!! "  + " Company name: "+ res.compName + " userPassword: " + res.companyID);
  //         this.company = res;
  //       },
  //     err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message +
  //      "\nthis.companyId = " + this.companyId + " \nthis.token = " + this.token)      );
  //   }


   public getAllCompanies(): void { 
    //  alert ("getAllCompanies() service");
    let obs =  this.http.get<Company[]>(`http://localhost:8080/Companies/?token=${this.token}` );
    obs.subscribe(
      res => {
        // alert("obs.subscribe");
          this.root.allCompanies = res;
        },
      err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message +
       "\nthis.companyId = " + this.companyId + " \nthis.token = " + this.token)      );
    }
    
   public getAllCompanysUsers(companyId, token): void { 
    //  alert ("in service. token: = " + this.token + "  companyId = " + companyId); 
                                                               // byCompanyId?companyId=${companyID}&token=${token}` );  
                                  //  http://localhost:8080/users/name/${userId}?token=${token}   @GetMapping("/name/{userId}")
                                   // (`http://localhost:8080/purchases/customer?customerId=${customerId}&token=${token}`);
      let obs =  this.http.get<User[]>(`http://localhost:8080/users/byCompanyId?companyId=${companyId}&token=${token}` );
    obs.subscribe(
      res => {
        // alert("obs.subscribe");
          this.root.companysUsers = res;
        },
      err => alert("Oh crap !.... Error! Status: " + err.status + ", Message: " + err.message)
            );
    }


 

public updateCompany (company:Company){
  
  let observable = this.http.put(`http://localhost:8080/Companies/?token=${this.token}`,company );
  
  observable.subscribe(
    res => {
      // alert("succeded!!! horey!!! "+ " Company name: " + this.root.company.compName + " company email: " + this.root.company.contactEmail + " contact's company phone: " + this.root.company.contactPhone);

      this.root.company = res;
      
          },
    err => alert("Oh crap !.... Error in updateCustomer! Status: " + err.status + ", Message: " + err.message)

  );
}



public crearteCompany (company:Company){
  
  // this.company.compName = name;
  // this.company.contactEmail = email;
  // this.company.contactPhone = phone;
  // alert("in service \ncompany.compName; = " + company.compName + "  \ncompany.contactEmail; = "+ company.contactEmail + "\n  company.contactPhone; = "  + company.contactPhone);
  
    
  let observable = this.http.post(`http://localhost:8080/Companies/?token=${this.token}`,company );
  
  observable.subscribe(
    res => {
      // alert("succeded!!! horey!!! "+ " Company name: " + this.root.company.compName + " company email: " + this.root.company.contactEmail + " contact's company phone: " + this.root.company.contactPhone);

      this.root.company = res;
      
          },
    err => alert("Oh crap !.... Error in create company! Status: " + err.status + ", Message: " + err.message)

  );
}


public crearteAdmin (admin:Admin){
  
  let observable = this.http.post(`http://localhost:8080/users/?token=${this.token}`,admin );
  
  observable.subscribe(
    res => {
      // alert("succeded!!! horey!!! "+ " userEmail: " + this.root.admin.userEmail + "\n company password: " + this.root.admin.password + " contact's company phone: " + this.root.company.contactPhone);

      this.root.admin = res;
      
          },
    err => alert("Oh crap !.... Error in updateCustomer! Status: " + err.status + ", Message: " + err.message)

  );
}
public deleteCompany (companyId:number){
  
  let observable = this.http.delete(`http://localhost:8080/Companies/${companyId}/?token=${this.token}`);
  
  observable.subscribe(
    res => {
      // alert("company No: " +companyId+ " deleted successfully!");

      this.root.admin = res;
      
          },
    err => alert("Oh crap !.... Error in deleteCompany! Status: " + err.status + ", Message: " + err.message)

  );
}




}
