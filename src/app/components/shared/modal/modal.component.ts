import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataModal } from '../../../interfaces/DataModal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() dataModal: DataModal = {
    title: '',
    buttonAccept: 'Accept',
    buttonCancel: 'Cancel',
  };

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {}

  submit(value: boolean) {
    this.dialogRef.close(value);
  }
}
