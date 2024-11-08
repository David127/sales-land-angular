import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LeadDto, ResponseApi } from '../models/mant.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  _snackBar = inject(MatSnackBar);

  registerLead(dto: LeadDto): Observable<ResponseApi> {
    return this.http.post<ResponseApi>('/api/AltaLead', dto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          const errorResponse: ResponseApi | undefined = error.error as ResponseApi;
          const mensajeError = errorResponse?.RESULTADO;
          return throwError(mensajeError);
        }
        return [];
      })
    )
  }
}
