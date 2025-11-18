import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RebootService } from './reboot.service';

describe('RebootService', () => {
  let service: RebootService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RebootService]
    });
    service = TestBed.inject(RebootService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should post schedule', () => {
    const payload = { serverId: 's1', scheduledAt: '2099-01-01T01:00:00' };
    service.scheduleReboot(payload).subscribe(res => {
      expect(res.serverId).toBe('s1');
    });
    const req = httpMock.expectOne('/api/reboot/schedule');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 'r1', ...payload });
    httpMock.verify();
  });
});
