export const buttonType = {
  button: 'button',
} as const;

export type ButtonType = (typeof buttonType)[keyof typeof buttonType];

export const buttonVariant = {
  danger: 'DANGER',
  primary: 'PRIMARY',
  success: 'SUCCESS',
} as const;

export type ButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];
