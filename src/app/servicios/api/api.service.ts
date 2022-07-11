import { Injectable } from '@angular/core';
import { BookI } from '../../modelos/book.interface';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllBook(page:number, sortBy:string, size:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('page', String(page));
    if (sortBy != ''){
      params = params.append('sortBy', String(sortBy));
    }
    params = params.append('size', String(size));
    let direction = 'http://localhost:8290/api/books';
    return this.http.get<any>(direction, {params});
  }
}
