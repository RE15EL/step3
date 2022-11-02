import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Sales } from '../interfaces/sales.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  productFiltered$:Subject<any>=new Subject();
  
  sales:Sales[]=[
    {
      idSale:1,
      productId:1,
      qtyByMonth:{ month: 'january', qty:60}
    },
    {
      idSale:2,
      productId:1,
      qtyByMonth:{ month: 'february', qty:10}
    },
    {
      idSale:3,
      productId:2,
      qtyByMonth:{ month: 'january', qty:50}
    },
    {
      idSale:4,
      productId:1,
      qtyByMonth:{ month: 'april', qty:80}
    },
    {
      idSale:5,
      productId:3,
      qtyByMonth:{ month: 'january', qty:20}
    },
    {
      idSale:6,
      productId:1,
      qtyByMonth:{ month: 'march', qty:60}
    },
    {
      idSale:7,
      productId:2,
      qtyByMonth:{ month: 'march', qty:50}
    },
    {
      idSale:8,
      productId:2,
      qtyByMonth:{ month: 'february', qty:50}
    },
    {
      idSale:9,
      productId:2,
      qtyByMonth:{ month: 'april', qty:50}
    },
  ];

  constructor( ) { }

  getProdFiltered():Observable<any>{
    return this.productFiltered$.asObservable();
  }

  getSalesByProductId(idProd:number):Sales[]{
    let ventasById:Sales[]=[];
    ventasById= [...this.sales.filter( v => v.productId==idProd)];
    return ventasById;
  }
}
