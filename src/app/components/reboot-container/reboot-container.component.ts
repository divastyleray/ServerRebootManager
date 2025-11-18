import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServerSelectorComponent } from '../server-selector/server-selector.component';
import { RebootSchedulerComponent } from '../reboot-scheduler/reboot-scheduler.component';
import { Server } from '../../models/server.model';
import {
  RebootSchedule,
  RebootScheduleRequest,
} from '../../models/reboot.model';
import { RebootService } from '../../services/reboot.service';

@Component({
  selector: 'reboot-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ServerSelectorComponent,
    RebootSchedulerComponent,
  ],
  templateUrl: './reboot-container.component.html',
})
export class RebootContainerComponent {
  server?: Server;
  schedule?: RebootSchedule;
  loading = false;
  result?: any;
  error?: string;

  constructor(private rebootService: RebootService) {}

  onServerSelected(s: Server) {
    this.server = s;
  }
  onScheduleChange(s: RebootSchedule) {
    this.schedule = s;
  }

  submit() {
    if (!this.server || !this.schedule) return;
    const scheduledAt = `${this.schedule.date}T${this.schedule.time}:00`;
    const payload: RebootScheduleRequest = {
      serverId: this.server.id,
      scheduledAt,
    };
    this.loading = true;
    this.error = undefined;
    this.rebootService.scheduleReboot(payload).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (_) => {
        this.error = 'Failed to schedule reboot';
        this.loading = false;
      },
    });
  }
}
