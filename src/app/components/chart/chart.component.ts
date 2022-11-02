import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Product } from 'src/app/core/interfaces/product.interface';
import { Sales } from 'src/app/core/interfaces/sales.interface';
import { SalesService } from 'src/app/core/service/sales.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  prodFilter$!:string;
  saleByMonth:Sales[]=[];
  prodId:number=0;

  labels:string[]=[];
  dat:number[]=[];
  
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.labels,
    datasets: [
      { data: this.dat, label: 'Ventas Mensuales' },
    ]
  };
  

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor( private salesSvc:SalesService) {
  }

  ngOnInit(): void {
    this.salesSvc.getProdFiltered().subscribe(res=> {
      this.prodFilter$=res.productName; //obtengo el nombre del prod ya filtrado
      this.prodId= res.productId; //obtengo el id del prod ya filtrado
      console.log('id del producto filtrado', this.prodId);

      // obtengo el array de las ventas por del prod
      this.saleByMonth = [...this.salesSvc.getSalesByProductId(this.prodId)]; 
      console.log( 'array de las ventas por del prod', this.saleByMonth);

      //lleno el array de los etiquetas de meses de ventas
      this.saleByMonth.forEach( s => this.labels.push(s.qtyByMonth['month']));
      console.log('etiqetas de los meses', this.labels);

      //lleno el array de los valores de las ventas
      this.saleByMonth.forEach( s => this.dat.push(s.qtyByMonth['qty']));
      console.log('valores de venta mensual', this.dat);
      
    })
  }


}
