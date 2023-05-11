import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecebimentosPage } from './recebimentos.page';

describe('RecebimentosPage', () => {
  let component: RecebimentosPage;
  let fixture: ComponentFixture<RecebimentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecebimentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
