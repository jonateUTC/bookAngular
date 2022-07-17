import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Bookedit } from '../modelos/book.register';
import { ApiService } from '../servicios/api/api.service';

@Component({
  selector: 'app-popupedit',
  templateUrl: './popupedit.component.html',
  styleUrls: ['./popupedit.component.scss'],
})
export class PopupeditComponent implements OnInit {
  @Input() public book!: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  datasaved = false;
  bookForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.formbuilder.group({
      id: [' ', [Validators.required]],
      namebook: [' ', [Validators.required]],
      descriptionbook: [' ', [Validators.required]],
      authorbook: [' ', [Validators.required]],
      datepublishbook: [' ', [Validators.required]],
      numberbook: [' ', [Validators.required]],
      pricebook: [' ', [Validators.required]],
    });
  }
  passBack() {
    this.passEntry.emit(this.book);
    this.activeModal.close(this.book);
  }
  onFormSubmit() {
    this.datasaved = false;
    let book = this.bookForm.value;
    this.editbooks(book);
  }
  editbooks(book: Bookedit) {
    this.api.editbook(book).subscribe((book) => {
      this.datasaved = true;
      location.reload();
      alert('Registro Actualizado con éxito');
    });
  }
}
