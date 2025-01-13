// src/app/core/permissions/has-permission.directive.ts

import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PermissionService } from '@core/services/permission.service';
import { Permission } from '@core/types/permission.types';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  @Input('hasPermission') permission!: Permission;

  constructor(
    private element: ElementRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    if (!this.permissionService.hasPermission(this.permission)) {
      this.element.nativeElement.style.display = 'none';
    }
  }
}
