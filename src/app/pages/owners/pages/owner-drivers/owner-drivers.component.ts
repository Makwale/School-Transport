import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { AccountService } from 'src/app/services/account.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Driver } from '../../models/owner.model';
import { MatDialog } from '@angular/material/dialog';
import { AddDriversComponent } from '../../modals/add-drivers/add-drivers.component';
import { OwnersService } from '../../services/owners.service';
import { EditDriverComponent } from '../../modals/edit-driver/edit-driver.component';
import swal from "sweetalert2";

@Component({
  selector: 'app-owner-drivers',
  templateUrl: './owner-drivers.component.html',
  styleUrls: ['./owner-drivers.component.scss']
})
export class OwnerDriversComponent implements OnInit {
  drivers: Driver[] = [];
  displayedColumns: string[] = ['name', 'surname', 'email', 'phone', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private acs: AccountService,
    public dialog: MatDialog,
    public ownersService: OwnersService
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl();
    this.dataSource = new MatTableDataSource(this.drivers);
    this.getDrivers();
  }

  searchDrivers(){
    this.dataSource.filter = this.searchControl.value;
  }

  getDrivers(){
    this.isLoadingData = true;
    this.ownersService.getDrivers(this.acs.user?.id).subscribe(res => {
      this.drivers = res.data.driver;
      this.dataSource.data = this.drivers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingData = false;
    })
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
     this.dialog.open(AddDriversComponent, {
       width: '600px',
     })
   }
 
   editDriver(driver: Driver){
     this.dialog.open(EditDriverComponent, {
       width: '600px',
       data: driver
     })
   }
 
   async deleteDriver(row: Driver){
     const results = await UtilsService.showDeleteAlert();
     if(results.isConfirmed){
        this.ownersService.deleteDriver(row.id).subscribe(response => {
          swal.fire({
            title: "Successfully created",
            icon: "success",
          });
          this.ownersService.driversQueryRef.refetch();
        }, error => {
          swal.fire({
            title: error.message,
            icon: "error",
          });
      });
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
