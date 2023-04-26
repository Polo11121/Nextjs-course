const UserProfile = ({ username }: { username: string }) => (
  <div>index {username}</div>
);

export const getServerSideProps = async () => ({
  props: {
    username: "Max",
  },
});

export default UserProfile;
