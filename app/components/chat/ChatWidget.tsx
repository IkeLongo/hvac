"use client";

import { useState } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow } from "./ChatWindow";
import type { Company } from "@/data/companies";

export function ChatWidget({ company }: { company: Company }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} company={company} />
      ) : (
        <ChatLauncher onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
}