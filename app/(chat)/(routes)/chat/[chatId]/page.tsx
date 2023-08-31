import { Categories } from '@/components/categories';
import { Companions } from '@/components/companions';
import { SearchInput } from '@/components/search-input';
import db from '@/lib/db';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { ChatClient } from './components/chat-client';

type ChatPageProps = {
  params: {
    chatId: string;
  };
};
const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await db.companion.findUnique({
    where: { id: chatId },
    include: {
      _count: { select: { messages: true } },
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          userId,
        },
      },
    },
  });

  if (!companion) {
    return redirect('/');
  }

  return <ChatClient companion={companion} />;
};
export default ChatPage;
