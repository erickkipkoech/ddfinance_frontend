import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
  filteredPolicies: Policy[] = [];
  searchQuery: string = "";
  showModal: boolean = false;

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
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;


  constructor(private policyService: PolicyService) { }
  successMessage: string = "";
  errorMessage: string = "";

  ngOnInit() {
    this.loadPolicies();
    this.filteredPolicies = [...this.policies];
  }

  loadPolicies() {
    this.policyService.getPolicies().subscribe((response) => {
      if (response.success) {
        this.policies = response.data || [];
      }
    },
      (error) => {
        this.errorMessage = "Failed to load policies. Please try again.";
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);

      });
  }

  addPolicy(data: any) {
    if (data) {
      this.policies.push(data);
      this.filteredPolicies = [...this.policies];
    }
  }

  updatePolicy(data: any) {
    if (data && data.policyId) {
      const index = this.policies.findIndex(policy => policy.policyId === data.policyId);
      if (index !== -1) {
        this.policies[index] = { ...this.policies[index], ...data };
        this.filteredPolicies = [...this.policies];
        this.selectedPolicies = [];
      }
    }
  }


  openModal(mode: "add" | "edit") {
    if (mode === "edit") {
      if (this.selectedPolicies.length !== 1) {
        this.errorMessage = "Please select exactly one policy to edit.";
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
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
    //this.loadPolicies();
    this.isModalOpen = false;
    
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
      this.errorMessage = "Please select at least one policy to delete.";
      setTimeout(() => {
        this.errorMessage = "";
      }, 1000);
      return;
    }

    const confirmationMessage =
      policyIds.length === 1
        ? "Are you sure you want to delete this policy?"
        : `Are you sure you want to delete ${policyIds.length} policies?`;

    if (confirm(confirmationMessage)) {
      this.policyService.deletePolicies(policyIds).subscribe(
        () => {
          this.policies = this.policies.filter(
            (policy) => !policyIds.includes(policy.policyId)
          );

          this.selectedPolicies = this.selectedPolicies.filter(
            (policy) => !policyIds.includes(policy.policyId)
          );

          this.filteredPolicies = [...this.policies];

          this.successMessage = "Policy(ies) deleted successfully.";

          setTimeout(() => {
            this.successMessage = "";
          }, 1000);

        },
        (error) => {
          this.errorMessage = "Failed to delete policy(ies). Please try again.";
          setTimeout(() => {
            this.errorMessage = "";
          }, 1000);
        }
      );
    }
  }

  onSearch() {
    this.filteredPolicies = this.policies.filter((policy) =>
      policy.policyName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
  }

  openSearchModal() {
    this.isSearchModalOpen = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus(); // Focus the input
    }, 2);
  }

  closeSearchModal() {
    this.isSearchModalOpen = false;
    this.filteredPolicies;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && this.isSearchModalOpen) {
      this.closeSearchModal();
    }
  }

  get paginatedPolicies() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredPolicies.slice(startIndex, startIndex + this.pageSize);
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
