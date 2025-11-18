import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { fakeBackendInterceptor } from './app/mocks/fake-backend.interceptor';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([fakeBackendInterceptor]))],
}).catch((err) => console.error(err));
