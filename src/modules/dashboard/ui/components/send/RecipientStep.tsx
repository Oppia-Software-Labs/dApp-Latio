"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StellarAddress } from "@/components/ui/stellar-address";
import { useSendStore } from "../../../state/send.store";
import { mockRecipients } from "../../../data/send-mock-data";
import { Search, User, Clock, Plus, Send } from "lucide-react";
import { SendRecipient } from "../../../types/send.types";

export function RecipientStep() {
  const { setRecipient } = useSendStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);

  const filteredRecipients = mockRecipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentRecipients = mockRecipients.filter((r) => r.isRecent);
  const otherRecipients = mockRecipients.filter((r) => !r.isRecent);

  const handleRecipientSelect = (recipient: SendRecipient) => {
    setRecipient(recipient);
  };

  const handleManualAddressSubmit = () => {
    if (manualAddress.trim()) {
      const manualRecipient: SendRecipient = {
        id: "manual",
        name: "Manual Address",
        address: manualAddress.trim(),
        avatar: "M",
        isRecent: false,
      };
      setRecipient(manualRecipient);
    }
  };

  const handleNewRecipient = () => {
    setShowManualInput(true);
  };

  return (
    <div className="space-y-4">
      {/* Manual Address Input */}
      {showManualInput ? (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Enter Stellar Address
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter the Stellar address you want to send XLM to
            </p>
          </div>

          <div className="space-y-3">
            <Input
              placeholder="GASDD...NL6"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              className="text-center font-mono"
            />

            <div className="flex gap-2">
              <Button
                onClick={() => setShowManualInput(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleManualAddressSubmit}
                disabled={!manualAddress.trim()}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">Recent</h3>
              </div>
              <div className="space-y-2">
                {recentRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => handleRecipientSelect(recipient)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {recipient.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">
                        {recipient.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <StellarAddress address={recipient.address} />
                      </p>
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
                <User className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">
                  Contacts
                </h3>
              </div>
              <div className="space-y-2">
                {otherRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => handleRecipientSelect(recipient)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {recipient.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">
                        {recipient.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <StellarAddress address={recipient.address} />
                      </p>
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
              Enter Address Manually
            </Button>
          </div>

          {/* Search Results */}
          {searchQuery && filteredRecipients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recipients found</p>
              <Button
                onClick={handleNewRecipient}
                variant="outline"
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                Enter Address Manually
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
