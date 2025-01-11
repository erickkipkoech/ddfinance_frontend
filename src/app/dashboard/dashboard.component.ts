import { Component } from '@angular/core';
import { AddpolicyComponent } from '../addpolicy/addpolicy.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faAdd, faSearch, faForward, faBackward, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AddpolicyComponent, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  searchQuery: string = '';
  isSearchBarVisible = false;
  isModalOpen = false;
  isSearchModalOpen = false;
  isEditMode = false;
  isDashboardBlurred = false; 
  selectedPolicies: any[] = [];
  policyToEdit: any = null;
  newPolicy: any = {};
  currentPage = 1;
  pageSize = 8;

  faEdit = faEdit;
  faTrash = faTrash;
  faAdd = faAdd;
  faSearch = faSearch;
  faForward = faForward;
  faBackward = faBackward;
  faTimes = faTimes;

  policies = [
    { id: 1, name: 'Health Insurance', premium: 1200, coverage: 'Medical' },
    { id: 2, name: 'Car Insurance', premium: 800, coverage: 'Automobile' },
    { id: 3, name: 'Home Insurance', premium: 1500, coverage: 'Property' },
  ];

  toggleSearchModal() {
    this.isSearchModalOpen = !this.isSearchModalOpen;
    this.isDashboardBlurred = this.isSearchModalOpen;
  }

  closeSearchModal() {
    this.isSearchModalOpen = false;
    this.isDashboardBlurred = false;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.isSearchModalOpen) {
      this.closeSearchModal();
    }
  }

  openModal(mode: 'add' | 'edit') {
    this.isModalOpen = true;
    this.isEditMode = mode === 'edit';
    if (this.isEditMode && this.selectedPolicies.length === 1) {
      this.policyToEdit = { ...this.selectedPolicies[0] };
    } else {
      this.policyToEdit = null;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitPolicy() {
    if (this.isEditMode) {
      this.updatePolicy(this.policyToEdit);
    } else {
      this.addPolicy(this.newPolicy);
    }
  }

  addPolicy(newPolicy: any) {
    const newId = this.policies.length ? Math.max(...this.policies.map((p) => p.id)) + 1 : 1;
    this.policies.push({ id: newId, ...newPolicy });
    this.closeModal();
  }

  updatePolicy(updatedPolicy: any) {
    const index = this.policies.findIndex((p) => p.id === updatedPolicy.id);
    if (index !== -1) {
      this.policies[index] = updatedPolicy;
    }
    this.closeModal();
  }

  toggleSelection(policy: any) {
    const index = this.selectedPolicies.indexOf(policy);
    if (index === -1) {
      this.selectedPolicies.push(policy);
    } else {
      this.selectedPolicies.splice(index, 1);
    }
  }

  selectAll(event: any) {
    if (event.target.checked) {
      this.selectedPolicies = [...this.policies];
    } else {
      this.selectedPolicies = [];
    }
  }

  deleteSelectedPolicies() {
    this.policies = this.policies.filter((policy) => !this.selectedPolicies.includes(policy));
    this.selectedPolicies = [];
  }

  onSearch() {
    this.currentPage = 1;
    this.closeSearchBar();
  }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  closeSearchBar() {
    setTimeout(() => {
      this.isSearchBarVisible = false;
    }, 100);
  }

  get paginatedPolicies() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.policies.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.policies.length / this.pageSize);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
