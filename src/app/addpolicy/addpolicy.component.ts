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
  @Output() addPolicy  = new EventEmitter<any>();
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
  ) { }

  dbErrors: { [key: string]: string } = {};
  successMessage: string = "";

  ngOnInit() {
    if (this.editMode && this.policyToEdit) {
      this.newPolicy = { ...this.policyToEdit };
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.newPolicy = {
      policyId: 0,
      policyName: "",
      premiumAmount: 0,
      policyType: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    this.dbErrors = {};
    this.successMessage = "";
  }

  savePolicy() {
    const saveObservable = this.editMode
      ? this.policyService.updatePolicy(this.newPolicy)
      : this.policyService.addPolicy(this.newPolicy);

    saveObservable.subscribe({
      next: (response) => {
        this.successMessage = this.editMode
          ? "Policy updated successfully!"
          : "Policy added successfully!";

          if (this.editMode) {
            this.updatePolicy.emit(response.data);  // Update existing policy
          } else {
            this.addPolicy.emit(response.data);    // Add new policy
          }
        setTimeout(() => {
          this.successMessage = "";
          this.refresh.emit();
          this.closeModal.emit();
        }, 1000);

      },
      error: (error) => {
        if (error && error.error.errors) {
          this.dbErrors = Object.keys(error.error.errors).reduce((acc: { [key: string]: string }, key: string) => {
            acc[key] = error.error.errors[key][0];
            return acc;
          }, {});
        }
      },
    });
  }


  close() {
    this.closeModal.emit();
  }
}
