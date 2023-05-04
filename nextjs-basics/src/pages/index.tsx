import { EventsList } from "@/components/Events/EventsList";
import { Event } from "@/helpers/types";
import { getFeaturedEvents } from "@/helpers/api-util";
import { NewsletterRegistration } from "@/components/Input/NewsletterRegistration";

const HomePage = ({ featuredEvents }: { featuredEvents: Event[] }) => (
  <div>
    <NewsletterRegistration />
    <EventsList items={featuredEvents} />
  </div>
);

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 90,
  };
};

export default HomePage;
