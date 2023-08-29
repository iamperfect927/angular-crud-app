import { Component, OnInit } from '@angular/core';
// import {  } from '@angular/core'

//components
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
// import { TableComponent } from './list-table/table/table.component';


//angular material
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './service/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';


import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
// import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-crud-app';
  filter: any = FormGroup<any>;

  displayedColumns: string[] = [ 'id', 'firstName', 'lastName', 'gender', 'email', 'dob', 'education', 'company', 'experience', 'package', 'action'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort! : MatSort

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  constructor(private _dialog: MatDialog, private _empService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent)
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editEmployee(){
    console.log("edit");
  }

  deleteEmployee(){
    console.log("delete");
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage;
    }
  }
}
