"use client";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import ChatHeader from "./components/chat/chat-header";
import ChatItem from "./components/chat/chat-item";
import ChatMessage from "./components/chat/chat-message";
import EmptyChatPlaceholder from "./components/chat/chat-placeholder";
import MessageInput from "./components/message-input";
import SidebarFooter from "./components/sidebar/sidebar-footer";
import SidebarHeader from "./components/sidebar/siderbar-header";
import TypingIndicator from "./components/typing-indicator";
import { initialChats } from "./data/mock-data";

const HomeChat = () => {};

export default HomeChat;
