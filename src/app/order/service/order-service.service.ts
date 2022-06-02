import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/common/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private api: BaseHttpService) { }

  getProducts(pageSize:number, offSet: number, search: string): Observable<any> {
    return this.api.fetch(`products?pageSize=${pageSize}&offSet=${offSet}&search=${search}`);
  }
}
