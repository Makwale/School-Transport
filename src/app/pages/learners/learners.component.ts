import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwServerError } from '@apollo/client/core';
import jsPDF from 'jspdf';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CreateParkingLotComponent } from '../parking-lot/modals/create-parking-lot/create-parking-lot.component';
import { EditParkingLotComponent } from '../parking-lot/modals/edit-parking-lot/edit-parking-lot.component';
import { Parking } from '../parking-lot/models/parking.model';
import { User } from '../users/models/user.model';
import { Learner } from './models/learner.model';
import { LearnersService } from './services/learners.service';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.scss']
})
export class LearnersComponent implements OnInit {
  learners: Learner[] = [];
  displayedColumns: string[] = ['name', 'surname', 'grade', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(public learnersService: LearnersService) { }

  ngOnInit(): void {
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.learners);
    this.getLeaners();
  }

  getLeaners(){
    this.isLoadingData = true;
    this.learnersService.getLearners().subscribe(res => {
      this.learners = res.data.learner;
      this.dataSource.data = this.learners;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingData = false;
      console.log(this.learners);
    }, error => {
      this.isLoadingData = false;
      console.log(error);
    })
  }

  searchLearners(){
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
    //  this.dialog.open(CreateParkingLotComponent, {
    //    width: '400px',
    //  })
   }
 
   editParkingLot(parkingLot: Parking){
    //  this.dialog.open(EditParkingLotComponent, {
    //    width: '400px',
    //    data: parkingLot
    //  })
   }
 
   async deleteParking(row: Parking){
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
