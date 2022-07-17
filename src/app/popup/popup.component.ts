import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookI } from '../modelos/book.interface';
import { Bookmeta, Bookregister } from '../modelos/book.register';
import { ApiService } from '../servicios/api/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  datasaved = false;
  bookForm!: FormGroup;
  bookmeta: Bookmeta[] = [];
  dataSource: BookI[] = [];
  constructor(
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private api: ApiService
  ) {}
  @ViewChild('content') addview!: ElementRef;
  ngOnInit(): void {
    this.bookForm = this.formbuilder.group({
      namebook: [' ', [Validators.required]],
      descriptionbook: [' ', [Validators.required]],
      authorbook: [' ', [Validators.required]],
      datepublishbook: [' ', [Validators.required]],
      numberbook: [' ', [Validators.required]],
      pricebook: [' ', [Validators.required]],
    });
  }

  onFormSubmit() {
    this.datasaved = false;
    let book = this.bookForm.value;
    this.createbooks(book);
    this.bookForm.reset();
  }
  createbooks(book: Bookregister) {
    this.api.createbook(book).subscribe((book) => {
      this.datasaved = true;
      location.reload();
      alert('Registro guardado con éxito');
      this.getsoftBooks();
    });
  }
  getsoftBooks() {
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

  open() {
    const modalRef = this.modalService
      .open(this.addview, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
