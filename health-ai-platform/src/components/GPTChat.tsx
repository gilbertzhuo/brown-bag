"use client";

import React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import { CornerDownLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import TypingAnimation from "./TypingAnimation";

type Props = {
  user: Pick<User, "name" | "image">;
};

type ChatMessage = {
  role: string;
  userImage: string;
  message: string;
};

const GPTChat = ({ user }: Props) => {
  const [input, setInput] = React.useState("");
  const [chatLog, setChatLog] = React.useState<ChatMessage[]>([
    {
      role: `assistant`,
      userImage: `/ai.avif`,
      message: `How can I help you today?`,
    },
  ]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  const { mutate: checkResponse, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/v1/chat", chatLog, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const handleSubmit = React.useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if (input.trim() === "") return;
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { role: "user", userImage: user.image ?? "", message: `${input}` },
      ]);
      setInput("");
      checkResponse(undefined, {
        onSuccess: ({ message }) => {
          setChatLog((prevChatLog) => [
            ...prevChatLog,
            {
              role: `assistant`,
              userImage: `/ai.avif`,
              message,
            },
          ]);
        },
        onError: () => {
          setChatLog((prevChatLog) => [
            ...prevChatLog,
            {
              role: `assistant`,
              userImage: `/ai.avif`,
              message: `Error generating response`,
            },
          ]);
        },
      });
    },
    [input, user.image, checkResponse]
  );

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog, handleSubmit]);

  React.useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Enter" || e.keyCode === 13) {
        handleSubmit(e);
      }
    };
    const submitButtonRef = containerRef.current;
    if (submitButtonRef) {
      submitButtonRef.addEventListener("keydown", handleKeyDown);
      return () => {
        submitButtonRef.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleSubmit]);

  return (
    <div className="p-4 pt-0">
      <ScrollArea className="h-96 w-full pr-6 mb-2">
        {chatLog.map((chat, index) => {
          return (
            <div key={index}>
              {index !== 0 && <Separator />}
              <div className="pt-3 pb-3 flex space-x-4">
                <div className="relative aspect-square w-12 h-12">
                  <Image
                    fill
                    src={chat.userImage || ""}
                    alt="profile image"
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                  />
                </div>
                <div>
                  {chat.role === "assistant" && index === chatLog.length - 1 ? (
                    <TypingAnimation
                      content={chat?.message ?? ""}
                      className="text-sm font-light"
                    />
                  ) : (
                    <p className="text-sm font-light">{chat.message}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {isChecking && (
          <>
            <Separator />
            <div className="flex items-center space-x-4 mt-2">
              <div className="relative aspect-square w-12 h-12">
                <Image
                  fill
                  src="/ai.avif"
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </>
        )}
        <div ref={bottomRef} className="mt-16"></div>
      </ScrollArea>
      <div className="flex items-center border rounded-sm" ref={containerRef}>
        <Textarea
          disabled={isChecking}
          className="resize-none border-none !outline-none focus-visible:ring-0"
          placeholder="Type your message here."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div
          className="p-4"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <CornerDownLeft size={18} strokeWidth={2.5} stroke="lightgrey" />
        </div>
      </div>
    </div>
  );
};

export default GPTChat;
