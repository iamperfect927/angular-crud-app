import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder){
    this.empForm = this.fb.group({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
    }
  }
}
