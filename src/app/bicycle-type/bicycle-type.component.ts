import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BicycleTypeService } from 'src/Services/bicycle-type.service';
import { BicycleType } from 'src/Modeles/BicycleType';
import { BicycleTypeFormComponent } from '../bicycle-type-form/bicycle-type-form.component';

@Component({
  selector: 'app-bicycle-type',
  templateUrl: './bicycle-type.component.html',
  styleUrls: ['./bicycle-type.component.css']
})
export class BicycleTypeComponent implements OnInit{

  constructor(private BTS: BicycleTypeService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getTypes();
  }

  datasource = new MatTableDataSource<BicycleType>()
  displayedColumns: string[] = ['id','type','action'];
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getTypes() {
    this.BTS.getAll().subscribe((r) => {
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
        this.BTS.delete(id).subscribe(() => {
          this.getTypes();
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
    let dialogRef = this.dialog.open(BicycleTypeFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data) { // Check if data is not undefined
        this.BTS.create(data).subscribe(() => {
          this.getTypes();
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
    this.BTS.getById(id).subscribe((r) => {
      dialogConfig.data = r;
      let dialogRef = this.dialog.open(BicycleTypeFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        if(data) { // Check if data is not undefined
          this.BTS.update(id, data).subscribe(() => {
            this.getTypes();
          });
        }
      });
    }); 
  }

  ngAfterViewInit() {
   // this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

 /* applyFilter(adherent: Adherent) {
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }*/
}
