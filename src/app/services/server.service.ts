import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../models/server.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private http: HttpClient) {}
  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>('/api/servers');
  }
}
