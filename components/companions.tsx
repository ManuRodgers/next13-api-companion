import { Companion } from "@prisma/client";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

type CompanionsProps = {
  companions: (Companion & { _count: { messages: number } })[];
};

export const Companions = ({ companions }: CompanionsProps) => {
  if (companions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="grayscale" src="/empty.png" alt="Empty" />
        </div>
        <p className="text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {companions.map((companion) => (
        <Card
          key={companion.name}
          className="transition border-0 cursor-pointer bg-primary/10 rounded-xl hover:opacity-75"
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  fill
                  src={companion.src}
                  className="object-cover rounded-xl"
                  alt="Character"
                />
              </div>
              <p className="font-bold">{companion.name}</p>
              <p className="text-xs">{companion.description}</p>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
              <p className="lowercase">@{companion.userName}</p>
              <div className="flex items-center">
                <MessageSquare className="w-3 h-3 ml-1" />
                {companion._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
