import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';



@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  //formGroup
  empForm: any = FormGroup;

  // date picker
  startDate = new Date(2000, 0, 1);
  // endDate = new Date(2023, 0, 1);

  education: String[] = [
    'Undergraduate',
    'HND',
    'Bachelor',
    'Master',
    'PHD'
  ]

  constructor(private fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
    
      this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      dob: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    }),
    this.empForm.email = new FormControl('', [Validators.required, Validators.email]);

  }

  getErrorMessage() {
    if (this.empForm.email.hasError('required')) {
      return 'enter a valid email';
    }

    return this.empForm.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  closeDialog(){
    // console.log("dialog closed");
    this._dialogRef.close();
    location.reload();
  }

  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);

      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee updated successfully');
            this.coreService.openSnackBar('Employee updated successfully', 'done');
            this._dialogRef.close();
            location.reload();
          },
          error: (err: any) => {
            console.log(err);
            // alert('Employee not updated');
            this.coreService.openSnackBar('Employee not updated');
          }
        })
      }
      else{
          this._empService.addEmployee(this.empForm.value).subscribe({
            next: (val: any) => {
              // alert('Employee added successfully');
              this.coreService.openSnackBar('Employee added successfully', 'done');
              this._dialogRef.close();
              location.reload();
            },
            error: (err: any) => {
              console.log(err);
              alert('Employee not added');
              this.coreService.openSnackBar('Employee not added')
            }
          })
        } 
      }

      
  }
}
