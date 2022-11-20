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
import { Driver, Vehicle } from '../../../models/owner.model';
import { OwnersService } from '../../../services/owners.service';
import swal from "sweetalert2";
import { AddVehicleComponent } from '../../../modals/owner/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from '../../../modals/owner/edit-vehicle/edit-vehicle.component';
import { Router } from '@angular/router';
import { School } from 'src/app/pages/learners/models/learner.model';

@Component({
  selector: 'app-owners-transports',
  templateUrl: './owners-transports.component.html',
  styleUrls: ['./owners-transports.component.scss']
})
export class OwnersTransportsComponent implements OnInit {

  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['make', 'model', 'type', 'regno', 'capacity', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchControl: FormControl;
  isLoadingData: boolean;
  selection = new SelectionModel<any>(true, []);
  make = [];
  model = [];
  modelOfMake = []
  types = [];
  schools: School[];
  drivers: Driver[];
  userId: string;
  constructor(
    private acs: AccountService,
    public dialog: MatDialog,
    public ownersService: OwnersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.acs.user.id;
    this.searchControl = new FormControl();
    this.dataSource = new MatTableDataSource(this.vehicles);
    this.types = [
      {
        name: 'Bus',
        value: 'bus'
      },
      {
        name: 'Mini Bus',
        value: 'mini_bus'
      },
      {
        name: 'Taxi',
        value: 'taxi'
      },
    ]
    this.make = [
      {
        name: 'Toyota',
        value: 'toyota',
        models: [
          {
            name: 'Quantum',
            value: 'qua',
          },
          {
            name: 'HiAce',
            value: 'hiace',
          }
        ]
      },
      {
        name: 'Mercedes Benz',
        value: 'merc',
        models: [
          {
            name: 'Sprinter',
            value: 'sprinter',
          }
        ]
      }
    ];
    this.getVehicles();
  }

  searchDrivers(){
    this.dataSource.filter = this.searchControl.value;
  }

  getVehicles(){
    this.isLoadingData = true;
    this.ownersService.getVehicles(this.userId).subscribe(res => {
      this.vehicles = res.data.vehicle;
      this.schools = res.data.school;
      this.drivers = res.data.driver;
      this.dataSource.data = this.vehicles;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingData = false;
    })
  }
 
  getMake(make: string){
    return this.make.find(m => m.value === make);
  }

  getModelMake(make: string, model: string){
    const temp = this.make.find(m => m.value === make);
    return temp.models.find(m => m.value === model);
  }

  getType(value: string){
    return this.types.find(type => type.value === value);
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
    
   addVehicle(){
     this.dialog.open(AddVehicleComponent, {
       width: '600px',
     })
   }
 
   editVehicle(vehicle: Vehicle){
     const dialogRef = this.dialog.open(EditVehicleComponent, {
       width: '600px',
       data: {
        vehicle,
        schools: this.schools,
        drivers: this.drivers
      }
     });

     dialogRef.afterClosed().subscribe(res => {
      this.getVehicles();
     })
   }
 
   async deleteVehicle(row: Driver){
     const results = await UtilsService.showDeleteAlert();
     if(results.isConfirmed){
        this.ownersService.deleteVehicle(row.id).subscribe(response => {
          swal.fire({
            title: "Successfully deleted",
            icon: "success",
          });
          this.ownersService.vehiclesQueryRef.refetch();
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
