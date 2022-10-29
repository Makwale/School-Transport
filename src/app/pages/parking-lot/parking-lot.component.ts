import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../users/models/user.model';
import { CreateParkingLotComponent } from './modals/create-parking-lot/create-parking-lot.component';
import { Parking } from './models/parking.model';
import { ParkingLotService } from './services/parking-lot.service';
import swal from "sweetalert2";
import { UtilsService } from 'src/app/shared/services/utils.service';
import { EditParkingLotComponent } from './modals/edit-parking-lot/edit-parking-lot.component';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'numberOfSpots', 'spotsAvailable', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  parkings: Parking[] = [];
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private ps: ParkingLotService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.parkings);
    this.getParkings();
  }

  getParkings(){
    this.isLoadingData = true;
    this.ps.getParkingLots().subscribe(response => {
      this.parkings = response.data.parkings;
      console.log(this.parkings);
      this.dataSource.data = this.parkings;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingData = false;
    });
  }

  searchParking(){
   this.dataSource.filter = this.searchControl.value;
  }


  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.name
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

  addParkingLot(){
    this.dialog.open(CreateParkingLotComponent, {
      width: '400px',
    })
  }

  editParkingLot(parkingLot: Parking){
    this.dialog.open(EditParkingLotComponent, {
      width: '400px',
      data: parkingLot
    })
  }

  async deleteParking(row: Parking){
    const results = await UtilsService.showDeleteAlert();
    if(results.isConfirmed){
      this.ps.deleteParkingLot(row.id).subscribe( response => {
        this.ps.parkingsQueryRef.refetch();
        swal.fire({
          title: "Successfully deleted",
          icon: "success",
        });
      })
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
