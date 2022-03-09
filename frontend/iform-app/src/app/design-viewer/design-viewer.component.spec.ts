import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignViewerComponent } from './design-viewer.component';

describe('DesignViewerComponent', () => {
  let component: DesignViewerComponent;
  let fixture: ComponentFixture<DesignViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
