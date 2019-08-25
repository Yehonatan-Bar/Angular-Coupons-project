import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { Company } from 'src/app/shared/models/Company';
import { UserService } from 'src/app/shared/services/user.service';
import { Coupon } from 'src/app/shared/models/Coupon';
import { CouponsService } from 'src/app/shared/services/coupons.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { Customer } from 'src/app/shared/models/Customer';
import { User } from 'src/app/shared/models/User';
import { Purchase } from 'src/app/shared/models/Purchase';
import { PurchasesService } from 'src/app/shared/services/purchases.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  
  public isShowDeleteCompany = false;
  public companyId:number;
  public companyInstance = this.companyService.root;
  public customerInstance = this.customerService.root;
  public isShowAllCompanies:boolean;
  public isDelete:boolean;
  public isCreateCompany:boolean;
  public isShowAllCompanysUsers:boolean;
  public isShowCreateCoupon:boolean=false   ;
  public isShowAllCustomer:boolean=false  ;
  public isShowAllUsers:boolean=false   ;
  public isAddPurchase:boolean=false   ;
  public isShowPurchases:boolean=false   ;
  public purchaseAmount:number;
  public purchaseCouponID:number;
  public purchaseCustomerID:string;
  private token = <number><unknown>sessionStorage.getItem("token");
    public company:Company;
    public customers:Customer[];
    public users:User[];
    public purchases:Purchase[];
    public customer:Customer;

    public newCoupon:Coupon = new Coupon();
    
    constructor(private purchasesService:PurchasesService, private companyService:CompanyService, private userService:UserService, private couponsService:CouponsService, private customerService:CustomerService) {
      this.company = new Company();
    }
    
    ngOnInit() {
      // alert("in on init")
      // this.companyService.getCompany();
    }
            public getAllCompanies(){
              // alert("getAllCompanies() component");
              this.isShowAllCompanies=!this.isShowAllCompanies;
              this.companyService.getAllCompanies();
            }
            // customerInstance
            public ShowAllCustomer(){
              this.isShowAllCustomer=!this.isShowAllCustomer;
              this.customerService.getAllCustomers(this.token);
            }
            // public ShowAllCustomer(){
            //   // alert("getAllCompanies() component");
            //   this.isShowAllCustomer=!this.isShowAllCustomer;
            //   this.customerService.getAllCustomers().subscribe(
            //     serverCustomer => {
            //       this.customers = serverCustomer;
            //     },
            //     err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
            //     )    
            //   }
              
              public getAllPurchases() {
              this.isShowPurchases = !this.isShowPurchases;
              this.purchasesService.getAllPurchases(this.token).subscribe(
                serverPurchase => {
                  this.purchases = serverPurchase;
               },
                // err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
              )    
              }
          
          
          public ShowAllUsers(){
            // alert("getAllCompanies() component");
          this.isShowAllUsers=!this.isShowAllUsers;
            this.userService.getAllUsers(this.token).subscribe(
                  serverUser => {
                    this.users = serverUser;
                 },
                  err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
                )    
          }


  public ShowCreateCoupon(): void {
    this.isShowCreateCoupon = !this.isShowCreateCoupon;
  }
  public createCoupon(): void {
    // this.newCoupon.companyID = this.companyID;

    // alert("IN COMPONENT/createCoupon(): this.newCoupon.title = " + this.newCoupon.title + ".   date: " + this.newCoupon.startDate);
    this.couponsService.createCoupon(this.token, this.newCoupon);
  }

  public createCompany(){
    // this.isCreateCompany = !this.isCreateCompany
    // alert("in component \ncompany.compName; = " + this.company.compName + "  \ncompany.contactEmail; = "+ this.company.contactEmail + "\n  company.contactPhone; = "  + this.company.contactPhone);
    // alert("in component ");
    // alert(name);
    this.companyService.crearteCompany(this.company);
  }
  public deleteCompany(id){
    // alert( "companyId = " +id);
    this.companyService.deleteCompany(id);
  }

  public getAllCompanysUsers(companyId){
    this.isShowAllCompanysUsers=!this.isShowAllCompanysUsers;
    this.companyService.getAllCompanysUsers(companyId, this.token);
  }
  public deleteUser(userID:number){
    this.userService.deleteUser(this.token,userID);
    
  }
public ShowAddPurchase(){
  this.isAddPurchase = true;
}
addPurchase(){

  let purchase = new Purchase();
  purchase.amount = this.purchaseAmount;
  purchase.couponID=this.purchaseCouponID;
  purchase.customerID=this.purchaseCustomerID;
  // alert (purchase.amount + "  " + purchase.couponID + "  " + purchase.customerID);
  this.purchasesService.addPurchase(purchase,this.token);
}

// public getAllCustomers() {
//   this.customerService.getAllCustomers().subscribe(
//     serverCustomer => {
//       this.customers = serverCustomer;
//    },
//     err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
//   )    
// }


public getCustomer() {
  this.customerService.adminGetCustomer().subscribe(
    serverCustomer => {
      this.customer = serverCustomer;
   },
    // err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
  )    
}



// public getCompany() {
  //   this.companyService.getCompany().subscribe(
  //     serverCompany => {
  //       this.company = serverCompany;
  //    },
  //     err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
  //   )    
  // }

}
