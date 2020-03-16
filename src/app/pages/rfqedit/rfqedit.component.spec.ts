import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFQEditComponent } from './rfqedit.component';

describe('RFQEditComponent', () => {
  let component: RFQEditComponent;
  let fixture: ComponentFixture<RFQEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFQEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFQEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
