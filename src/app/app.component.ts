import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { BookI } from './modelos/book.interface';
import {
  Bookedit,
  Booklinks,
  Bookmeta,
  Bookregister,
} from './modelos/book.register';
import { PopupeditComponent } from './popupedit/popupedit.component';
import { ApiService } from './servicios/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Libros';
  bookwrite: Bookedit[] = [];
  booklink: Booklinks[] = [];
  bookmeta: Bookmeta[] = [];
  dataSource: BookI[] = [];
  displayedColumns: string[] = [
    'namebook',
    'descriptionbook',
    'authorbook',
    'datepublishbook',
    'numberbook',
    'pricebook',
    'id',
  ];
  pageEvent: PageEvent | undefined;

  constructor(private api: ApiService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.initDataSource();
  }
  initDataSource() {
    this.api.getAllBook(0, 'id', 5).subscribe((data) => {
      this.bookmeta = [
        {
          currentPage: data['number'],
          itemCount: data['size'],
          itemsPerPage: data['numberOfElements'],
          totalItems: data['totalElements'],
          totalPages: data['totalPages'],
        },
      ];
      this.dataSource = data['content'];
    });
  }
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex - 1;
    let size = event.pageSize;
    page = page + 1;
    this.api.getAllBook(page, 'id', size).subscribe((data) => {
      this.bookmeta = [
        {
          currentPage: data['number'],
          itemCount: data['numberOfElements'],
          itemsPerPage: data['size'],
          totalItems: data['totalElements'],
          totalPages: data['totalPages'],
        },
      ];
      this.dataSource = data['content'];
      console.log(this.bookmeta);
    });
  }
  clickAddTodo(book: Bookedit) {
    const modalRef = this.modalService.open(PopupeditComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    modalRef.componentInstance.book = book;
    modalRef.result.then((result) => {});
  }
  onFormSubmit() {
    alert('prueba');
  }
  getsoftBooks() {
    this.api.getAllBook(0, 'id', 5).subscribe((data) => {
      this.bookmeta = [
        {
          currentPage: data['number'],
          itemCount: data['size'],
          itemsPerPage: data['numberOfElements'],
          totalItems: data['totalElements'],
          totalPages: data['totalPages'],
        },
      ];
      this.dataSource = data['content'];
    });
    alert('Registro eliminado');
  }

  deletebook(id: any) {
    this.api.BookDelete(id).subscribe((book) => {
      this.getsoftBooks();
    });
  }
}
