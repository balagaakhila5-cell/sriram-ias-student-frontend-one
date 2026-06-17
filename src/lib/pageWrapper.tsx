import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

/**
 * Wraps Next.js-style page components to work with React Router
 * Converts React Router hooks (useParams, useSearchParams) to Next.js props format
 */
export function withPageParams<T extends Record<string, any>>(
  Component: React.ComponentType<{
    params: Promise<T>;
    searchParams: URLSearchParams;
  }>
) {
  return function WrappedComponent() {
    const params = useParams() as T;
    const [searchParams] = useSearchParams();
    
    return <Component params={Promise.resolve(params)} searchParams={searchParams} />;
  };
}

/**
 * Simpler wrapper for components that only need params
 */
export function withParams<T extends Record<string, any>>(
  Component: React.ComponentType<{ params: Promise<T> }>
) {
  return function WrappedComponent() {
    const params = useParams() as T;
    return <Component params={Promise.resolve(params)} />;
  };
}

/**
 * Wrapper for components that only need searchParams
 */
export function withSearchParams(
  Component: React.ComponentType<{ searchParams: URLSearchParams }>
) {
  return function WrappedComponent() {
    const [searchParams] = useSearchParams();
    return <Component searchParams={searchParams} />;
  };
}
