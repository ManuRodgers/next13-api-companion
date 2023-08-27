import { auth, redirectToSignIn } from '@clerk/nextjs';
import { CompanionForm } from './components/companion-form';
import db from '@/lib/db';

type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({
  params: { companionId },
}: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await db.companion.findUnique({
    where: { id: companionId, userId },
  });
  const categories = await db.category.findMany();
  return <CompanionForm companion={companion} categories={categories} />;
};
export default CompanionIdPage;
