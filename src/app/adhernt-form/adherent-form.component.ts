import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdherentService } from 'src/Services/adherent.service';

@Component({
  selector: 'app-adhernt-form',
  templateUrl: './adherent-form.component.html',
  styleUrls: ['./adherent-form.component.css']
})
export class AdherentFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<AdherentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private adherentService: AdherentService // Inject AdherentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data && this.data.id) {
      this.adherentService.getById(this.data.id).subscribe(adherent => {
        this.form.patchValue(adherent);
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      numtel: new FormControl(null, [Validators.required]),
      adresse: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      dateInscription: new FormControl(null, [Validators.required])
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
