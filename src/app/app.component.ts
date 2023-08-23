import { Component } from '@angular/core';

//components
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';


//angular material
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-app';

  constructor(private _dialog: MatDialog){}

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent)
  }
}
