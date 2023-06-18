import { AuthForm } from "../../components/Auth/AuthForm";
import { getSession } from "next-auth/client";

const AuthPage = () => <AuthForm />;

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AuthPage;
