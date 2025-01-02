// types/avatar.types.ts

/**
 * Represents the size options available for the avatar
 */
export type AvatarSize = 'small' | 'medium' | 'large';

/**
 * Represents the shape options available for the avatar
 */
export type AvatarShape = 'circle' | 'square';

/**
 * Represents the source type for the avatar
 */
export type AvatarSource = 'image' | 'initials' | 'icon';

/**
 * Interface for the avatar configuration
 */
export interface AvatarConfig {
  size: AvatarSize;
  shape: AvatarShape;
  sourceType: AvatarSource;
  imageUrl?: string;
  initials?: string;
  iconName?: string;
  altText?: string;
  backgroundColor?: string;
  textColor?: string;
}

/**
 * Interface for the avatar state in NgRx store
 */
export interface AvatarState {
  config: AvatarConfig;
  isLoading: boolean;
  error: string | null;
}
