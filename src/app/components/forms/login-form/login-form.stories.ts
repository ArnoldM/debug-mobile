import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { userEvent, within, expect } from '@storybook/test';
import { IonApp, IonInput, IonInputPasswordToggle, IonText, provideIonicAngular } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@debug-mobile/components/forms/login-form/login-form.component';
import { SubmitButtonComponent } from '@debug-mobile/components/forms/submit-button/submit-button.component';

const meta: Meta<LoginFormComponent> = {
  title: 'Mobile/Forms/LoginForm',
  component: LoginFormComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideIonicAngular()],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule, SubmitButtonComponent, IonInput, IonText, IonInputPasswordToggle, IonApp],
    }),
  ],
};

export default meta;
type Story = StoryObj<LoginFormComponent>;

export const Empty: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailComp = canvas.getByTestId('emailInput');
    const passwordComp = canvas.getByTestId('passwordInput');
    const submitButtonComp = canvas.getByTestId('submitButton');

    await expect(emailComp).toBeInTheDocument();
    await expect(passwordComp).toBeInTheDocument();
    await expect(submitButtonComp).toBeInTheDocument();
  },
};

export const InvalidEmail: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailElement = canvas.getByTestId('emailInput');
    const passwordElement = canvas.getByTestId('passwordInput');
    const { emailInput, passwordInput } = await new Promise<{ emailInput: any; passwordInput: any }>((resolve) => {
      setTimeout(() => {
        resolve({
          // @ts-ignore
          emailInput: emailElement.nativeInput,
          // @ts-ignore
          passwordInput: passwordElement.nativeInput,
        });
      }, 200);
    });
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab();
    await userEvent.type(passwordInput, 'password');
    await userEvent.tab();
    await expect(canvas.getByText('Invalid Email')).toBeVisible();
  },
};

export const MissingPassword: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailElement = canvas.getByTestId('emailInput');
    const { emailInput } = await new Promise<{ emailInput: any }>((resolve) => {
      setTimeout(() => {
        resolve({
          // @ts-ignore
          emailInput: emailElement.nativeInput,
        });
      }, 200);
    });

    await userEvent.type(emailInput!, 'valid@email.com');
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByText('Password is mandatory')).toBeVisible();
  },
};

export const ValidForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailElement = canvas.getByTestId('emailInput');
    const passwordElement = canvas.getByTestId('passwordInput');
    const { emailInput, passwordInput } = await new Promise<{ emailInput: any; passwordInput: any }>((resolve) => {
      setTimeout(() => {
        resolve({
          // @ts-ignore
          emailInput: emailElement.nativeInput,
          // @ts-ignore
          passwordInput: passwordElement.nativeInput,
        });
      }, 200);
    });

    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.tab();
    await userEvent.type(passwordInput, 'password');
    await userEvent.tab();
    await expect(canvas.getByText('Password is mandatory')).not.toBeVisible();
    await expect(canvas.getByText('Invalid Email')).not.toBeVisible();
  },
};
