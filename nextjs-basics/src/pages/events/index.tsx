import { getAllEvents } from "../../../dummy-data";
import { EventsList } from "@/components/Events/EventsList";
import { EventsSearch } from "@/components/Events/EventsSearch";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year: string, month: string) =>
    router.push(`/events/${year}/${month}`);

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />;
    </>
  );
};

export default AllEventsPage;
