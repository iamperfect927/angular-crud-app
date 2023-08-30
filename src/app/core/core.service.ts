import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) {
    
   }

   openSnackBar(message: any, action: any = 'okay') {
    this._snackBar.open(message, action, {
      // duration: 10000,
      // Position: top 
    });
  }
}
function openSnackBar(message: any, any: any, action: any, any1: any) {
  throw new Error('Function not implemented.');
}

