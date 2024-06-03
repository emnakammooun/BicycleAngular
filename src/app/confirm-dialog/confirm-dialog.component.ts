import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  //forcage de type ConfirmDialogComponent => dialog win ma n3ayetelha page hethi tet7ali comme une dialog
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

 title = 'Vous-avez sure ?';
 content = 'clicker sur le button pour supprimer';
 cancel = 'Annuler';
 del = 'Delete'; 
}
