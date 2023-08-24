import { Categories } from '@/components/categories';
import { SearchInput } from '@/components/search-input';
import db from '@/lib/db';

type RootPageProps = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};
const RootPage = async ({
  searchParams: { categoryId, name },
}: RootPageProps) => {
  const categories = await db.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
    </div>
  );
};
export default RootPage;
