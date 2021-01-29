import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Bode } from 'src/app/models/user.interace';
import { BodeService } from "./../../../services/bode/bode.service";
import { getFormattedDate, getTextBoolean } from "./../../../services/util/util.app";
import jsPDF from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-bodegueros',
  templateUrl: './bodegueros.component.html',
  styleUrls: ['./bodegueros.component.css'],
})
export class BodeguerosComponent implements OnInit, OnDestroy {


  public bodegeuros: Bode[] = [];
  private destroy$ = new Subject<any>();



  public settingsUpdate = {
    idUpdate: "",
    newPass: ""
  }

  constructor(private bodeService: BodeService) {


  }


  ngOnInit(): void {
    this.bodeService.getAll().subscribe((res) => {
      this.bodegeuros = res;
    })
  }


  generatePDF() {
    
      var doc: any = new jsPDF('p', 'pt');
      doc.setFontSize(12);
      doc.getStyle('normal')
      doc.text("REPORTE DE BODEGUEROS", 40, 40)
      var columns = ["Cédula", "Nombre", "Fecha de nacimiento", "Dirección", "Email", "Teléfono", "Estado"];
      var data = [];
      for (const b of this.bodegeuros) {
        data.push([b.id, b.name + ' '+b.lastname, this.formatDate(b.birthdate), b.address,
        b.email, b.phone, getTextBoolean(b.state)]);
      }
      doc.autoTable(columns, data,
        { margin: { top: 60 } }
      );
      doc.save('REPORTE_BODEGUEROS.pdf');
   
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  update(): void {
    this.bodeService.updatePassword(this.settingsUpdate.idUpdate,
      this.settingsUpdate.newPass).subscribe((res) => {
        this.settingsUpdate.newPass = "";
        this.settingsUpdate.idUpdate = "";
      })
  }

  setInfoUpdate(id: string) {
    this.settingsUpdate.idUpdate = id;
  }

  formatDate(date: string): string {
    return getFormattedDate(date);
  }

}
