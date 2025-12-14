import { Component, OnInit, signal } from '@angular/core';
import { DashboardComponent } from './features/health-check/components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StartupService } from './core/services/startup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DashboardComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent implements OnInit {
  title = 'healthchecker-dashboard';
  isReady = signal(false);

  constructor(private startupService: StartupService) {}

  ngOnInit() {
    this.startupService.waitForBackend().subscribe({
      next: (ready) => {
        if (ready) {
          this.isReady.set(true);
        }
      },
      error: (err) => console.error('Startup check failed', err),
    });
  }
}
