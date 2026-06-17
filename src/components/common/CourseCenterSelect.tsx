"use client";

import React from "react";
import DemoFormSelect, {
  type DemoFormSelectVariant,
} from "@/components/common/DemoFormSelect";
import {
  useCourseCenters,
  type CourseCenter,
} from "@/features/enquiry/hooks/useCourseCenters";

interface CourseCenterSelectProps {
  value: string;
  onChange: (centerId: string, center?: CourseCenter) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: DemoFormSelectVariant;
  label?: string;
  labelClassName?: string;
  showLabel?: boolean;
  /** Skip fetching until true (e.g. when parent modal is open). */
  enabled?: boolean;
}

const CourseCenterSelect: React.FC<CourseCenterSelectProps> = ({
  value,
  onChange,
  placeholder = "Choose Center",
  disabled = false,
  variant = "modal",
  label = "Center",
  labelClassName = "mb-1 ml-1 block text-sm font-medium text-[#00000080]",
  showLabel = true,
  enabled = true,
}) => {
  const { options, isLoading, isError, findById } = useCourseCenters({ enabled });

  const resolvedPlaceholder =
    isLoading && !options.length
      ? "Loading centers..."
      : isError && !options.length
        ? "Unable to load centers"
        : placeholder;

  return (
    <div>
      {showLabel ? (
        <label className={labelClassName}>{label}</label>
      ) : null}
      <DemoFormSelect
        value={value}
        onChange={(centerId) => onChange(centerId, findById(centerId))}
        options={options}
        placeholder={resolvedPlaceholder}
        disabled={disabled || (isLoading && !options.length) || options.length === 0}
        variant={variant}
      />
    </div>
  );
};

export default CourseCenterSelect;
