import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Adherent } from 'src/Modeles/Adherent';
import { Bicycle } from 'src/Modeles/Bicycle';
import { Rental } from 'src/Modeles/Rental';
import { AdherentService } from 'src/Services/adherent.service';
import { BicycleService } from 'src/Services/bicycle.service';
import { RentalService } from 'src/Services/rental.service';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {

  @ViewChild('picker') picker!: MatDatepicker<Date>; // Ajout de la référence picker
  adherents!: Adherent[];
  bicycles!: Bicycle[];
  idcourant: string | null = null;
  form!: FormGroup;

  constructor(
    private RS: RentalService,
    private adherentService: AdherentService,
    private bicycleService: BicycleService,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<RentalFormComponent>
  ) {}

  ngOnInit(): void {
    this.getAdherents();
    this.getBicycles();
    this.idcourant = this.activatedRoute.snapshot.params['id'];

    if (this.idcourant) {
      this.RS.getRentalById(this.idcourant).subscribe((rental) => {
        this.initForm2(rental);
      });
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      startHour: new FormControl(null, [Validators.required]),
      endHour: new FormControl(null, [Validators.required]),
      adherentId: new FormControl(null, [Validators.required]),
      bicycleId: new FormControl(null, [Validators.required]),
    });
  }

  initForm2(rental: Rental): void {
    this.form = new FormGroup({
      date: new FormControl(rental.date, [Validators.required]),
      startHour: new FormControl(rental.startHour, [Validators.required]),
      endHour: new FormControl(rental.endHour, [Validators.required]),
      adherentId: new FormControl(rental.adherentId, [Validators.required]),
      bicycleId: new FormControl(rental.bicycleId, [Validators.required]),
    });
  }

  getAdherents(): void {
    this.adherentService.getAll().subscribe(adherents => {
      this.adherents = adherents;
    });
  }

  getBicycles(): void {
    this.bicycleService.getAllBicycles().subscribe(bicycles => {
      this.bicycles = bicycles;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
