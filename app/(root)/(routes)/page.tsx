import { UserButton } from '@clerk/nextjs';

export default function RootPage() {
  return (
    <h1>
      <UserButton afterSignOutUrl="/" />
    </h1>
  );
}
