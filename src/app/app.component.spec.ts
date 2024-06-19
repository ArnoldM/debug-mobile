import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from '@debug-mobile/app.component';

describe.only('AppComponent', () => {
  it('should create the app', () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '', component: AppComponent }])],
    });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
