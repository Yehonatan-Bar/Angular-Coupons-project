import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'Middle Earth Coupons Porject';


  private user_name: string = 'הכנס את האימייל שלך';
  private password: string = 'הכנס את הסיסמא שלך';


  confarmation() {
    this.user_name = '';
   }
}
