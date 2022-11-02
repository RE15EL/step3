import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  products:Product[]=[
    {
      productId:1,
      productName:'camisa de hombre',
      productCategory: 'ropas',
      productModel:'shein'
    },
    {
      productId:2,
      productName:'blusa',
      productCategory: 'ropas',
      productModel:'adidas'
    },
    {
      productId:3,
      productName:'pantalon',
      productCategory: 'ropas',
      productModel:'guess'
    },
    {
      productId:4,
      productName:'pantaloneta',
      productCategory: 'ropas',
      productModel:'zara'
    },
    {
      productId:5,
      productName:'vetilador',
      productCategory: 'electrodomesticos',
      productModel:'daytron'
    },
    {
      productId:6,
      productName:'laptop',
      productCategory: 'electrodomesticos',
      productModel:'HP'
    },
    {
      productId:7,
      productName:'televisor plasma',
      productCategory: 'electrodomesticos',
      productModel:'samsung'
    },
    {
      productId:8,
      productName:'cerveza',
      productCategory: 'bebidas',
      productModel:'cristal'
    },
    {
      productId:9,
      productName:'refresco gaseado',
      productCategory: 'bebidas',
      productModel:'koka kola'
    },
    {
      productId:10,
      productName:'malta',
      productCategory: 'bebidas',
      productModel:'bucanero'
    },
    {
      productId:11,
      productName:'malta',
      productCategory: 'bebidas',
      productModel:'hypermalt'
    },
    {
      productId:12,
      productName:'cerveza',
      productCategory: 'bebidas',
      productModel:'holland'
    },
    {
      productId:13,
      productName:'mouse',
      productCategory: 'electrodomesticos',
      productModel:'JWFY'
    },
    {
      productId:14,
      productName:'televisor',
      productCategory: 'electrodomesticos',
      productModel:'ATEC-Haier'
    },
    {
      productId:15,
      productName:'refrigerador',
      productCategory: 'electrodomesticos',
      productModel:'antillano'
    },
  ];

  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.products);

  getProducts$():Observable<Product[]>{
    return this.products$.asObservable();
  }

  getProdByCateg$(categ:string):Observable<Product[]>{
    return of(this.products.filter( p => p.productCategory==categ));
  }

  getProdByCateg(categ:string):Product[]{
    return this.products.filter( p => p.productCategory==categ);
  }

  getCategories():string[]{
    let categ= new Set( this.products.map( p => p.productCategory));
    return [...categ];
  }

  getProdModel(prodN:string):string[]{
    let mark:string[]=[];

    this.products.forEach( p => {
      if(p.productName===prodN){
        mark.push(p.productModel);
      }
    });
    return mark;
  }

  getProdByName_Model(pName:string, pModel:string){
    return this.products.find( p => p.productName==pName && p.productModel==pModel);   
  }

  
}
