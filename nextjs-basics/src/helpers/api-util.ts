import { Event } from "./types";
import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(process.env.API_URL as string);

  const data: Record<string, Event> = await response.json();

  const events: Event[] = [];
  for (const key in data) {
    events.push({
      ...data[key],
      id: key,
    });
  }

  return events;
};

export const getFeaturedEvents = async (): Promise<Event[]> => {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id: string): Promise<Event> => {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id) as Event;
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}): Promise<Event[]> => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const useGetSWRFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}): Promise<{
  filteredEvents: Event[] | null;
  isLoading: boolean;
  error: any;
}> => {
  const { year, month } = dateFilter;

  const {
    data: allEvents,
    error,
    isLoading,
  } = useSWR<Event[]>(process.env.API_URL, fetcher);

  if (isLoading && allEvents) {
    const filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);

      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });

    return {
      filteredEvents,
      isLoading,
      error,
    };
  }

  return {
    filteredEvents: null,
    isLoading,
    error,
  };
};
