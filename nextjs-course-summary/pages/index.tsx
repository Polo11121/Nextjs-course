import Head from "next/head";
import MeetupList from "../components/Meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Meetup } from "../helpers/types";

const HomePage = ({ meetups }: { meetups: Meetup[] }) => (
  <>
    <Head>
      <title>React Meetups</title>
      <meta
        name="description"
        content="Browse a huge list of highly active React meetups"
      />
    </Head>
    <MeetupList meetups={meetups} />
  </>
);

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.API_USER}:${process.env.API_PASSWORD}@cluster0.hq9m2ag.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = client.db();

  const data = await db.collection("meetups").find().toArray();

  client.close();

  const meetups = data.map((meetup) => ({
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    id: meetup._id.toString(),
  }));

  return {
    props: {
      meetups,
    },
    revalidate: 60,
  };
};

export default HomePage;
