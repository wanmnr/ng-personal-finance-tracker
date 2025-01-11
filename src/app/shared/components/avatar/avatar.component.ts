// components/avatar.component.ts

import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AvatarConfig,
  AvatarSize,
  AvatarShape,
  AvatarSource
} from '@shared/types/avatar.types';
import { AvatarService } from '@shared/services/avatar.service';
import * as AvatarActions from '@shared/store/actions/avatar.actions';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule, MatRippleModule, FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [ngClass]="getSizeClass(config.size)"
      class="avatar-container"
      [class.avatar-circle]="config.shape === 'circle'"
      [class.avatar-square]="config.shape === 'square'"
      [style.background-color]="config.backgroundColor"
      [attr.aria-label]="config.altText"
      role="img"
      matRipple
    >
      @switch (config.sourceType) {
        @case ('image') {
          <img
            *ngIf="config.imageUrl"
            [src]="config.imageUrl"
            [alt]="config.altText || ''"
            class="avatar-image"
            (error)="handleImageError()"
          />
        }
        @case ('initials') {
          <span
            class="avatar-initials"
            [style.color]="config.textColor"
          >
            {{ config.initials }}
          </span>
        }
        @case ('icon') {
          <fa-icon
            *ngIf="config.iconName"
            [icon]="config.iconName"
            [style.color]="config.textColor"
          ></fa-icon>
        }
      }
    </div>
  `,
  styles: [`
    .avatar-container {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .avatar-circle {
      border-radius: 50%;
    }

    .avatar-square {
      border-radius: 8px;
    }

    .avatar-small {
      width: 32px;
      height: 32px;
      font-size: 14px;
    }

    .avatar-medium {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }

    .avatar-large {
      width: 64px;
      height: 64px;
      font-size: 24px;
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-initials {
      font-weight: 500;
      text-transform: uppercase;
    }

    @media (max-width: 768px) {
      .avatar-large {
        width: 48px;
        height: 48px;
        font-size: 18px;
      }
    }
  `]
})
export class AvatarComponent implements OnInit {
  private store = inject(Store);
  private avatarService = inject(AvatarService);

  @Input() config!: AvatarConfig;

  /**
   * Initializes the component and sets up initial configuration
   */
  ngOnInit(): void {
    if (this.config.sourceType === 'image' && this.config.imageUrl) {
      this.validateAndLoadImage(this.config.imageUrl);
    }
  }

  /**
   * Gets the CSS class based on avatar size
   * @param size - The size of the avatar
   * @returns CSS class name for the size
   */
  getSizeClass(size: AvatarSize): string {
    return `avatar-${size}`;
  }

  /**
   * Handles image loading errors
   */
  handleImageError(): void {
    this.store.dispatch(
      AvatarActions.loadAvatarImageFailure({
        error: 'Failed to load image'
      })
    );

    // Fallback to initials
    this.store.dispatch(
      AvatarActions.updateAvatarConfig({
        config: {
          sourceType: 'initials',
          initials: this.config.initials || '?'
        }
      })
    );
  }

  /**
   * Validates and loads the image
   * @param imageUrl - URL of the image to load
   */
  private validateAndLoadImage(imageUrl: string): void {
    this.store.dispatch(AvatarActions.loadAvatarImage({ imageUrl }));

    this.avatarService.validateImageUrl(imageUrl).subscribe(
      isValid => {
        if (isValid) {
          this.store.dispatch(AvatarActions.loadAvatarImageSuccess());
        } else {
          this.handleImageError();
        }
      }
    );
  }
}
