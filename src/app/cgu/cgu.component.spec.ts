import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CguContent } from './cgu.component';

describe('CguComponent', () => {
  let component: CguContent;
  let fixture: ComponentFixture<CguContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CguContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CguContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
