import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addpolicy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addpolicy.component.html',
  styleUrls: ['./addpolicy.component.css']
})

export class AddpolicyComponent {
  @Input() editMode = false; 
  @Input() policyToEdit: any = null; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() addPolicy = new EventEmitter<any>();
  @Output() updatePolicy = new EventEmitter<any>();

  newPolicy = { id: null, name: '', premium: 0, coverage: '' };

  ngOnInit() {
    if (this.editMode && this.policyToEdit) {
      this.newPolicy = { ...this.policyToEdit }; 
    }
  }

  submitPolicy() {
    if (this.editMode) {
      this.updatePolicy.emit({ ...this.newPolicy });
    } else {
      this.addPolicy.emit({ ...this.newPolicy });
    }
    this.newPolicy = { id: null, name: '', premium: 0, coverage: '' }; 
  }

  close() {
    this.closeModal.emit();
  }
}
