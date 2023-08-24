import { Category, Companion } from '@prisma/client';

interface CompanionFormProps {
  categories: Category[];
  initialData: Companion | null;
}
export const CompanionForm = ({
  categories,
  initialData,
}: CompanionFormProps) => {};
