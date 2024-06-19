import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubmitButtonComponent } from '@debug-mobile/components/forms/submit-button/submit-button.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonInput, IonInputPasswordToggle, IonText } from '@ionic/angular/standalone';

export type FormState = 'ready' | 'disabled' | 'submitting' | 'success';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, SubmitButtonComponent, IonInput, IonText, IonInputPasswordToggle],
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  formStatus = toSignal(this.form.statusChanges);
  state = signal<FormState>('disabled');

  constructor() {
    effect(
      () => {
        if (this.formStatus() === 'VALID') {
          this.state.set('ready');
        } else {
          this.state.set('disabled');
        }
      },
      { allowSignalWrites: true }
    );
  }

  onSubmit() {
    this.state.set('submitting');
    setTimeout(() => {
      this.state.set('success');
    }, 3000);
  }
}
