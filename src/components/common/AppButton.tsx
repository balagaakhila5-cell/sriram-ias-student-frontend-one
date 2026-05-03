'use client';

import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";

interface AppButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export function AppButton({
  children,
  isLoading = false,
  loadingText,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
