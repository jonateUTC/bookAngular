import { Injectable } from '@angular/core';
import { BookI } from '../../modelos/book.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookregister } from 'src/app/modelos/book.register';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  bookUrl = 'http://localhost:8290/api/';

  createbook(book: Bookregister): Observable<Bookregister> {
    let httpheaders = new HttpHeaders().set('Content-type', 'application/Json');
    let options = {
      headers: httpheaders,
    };
    console.log(book);
    let direction = this.bookUrl + 'bookcreate';
    return this.http.post<Bookregister>(direction, book, options);
  }

  getAllBook(page: number, sortBy: string, size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    if (sortBy != '') {
      params = params.append('sortBy', String(sortBy));
    }
    params = params.append('size', String(size));
    let direction = this.bookUrl + 'books';
    return this.http.get<any>(direction, { params });
  }
  BookDelete(bookid: String): Observable<number> {
    return this.http.delete<number>(this.bookUrl + 'booksdelete/' + bookid);
  }
}
