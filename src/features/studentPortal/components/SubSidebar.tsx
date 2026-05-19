"use client";

interface SubSidebarProps<T extends string> {
  items: readonly T[];
  active: T;
  onChange: (item: T) => void;
}

export default function SubSidebar<T extends string>({
  items,
  active,
  onChange,
}: SubSidebarProps<T>) {
  return (
    <nav className="flex w-[210px] shrink-0 flex-col gap-3">
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className="flex items-center justify-center transition-all"
            style={{
              width: "100%",
              height: 52,
              borderRadius: 32,
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 20,
              paddingRight: 20,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              lineHeight: "100%",
              border: "1px solid #0000001A",
              boxShadow: "0px 4px 32px 0px #0000000D",
              ...(isActive
                ? {
                    background:
                      "linear-gradient(90deg, rgba(0, 159, 238, 0.8) 34.5%, #005B88 100%)",
                    color: "#FFFFFF",
                  }
                : {
                    background: "#FFFFFF",
                    color: "rgba(0, 0, 0, 0.4)",
                  }),
            }}
          >
            {item}
          </button>
        );
      })}
    </nav>
  );
}
