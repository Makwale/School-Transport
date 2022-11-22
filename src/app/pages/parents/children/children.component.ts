import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { AccountService } from 'src/app/services/account.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Driver } from '../../drivers/models/driver.model';
import { AddDriversComponent } from '../../owners/modals/owner/add-drivers/add-drivers.component';
import { EditDriverComponent } from '../../owners/modals/owner/edit-driver/edit-driver.component';
import { OwnersService } from '../../owners/services/owners.service';
import swal from "sweetalert2";
import { Child } from '../models/parent.model';
import { ParentService } from '../services/parent.service';
import { AddChildComponent } from '../modals/add-child/add-child.component';
import { EditChildComponent } from '../modals/edit-child/edit-child.component';
import { School } from '../../learners/models/learner.model';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent implements OnInit {

  children: Child[] = [];
  displayedColumns: string[] = ['name', 'surname', 'school', 'level', 'grade', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  schools: School[];
  constructor(
    private acs: AccountService,
    public dialog: MatDialog,
    public parentService: ParentService
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl();
    this.dataSource = new MatTableDataSource(this.children);
    this.getChildren();
  }

  searchChildren(){
    this.dataSource.filter = this.searchControl.value;
  }

  getChildren(){
    this.isLoadingData = true;
    this.parentService.getChildren(this.acs.user?.id).subscribe(res => {
      console.log(res);
      this.children = res.data.learner;
      this.dataSource.data = this.children;
      this.schools = res.data.school;
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
    
   addChild(){
     this.dialog.open(AddChildComponent, {
       width: '600px',
       data: {
        schools: this.schools
       }
     })
   }
 
   editChild(child: Child){
     this.dialog.open(EditChildComponent, {
       width: '600px',
       height: '800px',
       data: {child, schools: this.schools}
     })
   }
 
   async deleteChild(row: Child){
     const results = await UtilsService.showDeleteAlert();
    //  if(results.isConfirmed){
    //     this.parentService.deleteDriver(row.id).subscribe(response => {
    //       swal.fire({
    //         title: "Successfully created",
    //         icon: "success",
    //       });
    //       this.parentService.driversQueryRef.refetch();
    //     }, error => {
    //       swal.fire({
    //         title: error.message,
    //         icon: "error",
    //       });
    //   });
    //  }
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
