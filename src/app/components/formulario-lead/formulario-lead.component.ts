import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeadDto } from 'src/app/models/mant.interface';
import { ApiService } from 'src/app/services/api.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-formulario-lead',
  templateUrl: './formulario-lead.component.html',
  styleUrls: ['./formulario-lead.component.scss'],
  providers: [DatePipe]
})
export class FormularioLeadComponent {

  form!: FormGroup;

  datePipe = inject(DatePipe);
  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  _snackBar = inject(MatSnackBar);
  spinnerService = inject(SpinnerService);

  constructor() {
    this.buildForm();
  }

  private buildForm(): void {

    this.form = this.formBuilder.group({
      id: ['1', Validators.required],
      campana: ['', [Validators.required, Validators.pattern(/\d/)]],
      cod_proveedor: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      fecha_captacion: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóú]{2,50}$/)]],
      ape1: ['', Validators.pattern(/^[a-zA-ZñÑáéíóú]{2,50}$/)],
      ape2: ['', Validators.pattern(/^[a-zA-ZñÑáéíóú]{2,50}$/)],
      nif: ['', Validators.pattern(/^[0-9A-Z]{0,50}$/)],
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^[6789]\d{8}$/)]],
      email: ['', [Validators.maxLength(150), Validators.pattern(/^[\w\._]{5,30}\+?[\w]{0,10}@[\w\.\-]{3,}\.\w{2,5}$/)]],
      direccion: ['', Validators.maxLength(50)],
      codigo_postal: ['', Validators.pattern(/^(?:0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/)],
      poblacion: ['', Validators.maxLength(50)],
      provincia: ['', Validators.maxLength(50)],
      acepta1: ['NO', [Validators.required, Validators.pattern(/(SI|NO)/)]],
      acepta2: ['NO', Validators.pattern(/(SI|NO)/)],
      acepta3: ['NO', Validators.pattern(/(SI|NO)/)],
      num1: ['', Validators.pattern(/\d/)],
      num2: ['', Validators.pattern(/\d/)],
      num3: ['', Validators.pattern(/\d/)],
      dual1: ['NO', Validators.pattern(/(SI|NO)/)],
      dual2: ['NO', Validators.pattern(/(SI|NO)/)],
      dual3: ['NO', Validators.pattern(/(SI|NO)/)],
      variable1: ['', [Validators.maxLength(50), Validators.pattern(/^\w+$/)]],
      variable2: ['', [Validators.maxLength(50), Validators.pattern(/^\w+$/)]],
      variable3: ['', [Validators.maxLength(50), Validators.pattern(/^\w+$/)]],
      memo: ['', Validators.maxLength(8000)],
      fecha: ['', [Validators.minLength(8), Validators.maxLength(8)]],
      hora: ['', Validators.pattern(/^[0-9]{2}:[0-9]{2}$/)],
      foto1: ['', Validators.pattern(/^https?:\/\/[\w-\.]+\.\w{2,5}\/?\S*$/)],
      foto2: ['', Validators.pattern(/^https?:\/\/[\w-\.]+\.\w{2,5}\/?\S*$/)],
      comercial: ['', [Validators.required, Validators.maxLength(50)]],
      centro: ['', Validators.maxLength(50)]
    });
  }

  setFechaCaption(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;

    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyyMMdd HH:mm');
      this.form.get('fecha_captacion')?.setValue(formattedDate);
    }
  }

  setFecha(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;

    if (selectedDate) {
      const formattedDate = this.datePipe.transform(selectedDate, 'yyyyMMdd');
      this.form.get('fecha')?.setValue(formattedDate);
    }
  }

  registerLead(event: Event): void {
    event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: LeadDto = {
      "id": this.form.get('id')?.value,
      "campana": this.form.get('campana')?.value,
      "cod_proveedor": this.form.get('cod_proveedor')?.value,
      "fecha_captacion": this.form.get('fecha_captacion')?.value,
      "nombre": this.form.get('nombre')?.value,
      "ape1": this.form.get('ape1')?.value,
      "ape2": this.form.get('ape2')?.value,
      "nif": this.form.get('nif')?.value,
      "telefono": this.form.get('telefono')?.value,
      "email": this.form.get('email')?.value,
      "direccion": this.form.get('direccion')?.value,
      "codigo_postal": this.form.get('codigo_postal')?.value,
      "poblacion": this.form.get('poblacion')?.value,
      "provincia": this.form.get('provincia')?.value,
      "acepta1": this.form.get('acepta1')?.value,
      "acepta2": this.form.get('acepta2')?.value,
      "acepta3": this.form.get('acepta3')?.value,
      "num1": this.form.get('num1')?.value,
      "num2": this.form.get('num2')?.value,
      "num3": this.form.get('num3')?.value,
      "dual1": this.form.get('dual1')?.value,
      "dual2": this.form.get('dual2')?.value,
      "dual3": this.form.get('dual3')?.value,
      "variable1": this.form.get('variable1')?.value,
      "variable2": this.form.get('variable2')?.value,
      "variable3": this.form.get('variable3')?.value,
      "memo": this.form.get('memo')?.value,
      "fecha": this.form.get('fecha')?.value,
      "hora": this.form.get('hora')?.value,
      "foto1": this.form.get('foto1')?.value,
      "foto2": this.form.get('foto2')?.value,
      "comercial": this.form.get('comercial')?.value,
      "centro": this.form.get('centro')?.value
    }
    
    this.spinnerService.show();
    this.apiService.registerLead(dto)
      .subscribe({
        next: response => {
          this._snackBar.open(response.RESULTADO, 'Éxito', { duration: 2000 });
          this.spinnerService.hide();
        },
        error: error => {
          this._snackBar.open(error, 'Error', { duration: 2000 });
          this.spinnerService.hide();
        }
      });
  }
}
