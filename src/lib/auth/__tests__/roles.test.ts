import { describe, it, expect } from 'vitest';
import { hasPermission } from '../roles';
import type { UserRole } from '../roles';

describe('Role-based Authorization', () => {
  it('admin has access to all permissions', () => {
    expect(hasPermission('admin', 'blog:write')).toBe(true);
    expect(hasPermission('admin', 'users:manage')).toBe(true);
  });

  it('editor has limited permissions', () => {
    expect(hasPermission('editor', 'blog:write')).toBe(true);
    expect(hasPermission('editor', 'users:manage')).toBe(false);
  });

  it('user has basic permissions only', () => {
    expect(hasPermission('user', 'blog:read')).toBe(true);
    expect(hasPermission('user', 'blog:write')).toBe(false);
  });

  it('handles invalid roles gracefully', () => {
    expect(hasPermission('invalid' as UserRole, 'blog:read')).toBe(false);
  });
});