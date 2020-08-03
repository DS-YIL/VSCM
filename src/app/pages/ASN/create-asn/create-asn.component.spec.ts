import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsnComponent } from './create-asn.component';

describe('CreateAsnComponent', () => {
  let component: CreateAsnComponent;
  let fixture: ComponentFixture<CreateAsnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAsnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAsnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
