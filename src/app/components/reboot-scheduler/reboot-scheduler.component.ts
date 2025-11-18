import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RebootSchedule } from '../../models/reboot.model';

@Component({
  selector: 'reboot-scheduler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reboot-scheduler.component.html',
})
export class RebootSchedulerComponent {
  date = '';
  time = '';

  @Output() scheduleChange = new EventEmitter<RebootSchedule>();

  setNowPlus(minutes: number) {
    const d = new Date(Date.now() + minutes * 60000);
    this.date = d.toISOString().slice(0, 10);
    this.time = d.toTimeString().slice(0, 5);
    this.emitIfValid();
  }

  emitIfValid() {
    if (!this.date || !this.time) return;
    const scheduled = `${this.date}T${this.time}:00`;
    if (new Date(scheduled) <= new Date()) {
      window.alert('Please choose a future time');
      return;
    }
    this.scheduleChange.emit({
      date: this.date,
      time: this.time,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }
}
