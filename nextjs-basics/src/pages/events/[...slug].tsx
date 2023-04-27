import { EventsList } from "@/components/Events/EventsList";
import { ResultsTitle } from "@/components/Events/ResultsTitle";
import { Button } from "@/components/UI/Button/Button";
import { ErrorAlert } from "@/components/UI/ErrorAlert/ErrorAlert";
import { getFilteredEvents } from "@/helpers/api-util";
import { Event } from "@/helpers/types";
import Head from "next/head";

type FilteredEventsPageProps = {
  filteredEvents: Event[];
  hasError: boolean;
  date: {
    year: number;
    month: number;
  };
};

const FilteredEventsPage = ({
  filteredEvents,
  hasError,
  date,
}: FilteredEventsPageProps) => {
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="
      description"
        content={`All events for ${date.month}/${date.year}`}
      />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div
          style={{
            width: "12rem",
          }}
          className="center"
        >
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  if (filteredEvents?.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">No events found for the chosen filter!</p>
        </ErrorAlert>
        <div
          style={{
            width: "12rem",
          }}
          className="center"
        >
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={new Date(date.year, date.month - 1)} />
      <EventsList items={filteredEvents} />;
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { params } = context;

  const filterData = params.slug;

  const year = filterData && +filterData[0];
  const month = filterData && +filterData[1];

  const isFilteredDataValid =
    filterData?.length === 2 &&
    year &&
    month &&
    year > 2020 &&
    month > 0 &&
    month < 13;

  if (!isFilteredDataValid) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year,
    month,
  });

  return {
    props: {
      filteredEvents,
      hasError: false,
      date: {
        year,
        month,
      },
    },
  };
};

export default FilteredEventsPage;
