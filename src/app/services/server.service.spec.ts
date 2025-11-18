import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServerService } from './server.service';

describe('ServerService', () => {
  let service: ServerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServerService]
    });
    service = TestBed.inject(ServerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch servers', () => {
    const mock = [{ id: 's1', name: 'srv', ip: '1.1.1.1' }];
    service.getServers().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].id).toBe('s1');
    });
    const req = httpMock.expectOne('/api/servers');
    expect(req.request.method).toBe('GET');
    req.flush(mock);
    httpMock.verify();
  });
});
