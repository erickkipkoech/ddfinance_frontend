export interface Policy {
    policyId: number;
    policyName: string;
    premiumAmount: number;
    policyType: string;
    startDate: Date; // ISO format
    endDate: Date;   // ISO format
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  