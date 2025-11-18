import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RebootSchedulerComponent } from './reboot-scheduler.component';
import { FormsModule } from '@angular/forms';

describe('RebootSchedulerComponent', () => {
  let fixture: ComponentFixture<RebootSchedulerComponent>;
  let comp: RebootSchedulerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RebootSchedulerComponent // standalone component must be imported
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RebootSchedulerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should emit schedule when future time selected', () => {
    spyOn(comp.scheduleChange, 'emit');

    const future = new Date(Date.now() + 3600 * 1000); // 1 hour ahead
    comp.date = future.toISOString().slice(0, 10);
    comp.time = future.toTimeString().slice(0, 5);

    comp.emitIfValid();

    expect(comp.scheduleChange.emit).toHaveBeenCalled();
  });

  it('should not emit schedule for past time', () => {
    spyOn(window, 'alert');
    spyOn(comp.scheduleChange, 'emit');

    const past = new Date(Date.now() - 3600 * 1000); // 1 hour ago
    comp.date = past.toISOString().slice(0, 10);
    comp.time = past.toTimeString().slice(0, 5);

    comp.emitIfValid();

    expect(comp.scheduleChange.emit).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please choose a future time');
  });
});
