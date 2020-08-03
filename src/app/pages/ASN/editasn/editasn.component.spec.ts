import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditasnComponent } from './editasn.component';

describe('EditasnComponent', () => {
  let component: EditasnComponent;
  let fixture: ComponentFixture<EditasnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditasnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditasnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
