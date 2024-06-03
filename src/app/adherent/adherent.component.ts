import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdherentService } from 'src/Services/adherent.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Adherent } from 'src/Modeles/Adherent';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdherentFormComponent } from '../adhernt-form/adherent-form.component';

@Component({
  selector: 'app-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: ['./adherent.component.css']
})
export class AdherentComponent implements OnInit{

  constructor(private AS: AdherentService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getAdherents();
  }

  datasource = new MatTableDataSource<Adherent>()
  displayedColumns: string[] = ['id','name', 'email', 'numtel','adresse','dateNaissance','dateInscription','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getAdherents() {
    this.AS.getAll().subscribe((r) => {
      this.datasource.data = r;
    });
  }

  delete(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.AS.delete(id).subscribe(() => {
          this.getAdherents();
        });
      }
    });   
  }
  
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    let dialogRef = this.dialog.open(AdherentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data) { // Check if data is not undefined
        this.AS.create(data).subscribe(() => {
          this.getAdherents();
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
    this.AS.getById(id).subscribe((r) => {
      dialogConfig.data = r;
      let dialogRef = this.dialog.open(AdherentFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        if(data) { // Check if data is not undefined
          this.AS.update(id, data).subscribe(() => {
            this.getAdherents();
          });
        }
      });
    }); 
  }

  ngAfterViewInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  applyFilter(adherent: Adherent) {
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}
