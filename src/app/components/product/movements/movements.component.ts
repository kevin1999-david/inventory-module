import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { Detail } from 'src/app/models/setting.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { getFormattedDate } from "./../../../services/util/util.app";
import jsPDF from "jspdf";
import 'jspdf-autotable';


@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  public movements: Detail[] = [];
  public product: Product | undefined;


  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    const id = this.route.snapshot.params['id'];
    this.productService.getById(id).subscribe((product)=>{
      this.product = product;
    })
    this.productService.getMovements(id).subscribe((res) => {
      this.movements = res;
      console.log(this.movements);
    })
  }

  ngOnInit(): void {
  }


  generatePDF() {

    var doc: any = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`DETALLES DE MOVIMIENTO`, 40, 40);
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`CÓDIGO: ${this.product?.id}`, 40, 80);
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`PRODUCTO: ${this.product?.name}`, 40, 120)
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`STOCK DISPONIBLE: ${this.product?.stock}`, 40, 160)

    var columns = ["#", "Fecha", "Código", "Documento", "Transacción", "Stock"];
    let c = 1;
    var data = [];
    for (const m of this.movements) {
      data.push([c, this.formatDate(m.date), m.code, m.type,
        m.quantity, m.stock]);
      c++;
    }
    doc.autoTable(columns, data,
      { margin: { top: 180 } }
    );
    doc.save(`REPORTE_${this.product?.name}`);

  }



  formatDate(date: string): string {
    return getFormattedDate(date);
  }

}
