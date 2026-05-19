"use client";

interface SubNavToggleProps<T extends string> {
  options: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
}

export default function SubNavToggle<T extends string>({
  options,
  active,
  onChange,
}: SubNavToggleProps<T>) {
  return (
    <div className="inline-flex items-center rounded-full bg-[#EEF2F6] p-2">
      {options.map((opt) => {
        const isActive = opt.id === active;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="rounded-full px-10 py-3 text-center transition-all"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              ...(isActive
                ? {
                    background:
                      "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 6px 16px rgba(0, 91, 136, 0.25)",
                  }
                : { color: "#1F2A37" }),
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
