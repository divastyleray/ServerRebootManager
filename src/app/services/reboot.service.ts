import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RebootScheduleRequest } from '../models/reboot.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RebootService {
  constructor(private http: HttpClient) {}
  scheduleReboot(payload: RebootScheduleRequest): Observable<any> {
    return this.http.post('/api/reboot/schedule', payload);
  }
}
