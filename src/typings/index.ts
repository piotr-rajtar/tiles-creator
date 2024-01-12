export const buttonVariant = {
  danger: 'DANGER',
  primary: 'PRIMARY',
  success: 'SUCCESS',
} as const;

export type ButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];

export interface Tile {
  id: string;
  color: string;
}
