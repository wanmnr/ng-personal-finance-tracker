// layout/header/services/header.service.ts
import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationService } from "@app/core/services/navigation.service";
import { LayoutService } from "@app/layout/services/layout1.service";
import { ThemeService } from "@app/layout/services/theme1.service";

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private themeService = inject(ThemeService);
  private layoutService = inject(LayoutService);
  private navigationService = inject(NavigationService);

  isDarkMode = toSignal(this.themeService.isDarkMode$);
  breadcrumbs = computed(() => this.navigationService.getBreadcrumbs());

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  navigateWithPermissionCheck(route: string) {
    if (this.navigationService.canNavigate(route)) {
      // Navigate
    }
  }
}
