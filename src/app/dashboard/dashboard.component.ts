import { Component } from '@angular/core';
import { AddpolicyComponent } from '../addpolicy/addpolicy.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-dashboard',
  imports:[AddpolicyComponent,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  searchQuery: string = '';
  isAddPolicyModalOpen = false;

  policies = [
    { id: 1, name: 'Health Insurance', premium: 1200, coverage: 'Medical' },
    { id: 2, name: 'Car Insurance', premium: 800, coverage: 'Automobile' },
    { id: 3, name: 'Home Insurance', premium: 1500, coverage: 'Property' },
  ];

  openAddPolicyModal() {
    this.isAddPolicyModalOpen = true;
  }

  closeAddPolicyModal() {
    this.isAddPolicyModalOpen = false;
  }

  handleAddPolicy(policy: any) {
    policy.id = this.policies.length + 1; // Auto-generate ID
    this.policies.push(policy);
    this.closeAddPolicyModal();
  }

  filteredPolicies() {
    return this.policies.filter((policy) =>
      policy.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  editPolicy(policy: any) {
    alert(`Edit functionality not yet implemented for ${policy.name}`);
  }

  deletePolicy(policy: any) {
    this.policies = this.policies.filter((p) => p.id !== policy.id);
  }
}
