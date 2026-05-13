"use client"
export default function Search({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div className="relative flex items-center w-full max-w-md">
            <svg
                className="absolute left-3 text-text-secondary pointer-events-none"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                name="Search"
                id="search"
                placeholder="Search users and conversations..."
                className="w-full pl-10 pr-4 py-2.5 outline-none border border-border bg-surface text-text-primary rounded-lg placeholder:text-text-secondary/60 focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
        </div>
    )
}
