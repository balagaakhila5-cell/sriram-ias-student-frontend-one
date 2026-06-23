'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import PaymentReceiptSuccess, {
  type PaymentReceiptRow,
} from '@/components/common/PaymentReceiptSuccess';

type Screen =
  | 'login'
  | 'signup'
  | 'otp'
  | 'loginSuccess'
  | 'signupSuccess'
  | 'deliveryMode'
  | 'payment'
  | 'receipt';

interface EnrollAuthModalProps {
  open: boolean;
  onClose: () => void;
}

const LOGO_40 = '/assets/40_years_experience.png';
const LOGO_MAIN = "/assets/SRIRAM's-IAS.png";
const SCANNER_IMAGE = '/assets/course/scanner.png';
const GRADUATE_ICON = '/assets/course/graduate-icon.png';

const ORIGINAL_PRICE = 6999;
const COURSE_PRICE = 5999;
const GST_PERCENT = 18;

function formatPaymentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

const EnrollAuthModal: React.FC<EnrollAuthModalProps> = ({ open, onClose }) => {
  const [screen, setScreen] = useState<Screen>('login');

  const [loginValue, setLoginValue] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [studentName, setStudentName] = useState('');

  const [otpValues, setOtpValues] = useState(['', '', '', '']);

  const [selectedPayment, setSelectedPayment] = useState('qr');

  const [upiId, setUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardVerified, setIsCardVerified] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedDeliveryMode, setSelectedDeliveryMode] = useState<
    'offline' | 'online'
  >('offline');

  const [popup, setPopup] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const bookPriceAfterDiscount = COURSE_PRICE - discountAmount;

  // Payment page amount: without GST
  const paymentPayAmount = bookPriceAfterDiscount;

  // Receipt/invoice amount: GST added here only
  const gstAmount = Math.round((bookPriceAfterDiscount * GST_PERCENT) / 100);
  const finalPayAmount = bookPriceAfterDiscount + gstAmount;

  const enrollReceiptRows: PaymentReceiptRow[] = [
    { label: 'Book Price', amount: COURSE_PRICE },
  ];

  if (discountAmount > 0) {
    enrollReceiptRows.push({
      label: 'Coupon Discount',
      amount: discountAmount,
      isDiscount: true,
    });
  }

  enrollReceiptRows.push(
    { label: 'Price After Discount', amount: bookPriceAfterDiscount },
    { label: `GST (${GST_PERCENT}%)`, amount: gstAmount },
  );

  useEffect(() => {
    if (open) {
      setScreen('login');
      setLoginValue('');
      setSignupName('');
      setSignupEmail('');
      setSignupMobile('');
      setStudentName('');
      setOtpValues(['', '', '', '']);
      setSelectedPayment('qr');
      setUpiId('');
      setIsUpiVerified(false);
      setCardNumber('');
      setCardName('');
      setCardExpiry('');
      setCardCvv('');
      setIsCardVerified(false);
      setCouponCode('');
      setDiscountAmount(0);
      setIsCouponApplied(false);
      setSelectedDeliveryMode('offline');
      setPopup(null);
    }
  }, [open]);

  if (!open) return null;

  const showPopup = (type: 'success' | 'error', message: string) => {
    setPopup({ type, message });

    setTimeout(() => {
      setPopup(null);
    }, 2500);
  };

  const formatPrice = (price: number) => price.toLocaleString('en-IN');

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidMobile = (value: string) => /^\d{10}$/.test(value);

  const handleLoginSendOtp = () => {
    if (!loginValue.trim()) {
      showPopup('error', 'Please enter mobile number or email id');
      return;
    }

    if (!isValidEmail(loginValue) && !isValidMobile(loginValue)) {
      showPopup('error', 'Please enter valid email id or 10 digit mobile number');
      return;
    }

    if (!studentName) {
      setStudentName('Student');
    }

    setOtpValues(['', '', '', '']);
    setScreen('otp');

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleSignup = () => {
    if (!signupName.trim()) {
      showPopup('error', 'Please enter your name');
      return;
    }

    if (!isValidEmail(signupEmail)) {
      showPopup('error', 'Please enter valid email id');
      return;
    }

    if (!isValidMobile(signupMobile)) {
      showPopup('error', 'Please enter valid 10 digit mobile number');
      return;
    }

    setStudentName(signupName.trim());
    setScreen('signupSuccess');

    setTimeout(() => {
      setScreen('login');
      setLoginValue(signupEmail);
      setSignupName('');
      setSignupEmail('');
      setSignupMobile('');
    }, 1600);
  };

  const handleOtpChange = (index: number, value: string) => {
    const onlyNumber = value.replace(/\D/g, '').slice(0, 1);

    const updatedOtp = [...otpValues];
    updatedOtp[index] = onlyNumber;
    setOtpValues(updatedOtp);

    if (onlyNumber && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otpValues.join('');

    if (enteredOtp.length !== 4) {
      showPopup('error', 'Please enter 4 digit OTP');
      return;
    }

    showPopup('success', 'Login successful');
    setScreen('loginSuccess');

    setTimeout(() => {
      setScreen('deliveryMode');
    }, 1200);
  };

  const applyCoupon = (code: string) => {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      showPopup('error', 'Please enter coupon code');
      return;
    }

    if (normalizedCode === 'SAVE500') {
      setCouponCode('SAVE500');
      setDiscountAmount(500);
      setIsCouponApplied(true);
      showPopup('success', 'SAVE500 applied successfully');
      return;
    }

    if (normalizedCode === 'SAVE1000') {
      setCouponCode('SAVE1000');
      setDiscountAmount(1000);
      setIsCouponApplied(true);
      showPopup('success', 'SAVE1000 applied successfully');
      return;
    }

    setDiscountAmount(0);
    setIsCouponApplied(false);
    showPopup('error', 'Invalid coupon code');
  };

  const handleCouponApply = () => {
    applyCoupon(couponCode);
  };

  const handleCouponCardClick = (code: string) => {
    setCouponCode(code);
    setDiscountAmount(0);
    setIsCouponApplied(false);
  };

  const handleUpiVerify = () => {
    if (!upiId.trim()) {
      showPopup('error', 'Please enter UPI ID');
      return;
    }

    if (!upiId.includes('@')) {
      showPopup('error', 'Please enter valid UPI ID');
      return;
    }

    setIsUpiVerified(true);
    showPopup('success', 'UPI ID verified');
  };

  const handleCardVerify = () => {
    if (
      !cardNumber.trim() ||
      !cardName.trim() ||
      !cardExpiry.trim() ||
      !cardCvv.trim()
    ) {
      showPopup('error', 'Please fill all card details');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length < 12) {
      showPopup('error', 'Please enter valid card number');
      return;
    }

    if (cardCvv.length < 3) {
      showPopup('error', 'Please enter valid CVV');
      return;
    }

    setIsCardVerified(true);
    showPopup('success', 'Card verified');
  };

  const handlePayment = () => {
    if (selectedPayment === 'upi' && !isUpiVerified) {
      showPopup('error', 'Please verify UPI ID before payment');
      return;
    }

    if (selectedPayment === 'card' && !isCardVerified) {
      showPopup('error', 'Please verify card details before payment');
      return;
    }

    showPopup('success', 'Payment successful');

    setTimeout(() => {
      setScreen('receipt');
    }, 900);
  };

  const paymentMethods = [
    { id: 'qr', label: 'Scan QR code' },
    { id: 'upi', label: 'UPI' },
    { id: 'paytm', label: 'saved@paytm' },
    { id: 'card', label: 'Credit / Debit Cards' },
    { id: 'saved-card', label: 'Saved Card' },
    { id: 'net-banking', label: 'Net Banking' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[9999] font-['Montserrat',sans-serif] ${
        screen === 'payment' || screen === 'receipt'
          ? 'bg-white'
          : 'flex items-center justify-center bg-black/45 px-4'
      }`}
    >
      {popup && (
        <div
          className={`fixed right-6 top-6 z-[10000] rounded-lg px-5 py-3 text-[14px] font-semibold text-white shadow-lg ${
            popup.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {popup.message}
        </div>
      )}

      <div
        className={`relative overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${
          screen === 'payment' || screen === 'receipt'
            ? 'h-screen w-screen rounded-none'
            : screen === 'deliveryMode'
              ? 'h-[88vh] w-full max-w-[920px] rounded-[6px]'
              : 'w-full max-w-[760px] rounded-[8px]'
        }`}
      >
        {screen !== 'payment' && screen !== 'receipt' && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-30 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[24px] font-semibold text-black shadow hover:bg-white"
            aria-label="Close"
          >
            ×
          </button>
        )}

        {(screen === 'login' || screen === 'signup' || screen === 'otp') && (
          <div
            className="relative flex min-h-[390px] w-full items-center justify-center bg-white px-5 py-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 82% 20%, rgba(211,239,249,0.95) 0%, rgba(211,239,249,0.72) 31%, transparent 56%),
                radial-gradient(circle at 68% 90%, rgba(182,225,241,0.75) 0%, rgba(182,225,241,0.45) 38%, transparent 64%),
                linear-gradient(120deg, #ffffff 0%, #ffffff 33%, #eef9fd 58%, #dff3fb 100%)
              `,
            }}
          >
            <div className="absolute bottom-0 right-0 h-[210px] w-[430px] rounded-tl-[100%] bg-[#bde3f2]/35" />
            <div className="absolute bottom-0 left-[34%] h-[170px] w-[430px] rounded-tr-[100%] bg-[#d7eef7]/45" />

            <div className="relative z-10 flex w-full max-w-[430px] flex-col items-center">
              <img
                src={LOGO_MAIN}
                alt="SRIRAM's IAS"
                className="mb-7 h-[46px] w-auto object-contain"
              />

              {screen === 'login' && (
                <>
                  <h2 className="mb-10 text-center text-[16px] font-extrabold text-black">
                    Login Portal
                  </h2>

                  <div className="mb-8 w-full">
                    <label className="mb-3 block text-center text-[13px] font-medium text-black/45">
                      Mobile Number / Email Id
                      <span className="text-[#E53935]" aria-hidden="true">
                        {' '}
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={loginValue}
                      onChange={(e) => setLoginValue(e.target.value)}
                      className="h-[42px] w-full min-w-0 max-w-full rounded-full bg-[#cde8f2] px-5 text-center text-[14px] font-medium text-black outline-none focus:shadow-[0_0_0_2px_rgba(42,157,216,0.35)]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleLoginSendOtp}
                    className="h-[42px] w-[210px] cursor-pointer rounded-full text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(0,91,136,0.22)] transition hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(90deg, #42a9db 0%, #002f45 100%)',
                    }}
                  >
                    Send OTP
                  </button>

                  <p className="mt-8 text-center text-[13px] font-medium text-black/55">
                    Don&apos;t have an account ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setScreen('signup');
                        setPopup(null);
                      }}
                      className="cursor-pointer font-bold text-[#0074ab] hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </>
              )}

              {screen === 'signup' && (
                <>
                  <h2 className="mb-8 text-center text-[16px] font-extrabold text-black">
                    Sign Up Portal
                  </h2>

                  <div className="flex w-full flex-col gap-5">
                    <AuthInput
                      label="Name"
                      value={signupName}
                      onChange={setSignupName}
                      required
                    />

                    <AuthInput
                      label="Email Id"
                      value={signupEmail}
                      onChange={setSignupEmail}
                      required
                    />

                    <AuthInput
                      label="Mobile Number"
                      value={signupMobile}
                      onChange={setSignupMobile}
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSignup}
                    className="mt-8 h-[42px] w-[210px] cursor-pointer rounded-full text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(0,91,136,0.22)] transition hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(90deg, #42a9db 0%, #002f45 100%)',
                    }}
                  >
                    Sign Up
                  </button>

                  <p className="mt-7 text-center text-[13px] font-medium text-black/55">
                    Already have an account ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setScreen('login');
                        setPopup(null);
                      }}
                      className="cursor-pointer font-bold text-[#0074ab] hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </>
              )}

              {screen === 'otp' && (
                <>
                  <h2 className="mb-9 text-center text-[16px] font-extrabold text-black">
                    OTP Verification
                  </h2>

                  <p className="mb-4 text-center text-[13px] font-medium text-black/45">
                    Enter Your 4 Digit OTP
                  </p>

                  <div className="mb-9 flex items-center justify-center gap-4">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        value={value}
                        onChange={(e) =>
                          handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="h-[42px] w-[58px] rounded-full bg-[#cde8f2] text-center text-[20px] font-bold text-black outline-none focus:shadow-[0_0_0_2px_rgba(42,157,216,0.35)]"
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="h-[42px] w-[210px] cursor-pointer rounded-full text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(0,91,136,0.22)] transition hover:scale-[1.02]"
                    style={{
                      background:
                        'linear-gradient(90deg, #42a9db 0%, #002f45 100%)',
                    }}
                  >
                    Verify OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScreen('login');
                      setOtpValues(['', '', '', '']);
                      setPopup(null);
                    }}
                    className="mt-6 cursor-pointer text-[13px] font-bold text-[#0074ab] hover:underline"
                  >
                    Change mobile / email
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {(screen === 'loginSuccess' || screen === 'signupSuccess') && (
          <div
            className="relative flex min-h-[295px] w-full items-center justify-center overflow-hidden rounded-[8px] px-6 py-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 100% 20%, rgba(252,232,187,0.75) 0%, rgba(252,232,187,0.45) 35%, transparent 56%),
                radial-gradient(circle at 80% 100%, rgba(242,216,155,0.45) 0%, rgba(242,216,155,0.35) 36%, transparent 60%),
                linear-gradient(120deg, #ffffff 0%, #fffdf7 45%, #fff1cd 100%)
              `,
            }}
          >
            <div className="absolute bottom-0 right-0 h-[170px] w-[430px] rounded-tl-[100%] bg-[#f5d58a]/30" />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="mb-7 flex h-[92px] w-[92px] items-center justify-center rounded-full border-[4px] border-[#3eb846]">
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3eb846"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <h2 className="text-center text-[20px] font-extrabold uppercase tracking-[0.5px] text-[#08b80d]">
                {screen === 'loginSuccess'
                  ? 'LOG IN SUCCESSFUL'
                  : 'SIGN UP SUCCESSFUL'}
              </h2>
            </div>
          </div>
        )}

        {screen === 'deliveryMode' && (
          <div className="h-full w-full overflow-y-auto bg-white">
            <div className="flex h-[66px] items-center border-b border-[#cfd7e3] bg-[#eef4ff] px-7">
              <h2 className="text-[24px] font-extrabold text-[#082b52]">
                Select Course Delivery Mode
              </h2>
            </div>

            <div className="px-7 py-7">
              <div className="mb-7 text-center">
                <h3 className="text-[25px] font-extrabold text-[#082b52]">
                  Advanced Financial Management Certification
                </h3>
                <p className="mt-2 text-[16px] font-medium text-[#4b5563]">
                  Choose the learning experience that fits your professional
                  schedule
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DeliveryModeCard
                  title="Offline Mode"
                  subtitle="Classroom-based Learning"
                  icon="building"
                  price="₹74,999"
                  oldPrice="₹99,999"
                  saving="25% SAVINGS"
                  selected={selectedDeliveryMode === 'offline'}
                  onSelect={() => setSelectedDeliveryMode('offline')}
                  highlights={[
                    'Complete Set of 19 Books',
                    'Senior Faculty Expert Guidance',
                    'Personalized Dedicated Mentorship Support',
                    'Recorded Classes with 3-Year Access',
                    'All India Test Series & Essay Writing Scheme Sessions',
                  ]}
                  onEnroll={() => setScreen('payment')}
                />

                <DeliveryModeCard
                  title="Online Mode"
                  subtitle="Live Interactive Sessions"
                  icon="laptop"
                  popular
                  price="₹54,999"
                  oldPrice="₹79,999"
                  saving="31% SAVINGS"
                  selected={selectedDeliveryMode === 'online'}
                  onSelect={() => setSelectedDeliveryMode('online')}
                  highlights={[
                    'Digital E-Book Library Access',
                    'Senior Faculty Expert Guidance',
                    'Personalized Dedicated Mentorship Support',
                    'Recorded Classes with 3-Year Access',
                    'All India Test Series & Essay Writing Scheme Sessions',
                  ]}
                  onEnroll={() => setScreen('payment')}
                />
              </div>
            </div>
          </div>
        )}

        {screen === 'payment' && (
          <div className="h-screen w-full overflow-y-auto bg-white">
            <div className="flex h-[120px] items-center border-b border-black/10 bg-white px-10">
              <Link
                href="/"
                onClick={onClose}
                className="inline-flex items-center gap-5"
                aria-label="Go to home"
              >
                <img
                  src={LOGO_40}
                  alt="40 Years"
                  className="h-[78px] w-auto object-contain"
                />

                <span className="h-[58px] w-[1px] bg-black/25" />

                <img
                  src={LOGO_MAIN}
                  alt="SRIRAM's IAS"
                  className="h-[72px] w-auto object-contain"
                />
              </Link>
            </div>

            <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 lg:grid-cols-[1fr_1.08fr]">
              <div className="bg-white px-8 py-12 shadow-[8px_0_30px_rgba(0,0,0,0.04)] lg:px-20">
                <div className="mx-auto max-w-[460px]">
                  <h2 className="mb-8 text-[20px] font-extrabold text-black">
                    Choose payment method
                  </h2>

                  <div className="flex flex-col gap-6">
                    {paymentMethods.map((method) => (
                      <div key={method.id}>
                        <label
                          className={`flex cursor-pointer items-center gap-4 text-[17px] font-semibold ${
                            selectedPayment === method.id
                              ? 'text-[#164aa5]'
                              : 'text-[#8c8c8c]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={() => {
                              setSelectedPayment(method.id);
                              setIsUpiVerified(false);
                              setIsCardVerified(false);
                            }}
                            className="hidden"
                          />

                          <span
                            className={`flex h-[28px] w-[28px] items-center justify-center rounded-full border ${
                              selectedPayment === method.id
                                ? 'border-[#1d57b7]'
                                : 'border-[#9b9b9b]'
                            }`}
                          >
                            {selectedPayment === method.id && (
                              <span className="h-[13px] w-[13px] rounded-full bg-[#1d57b7]" />
                            )}
                          </span>

                          {method.label}
                        </label>

                        {selectedPayment === 'upi' && method.id === 'upi' && (
                          <div className="ml-11 mt-3 w-full max-w-[260px]">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                                setIsUpiVerified(false);
                              }}
                              placeholder="Enter Upi Id"
                              className="h-[38px] w-full rounded-[5px] bg-[#e8eefc] px-4 text-[13px] font-medium text-black outline-none"
                            />

                            <button
                              type="button"
                              onClick={handleUpiVerify}
                              className="mt-1 block w-full cursor-pointer text-right text-[12px] font-semibold text-[#0b73a7]"
                            >
                              {isUpiVerified ? 'Verified' : 'Verify'}
                            </button>
                          </div>
                        )}

                        {selectedPayment === 'card' && method.id === 'card' && (
                          <div className="ml-11 mt-3 w-full max-w-[300px]">
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => {
                                setCardNumber(e.target.value);
                                setIsCardVerified(false);
                              }}
                              placeholder="Enter Card number"
                              className="mb-3 h-[38px] w-full rounded-[5px] bg-[#e8eefc] px-4 text-[13px] font-medium text-black outline-none"
                            />

                            <input
                              type="text"
                              value={cardName}
                              onChange={(e) => {
                                setCardName(e.target.value);
                                setIsCardVerified(false);
                              }}
                              placeholder="Enter Name on the card"
                              className="mb-3 h-[38px] w-full rounded-[5px] bg-[#e8eefc] px-4 text-[13px] font-medium text-black outline-none"
                            />

                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => {
                                  setCardExpiry(e.target.value);
                                  setIsCardVerified(false);
                                }}
                                placeholder="Expiry Date"
                                className="h-[38px] rounded-[5px] bg-[#e8eefc] px-4 text-[13px] font-medium text-black outline-none"
                              />

                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => {
                                  setCardCvv(e.target.value);
                                  setIsCardVerified(false);
                                }}
                                placeholder="Enter CVV"
                                className="h-[38px] rounded-[5px] bg-[#e8eefc] px-4 text-[13px] font-medium text-black outline-none"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={handleCardVerify}
                              className="mt-1 block w-full cursor-pointer text-right text-[12px] font-semibold text-[#0b73a7]"
                            >
                              {isCardVerified ? 'Verified' : 'Verify'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedPayment === 'qr' && (
                    <div className="mt-10 flex justify-center">
                      <div className="rounded-[8px] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
                        <img
                          src={SCANNER_IMAGE}
                          alt="QR Scanner"
                          className="h-[155px] w-[155px] object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#eef3fb] px-8 py-12 lg:px-14">
                <div className="flex items-start gap-7">
                  <div className="relative">
                    <img
                      src={GRADUATE_ICON}
                      alt="Course Icon"
                      className="h-[85px] w-[85px] rounded object-contain"
                    />

                    <div className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[15px] font-bold text-[#227cb5] shadow">
                      1
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-5 text-[22px] font-extrabold text-black">
                      2 Years General Studies Foundation Course
                    </h2>

                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-medium text-[#7b7b7b] line-through">
                        {formatPrice(ORIGINAL_PRICE)}
                      </span>

                      <span className="text-[20px] font-extrabold text-[#0b5a86]">
                        {formatPrice(COURSE_PRICE)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 md:flex-row">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setDiscountAmount(0);
                      setIsCouponApplied(false);
                    }}
                    placeholder="Coupon code"
                    className="h-[50px] flex-1 rounded-[12px] bg-white px-7 text-[17px] font-medium text-black outline-none shadow-[0_8px_18px_rgba(0,0,0,0.08)] placeholder:text-[#8b8b8b]"
                  />

                  <button
                    type="button"
                    onClick={handleCouponApply}
                    className="h-[50px] w-[130px] cursor-pointer rounded-full text-[18px] font-bold text-white"
                    style={{
                      background: isCouponApplied
                        ? 'linear-gradient(90deg, #13a538 0%, #087326 100%)'
                        : 'linear-gradient(90deg, #43a8da 0%, #003247 100%)',
                    }}
                  >
                    {isCouponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <CouponCard
                    title="Get this for 5,500 /-"
                    desc="Apply SAVE500 to get Rs.500 off"
                    onApply={() => handleCouponCardClick('SAVE500')}
                  />

                  <CouponCard
                    title="Get this for 5,000 /-"
                    desc="Apply SAVE1000 to get Rs.1000 off"
                    onApply={() => handleCouponCardClick('SAVE1000')}
                  />
                </div>

                <div className="mt-10 flex flex-col gap-5">
                  <PriceRow
                    label="Total Price"
                    value={`Rs.${formatPrice(ORIGINAL_PRICE)}`}
                  />

                  <PriceRow
                    label="Discount applied"
                    value={`Rs.${formatPrice(discountAmount)}`}
                  />

                  <PriceRow
                    label="Sub Total"
                    value={`Rs.${formatPrice(paymentPayAmount)}`}
                  />
                </div>

                <button
                  type="button"
                  onClick={handlePayment}
                  className="mx-auto mt-9 block h-[52px] w-full max-w-[260px] cursor-pointer rounded-full text-[18px] font-extrabold text-white"
                  style={{
                    background:
                      'linear-gradient(90deg, #43a8da 0%, #003247 100%)',
                  }}
                >
                  Pay Rs.{formatPrice(paymentPayAmount)}
                </button>
              </div>
            </div>

            <Footer />
          </div>
        )}

        {screen === 'receipt' && (
          <div className="h-screen w-full overflow-y-auto">
            <PaymentReceiptSuccess
              receiptNo="SI-090-6536"
              customerName={studentName || 'Student'}
              paymentDate={formatPaymentDate()}
              detailLabel="Course Name"
              detailValue="2 Year General Studies Foundation Course"
              rows={enrollReceiptRows}
              totalPaid={finalPayAmount}
              onGoHome={onClose}
            />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

interface AuthInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="w-full min-w-0 max-w-full">
      <label className="mb-2 block text-center text-[13px] font-medium text-black/45">
        {label}
        {required && (
          <span className="text-[#E53935]" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[42px] w-full min-w-0 max-w-full rounded-full bg-[#cde8f2] px-5 text-center text-[14px] font-medium text-black outline-none focus:shadow-[0_0_0_2px_rgba(42,157,216,0.35)]"
      />
    </div>
  );
};

interface DeliveryModeCardProps {
  title: string;
  subtitle: string;
  icon: 'building' | 'laptop';
  price: string;
  oldPrice: string;
  saving: string;
  popular?: boolean;
  selected: boolean;
  onSelect: () => void;
  highlights: string[];
  onEnroll: () => void;
}

const DeliveryModeCard: React.FC<DeliveryModeCardProps> = ({
  title,
  subtitle,
  icon,
  price,
  oldPrice,
  saving,
  popular = false,
  selected,
  onSelect,
  highlights,
  onEnroll,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`relative cursor-pointer rounded-[6px] border px-7 py-7 transition-colors duration-200 ${
        selected
          ? 'border-[#096bbb] bg-[#eef5ff] shadow-[0_6px_18px_rgba(9,107,187,0.18)]'
          : 'border-[#c2c9d4] bg-white'
      }`}
    >
      {popular && (
        <div className="absolute right-0 top-0 rounded-bl-[14px] rounded-tr-[5px] bg-gradient-to-r from-[#42a9db] to-[#003247] px-7 py-1.5 text-[15px] font-extrabold uppercase text-white">
          Popular
        </div>
      )}

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[24px] font-extrabold text-[#082b52]">
            {title}
          </h3>
          <p className="mt-1 text-[14px] font-medium text-[#4b5563]">
            {subtitle}
          </p>
        </div>

        {icon === 'building' ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1268aa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1"
          >
            <path d="M3 21h18" />
            <path d="M5 21V5h8v16" />
            <path d="M13 9h6v12" />
            <path d="M8 8h2" />
            <path d="M8 12h2" />
            <path d="M8 16h2" />
            <path d="M16 13h1" />
            <path d="M16 17h1" />
          </svg>
        ) : (
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1268aa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1"
          >
            <rect x="4" y="5" width="16" height="11" rx="1" />
            <path d="M2 20h20" />
            <path d="M9 16v2" />
            <path d="M15 16v2" />
          </svg>
        )}
      </div>

      <p className="mb-3 text-[14px] font-extrabold uppercase tracking-[1.2px] text-[#444b56]">
        Key Highlights Of Course
      </p>

      <div className="space-y-3">
        {highlights.map((item) => (
          <div key={item} className="flex items-start gap-2">
            <span className="mt-[2px] flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-2 border-[#00b98b] text-[11px] font-bold text-[#00b98b]">
              ✓
            </span>
            <p className="text-[14px] font-medium leading-[1.35] text-[#102033]">
              {item}
            </p>
          </div>
        ))}
      </div>

      <div className="my-6 h-[1px] w-full bg-[#d5dce6]" />

      <div className="mb-6 flex items-end gap-3">
        <span className="text-[48px] font-extrabold leading-none text-[#082b52]">
          {price}
        </span>
        <span className="pb-2 text-[16px] font-medium text-[#555] line-through">
          {oldPrice}
        </span>
      </div>

      <span className="inline-block rounded-[3px] bg-[#d7fff3] px-2 py-1 text-[14px] font-extrabold uppercase tracking-[1px] text-[#00a77a]">
        {saving}
      </span>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onEnroll();
        }}
        className="mx-auto mt-7 flex h-[38px] w-full max-w-[220px] cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#42a9db] to-[#003247] text-[13px] font-extrabold text-white transition hover:scale-[1.02]"
      >
        <span className="text-[15px]">▣</span>
        Enroll Now
      </button>
    </div>
  );
};

interface CouponCardProps {
  title: string;
  desc: string;
  onApply: () => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ title, desc, onApply }) => {
  return (
    <div className="rounded-[6px] bg-white px-5 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1d7fae] text-[14px] font-bold text-white">
          %
        </div>

        <h3 className="text-[17px] font-extrabold text-black">{title}</h3>
      </div>

      <p className="mt-3 text-[14px] font-semibold text-[#727272]">{desc}</p>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onApply}
          className="cursor-pointer rounded-full px-5 py-2 text-[14px] font-bold text-white"
          style={{
            background: 'linear-gradient(90deg, #43a8da 0%, #003247 100%)',
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

interface PriceRowProps {
  label: string;
  value: string;
}

const PriceRow: React.FC<PriceRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[17px] font-extrabold text-black">{label}</span>
      <span className="text-[17px] font-extrabold text-[#1777aa]">{value}</span>
    </div>
  );
};

export default EnrollAuthModal;