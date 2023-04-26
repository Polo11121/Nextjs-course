const UserDetails = ({ userId }: { userId: string }) => (
  <div>UserIdPage {userId}</div>
);

export const getServerSideProps = async (context: any) => {
  const { params } = context;

  const userId = params.userId;

  return {
    props: {
      userId,
    },
  };
};

export default UserDetails;
