import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidificationModelsComponent } from './solidification-models.component';

describe('SolidificationModelsComponent', () => {
  let component: SolidificationModelsComponent;
  let fixture: ComponentFixture<SolidificationModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolidificationModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidificationModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
