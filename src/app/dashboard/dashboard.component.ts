import { Component, OnInit } from "@angular/core";
import { AddpolicyComponent } from "../addpolicy/addpolicy.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faEdit,
  faTrash,
  faAdd,
  faSearch,
  faForward,
  faBackward,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { PolicyService } from "../services/policy.service";
import { Policy } from "../models/policy.model";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [AddpolicyComponent, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  policies: Policy[] = [];
  searchQuery: string = "";
  showModal: boolean = false;
  selectedPolicy: Policy | null = null;
  selectedPolicyIds: number[] = [];

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

  constructor(private policyService: PolicyService) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this.policyService.getPolicies().subscribe((response) => {
      if (response.success) {
        this.policies = response.data || [];
      }
    });
  }

  // policies = [

  // ];

  toggleSearchModal() {
    this.isSearchModalOpen = !this.isSearchModalOpen;
    this.isDashboardBlurred = this.isSearchModalOpen;
  }

  closeSearchModal() {
    this.isSearchModalOpen = false;
    this.isDashboardBlurred = false;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && this.isSearchModalOpen) {
      this.closeSearchModal();
    }
  }

  openModal(mode: "add" | "edit") {
    if (mode === "edit") {
      if (this.selectedPolicies.length !== 1) {
        alert("Please select exactly one policy to edit.");
        return;
      }
      this.policyToEdit = { ...this.selectedPolicies[0] };
    } else {
      this.policyToEdit = null;
    }
    this.isEditMode = mode === "edit";
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addPolicy(newPolicy: any) {
    const newId = this.policies.length
      ? Math.max(...this.policies.map((p) => p.policyId)) + 1
      : 1;
    this.policies.push({ id: newId, ...newPolicy });
    
    this.closeModal();
  }

  updatePolicy(updatedPolicy: any) {
    const index = this.policies.findIndex(
      (p) => p.policyId === updatedPolicy.id
    );
    if (index !== -1) {
      this.policies[index] = updatedPolicy;
    }
    this.closeModal();
  }

  toggleSelection(policy: Policy) {
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

  deleteSelectedPolicies(): void {
    const policyIds = this.selectedPolicies.map((policy) => policy.policyId);

    if (policyIds.length === 0) {
      alert("Please select at least one policy to delete.");
      return;
    }

    const confirmationMessage =
      policyIds.length === 1
        ? "Are you sure you want to delete this policy?"
        : `Are you sure you want to delete ${policyIds.length} policies?`;

    if (confirm(confirmationMessage)) {
      this.policyService.deletePolicies(policyIds).subscribe(
        () => {
          alert("Policy(ies) deleted successfully.");
          this.loadPolicies(); 
        },
        (error) => {
          console.error("Error deleting policy(ies):", error);
          alert("Failed to delete policy(ies). Please try again.");
        }
      );
    }
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
