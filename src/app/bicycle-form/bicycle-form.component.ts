import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BicycleType } from 'src/Modeles/BicycleType';
import { BicycleService } from 'src/Services/bicycle.service';

@Component({
  selector: 'app-bicycle-form',
  templateUrl: './bicycle-form.component.html',
  styleUrls: ['./bicycle-form.component.css']
})
export class BicycleFormComponent implements OnInit {
  bicycleForm: FormGroup;
  types: BicycleType[] = [];

  constructor(
    private fb: FormBuilder,
    private bicycleService: BicycleService,
    private dialogRef: MatDialogRef<BicycleFormComponent>
  ) {
    this.bicycleForm = this.fb.group({
      model: ['', Validators.required],
      color: ['', Validators.required],
      isAvailable: [false, Validators.required],
      typeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.bicycleService.getAllBicycleTypes().subscribe((types) => {
      this.types = types;
    });
  }

  onSubmit(): void {
    if (this.bicycleForm.valid) {
      this.dialogRef.close(this.bicycleForm.value);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
