import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { LoginUser } from '../../shared/models/LoginUser';
import { User } from 'src/app/shared/models/User';
import { Customer } from 'src/app/shared/models/Customer';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  public instanceUser = this.userService.root;
  private user_name:string = null;
  private password: string = null;
  private password2: number = null;
  private userEmail: string = null;
  public token: number = null;
  public id: number = null;
 public custEmail: string = null;
  public custId: number = null;
  public custPhone: string = null;
  public custName: string = null;
 


  constructor(private userService: UserService, private customerService: CustomerService) { }
  ngOnInit(): void {
  this.token = <number><unknown>sessionStorage.getItem("token");
  this.id = <number><unknown>sessionStorage.getItem("id");
  }

  public submit() {
    let loginData:LoginUser = new LoginUser(this.user_name,this.password);
    alert("in the component, user name: " + this.user_name + "  loginData.userName: " + loginData.userName);
    this.userService.Login(loginData);
  }
  
  public createUser(userEmail,password2){

    alert(" createUser")
    
    this.instanceUser.user.userEmail = userEmail;
    this.instanceUser.user.password = password2;

    alert(" createUser")
    
    alert("in the component, this.instanceUser.user.userEmail: " + this.instanceUser.user.userEmail + "  this.instanceUser.user.password: " + this.instanceUser.user.password);

    // this.userService.createUser(this.instanceUser.user);
  }
  

  public register(): void {
    alert("in register")
  let user: User = new User();
  let customer: Customer = new Customer();

  
  customer.custEmail = this.userEmail;
  // alert("customer.custEmail: " + customer.custEmail);
  customer.custPhone = this.custPhone;
  // alert("customer.custPhone: " + customer.custPhone);
  customer.custName =  this.custName;
  // alert("customer.custName: " + customer.custName);
  user.userEmail = this.custName;
  alert("customer.user.name: " + user.userEmail);
  user.password = this.password2;
  user.type = "CUSTOMER";
  alert("user.type: " + user.type);
  customer.user = user;
  alert(" user.userEmail: " + user.userEmail + "  user.password: " + user.password+ "user.type: " + user.type);
  this.customerService.createCustomer(customer);
  // this.userService.createUser( user);
 

  // let type = "Customer";
  // let user: User = new User(this.userName, this.password, null, type);
  // let customer: Customer = new Customer(this.firstName, this.lastName, this.phoneNumber, this.email, user);

  }


  
  // public register(): void {


  //   let user: User = new User(this.userEmail,this.password2, null,"CUSTOMER", null);

  //   this.userService.createUser(this.token,user).subscribe

  //     (

  //       () => alert("User has been created"),

  //       err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

  //     );

  // }
  
  }

  
  


  // private first_name: string;
  // private last_name: string;
  // private phone_number: string;
  // private email: string;

  // public submit(): void {

  //   let user: LoginUser = new LoginUser(this.user_name, this.password);

  //   this.service.login(user);

  // }


  // confarmation() {
  //   this.user_name = 'אל תתרגש הכנסת כאילו שם אבל לא קרה כלום';
  //   this.password = 'אל תתרגש הכנסת כאילו ססמא אבל לא קרה כלום';
  // }
 
  // public toggleSignup() {

  //   document.getElementById("login-toggle").style.backgroundColor = "#fff";
  //   document.getElementById("login-toggle").style.color = "#222";
  //   document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
  //   document.getElementById("signup-toggle").style.color = "#fff";
  //   document.getElementById("login-form").style.display = "none";
  //   document.getElementById("signup-form").style.display = "block";

  // }

  // public toggleLogin() {

  //   document.getElementById("login-toggle").style.backgroundColor = "#57B846";
  //   document.getElementById("login-toggle").style.color = "#fff";
  //   document.getElementById("signup-toggle").style.backgroundColor = "#fff";
  //   document.getElementById("signup-toggle").style.color = "#222";
  //   document.getElementById("signup-form").style.display = "none";
  //   document.getElementById("login-form").style.display = "block";

  // }

