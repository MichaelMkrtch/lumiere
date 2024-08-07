import { Cross2Icon } from "@radix-ui/react-icons";
import { type ReactNode } from "react";

import DialogWithState from "./DialogWithState";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

export default function AuthModal({ children }: { children: ReactNode }) {
  return <DialogWithState>{children}</DialogWithState>;
}

function AuthModalContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const quotes = [
    "There's no place like home",
    "We've been expecting you",
    "So, you've come at last",
    "Where we're going, we don't need roads",
    "This is an offer you can't refuse",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <DialogContent className="top-[30%] w-4/5 border-0 p-6 text-zinc-300 caret-zinc-300 outline-none ring-1 md:top-[50%] md:w-1/2 md:max-w-md dark:bg-neutral-900 dark:ring-neutral-800">
      <DialogHeader className="mb-4">
        <DialogTitle className="tracking-wide">{title}</DialogTitle>
        <DialogDescription className="pt-1.5 text-zinc-200">
          {randomQuote}
        </DialogDescription>
      </DialogHeader>
      {children}
      <DialogClose asChild>
        <div className="focus-ring-2 absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none">
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </div>
      </DialogClose>
    </DialogContent>
  );
}

AuthModal.Trigger = DialogTrigger;
AuthModal.Content = AuthModalContent;
