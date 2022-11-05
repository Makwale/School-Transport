import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { School } from '../learners/models/learner.model';
import { Transport } from './models/transport.model';
import { TransportService } from './services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  transports: School[] = [];
  displayedColumns: string[] = ['make', 'model', 'type', 'regno', 'capacity', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    public transportService: TransportService,
    private utilityService: UtilsService) { }

  ngOnInit(): void {
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.transports);
    this.getTransports();
  }

  getTransports(){
    this.isLoadingData = true;
    this.transportService.getTransports().subscribe(res => {
      this.transports = res.data.vehicle;
      this.dataSource.data = this.transports;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingData = false;
      console.log(this.transports);
    }, error => {
      this.isLoadingData = false;
      console.log(error);
    });
  }

  searchTransport(){
    this.dataSource.filter = this.searchControl.value;
  }
 

  checkboxLabel(row?: Transport): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.make
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

  addSchool(){
   //  this.dialog.open(CreateParkingLotComponent, {
   //    width: '400px',
   //  })
  }

  editParkingLot(school: Transport){
   //  this.dialog.open(EditParkingLotComponent, {
   //    width: '400px',
   //    data: parkingLot
   //  })
  }

  async deleteParking(row: Transport){
    const results = await UtilsService.showDeleteAlert();
    if(results.isConfirmed){
     
    }
  }

  generateReport(){
    const doc = new jsPDF({
      orientation: 'l',
    });

    doc?.text('PARKING LOT REPORT', 115, 20);
    let index = 1;
    doc?.cell(10, 40, 100, 10, 'Name'.toUpperCase(), index, 'left');
    doc?.cell(10, 40, 100, 10, 'Number of spaces'.toUpperCase(), index, 'left');

    index++;
    for (const parking of this.selection.selected) {
      console.log(parking);
      doc?.cell(10, 40, 100, 10, parking?.name?.toUpperCase(), index, 'left');
      doc?.cell(10, 40, 100, 10, parking?.numberOfSpots.toString(), index, 'left');

      index++;
    }
    doc?.save('Parking Lot Report.pdf');
  }

}
