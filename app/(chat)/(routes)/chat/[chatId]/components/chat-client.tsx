"use client";

import { ChatHeader } from "@/components/chat-header";
import { useCompletion } from "ai/react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { ChatForm } from "@/components/chat-form";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any>(companion.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_prompt, completion) {
        const systemMessage = {
          role: "system",
          content: completion,
        };

        setMessages((current: any) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const userMessage = {
        role: "user",
        content: input,
      };
      setMessages((current: any) => [...current, userMessage]);
      handleSubmit(e);
    },
    [handleSubmit, input],
  );

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
