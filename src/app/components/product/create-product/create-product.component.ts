import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { getBoolean } from "./../../../services/util/util.app";
import { URL } from "./../../../services/util/regex.app";

// import * as jspdft from "jspdf-autotable";
// import jsPDF from "jspdf";




@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  formValues: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    iva: [false, [Validators.required]],
    cost: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    state: [true, [Validators.required]],
    image: ['', [Validators.required, Validators.pattern(URL)]],
  });

  public settings = {
    title: "Crear Nuevo Producto",
    action: "Crear Producto",
    new: true,
    isValidCode: true,
    isSave: false
  }

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.settings.new = false;
      this.settings.title = "Actualizar Producto";
      this.settings.action = "Actualizar"

      this.productService.getById(id).subscribe((res) => {
        this.formValues.controls['id'].setValue(res.id);
        this.formValues.controls['name'].setValue(res.name);
        this.formValues.controls['description'].setValue(res.description);
        this.formValues.controls['iva'].setValue(res.iva);
        this.formValues.controls['cost'].setValue(res.cost);
        this.formValues.controls['price'].setValue(res.price);
        this.formValues.controls['state'].setValue(res.state);
        this.formValues.controls['image'].setValue(res.image);
      });


    }

  }

  ngOnInit(): void {
   
  }


  checkCode(event: Event) {
    const code = (event.target as HTMLInputElement).value;
    if ((code.trim().length === 8)) {
      this.productService.getById(code).subscribe((product) => {
        this.settings.isValidCode = false;
      },
        (error => {
          this.settings.isValidCode = true;
        }))
    } else {
      this.settings.isValidCode = true
    }
  }



  generatePDF(data: any) {
    // var doc = new jsPDF('p', 'pt');
    // doc.setFontSize(12);
    // doc.getStyle('normal');
    // doc.text("HOLA PDF", 275, 40)
    // doc.save('mipdf.pdf');
  }

  onForm(): void {

    this.settings.isSave = true;
    if (this.formValues.get('id')?.errors) {
      console.log("Errores has");
    }
    this.formValues.value.state = getBoolean(this.formValues.value.state);
    this.formValues.value.iva = getBoolean(this.formValues.value.iva);
    this.formValues.value.cost = Number.parseFloat(this.formValues.value.cost)
    this.formValues.value.price = Number.parseFloat(this.formValues.value.price)

    const values = this.formValues.value;


    if (this.settings.new) {
      this.productService.new(values).subscribe((res) => {
        this.router.navigate(['/productos']);
      })
    } else {
      this.productService.update(values).subscribe((res) => {
        this.router.navigate(['/productos']);
      })
    }
  }

}
