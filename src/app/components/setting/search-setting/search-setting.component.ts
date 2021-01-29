import { Component, OnInit } from '@angular/core';
import { ItemSetting, Setting } from 'src/app/models/setting.interface';
import { SettingService } from 'src/app/services/setting/setting.service';
import { getFormattedDate } from 'src/app/services/util/util.app';
import jsPDF from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-search-setting',
  templateUrl: './search-setting.component.html',
  styleUrls: ['./search-setting.component.css']
})
export class SearchSettingComponent implements OnInit {
  public settings: Setting[] = [];

  public items: ItemSetting[] = [];

  public dates = {
    to: "",
    end: ""
  }



  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
  }


  onSearch() {
    this.settings = [];
    this.settingService.getByDates(this.dates.to, this.dates.end).subscribe(res => {
      this.settings = res;
      

    }, error => {

    })
  }



  generatePDF() {


    var doc: any = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`REPORTE DE AJUSTES`, 40, 40);
    var columns = ["#", "Código", "Fecha", "Razón", "Cantidad detalle"];
    let c = 1;
    var data = [];
    for (const s of this.settings) {
      data.push([c, s.id, this.formatDate(s.createdAt), s.reason,
        s.items.length]);
      c++;
    }
    doc.autoTable(columns, data,
      { margin: { top: 60 } }
    );
    doc.save(`REPORTE_AJUSTES.PDF`);

  }



  generateDetailPDF(pos: number) {
    const setting: Setting = this.settings[pos];

    var doc: any = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`DETALLE DE AJUSTES`, 40, 40);
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`CÓDIGO: ${setting.id}`, 40, 80);
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`FECHA: ${this.formatDate(setting.createdAt)}`, 40, 120);
    doc.setFontSize(12);
    doc.getStyle('normal')
    doc.text(`RAZÓN: ${setting.reason}`, 40, 160);

    var columns = ["#", "Registro", "Producto", "Observación", "Transacción",];
    let c = 1;
    var data = [];
    for (const i of setting.items) {
      data.push([c, i.id, i.product.name, i.observation, i.quantity]);
      c++;
    }

    doc.autoTable(columns, data,
      { margin: { top: 180 } }
    );
    doc.save(`REPORTE_AJUSTE_${setting.id}.PDF`);
  }


  setItems(pos: number) {
    console.log(pos.toString());

    this.items = this.settings[pos].items;


  }

  formatDate(date: string): string {
    return getFormattedDate(date);
  }

}
