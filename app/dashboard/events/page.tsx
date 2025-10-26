import { EventSection } from "@/components/dashboard";

export default function EventsPage() {
  return (
    <div
      className={`
        min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50
      `}
    >
      <EventSection />
    </div>
  );
}
