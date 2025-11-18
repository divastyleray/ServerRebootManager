import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerSelectorComponent } from './server-selector.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('ServerSelectorComponent', () => {
  let fixture: ComponentFixture<ServerSelectorComponent>;
  let comp: ServerSelectorComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ServerSelectorComponent // standalone component must be imported
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServerSelectorComponent);
    comp = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('loads servers and emits selection', () => {
    // Flush the GET /api/servers call triggered in ngOnInit
    const req = httpMock.expectOne('/api/servers');
    expect(req.request.method).toBe('GET');

    req.flush([{ id: 's1', name: 'srv', ip: '1.1.1.1', region: 'eu' }]);
    fixture.detectChanges();

    expect(comp.servers.length).toBe(1);

    spyOn(comp.serverSelected, 'emit');
    comp.onSelect('s1');
    expect(comp.serverSelected.emit).toHaveBeenCalledWith({
      id: 's1',
      name: 'srv',
      ip: '1.1.1.1',
      region: 'eu'
    });

    httpMock.verify(); // ensures no unflushed requests
  });
});
