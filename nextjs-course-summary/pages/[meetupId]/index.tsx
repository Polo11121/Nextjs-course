import Head from "next/head";
import MeetupDetail from "../../components/Meetups/MeetupDetail";
import { Meetup } from "../../helpers/types";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = ({ image, title, address, description }: Meetup) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <MeetupDetail
      title={title}
      image={image}
      address={address}
      description={description}
    />
  </>
);

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.API_USER}:${process.env.API_PASSWORD}@cluster0.hq9m2ag.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = client.db();

  const data = await db.collection("meetups").find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: data.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context: any) => {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.API_USER}:${process.env.API_PASSWORD}@cluster0.hq9m2ag.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = client.db();

  const data = await db
    .collection("meetups")
    .findOne({ _id: new ObjectId(meetupId) });

  client.close();

  return {
    props: {
      id: data._id.toString(),
      title: data.title,
      address: data.address,
      image: data.image,
      description: data.description,
    },
  };
};

export default MeetupDetails;
