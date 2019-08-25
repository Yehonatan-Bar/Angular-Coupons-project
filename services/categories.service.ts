import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

public categories : string[]= [

	"COMPUTERS",
	"ELECTRICS",
	"FLIGHTS",
	"HOTELS",
	"LIVESHOWS",
	"RENTALCARS",
	"RESTAURANTS",
	"SNACKES",
	"SPORTGAMES",
	"VACATIONS"
];

  constructor() { }
}
