import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckloadComponent } from './truckload.component';

describe('TruckloadComponent', () => {
  let component: TruckloadComponent;
  let fixture: ComponentFixture<TruckloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TruckloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
