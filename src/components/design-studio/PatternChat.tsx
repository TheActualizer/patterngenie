import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface PatternChatProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  fabricType: string;
  designStyle: string;
}

export function PatternChat({ prompt, setPrompt, fabricType, designStyle }: PatternChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your pattern design assistant. Tell me about the garment you'd like to create and I'll help you describe it in detail. What type of garment are you thinking of?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Here we'll simulate the assistant's response based on the context
    // In a real implementation, this would call an AI service
    let response = "";
    
    if (messages.length === 1) {
      response = `Great! You want to create a ${userMessage}. What style details would you like to include? For example, sleeve type, length, or any special features?`;
    } else if (messages.length === 3) {
      response = `Those are great details! Since you're working with ${fabricType} fabric and a ${designStyle} style, would you like to add any specific embellishments or closures?`;
    } else if (messages.length === 5) {
      const fullDescription = `A ${userMessage} with ${messages[2].content}, made from ${fabricType} fabric in a ${designStyle} style.`;
      setPrompt(fullDescription);
      response = `Perfect! I've updated your pattern description to: "${fullDescription}" Would you like to make any adjustments?`;
    } else {
      response = "I've noted those details. Is there anything else you'd like to add or modify about the pattern?";
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    await generateAssistantResponse(userMessage);
  };

  return (
    <div className="flex flex-col h-[400px] border rounded-lg bg-white">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "flex break-words",
                message.role === "assistant" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.role === "assistant"
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground w-16 rounded-lg px-4 py-2">
                ...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}