import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(private http: HttpClient) { }

  private getUrl(url: string): string {
    return `api/${url}`
  }

  fetch(url: string, params = {}): Observable<any> {
    console.log()
    return this.http.get<any>(this.getUrl(url), {params})
      .pipe(catchError(this.handleError.bind(this)))
  }

  private handleError(err: any) {
    console.log(err)
    if (err instanceof HttpErrorResponse) {
      console.error('Api returned code', err.status, 'body was:', err.error);
      let error: any = { statusCode: err.status, error: err.error };
      return throwError(error);
    } else {
      return throwError(String(err));;
    }
  }

}

