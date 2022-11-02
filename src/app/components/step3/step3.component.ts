import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { DateServiceService } from 'src/app/core/service/date-service.service';
import { SalesService } from 'src/app/core/service/sales.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  
  products$=this.dataSvc.getProducts$();
  categories:string[]=[];
  
  selectedCateg: string='';
  selectedProd:  string='';
  selectedModel: string='';

  prodByCateg:Product[]=[];
  

  constructor( private dataSvc:DateServiceService , private salesSvc: SalesService){
  }

  ngOnInit(): void {
    //console.log('selectedValue', this.selectedCateg);
    this.categories= this.dataSvc.getCategories();
  }

  changeProd():Product[]{
    if (this.selectedCateg != '') {       
      return this.dataSvc.getProdByCateg(this.selectedCateg);
    }
    return  [];
  }

  changeModel():string[]{
    if (this.selectedCateg != '' && this.selectedProd != '') {       
      return this.dataSvc.getProdModel(this.selectedProd);
    }
    return  [];
  }

  onSubmit(form:any){
    const {categ,prod,model}= form;
    let productFiltered;
    this.dataSvc.getProducts$()
      .pipe(
        map( (res:Product[]) => {
          const productSelected:Product | undefined= res.find( p => p.productCategory==categ && p.productName==prod && p.productModel==model); 
          if (productSelected) {
            return productSelected;
          }
          return null;
        })
      )
      .subscribe(rp=> {
        productFiltered={...rp}  
        console.log('producto filtrado',productFiltered);
      });
    this.salesSvc.productFiltered$.next(productFiltered);
  }

}
