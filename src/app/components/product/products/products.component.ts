import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { Pageable } from 'src/app/services/pageable/pageable';
import { ProductService } from 'src/app/services/product/product.service';
import { getTextBoolean } from "../../../services/util/util.app";

import jsPDF from "jspdf";
import 'jspdf-autotable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  public products: Product[] = [];
  private destroy$ = new Subject<any>();
  public idDeleted: string = "";

  products$: Observable<Product[]> | undefined;
  productsSubscription: Subscription | undefined;

  public pageable: Pageable = new Pageable();

  constructor(private productService: ProductService) {

    this.productService.getProductsCount().then((res) => {
      this.pageable.init(10, res.count);
      this.products$ = this.productService.getALittle(this.pageable.take.toString(), this.pageable.skipe(1).toString());
      this.productsSubscription = this.products$.subscribe((products) => {
        this.products = products;
      })

    });
  }

  ngOnInit(): void {

  }




  generatePDF() {
    this.productService.getAll().subscribe(products => {
      var doc: any = new jsPDF('p', 'pt');
      doc.setFontSize(12);
      doc.getStyle('normal')
      doc.text("REPORTE DE PRODUCTOS", 40, 40)
      var columns = ["Código", "Nombre", "Descripción", "Costo", "PVP", "Stock", "IVA", "Estado"];
      var data = [];
      for (const product of products) {
        data.push([product.id, product.name, product.description, product.cost,
        product.price, product.stock, getTextBoolean(product.iva), getTextBoolean(product.state)]);
      }
      doc.autoTable(columns, data,
        { margin: { top: 60 } }
      );
      doc.save('REPORTE_PRODUCTOS.pdf');
    })
  }


  

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.productsSubscription?.unsubscribe();

  }

  delete(): void {
    this.productService.delete(this.idDeleted).subscribe((res) => {
      this.ngOnInit();
      this.idDeleted = "";
    })
  }

  setInfoDelete(id: string) {
    this.idDeleted = id;
  }


  render(page: number) {

    if (this.pageable.skipe(page) === -1) {
      return
    }
    this.productService.getALittle(this.pageable.take.toString(), this.pageable.skipe(page).toString()).subscribe((products) => {
      this.products = products;
    });
    return;
  }


}
