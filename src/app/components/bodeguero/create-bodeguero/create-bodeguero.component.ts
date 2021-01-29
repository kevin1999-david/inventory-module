import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BodeService } from 'src/app/services/bode/bode.service';
import { getBoolean, getFormattedDate } from "./../../../services/util/util.app";

@Component({
  selector: 'app-create-bodeguero',
  templateUrl: './create-bodeguero.component.html',
  styleUrls: ['./create-bodeguero.component.css']
})
export class CreateBodegueroComponent implements OnInit {
  formValues: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    state: [true, [Validators.required]],
    role: [2, [Validators.required]]
  });


  public settings = {
    title: "Crear Nuevo Bodeguero",
    action: "Crear Bodeguero",
    new: true,
    isValidCode: true,
    isSave: false
  }

  constructor(private bodeService: BodeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.settings.new = false;
      this.settings.title = "Actualizar bodeguero";
      this.settings.action = "Actualizar bodeguero"

      this.bodeService.getById(id).subscribe((res) => {
        this.formValues.controls['id'].setValue(res.id);
        this.formValues.controls['name'].setValue(res.name);
        this.formValues.controls['lastname'].setValue(res.lastname);
        this.formValues.controls['password'].setValue("xxxxxxxx");
        this.formValues.controls['birthdate'].setValue(getFormattedDate(res.birthdate));
        this.formValues.controls['address'].setValue(res.address);
        this.formValues.controls['phone'].setValue(res.phone);
        this.formValues.controls['email'].setValue(res.email);
        this.formValues.controls['state'].setValue(res.state);
      });


    }
  }

  ngOnInit(): void {

  }


  checkCode(event: Event) {
    const code = (event.target as HTMLInputElement).value;
    console.log(code);

    if ((code.trim().length === 10)) {
      this.bodeService.getById(code).subscribe((bode) => {
        this.settings.isValidCode = false;
      },
        (error => {
          this.settings.isValidCode = true;
        }))
    } else {
      this.settings.isValidCode = true
    }
  }


  onForm(): void {
    this.settings.isSave = true;
    this.formValues.value.state = getBoolean(this.formValues.value.state);
    const values = this.formValues.value;
    if (this.settings.new) {
      this.bodeService.new(values).subscribe((res) => {
        this.router.navigate(['/bodegueros']);
      })
    } else {
      this.bodeService.update(values).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/bodegueros']);
      })
    }
  }

}
