import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Policy } from "../models/policy.model";
import { PolicyService } from "../services/policy.service";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-addpolicy",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: "./addpolicy.component.html",
  styleUrls: ["./addpolicy.component.css"],
  providers: [DatePipe],
})
export class AddpolicyComponent {
  @Input() editMode = false;
  @Input() policyToEdit: any = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() addPolicy = new EventEmitter<any>();
  @Output() updatePolicy = new EventEmitter<any>();

  @Input() policy: Policy | null = null;
  @Output() refresh = new EventEmitter<void>();

  newPolicy: Policy = {
    policyId: 0,
    policyName: "",
    premiumAmount: 0,
    policyType: "",
    startDate: new Date(),
    endDate: new Date(),
  };

  constructor(
    private policyService: PolicyService,
    private datePipe: DatePipe
  ) {}

  dbErrors: { [key: string]: string } = {};
  
  ngOnInit() {
    if (this.editMode && this.policyToEdit) {
      this.newPolicy = { ...this.policyToEdit };
    } else {
      // Reset the form for adding a new policy
      this.newPolicy = {
        policyId: 0,
        policyName: "",
        premiumAmount: 0,
        policyType: "",
        startDate: new Date(),
        endDate: new Date(),
      };
    }
  }

  savePolicy() {
    // Add or Update based on editMode
    const saveObservable = this.editMode
      ? this.policyService.updatePolicy(this.newPolicy)
      : this.policyService.addPolicy(this.newPolicy);

    saveObservable.subscribe({
      next: () => {
        this.refresh.emit();
        this.closeModal.emit();
      },
      error: (error) => {
        if (error && error.error) {
          this.dbErrors = error.error.reduce(
            (acc: any, err: any) => ({ ...acc, [err.field]: err.message }),
            {}
          );
        }
      },
    });
  }

  close() {
    this.closeModal.emit();
  }
}
