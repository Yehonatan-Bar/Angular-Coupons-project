import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { CouponsService } from '../../shared/services/coupons.service';
import { Customer } from '../../shared/models/Customer';
import { PurchasesService } from '../../shared/services/purchases.service';
import { Purchase } from '../../shared/models/Purchase';
import { User } from '../../shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { Coupon } from 'src/app/shared/models/Coupon';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customer:Customer;
  constructor(private couponsService:CouponsService, private customerService:CustomerService, private purchasesService:PurchasesService, private userService:UserService ) { }

  ngOnInit() {
      this.getCustomer();
    
    
    // this.customerService.getCustomer()  ;
    // // alert("this.instanceCustName = " + this.instanceCustName);
    // // alert("this.instanceCustName = " + this.instanceCustName);
    // this.customer1 = this.customerService.root.customer;
    // alert("this.instanceCustName = " + this.instanceCustName);
  }
  public instance = this.customerService.root;
   public instanceCustName: string;
  // = this.customerService.customerInService.custName;
  public instanceUser = this.userService.root;
  public couponInstance = this.couponsService.root;
  private showDetailes:boolean = false;
  private showMyCoupns:boolean = false;
  private showAllCoupons:boolean = false;
  private makePurchase: boolean = false;
  dis=false;
  public purchase: Purchase;
  private amount:number;
  private purchase2:Purchase;
  private startCustomer:boolean = false;
  private button:boolean = true;
 public isMakePurchase:boolean = false;
 public chosenCoupon:Coupon;
  private token = <number><unknown>sessionStorage.getItem("token");
  private  customerId = <number><unknown>sessionStorage.getItem("id");
  private id:number = this.customerId;

  public start() {
    this.startCustomer = !this.startCustomer;
    this.getCustomer();
    this.button = false;
  }
  
  public doMakePurchase(coupon){
this.isMakePurchase = !this.isMakePurchase;
this.chosenCoupon = coupon;

  }

  public getCustomer() {
    this.customerService.getCustomer(this.customerId, this.token).subscribe(
      serverCustomer => {
        this.customer = serverCustomer;
     },
      err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
    )    
  }
 
  
  // public getCustomer(){
  //   this.customerService.getCustomer();
  //   this.customer1 = this.customerService.customerInService.custName;
  // }
  // public showCustomer(){
  //   alert("this.customer1 = " + this.customer1);
  //   // alert("this.instanceCustName = " + this.instanceCustName);
  // }
  public update(){
    // alert("in component/update(): this.customer.custName = " + this.customer.custEmail )

    this.customerService.updateCustomer(this.customer);
  }


  public createUser(){
    this.customerService.createUser(this.instanceUser.user);
  }

  addPurchase(couponID:number){

    let purchase = new Purchase();
    purchase.amount = this.amount;
    purchase.couponID=couponID;
    purchase.customerID=sessionStorage.getItem("id");
    // alert (purchase.amount + "  " + purchase.couponID + "  " + purchase.customerID);
    this.purchasesService.addPurchase(purchase,this.token);
  }

  public getMyCoupns(){
    var x = "32";
var y = +this.id;
    this.showMyCoupns  = !this.showMyCoupns;
    this.couponsService.getAllCustomerCoupons(y, this.token);
    
     }

     public getAllCoupns(){
       
      this.showAllCoupons  = !this.showAllCoupons;
      this.couponsService.getAllCoupons(this.token);
      // this.couponsService.getAllCustomerCoupons();
      
       }


       
    //  getAllCoupons
// private customer:Casto.umer;


    
    // public get_customer() {

    //  this.customerService.getCustomer();

    // }

}

