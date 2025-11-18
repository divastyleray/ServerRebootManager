import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Server } from '../../models/server.model';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'server-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './server-selector.component.html',
})
export class ServerSelectorComponent {
  servers: Server[] = [];
  loading = false;
  error?: string;
  selectedId = '';

  @Output() serverSelected = new EventEmitter<Server>();

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.loading = true;
    this.serverService.getServers().subscribe({
      next: (s) => {
        this.servers = s;
        this.loading = false;
      },
      error: (_) => {
        this.error = 'Could not load servers';
        this.loading = false;
      },
    });
  }

  onSelect(id: string) {
    this.selectedId = id;
    const s = this.servers.find((x) => x.id === id);
    if (s) this.serverSelected.emit(s);
  }
}
