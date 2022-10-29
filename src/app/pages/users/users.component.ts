import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'surname', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: User[] = [];
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.users);
    this.getUsers();
  }

  getUsers(){
    this.isLoadingData = true;
    this.userService.getUsers().subscribe(response => {
      this.users = response.data.users;
      this.dataSource.data = this.users;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingData = false;
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  searchUser(){
    this.dataSource.filter = this.searchControl.value;
  }

  async deleteUser(user: User){
    const results = await UtilsService.showDeleteAlert();
    if(results.isConfirmed){
      this.userService.deleteUser(user.id).subscribe(response => {
        this.userService.usersQueryRef.refetch();
      });
    }
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

    generateReport(){
      const doc = new jsPDF({
        orientation: 'l',
      });
  
      doc?.text('USERS REPORT', 115, 20);
      let index = 1;
      doc?.cell(10, 40, 55, 10, 'First Name'.toUpperCase(), index, 'left');
      doc?.cell(10, 40, 55, 10, 'Last Name'.toUpperCase(), index, 'left');
      doc?.cell(10, 40, 100, 10, 'Email'.toUpperCase(), index, 'left');

      index++;
      for (const user of this.selection.selected) {

        doc?.cell(10, 40, 55, 10, user?.name?.toUpperCase(), index, 'left');
        doc?.cell(10, 40, 55, 10, user?.surname?.toUpperCase(), index, 'left');
        doc?.cell(10, 40, 100, 10, `${user?.email}`, index, 'left');
        index++;
      }
      doc?.save('Users Report.pdf');
    }

}
