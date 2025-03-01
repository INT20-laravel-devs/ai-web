"use client";

import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ChatInterface } from "./chat-interface";

export const ChatPopover = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </PopoverTrigger>
    <PopoverContent side="top" align="end" className="w-[400px] p-0">
      <ChatInterface />
    </PopoverContent>
  </Popover>
);
