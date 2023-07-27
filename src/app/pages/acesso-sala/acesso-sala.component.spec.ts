import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoSalaComponent } from './acesso-sala.component';

describe('AcessoSalaComponent', () => {
  let component: AcessoSalaComponent;
  let fixture: ComponentFixture<AcessoSalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessoSalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
