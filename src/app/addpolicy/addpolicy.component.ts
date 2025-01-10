import { Component,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addpolicy',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addpolicy.component.html',
  styleUrl: './addpolicy.component.css'
})
export class AddpolicyComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() addPolicy = new EventEmitter<any>();

  newPolicy = { name: '', premium: 0, coverage: '' };

  submitPolicy() {
    this.addPolicy.emit({ ...this.newPolicy });
    this.newPolicy = { name: '', premium: 0, coverage: '' };
  }
}
