import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { EmployeeService } from 'src/app/service/employee.service';
// import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {

  constructor(private _dialogRef: MatDialogRef<ConfirmDeleteComponent>, private _empService: EmployeeService,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) private data: number,
    ){ 
     }


  closeDialog(){
    this._dialogRef.close();
    location.reload();
  }

  deleteEmployee(){
    // console.log(this.data);
    this._empService.deleteEmployee(this.data).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('employee deleted', 'done');
        location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}