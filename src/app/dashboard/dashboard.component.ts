import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';
import { AdherentService } from 'src/Services/adherent.service';
import { BicycleTypeService } from 'src/Services/bicycle-type.service';
import { BicycleService } from 'src/Services/bicycle.service';
import { RentalService } from 'src/Services/rental.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservationsByMonth: { month: string, count: number }[] = [];
  chartData: ChartDataset[] = [{ data: [], label: 'Bicycle Rentals' }];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {}
  };
  nb_Adherents!: number;
  nb_Bicycles!: number;
  nb_types!: number;

  chartDataPie: ChartDataset[] = [{ data: [], label: 'Bicycles by Type' }];
  chartLabelsPie: string[] = [];
  chartOptionsPie: ChartOptions = { responsive: true };

  constructor(
    private BTS: BicycleTypeService,
    private BS: BicycleService,
    private AS: AdherentService,
    private rental: RentalService
  ) { }

  ngOnInit(): void {
    this.getAdherent();
    this.loadReservationsByMonth();
    this.loadBicyclesByType();

    forkJoin([
      this.AS.getAll(),
      this.BTS.getAll(),
      this.BS.getAllBicycles()
    ]).subscribe(([adherents, bicycles, types]) => {
      this.nb_Adherents = adherents.length;
      this.nb_Bicycles = bicycles.length;
      this.nb_types = types.length;
    });
  }

  loadReservationsByMonth() {
    this.rental.getAll().subscribe(reservations => {
      const reservationsMap = new Map<string, number>();
      reservations.forEach(reservation => {
        const month = new Date(reservation.date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
        reservationsMap.set(month, (reservationsMap.get(month) || 0) + 1);
      });
      this.reservationsByMonth = Array.from(reservationsMap.entries()).map(([month, count]) => ({ month, count }));
      this.chartData[0].data = this.reservationsByMonth.map(entry => entry.count);
      this.chartLabels = this.reservationsByMonth.map(entry => entry.month);
    });
  }

  loadBicyclesByType() {
    forkJoin([
      this.BS.getAllBicycles(),
      this.BTS.getAll()
    ]).subscribe(([bicycles, types]) => {
      const typeMap = types.reduce((acc, type) => {
        acc[type.id] = type.type;
        return acc;
      }, {} as { [key: string]: string });

      const typeCounts = bicycles.reduce((acc, bicycle) => {
        const typeName = typeMap[bicycle.typeId] || 'Unknown';
        acc[typeName] = (acc[typeName] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      this.chartLabelsPie = Object.keys(typeCounts);
      this.chartDataPie[0].data = Object.values(typeCounts);
    });
  }

  getAdherent() {
    this.AS.getAll().subscribe((res) => {
      this.nb_Adherents = res.length;
    });
  }
}
