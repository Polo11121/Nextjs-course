import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import { EventsList } from "@/components/Events/EventsList";
import { ResultsTitle } from "@/components/Events/ResultsTitle";
import { Button } from "@/components/UI/Button/Button";
import { ErrorAlert } from "@/components/UI/ErrorAlert/ErrorAlert";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;
  const year = filterData && +filterData[0];
  const month = filterData && +filterData[1];

  const isFilteredDataValid =
    filterData?.length === 2 &&
    year &&
    month &&
    year > 2020 &&
    month > 0 &&
    month < 13;

  const filteredEvents = isFilteredDataValid
    ? getFilteredEvents({
        year: +filterData[0],
        month: +filterData[1],
      })
    : null;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  if (!isFilteredDataValid || !filteredEvents) {
    return (
      <>
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

  if (filteredEvents?.length === 0) {
    return (
      <>
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
      <ResultsTitle date={new Date(year, month - 1)} />
      <EventsList items={filteredEvents} />;
    </>
  );
};

export default FilteredEventsPage;
