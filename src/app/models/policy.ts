export interface Policy {
    policyId: number;
    policyName: string;
    premiumAmount: number;
    policyType: string;
    startDate: string; // ISO format
    endDate: string;   // ISO format
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  