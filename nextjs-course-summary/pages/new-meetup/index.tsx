import Head from "next/head";
import NewMeetupForm from "../../components/Meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Meetup } from "../../helpers/types";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetupData: Meetup) => {
    const response = await fetch("/api/meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.replace("/");
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
