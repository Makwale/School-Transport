import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Driver } from '../drivers/models/driver.model';
import { Owner } from './models/owner.model';
import { OwnersService } from './services/owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  owners: Owner[] = [];
  displayedColumns: string[] = ['name', 'surname', 'phone', 'email'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    public ownersService: OwnersService,
    private acs: AccountService,
    private ds: DatabaseService) { }

  ngOnInit(): void {
    this.isLoadingData = true;
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.owners);
    this.getOwners();
  }


  getOwners(){
    this.ds.getOwners().valueChanges.subscribe(res => {
      console.log(res);
      this.owners = (res.data as any).owners;
      this.dataSource.data = this.owners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingData = false;
    });
  }


  searchOwners(){
    this.dataSource.filter = this.searchControl.value;
  }
 
 
   checkboxLabel(row?: Driver): string {
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
 
   addDriver(){
    //  this.dialog.open(CreateParkingLotComponent, {
    //    width: '400px',
    //  })
   }
 
   editParkingLot(parkingLot: Driver){
    //  this.dialog.open(EditParkingLotComponent, {
    //    width: '400px',
    //    data: parkingLot
    //  })
   }
 
   async deleteParking(row: Driver){
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
