import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BicycleType } from 'src/Modeles/BicycleType';
import { Bicycle } from 'src/Modeles/Bicycle';
import { BicycleService } from 'src/Services/bicycle.service';
import { BicycleFormComponent } from '../bicycle-form/bicycle-form.component';

@Component({
  selector: 'app-bicycles',
  templateUrl: './bicycles.component.html',
  styleUrls: ['./bicycles.component.css']
})

  export class BicyclesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'model', 'color', 'image', 'isAvailable','type', 'action'];
    dataSource = new MatTableDataSource<Bicycle>();
    bicycleTypes: BicycleType[] = [];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(private bicycleService: BicycleService, private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.getBicycles();
      this.getBicycleTypes();
    }
  
    getBicycles() {
      this.bicycleService.getAllBicycles().subscribe((bicycles) => {
        this.dataSource.data = bicycles;
      });
    }
  
    getBicycleTypes() {
      this.bicycleService.getAllBicycleTypes().subscribe((types) => {
        this.bicycleTypes = types;
      });
    }
  
    getTypeName(typeId: string): string {
      const type = this.bicycleTypes.find(t => t.id === typeId);
      return type ? type.type : 'Unknown';
    }
  
    delete(id: string): void {
      let dialogRef = this.dialog.open(ConfirmDialogComponent, {
        height: '200px',
        width: '300px',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.bicycleService.deleteBicycle(id).subscribe(() => {
            this.getBicycles();
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
      let dialogRef = this.dialog.open(BicycleFormComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.bicycleService.createBicycle(data).subscribe(() => {
            this.getBicycles();
          });
        }
      });
    }
  
    update(id: string): void {
      // Fetch the current bicycle data
      this.bicycleService.getBicycleById(id).subscribe((bicycle) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '500px';
        dialogConfig.width = '500px';
        dialogConfig.data = bicycle;  // Pass the current bicycle data to the dialog
    
        // Open the dialog with the current bicycle data
        let dialogRef = this.dialog.open(BicycleFormComponent, dialogConfig);
    
        // Subscribe to the afterClosed event
        dialogRef.afterClosed().subscribe(data => {
          if (data) {
            // If data is returned, update the bicycle
            this.bicycleService.updateBicycle(id, data).subscribe(() => {
              this.getBicycles();  // Refresh the bicycles list
            });
          }
        });
      });
    }
    
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  