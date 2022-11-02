import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AddSchoolComponent } from './modals/add-school/add-school.component';
import { EditSchoolComponent } from './modals/edit-school/edit-school.component';
import { School } from './models/school.model';
import { SchoolsService } from './services/schools.service';
import swal from "sweetalert2";


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
  schools: School[] = [];
  displayedColumns: string[] = ['name', 'level' , 'streetName', 'suburb', 'city', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    public schoolsService: SchoolsService,
    private utilityService: UtilsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.schools);
    this.getSchools();
  }

  getSchools(){
    this.isLoadingData = true;
    this.schoolsService.getSchools().subscribe(res => {
      this.schools = res.data.school;
      this.dataSource.data = this.schools;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingData = false;
      console.log(this.schools);
    }, error => {
      this.isLoadingData = false;
      console.log(error);
    });
  }

  searchSchools(){
    this.dataSource.filter = this.searchControl.value;
  }
 

  checkboxLabel(row?: School): string {
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

  addSchool(){
    this.dialog.open(AddSchoolComponent, {
      width: '400px',
    })
  }

  editSchool(school: School){
    this.dialog.open(EditSchoolComponent, {
      width: '400px',
      data: school
    })
  }

  async deleteSchool(row: School){
    const results = await UtilsService.showDeleteAlert();
    if(results.isConfirmed){
      this.schoolsService.deleteSchool(row.id).subscribe(async result => {
         await this.schoolsService.schoolsQueryRef.refetch()
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
