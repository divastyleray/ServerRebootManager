import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RebootContainerComponent } from './reboot-container.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RebootService } from '../../services/reboot.service';
import { FormsModule } from '@angular/forms';

describe('RebootContainerComponent', () => {
  let fixture: ComponentFixture<RebootContainerComponent>;
  let comp: RebootContainerComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        // Standalone components must go in imports
        RebootContainerComponent,
      ],
      providers: [RebootService],
    }).compileComponents();

    fixture = TestBed.createComponent(RebootContainerComponent);
    comp = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('submit should call reboot endpoint', () => {
  // flush GET /api/servers first
  const reqServers = httpMock.expectOne('/api/servers');
  reqServers.flush([{ id: 's1', name: 'srv', ip: '1.1.1.1', region: 'eu' }]);

  comp.server = { id: 's1', name: 'srv', ip: '1.1.1.1', region: 'eu' };
  comp.schedule = { date: '2099-01-01', time: '01:00' };

  comp.submit();

  const req = httpMock.expectOne('/api/reboot/schedule');
  expect(req.request.method).toBe('POST');
  expect(req.request.body.serverId).toBe('s1');
  req.flush({ id: 'r1', serverId: 's1', scheduledAt: '2099-01-01T01:00:00' });

  httpMock.verify();
});


  it('submit should not call endpoint if server or schedule is missing', () => {
    comp.server = undefined;
    comp.schedule = undefined;

    comp.submit();

    httpMock.expectNone('/api/reboot/schedule');
  });
});
