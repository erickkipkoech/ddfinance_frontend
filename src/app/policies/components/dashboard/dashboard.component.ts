import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../services/policy.service';
import { Policy } from '../../../models/policy';

@Component({
  selector: 'app-policy-dashboard',
  templateUrl: './policy-dashboard.component.html',
})
export class PolicyDashboardComponent implements OnInit {
  policies: Policy[] = [];
  searchQuery: string = '';
  showModal: boolean = false;
  selectedPolicy: Policy | null = null;

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

  openModal(policy: Policy | null = null) {
    this.selectedPolicy = policy;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPolicy = null;
  }

  deletePolicy(policyId: number) {
    this.policyService.deletePolicy(policyId).subscribe(() => {
      this.loadPolicies();
    });
  }

  applyFilter() {
    // Add logic for search and filtering if required
  }
}
