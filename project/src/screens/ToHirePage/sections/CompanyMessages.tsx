import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  senderRole: string;
  timestamp: string;
  content: string;
  isCompanyMessage: boolean;
}

const mockConversations = [
  {
    id: 1,
    workerName: "Daniel Casutoy",
    workerRole: "Steelman",
    lastMessage: "Ready for work tomorrow",
    timestamp: "2:30 PM",
  },
  {
    id: 2,
    workerName: "Marvin San Diego",
    workerRole: "Mason",
    lastMessage: "Can I leave early today?",
    timestamp: "1:15 PM",
  },
  {
    id: 3,
    workerName: "Chrislyn Devers",
    workerRole: "Taga kape",
    lastMessage: "Thanks for the work opportunity",
    timestamp: "11:45 AM",
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Daniel Casutoy",
    senderRole: "Steelman",
    timestamp: "2:30 PM",
    content: "Ready for work tomorrow",
    isCompanyMessage: false,
  },
  {
    id: 2,
    sender: "Company",
    senderRole: "Manager",
    timestamp: "2:35 PM",
    content: "Yes, see you at 9 AM",
    isCompanyMessage: true,
  },
  {
    id: 3,
    sender: "Daniel Casutoy",
    senderRole: "Steelman",
    timestamp: "2:40 PM",
    content: "Perfect, I'll be there on time",
    isCompanyMessage: false,
  },
];

export const CompanyMessages = (): JSX.Element => {
  const [selectedWorker, setSelectedWorker] = useState<number>(1);
  const [replyMessage, setReplyMessage] = useState("");

  const handleSendMessage = () => {
    if (replyMessage.trim()) {
      console.log("Message sent:", replyMessage);
      setReplyMessage("");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      <div className="col-span-1">
        <h2 className="[font-family:'Jost',Helvetica] font-bold text-black text-2xl mb-4">
          Workers
        </h2>

        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {mockConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedWorker(conv.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors [font-family:'Jost',Helvetica] ${
                selectedWorker === conv.id
                  ? "bg-[#ff9d00]"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <p className="font-semibold text-black text-sm">{conv.workerName}</p>
              <p className="normal text-gray-600 text-xs mb-1">{conv.workerRole}</p>
              <p className="normal text-gray-700 text-xs truncate">
                {conv.lastMessage}
              </p>
              <p className="normal text-gray-500 text-xs">{conv.timestamp}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-3 flex flex-col bg-white rounded-[20px] shadow-[0px_4px_12px_#00000020]">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="[font-family:'Jost',Helvetica] font-bold text-black text-xl">
                {
                  mockConversations.find((c) => c.id === selectedWorker)
                    ?.workerName
                }
              </h3>
              <p className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-sm">
                {
                  mockConversations.find((c) => c.id === selectedWorker)
                    ?.workerRole
                }
              </p>
            </div>
            <span className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-sm">
              08:34:31 PM
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isCompanyMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-4 rounded-lg ${
                  msg.isCompanyMessage
                    ? "bg-[#ff9d00]"
                    : "bg-gray-200"
                }`}
              >
                <p className="[font-family:'Jost',Helvetica] font-semibold text-black text-sm mb-1">
                  {msg.sender}
                </p>
                <p className="[font-family:'Jost',Helvetica] font-normal text-black text-sm mb-2">
                  {msg.content}
                </p>
                <p className="[font-family:'Jost',Helvetica] font-normal text-gray-600 text-xs">
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 h-[44px] bg-gray-100 rounded-full px-4 [font-family:'Jost',Helvetica] font-normal text-black border-0 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-[#ff9d00] hover:bg-[#ff8c00] text-black rounded-full h-[44px] w-[120px] [font-family:'Jost',Helvetica] font-semibold text-sm"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
