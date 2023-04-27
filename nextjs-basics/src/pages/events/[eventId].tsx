import { EventSummary } from "@/components/EventDetails/EventSummary";
import { EventLogistics } from "@/components/EventDetails/EventLogistics";
import { EventContent } from "@/components/EventDetails/EventContent";
import { Event } from "@/helpers/types";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";

const EventDetailPage = ({ event }: { event: Event }) =>
  event ? (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name="
      description"
          content={event.description}
        />
      </Head>
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
    <div className="center">
      <p>Loading...</p>
    </div>
  );

export const getStaticProps = async (context: any) => {
  const { params } = context;

  const eventId = params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
