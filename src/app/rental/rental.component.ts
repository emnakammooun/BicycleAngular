import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Adherent } from 'src/Modeles/Adherent';
import { Bicycle } from 'src/Modeles/Bicycle';
import { Rental } from 'src/Modeles/Rental';
import { AdherentService } from 'src/Services/adherent.service';
import { BicycleService } from 'src/Services/bicycle.service';
import { RentalService } from 'src/Services/rental.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RentalFormComponent } from '../rental-form/rental-form.component';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  displayedColumns: string[] = ['1', '2', '3', '4', 'adherentName', '6', '7'];
  dataSource!: MatTableDataSource<Rental>;
  adherents: Adherent[] = [];
  bicycles: Bicycle[] = [];

  constructor(
    private rentalService: RentalService,
    private adherentService: AdherentService,
    private bicycleService: BicycleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRentals();
    this.loadAdherents();
    this.loadBicycles();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    let dialogRef = this.dialog.open(RentalFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.rentalService.ONSAVE(data).subscribe(() => {
          this.getRentals();
        });
      }
    });
  }
  

  loadRentals() {
    this.rentalService.getAll().subscribe((rentals) => {
      this.dataSource = new MatTableDataSource(rentals);
    });
  }

  loadAdherents() {
    this.adherentService.getAll().subscribe((adherents) => {
      this.adherents = adherents;
    });
  }

  loadBicycles() {
    this.bicycleService.getAllBicycles().subscribe((bicycles) => {
      this.bicycles = bicycles;
    });
  }

  getAdherentName(adhehrentd: string): string {
    const adherent = this.adherents.find((c) => c.id === adhehrentd);
    return adherent ? adherent.name : 'N/A';
  }

  getBicycleName(bicycleId: string): string {
    const bicycle = this.bicycles.find((s) => s.id === bicycleId);
    return bicycle ? bicycle.model : 'N/A';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    // 2. attendre le résultat de l'utilisateur
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rentalService.ONDELETE(id).subscribe(() => {
          this.loadRentals();
        });
      }
    });
  }
  update(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    this.rentalService.getRentalById(id).subscribe((rental) => {
      dialogConfig.data = rental;
      let dialogRef = this.dialog.open(RentalFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.rentalService.updateRental(id, data).subscribe(() => {
            this.getRentals();
          });
        }
      });
    });
  }
  getRentals() {
    this.rentalService.getAll().subscribe((rentals) => {
      this.dataSource.data = rentals;
    });
  }
  }
  




