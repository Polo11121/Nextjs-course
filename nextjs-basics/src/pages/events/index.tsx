import { EventsList } from "@/components/Events/EventsList";
import { EventsSearch } from "@/components/Events/EventsSearch";
import { useRouter } from "next/router";
import { Event } from "@/helpers/types";
import { getAllEvents } from "@/helpers/api-util";
import Head from "next/head";

const AllEventsPage = ({ events }: { events: Event[] }) => {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) =>
    router.push(`/events/${year}/${month}`);

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="
      description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />;
    </>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
