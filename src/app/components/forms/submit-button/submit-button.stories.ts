import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SubmitButtonComponent } from './submit-button.component';
import { IonButton, IonIcon, IonSpinner, provideIonicAngular } from '@ionic/angular/standalone';
import { fn } from '@storybook/test';

const meta: Meta<SubmitButtonComponent> = {
  title: 'Mobile/Forms/SubmitButtonComponent',
  component: SubmitButtonComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideIonicAngular()],
    }),
    moduleMetadata({
      imports: [IonButton, IonIcon, IonSpinner],
    }),
  ],
  args: {
    submit: fn(),
  },
};

export default meta;
type Story = StoryObj<SubmitButtonComponent>;

export const Ready: Story = {
  args: {
    label: 'Submit',
    state: 'ready',
  },
};

export const Disabled: Story = {
  args: {
    ...Ready.args,
    state: 'disabled',
  },
};

export const Submitting: Story = {
  args: {
    ...Ready.args,
    state: 'submitting',
  },
};

export const Success: Story = {
  args: {
    ...Ready.args,
    state: 'success',
  },
};
