import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BicycleTypeService } from 'src/Services/bicycle-type.service';

@Component({
  selector: 'app-bicycle-type-form',
  templateUrl: './bicycle-type-form.component.html',
  styleUrls: ['./bicycle-type-form.component.css']
})
export class BicycleTypeFormComponent implements OnInit{
  form!: FormGroup;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<BicycleTypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private typeformService: BicycleTypeService // Inject AdherentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data && this.data.id) {
      this.typeformService.getById(this.data.id).subscribe(type => {
        this.form.patchValue(type);
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
   
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
