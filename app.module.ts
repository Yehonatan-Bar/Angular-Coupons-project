import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './components/customer/customer.component';
import { CompanyComponent } from './components/company/company.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './components/administrator/administrator.component';




// import { AppRoutingModule } from './app-routing.module';


      const routes: Routes = [
        { path: 'login', component: UserComponent },
        { path: 'customer', component: CustomerComponent },
        { path: 'company', component: CompanyComponent },
        { path: 'admin', component: AdministratorComponent },
        { path: '', redirectTo: "login", pathMatch: "full" },
      ]



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CustomerComponent,
    CompanyComponent,
    AdministratorComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)



    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
