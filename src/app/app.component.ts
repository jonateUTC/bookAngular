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
  public sort = '';
  public sortname = '';
  nsort = '';
  dsort = '';
  asort = '';
  dasort = '';
  nusort = '';
  psort = '';
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
    this.api.getAllBook(0, 'id', 5, 'asc').subscribe((data) => {
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
  filter(field: any) {
    let page = 0;
    let size = 5;
    this.sort = field;
    if (field == 'namebook') {
      if (this.nsort == '') {
        this.sortname = 'asc';
        this.nsort = 'asc';
        this.dsort = '';
        this.asort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
      } else if (this.nsort == 'asc') {
        this.sortname = 'desc';
        this.nsort = 'desc';
        this.dsort = '';
        this.asort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
      } else {
        this.sortname = '';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
        this.sort = 'id';
      }
    } else if (field == 'descriptionbook') {
      if (this.dsort == '') {
        this.sortname = 'asc';
        this.dsort = 'asc';
        this.nsort = '';
        this.asort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
      } else if (this.dsort == 'asc') {
        this.sortname = 'desc';
        this.dsort = 'desc';
        this.nsort = '';
        this.asort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
      } else {
        this.sortname = '';
        this.dsort = '';
        this.nsort = '';
        this.asort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
        this.sort = 'id';
      }
    } else if (field == 'authorbook') {
      if (this.asort == '') {
        this.sortname = 'asc';
        this.asort = 'asc';
        this.nsort = '';
        this.dsort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
      } else if (this.asort == 'asc') {
        this.sortname = 'desc';
        this.asort = 'desc';
        this.nsort = '';
        this.dsort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
      } else {
        this.sortname = '';
        this.asort = '';
        this.nsort = '';
        this.dsort = '';
        this.dasort = '';
        this.nusort = '';
        this.psort = '';
        this.sort = 'id';
      }
    } else if (field == 'datepublishbook') {
      if (this.dasort == '') {
        this.sortname = 'asc';
        this.dasort = 'asc';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.psort = '';
      } else if (this.dasort == 'asc') {
        this.sortname = 'desc';
        this.dasort = 'desc';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.psort = '';
      } else {
        this.sortname = '';
        this.dasort = '';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.psort = '';
        this.sort = 'id';
      }
    } else if (field == 'numberbook') {
      if (this.nusort == '') {
        this.sortname = 'asc';
        this.nusort = 'asc';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.dasort = '';
        this.psort = '';
      } else if (this.nusort == 'asc') {
        this.sortname = 'desc';
        this.nusort = 'desc';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.dasort = '';
        this.psort = '';
      } else {
        this.sortname = '';
        this.dasort = '';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.psort = '';
        this.sort = 'id';
      }
    } else if (field == 'pricebook') {
      if (this.psort == '') {
        this.sortname = 'asc';
        this.psort = 'asc';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.dasort = '';
      } else if (this.psort == 'asc') {
        this.sortname = 'desc';
        this.psort = 'desc';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.dasort = '';
      } else {
        this.sortname = '';
        this.dasort = '';
        this.nsort = '';
        this.dsort = '';
        this.asort = '';
        this.nusort = '';
        this.psort = '';
        this.sort = 'id';
      }
    } else {
      this.sort = 'id';
      this.sortname = 'asc';
    }
    this.api
      .getAllBook(page, this.sort, size, this.sortname)
      .subscribe((data) => {
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
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex - 1;
    let size = event.pageSize;
    page = page + 1;
    this.api
      .getAllBook(page, this.sort, size, this.sortname)
      .subscribe((data) => {
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
  getsoftBooks() {
    this.api.getAllBook(0, 'id', 5, this.sortname).subscribe((data) => {
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
