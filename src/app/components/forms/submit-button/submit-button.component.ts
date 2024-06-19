import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudDoneOutline, cloudOfflineOutline, cloudUploadOutline } from 'ionicons/icons';
import { FormState } from '@debug-mobile/components/forms/login-form/login-form.component';

export enum Icons {
  READY = 'cloud-upload-outline',
  DISABLED = 'cloud-offline-outline',
  SUBMITTING = 'lines-sharp-small',
  SUCCESS = 'cloud-done-outline',
}

@Component({
  standalone: true,
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  imports: [IonButton, IonIcon, IonSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitButtonComponent {
  state = input<FormState>('ready');
  label = input<string>('Save');
  submit = output<MouseEvent>();
  iconName = computed(() => {
    switch (this.state()) {
      case 'ready':
        return Icons.READY;
      case 'submitting':
        return Icons.SUBMITTING;
      case 'success':
        return Icons.SUCCESS;
      case 'disabled':
        return Icons.DISABLED;
    }
  });

  constructor() {
    addIcons({ cloudUploadOutline, cloudOfflineOutline, cloudDoneOutline });
  }

  onSubmit(event: MouseEvent) {
    this.submit.emit(event);
  }
}
