// core/utils/permission.utils.ts

export function checkPermissions(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  if (!requiredPermissions?.length) {
    return true;
  }

  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
}
