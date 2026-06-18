import React, { lazy, type LazyExoticComponent, type ComponentType } from "react";

export default function dynamic<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  _options?: Record<string, unknown>
): LazyExoticComponent<T> {
  return lazy(importFn) as LazyExoticComponent<T>;
}
