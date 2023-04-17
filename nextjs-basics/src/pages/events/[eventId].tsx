import { useRouter } from "next/router";
import { getEventById } from "../../../dummy-data";
import { EventSummary } from "@/components/EventDetails/EventSummary";
import { EventLogistics } from "@/components/EventDetails/EventLogistics";
import { EventContent } from "@/components/EventDetails/EventContent";
import { ErrorAlert } from "@/components/UI/ErrorAlert/ErrorAlert";

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const event = getEventById(eventId);

  return event ? (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  ) : (
    <ErrorAlert>
      <p>No event found!</p>
    </ErrorAlert>
  );
};

export default EventDetailPage;
