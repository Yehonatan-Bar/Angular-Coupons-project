import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CouponsService } from 'src/app/shared/services/coupons.service';
import { Coupon } from 'src/app/shared/models/Coupon';
import { PurchasesService } from 'src/app/shared/services/purchases.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { Company } from 'src/app/shared/models/Company';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public company:Company;
  public company2:Company;
  public categories2: Category[] = null;
  public coupon: Coupon = new Coupon();
  
  constructor(private categoriesService:CategoriesService, private companyService:CompanyService, private couponsService:CouponsService, private userSevice:UserService, private purchaseSevice:PurchasesService) { }
            ngOnInit() {
              // alert("in company.component: companyID = " + this.companyID);
              // alert("in company.component/ngOnInit() method.    this.companyID: " + this.companyID + "   this.token:  " + this.token)
              // this.getCompany();
              // this.couponsService.showCompanyCoupons(this.companyID, this.token);

              this.categories2 = Object.values(Category).filter(index => (typeof Category[index] === 'number'))
            }
  
  public companyInstance = this.companyService.root;
  public companyInstance2 = this.companyService.company;
  public adminInstance = this.companyService.root;
  public couponInstance = this.couponsService.root;
  public companyPurchaseInstance = this.purchaseSevice.root;
  public token = <number><unknown>sessionStorage.getItem("token");
  private  companyID = <number><unknown>sessionStorage.getItem("companyID");
  private  userID = <number><unknown>sessionStorage.getItem("id");
  public newCoupon:Coupon = new Coupon();
    public showCompanysCoupons:boolean=false;
  // public showCreateCoupon:boolean=false;
  public isShowPurchases:boolean=false;
  public isShowCreateUser:boolean=false;
  public isShowMyDetailes:boolean=false;
  public isUpdateSucceeded:boolean=false;
  public showAdmin:boolean=false;
  public userEmail:string;
  public password:number;
  public startCompany:boolean = false;
  private button:boolean = true;
  public categories : string[] = this.categoriesService.categories;
  private category2: Category = null;


  public updatedCoupon:Coupon;
  
  public showMyDetailes(){
    this.isShowMyDetailes = !this.isShowMyDetailes;
  //  alert("In company.component/showMyDetailes(): this.company.compName = " + this.company.compName) 
  }

  public showCompanyCoupons(){
    this.showCompanysCoupons=!this.showCompanysCoupons;
    this.couponsService.showCompanyCoupons(this.companyID, this.token);
  }

  public start() {
    this.startCompany = !this.startCompany;
    this.getCompany();
    this.button = false;
    // alert("In company.component/start(): this.companyInstance2.compName = " + this.companyInstance2.compName)
    // alert("In company.component/start(): this.company.compName = " + this.company.compName )
  }
  // + this.company.compName


  // public getCompany() {
  //   this.companyService.getCompany()
  // }

  public getCompany() {
    this.companyService.getCompany().subscribe(
      serverCompany => {
        this.company = serverCompany;
        this.company2 = serverCompany;
        // alert ("In company.component/getCompany: serverCompany.compName = " + serverCompany.compName + "  this.company.compName = " + this.company.compName)
     },
      err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
    )    
  }

  public createCoupon(): void {
    this.coupon.companyID = this.companyID;
    // alert("createCoupon(): this.coupon.title = " + this.coupon.title + ".   date: " + this.coupon.startDate);
    this.couponsService.createCoupon(this.token, this.coupon);
  }

  public update(){
        this.companyService.updateCompany(this.company);
        this.companyInstance = this.companyService.root;

        // this.companyService.getCompany().subscribe(
        //   serverCompany => {
        //     this.company = serverCompany;
        //  },
        //   err => alert("Error!!!!! Status: " + err.status + ", Message: " + err.message)
        // )    

// this.getCompany();

//     if (this.company2.compName!= this.company.compName || this.company2.contactEmail != this.company.contactEmail || this.company2.contactPhone != this.company.contactPhone) {
//       this.isUpdateSucceeded = !this.isUpdateSucceeded;
//     }
  }

  public CreatUser(): void {
    this.isShowCreateUser = !this.isShowCreateUser;
  }
  public CompanyUserRegister(): void {
    // alert("in register")
  let user: User = new User();
  user.userEmail = this.userEmail;
  user.password = this.password;
  user.companyID =  this.companyID;
  user.type = "COMPANY";
  // alert("user.password: " + user.password);
  // alert("user.name: " + user.userEmail);
  this.userSevice.createUser(user);
  // this.userService.createUser( user);
 

  // let type = "Customer";
  // let user: User = new User(this.userName, this.password, null, type);
  // let customer: Customer = new Customer(this.firstName, this.lastName, this.phoneNumber, this.email, user);

  }



public crearteAdmin(){
  // alert("crearteAdmin()" + this.adminInstance.admin);
  // this.showAdmin = !this.showAdmin;
  // this.adminInstance.admin.userEmail = "admin@gmail.com";
  // this.adminInstance.admin.password = "Ypassword%8";
  // this.adminInstance.admin.type = "ADMINISTRATOR";
  this.companyService.crearteAdmin(this.adminInstance.admin);
  // alert("crearteAdmin() 2" );
  // alert(this.companyInstance.admin.userEmail + "= admin@gmail.com" +  this.companyInstance.admin.password +" = Ypassword%8" +  this.companyInstance.admin.type + "= ADMINISTRATOR");
}

 public  ConfirmEditCoupon(couponID,companyID, title,
  custPhone,startDate,endDate,amount,category,description,price,image) {
   this.updatedCoupon = new Coupon(couponID, companyID, title,
    startDate, endDate, amount, category,
     description, price, image, custPhone);
   this.couponsService.updateCoupon(this.token, this.updatedCoupon );
 }

 public deleteCoupons(id:number){
      // alert("in deleteaCoupon \n id:" + id + "\n this.token: " + this.token);
  this.couponsService.deleteCoupons(this.token,id);
 }

public showCompanyPurchases(){
  this.isShowPurchases=!this.isShowPurchases;
  this.purchaseSevice.getCompanyPurchase(this.token, this.companyID);
}







}
