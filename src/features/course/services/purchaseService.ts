import { http } from '@/lib/http';
import type { ApiEnvelope } from '@/lib/apiResult';

export interface PaymentModeSummary {
  paymentModeId: string;
  paymentModeName: string;
  category?: string;
  icon?: string;
}

export interface EnrollmentPricing {
  baseBeforeDiscount: number;
  discountAmount: number;
  baseAmount: number;
  gstAmount: number;
  totalPaid: number;
  couponCode?: string | null;
}

export interface CreateEnrollmentPayload {
  courseId: string;
  batchId: string;
  deliveryMode: 'ONLINE' | 'OFFLINE';
  paymentModeId: string;
  couponId?: string;
  couponCode?: string;
}

export interface CreateEnrollmentResult {
  enrollmentId: string;
  enrollmentRef: string;
  status: string;
  paymentStatus: string;
  requiresManualPayment: boolean;
  pricing: EnrollmentPricing;
  paymentMode?: PaymentModeSummary;
}

export interface CreatePaymentOrderPayload {
  enrollmentId: string;
  paymentModeId: string;
}

export interface RazorpayCheckoutConfig {
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
    emi?: boolean;
    paylater?: boolean;
  };
}

export interface CreatePaymentOrderResult {
  requiresManualPayment: boolean;
  orderId?: string;
  amount?: number;
  amountInPaise?: number;
  baseAmount?: number;
  gstAmount?: number;
  currency?: string;
  key?: string;
  enrollmentId?: string;
  enrollmentRef?: string;
  deliveryMode?: string;
  paymentMode?: PaymentModeSummary;
  checkout?: RazorpayCheckoutConfig;
  message?: string;
}

export interface VerifyPaymentPayload {
  enrollmentId: string;
  paymentModeId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentBilling {
  baseBeforeDiscount: number;
  baseAmount: number;
  discountAmount: number;
  couponCode?: string | null;
  gstAmount: number;
  totalPaid: number;
  gstRate: number;
}

export interface VerifyPaymentResult {
  admissionConfirmed: boolean;
  student: { studentName: string; studentId: string };
  courseName: string;
  batchName: string;
  paymentDate: string;
  billing: VerifyPaymentBilling;
  receiptNumber: string;
  invoiceNumber: string;
  invoiceUrl: string;
  enrollmentId: string;
  enrollmentRef: string;
  deliveryMode: string;
}

export interface CouponOffer {
  _id: string;
  couponCode: string;
  couponName: string;
  type: string;
  value: number;
  displayPrice?: number;
  backgroundImage?: { url?: string };
}

export interface AvailableCouponsResult {
  coupons: CouponOffer[];
  cartAmount?: number;
}

export interface ValidateCouponPayload {
  itemType: 'COURSE';
  couponCode?: string;
  couponId?: string;
  courseId: string;
  batchId: string;
  deliveryMode: 'ONLINE' | 'OFFLINE';
}

export interface ValidateCouponResult {
  couponId: string;
  couponCode: string;
  originalAmount: number;
  discountAmount: number;
  baseAmount: number;
  gstAmount: number;
  totalPaid: number;
}

export interface DownloadInvoiceResult {
  enrollmentId: string;
  receiptNumber: string;
  invoiceNumber: string;
  invoiceUrl: string;
}

export const purchaseService = {
  getActivePaymentModes: async (): Promise<PaymentModeSummary[]> => {
    const { data } = await http.post<ApiEnvelope<PaymentModeSummary[]>>(
      '/finance/payment-modes/active',
      {},
    );
    return data.data ?? [];
  },

  getAvailableCoupons: async (payload: {
    courseId: string;
    batchId: string;
    deliveryMode: 'ONLINE' | 'OFFLINE';
  }): Promise<AvailableCouponsResult> => {
    const { data } = await http.post<ApiEnvelope<AvailableCouponsResult>>(
      '/student/coupons/available',
      {
        itemType: 'COURSE',
        ...payload,
      },
    );
    return data.data;
  },

  validateCoupon: async (
    payload: ValidateCouponPayload,
  ): Promise<ValidateCouponResult> => {
    const { data } = await http.post<ApiEnvelope<ValidateCouponResult>>(
      '/student/coupon/validate',
      payload,
    );
    return data.data;
  },

  createEnrollment: async (
    payload: CreateEnrollmentPayload,
  ): Promise<CreateEnrollmentResult> => {
    const { data } = await http.post<ApiEnvelope<CreateEnrollmentResult>>(
      '/student/enrollment/create',
      payload,
    );
    return data.data;
  },

  createPaymentOrder: async (
    payload: CreatePaymentOrderPayload,
  ): Promise<CreatePaymentOrderResult> => {
    const { data } = await http.post<ApiEnvelope<CreatePaymentOrderResult>>(
      '/student/payment/create-order',
      payload,
    );
    return data.data;
  },

  verifyPayment: async (
    payload: VerifyPaymentPayload,
  ): Promise<VerifyPaymentResult> => {
    const { data } = await http.post<ApiEnvelope<VerifyPaymentResult>>(
      '/student/payment/verify',
      payload,
    );
    return data.data;
  },

  downloadInvoice: async (
    enrollmentId: string,
  ): Promise<DownloadInvoiceResult> => {
    const { data } = await http.post<ApiEnvelope<DownloadInvoiceResult>>(
      '/student/invoice/download',
      { enrollmentId },
    );
    return data.data;
  },
};
