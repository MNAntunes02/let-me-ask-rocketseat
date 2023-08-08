import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncerrarDialogComponent } from './encerrar-dialog.component';

describe('EncerrarDialogComponent', () => {
  let component: EncerrarDialogComponent;
  let fixture: ComponentFixture<EncerrarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncerrarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncerrarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
