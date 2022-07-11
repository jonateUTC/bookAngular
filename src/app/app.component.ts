import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { map } from 'rxjs';
import { BookI } from './modelos/book.interface';
import { Booklinks, Bookmeta, Bookregister } from './modelos/book.register';
import {ApiService} from './servicios/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'Libros';
  bookwrite: Bookregister[] = [];
  booklink: Booklinks[] = [];
  bookmeta: Bookmeta[] = [];
  dataSource: BookI[] = [];
  displayedColumns: string[] = ['namebook', 'descriptionbook', 'authorbook', 'datepublishbook', 'numberbook', 'pricebook', 'id'];
  pageEvent: PageEvent | undefined;
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.initDataSource();
  }
  initDataSource(){

    this.api.getAllBook(0,'id',5).subscribe(data =>{
      this.bookmeta = [{currentPage: data['number'], itemCount: data['size'], itemsPerPage: data['numberOfElements'], totalItems: data['totalElements'], totalPages: data['totalPages']}]
      this.dataSource = data['content']
      console.log(this.bookmeta);
    });
  }
  onPaginateChange(event: PageEvent){
    let page = event.pageIndex - 1;
    let size = event.pageSize;
    page = page + 1
    this.api.getAllBook(page,'id',size).subscribe(data =>{
      this.bookmeta = [{currentPage: data['number'], itemCount: data['numberOfElements'], itemsPerPage: data['size'], totalItems: data['totalElements'], totalPages: data['totalPages']}]
      this.dataSource = data['content']
      console.log(this.bookmeta);
    });
  }
  /*ngAfterViewInit() {
    this.api.getAllBook(0,'',5).subscribe(data =>{
      console.log(data);


    })
    this.dataSource.paginator = this.paginator;
  }*/
  clickAddTodo(id:any) {
    alert('hola!'+ id);
  }
}
/*export interface PeriodicElement {
  name: string;
  position: number;
  description: string;
  autor: string;
  date: Date;
  number: number;
  price: number;
}

const ELEMENT_DATA: Bookregister[] = [
  {position: 1, name: 'Hydrogen', description: '1.0079', autor: 'H', date: new Date(), number: 35, price: 25.52},
  {position: 2, name: 'Helium', description: '4.0026', autor: 'He', date: new Date(), number: 35, price: 25.52},
  {position: 3, name: 'Lithium', description: '6.941', autor: 'Li', date: new Date(), number: 35, price: 25.52},
  {position: 4, name: 'Beryllium', description: '9.0122', autor: 'Be', date: new Date(), number: 35, price: 25.52},
  {position: 5, name: 'Boron', description: '10.811', autor: 'B', date: new Date(), number: 35, price: 25.52},
  {position: 6, name: 'Carbon', description: '12.0107', autor: 'C', date: new Date(), number: 35, price: 25.52},
  {position: 7, name: 'Nitrogen', description: '14.0067', autor: 'N', date: new Date(), number: 35, price: 25.52},
  {position: 8, name: 'Oxygen', description: '15.9994', autor: 'O', date: new Date(), number: 35, price: 25.52},
  {position: 9, name: 'Fluorine', description: '18.9984', autor: 'F', date: new Date(), number: 35, price: 25.52},
  {position: 10, name: 'Neon', description: '20.1797', autor: 'Ne', date: new Date(), number: 35, price: 25.52},
  {position: 11, name: 'Sodium', description: '22.9897', autor: 'Na', date: new Date(), number: 35, price: 25.52},
  {position: 12, name: 'Magnesium', description: '24.305', autor: 'Mg', date: new Date(), number: 35, price: 25.52},
  {position: 13, name: 'Aluminum', description: '26.9815', autor: 'Al', date: new Date(), number: 35, price: 25.52},
  {position: 14, name: 'Silicon', description: '28.0855', autor: 'Si', date: new Date(), number: 35, price: 25.52},
  {position: 15, name: 'Phosphorus', description: '30.9738', autor: 'P', date: new Date(), number: 35, price: 25.52},
  {position: 16, name: 'Sulfur', description: '32.065', autor: 'S', date: new Date(), number: 35, price: 25.52},
  {position: 17, name: 'Chlorine', description: '35.453', autor: 'Cl', date: new Date(), number: 35, price: 25.52},
  {position: 18, name: 'Argon', description: '39.948', autor: 'Ar', date: new Date(), number: 35, price: 25.52},
  {position: 19, name: 'Potassium', description: '39.0983', autor: 'K', date: new Date(), number: 35, price: 25.52},
  {position: 20, name: 'Calcium', description: '40.078', autor: 'Ca', date: new Date(), number: 35, price: 25.52},
];

*/
