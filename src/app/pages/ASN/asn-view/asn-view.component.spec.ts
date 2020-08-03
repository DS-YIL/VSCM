import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsnViewComponent } from './asn-view.component';

describe('AsnViewComponent', () => {
  let component: AsnViewComponent;
  let fixture: ComponentFixture<AsnViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsnViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
