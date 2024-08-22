import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceCaptureComponent } from './face-capture.component';

describe('FaceCaptureComponent', () => {
  let component: FaceCaptureComponent;
  let fixture: ComponentFixture<FaceCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
