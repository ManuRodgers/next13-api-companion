'use client';
import qs from 'query-string';
import { Category } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type CategoriesProps = { categories: Category[] };

export const Categories = ({ categories }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const onClick = (categoryId: string | undefined) => {
    const query = { categoryId };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div className="flex w-full p-1 space-x-2 overflow-x-auto border border-purple-700 border-solid">
      <button
        onClick={() => {
          onClick(undefined);
        }}
        className={cn(
          `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
          !categoryId ? 'bg-primary/25' : 'bg-primary/10'
        )}
      >
        Newest
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            onClick(category.id);
          }}
          className={cn(
            `
          flex
          items-center
          text-center
          text-xs
          md:text-sm
          px-2
          md:px-4
          py-2
          md:py-3
          rounded-md
          bg-primary/10
          hover:opacity-75
          transition
        `,
            category.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
