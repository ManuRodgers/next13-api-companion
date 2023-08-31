import { Categories } from '@/components/categories';
import { Companions } from '@/components/companions';
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
  const companions = await db.companion.findMany({
    where: {
      categoryId: categoryId,
      name: { search: name },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  console.log('companions: ', companions);
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories categories={categories} />
      <Companions companions={companions} />
    </div>
  );
};
export default RootPage;
