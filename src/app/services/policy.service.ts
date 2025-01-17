import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy, ApiResponse } from '../models/policy.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private baseUrl = 'http://ec2-44-204-9-131.compute-1.amazonaws.com/api/InsurancePolicies/';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<ApiResponse<Policy[]>> {
    return this.http.get<ApiResponse<Policy[]>>(`${this.baseUrl}GetAllInsurancePolicies`);
  }

  addPolicy(policy: Policy): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.baseUrl}AddInsurancePolicies`, policy);
  }

  updatePolicy(policy: Policy): Observable<ApiResponse<null>> {
    return this.http.put<ApiResponse<null>>(`${this.baseUrl}UpdateInsurancePolicies`, policy);
  }

  deletePolicy(policyId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${policyId}`);
  }
  deletePolicies(ids: number[]) {
    const options = {
      body: { ids }, 
    };
    return this.http.delete(`${this.baseUrl}DeleteInsurancePolicies`, options);
  }
}
