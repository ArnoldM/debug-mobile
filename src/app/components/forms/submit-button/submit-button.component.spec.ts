import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SubmitButtonComponent } from '@debug-mobile/components/forms/submit-button/submit-button.component';

describe('SubmitButtonComponent', () => {
  let component: SubmitButtonComponent;
  let fixture: ComponentFixture<SubmitButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SubmitButtonComponent, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
