import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from './models/booking.model';
import { BookingsService } from './services/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'creationDate', 'amount', 'duration', 'parking', 'made'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  bookings: Booking[] = [];
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private bs: BookingsService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.bookings);
    this.getBookings();
  }

  getBookings(){
    this.searchControl = new FormControl(null);
    this.isLoadingData = true;
    this.bs.getBookings().subscribe(response => {
      this.bookings = (response.data as any).bookings;
      this.dataSource.data = this.bookings;
      console.log(this.bookings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingData = false;
    });
  }

  searchBooking(){
    this.dataSource.filter = this.searchControl.value;
  }


  checkboxLabel(row?: Booking): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.dataSource.data);
    }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
}
