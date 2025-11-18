import { Component } from '@angular/core';
import { RebootContainerComponent } from './components/reboot-container/reboot-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RebootContainerComponent],
  template: `<main class="container"><reboot-container></reboot-container></main>`,
})
export class AppComponent {}
