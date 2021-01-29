import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemPartial, SettingPartial } from 'src/app/models/setting.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { SettingService } from 'src/app/services/setting/setting.service';
import { ProductsComponent } from '../../product/products/products.component';
import { Product } from "./../../../models/product.interface";


@Component({
  selector: 'app-create-setting',
  templateUrl: './create-setting.component.html',
  styleUrls: ['./create-setting.component.css']
})
export class CreateSettingComponent implements OnInit {

  public title: string = "Crear Ajuste";

  //for the autocomplete
  public keyword = 'name';
  public data: Product[] = [];



  //public items: ItemPartial[] = [];

  public setting: SettingPartial = {
    reason: "",
    items: []
  };


  constructor(
    private productService: ProductService,
    private settingService: SettingService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  removeItem(value: number): void {
    this.setting.items.splice(value, 1);
  }

  onCatchData() {
    //console.log(this.setting);
    this.settingService.new(this.setting).subscribe((res) => {
      this._router.navigate(['/ajustes'])
    })
  }

  selectEvent(item: Product) {
    console.log(item);

    const pos = this.isProductInTable(item.id)
    if (pos === this.setting.items.length) {
      this.setting.items.push({ id: item.id, name: item.name, quantity: 1, observation: "", stock: item.stock, pvp: item.price });
    } else {
      this.setting.items[pos].quantity++;
    }
  }

  isProductInTable(id: string): number {
    let account = 0;
    for (const item of this.setting.items) {
      if (item.id === id) {
        return account;
      }
      account++;
    }
    return account;
  }

  onMin(min: any) {
    if (min === 0) {
      return 1;
    }
    return min * -1;
  }


  onChangeSearch(val: string) {
    this.data = [];
    if (val !== "") {
      this.productService.getLike(val).subscribe((res) => {
        this.data = res;

      })
    }
  }

  onCleared() {
    this.data = [];
  }

}
