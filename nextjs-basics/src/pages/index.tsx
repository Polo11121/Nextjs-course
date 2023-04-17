import { EventsList } from "@/components/Events/EventsList";
import { getFeaturedEvents } from "../../dummy-data";

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventsList items={featuredEvents} />
    </div>
  );
};

export default HomePage;
