import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupeditComponent } from './popupedit.component';

describe('PopupeditComponent', () => {
  let component: PopupeditComponent;
  let fixture: ComponentFixture<PopupeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
