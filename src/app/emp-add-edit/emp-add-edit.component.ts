import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {
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

  constructor(private fb: FormBuilder, private _empService: EmployeeService, private _dialogRef: DialogRef<EmpAddEditComponent>){
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
    })
  }

  closeDialog(){
    // console.log("dialog closed");
    this._dialogRef.close();
    location.reload();
  }

  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully');
          this._dialogRef.close();
          location.reload();
        },
        error: (err: any) => {
          console.log(err);
          alert('Employee not added');
        }
      })
    }
  }
}
