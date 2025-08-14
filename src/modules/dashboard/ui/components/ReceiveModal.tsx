"use client";

import { useState, useEffect } from "react";
import { useReceiveStore } from "../../state/receive.store";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { StellarAddress } from "@/components/ui/stellar-address";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Copy, Download, QrCode, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function ReceiveModal() {
  const { isOpen, closeModal } = useReceiveStore();
  const { contractId } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (!contractId) return;

    try {
      await navigator.clipboard.writeText(contractId);
      setCopied(true);
      toast.success("Address copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy address");
    }
  };

  const handleDownloadQR = () => {
    // This would generate and download the QR code as an image
    toast.info("QR download feature coming soon!");
  };

  if (!contractId) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Receive XLM
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code Section */}
          <div className="text-center">
            <Card className="p-6 bg-muted/30">
              <CardContent className="p-0">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-32 h-32 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      QR Code will be generated here
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Scanning this QR will copy the wallet address
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Address Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">
                Wallet Address
              </h3>
              <Badge variant="secondary" className="text-xs">
                Stellar Testnet
              </Badge>
            </div>

            <Card className="p-3 bg-muted/30">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <StellarAddress address={contractId} />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="ml-2 h-8 w-8 p-0"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              How to receive
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Share this QR code or wallet address with the sender</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Funds will appear in your wallet once the transaction is
                  confirmed
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>Only send XLM to this address on Stellar Testnet</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadQR}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyAddress}
              className="flex-1"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
