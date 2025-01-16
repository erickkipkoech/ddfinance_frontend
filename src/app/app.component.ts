import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PolicyDashboardComponent } from './policies/components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PolicyDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'policy-dashboard';
}
