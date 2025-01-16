import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Policy } from '../../../models/policy';
import { PolicyService } from '../../../services/policy.service';

@Component({
  selector: 'app-policy-modal',
  templateUrl: './policy-modal.component.html',
})
export class PolicyModalComponent {
  @Input() policy: Policy | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  newPolicy: Policy = {
    policyId: 0,
    policyName: '',
    premiumAmount: 0,
    policyType: '',
    startDate: '',
    endDate: '',
  };

  constructor(private policyService: PolicyService) {}

  ngOnInit() {
    if (this.policy) {
      this.newPolicy = { ...this.policy };
    }
  }

  savePolicy() {
    const saveObservable = this.policy?.policyId
      ? this.policyService.updatePolicy(this.newPolicy)
      : this.policyService.addPolicy(this.newPolicy);

    saveObservable.subscribe(() => {
      this.refresh.emit();
      this.close.emit();
    });
  }
}
