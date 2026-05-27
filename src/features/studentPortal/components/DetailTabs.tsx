"use client";

export interface DetailTab<T extends string> {
  id: T;
  label: string;
}

interface DetailTabsProps<T extends string> {
  tabs: DetailTab<T>[];
  active: T;
  onChange: (id: T) => void;
}

export default function DetailTabs<T extends string>({
  tabs,
  active,
  onChange,
}: DetailTabsProps<T>) {
  return (
    <div className="flex w-full items-center rounded-full bg-[#EEF2F6] p-3">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="flex-1 rounded-full px-6 py-4 text-center transition-all"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "100%",
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
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
