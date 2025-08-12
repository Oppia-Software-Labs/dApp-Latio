"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendStore } from "../../../state/send.store";
import { mockRecipients } from "../../../data/send-mock-data";
import { Search, User, Clock, Plus } from "lucide-react";
import { SendRecipient } from "../../../types/send.types";

export function RecipientStep() {
  const { setRecipient } = useSendStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipients = mockRecipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentRecipients = mockRecipients.filter(r => r.isRecent);
  const otherRecipients = mockRecipients.filter(r => !r.isRecent);

  const handleRecipientSelect = (recipient: SendRecipient) => {
    setRecipient(recipient);
  };

  const handleNewRecipient = () => {
    // For MVP, we'll just select the first recipient
    if (mockRecipients.length > 0) {
      setRecipient(mockRecipients[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Recent Recipients */}
      {recentRecipients.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Recent</h3>
          </div>
          <div className="space-y-2">
            {recentRecipients.map((recipient) => (
              <button
                key={recipient.id}
                onClick={() => handleRecipientSelect(recipient)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">
                    {recipient.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{recipient.name}</p>
                  <p className="text-xs text-gray-500">{recipient.address}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Other Recipients */}
      {otherRecipients.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Contacts</h3>
          </div>
          <div className="space-y-2">
            {otherRecipients.map((recipient) => (
              <button
                key={recipient.id}
                onClick={() => handleRecipientSelect(recipient)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {recipient.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{recipient.name}</p>
                  <p className="text-xs text-gray-500">{recipient.address}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* New Recipient Button */}
      <div className="pt-4 border-t">
        <Button
          onClick={handleNewRecipient}
          variant="outline"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Recipient
        </Button>
      </div>

      {/* Search Results */}
      {searchQuery && filteredRecipients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recipients found</p>
          <Button
            onClick={handleNewRecipient}
            variant="outline"
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Recipient
          </Button>
        </div>
      )}
    </div>
  );
}
