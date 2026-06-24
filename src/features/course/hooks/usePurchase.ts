"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  purchaseService,
  type CreateEnrollmentPayload,
  type CreatePaymentOrderPayload,
  type ValidateCouponPayload,
  type VerifyPaymentPayload,
} from "../services/purchaseService";

export const purchaseKeys = {
  paymentModes: ["purchase", "payment-modes"] as const,
  coupons: (courseId: string, batchId: string, deliveryMode: string) =>
    ["purchase", "coupons", courseId, batchId, deliveryMode] as const,
};

export function useActivePaymentModes(enabled = true) {
  return useQuery({
    queryKey: purchaseKeys.paymentModes,
    queryFn: purchaseService.getActivePaymentModes,
    enabled,
    staleTime: 10 * 60 * 1000,
  });
}

export function useAvailableCoupons(
  payload: {
    courseId: string;
    batchId: string;
    deliveryMode: 'ONLINE' | 'OFFLINE';
  } | null,
) {
  return useQuery({
    queryKey: payload
      ? purchaseKeys.coupons(
          payload.courseId,
          payload.batchId,
          payload.deliveryMode,
        )
      : ["purchase", "coupons", "idle"],
    queryFn: () => purchaseService.getAvailableCoupons(payload!),
    enabled: Boolean(payload?.courseId && payload?.batchId),
    staleTime: 60 * 1000,
  });
}

export function useValidateCoupon() {
  return useMutation({
    mutationFn: (payload: ValidateCouponPayload) =>
      purchaseService.validateCoupon(payload),
  });
}

export function useCreateEnrollment() {
  return useMutation({
    mutationFn: (payload: CreateEnrollmentPayload) =>
      purchaseService.createEnrollment(payload),
  });
}

export function useCreatePaymentOrder() {
  return useMutation({
    mutationFn: (payload: CreatePaymentOrderPayload) =>
      purchaseService.createPaymentOrder(payload),
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: (payload: VerifyPaymentPayload) =>
      purchaseService.verifyPayment(payload),
  });
}

export function useDownloadInvoice() {
  return useMutation({
    mutationFn: (enrollmentId: string) =>
      purchaseService.downloadInvoice(enrollmentId),
  });
}
