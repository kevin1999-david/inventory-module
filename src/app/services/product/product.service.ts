import { Injectable } from '@angular/core';
import { API } from "./../APIS/api.global";
import { Product } from "./../../models/product.interface";
import { Detail } from "./../../models/setting.interface";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API.inventory + "/products")
      .pipe(catchError(this.handleError));
  }


  getALittle(take: string, skip: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${API.inventory}/products/little/${take}/${skip}`)
  }


  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${API.inventory}/products/${id}`);
  }

  getProductsCount(): Promise<any> {
    return this.http.get<Product>(`${API.inventory}/products/count/all`).toPromise();
  }

  getMovements(id: string): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${API.inventory}/products/movements/${id}`);
  }


  new(product: Product): Observable<any> {
    //let params = JSON.stringify(bode);

    return this.http.post<any>(`${API.inventory}/products`, product)
      .pipe(catchError(this.handleError));;
  }

  getLike(text: string): Observable<any> {
    return this.http.get<any>(`${API.inventory}/products/like/${text}`);
  }

  update(product: Product): Observable<any> {
    return this.http.put<any>(`${API.inventory}/products/${product.id}`, product)
      .pipe(catchError(this.handleError));;
  }


  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${API.inventory}/products/${id}`)
      .pipe(catchError(this.handleError));;
  }


  handleError(error: any): Observable<never> {
    let errorMessage: string = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  };
}
