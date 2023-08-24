import { auth, redirectToSignIn } from '@clerk/nextjs';

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = ({ params: { companionId } }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
  return <div>CompanionIdPage</div>;
};
export default CompanionIdPage;
