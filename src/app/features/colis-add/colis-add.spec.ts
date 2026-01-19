import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisAdd } from './colis-add';

describe('ColisAdd', () => {
  let component: ColisAdd;
  let fixture: ComponentFixture<ColisAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColisAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColisAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
