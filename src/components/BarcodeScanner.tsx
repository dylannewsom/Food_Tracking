"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function BarcodeScanner({ onScan }: { onScan: (barcode: string) => void }) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        scannerRef.current = new Html5Qrcode("barcode-reader");
        
        await scannerRef.current.start(
          { facingMode: "environment" }, // Will safely fall back to front-cam on desktop
          { fps: 10, qrbox: { width: 250, height: 150 } },
          (decodedText) => {
            // Once a barcode is found, stop the camera and pass the data up
            if (scannerRef.current?.isScanning) {
              scannerRef.current.stop()
                .then(() => onScan(decodedText))
                .catch(console.error);
            }
          },
          () => { /* Ignore the background errors when no barcode is in view */ }
        );
      } catch (err: any) {
        console.error("Scanner failed:", err);
        setErrorMsg(err.message || "Failed to start camera feed.");
      }
    };

    startScanner();

    // Clean up the camera if the user hits the Cancel button
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [onScan]);

  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-blue-500 bg-slate-900 shadow-inner relative min-h-[250px] flex items-center justify-center">
      {errorMsg ? (
        <div className="p-4 text-center">
          <div className="text-red-500 text-3xl mb-2">⚠️</div>
          <p className="font-bold text-white mb-1">Camera Failed to Start</p>
          <p className="text-sm text-red-300 font-mono">{errorMsg}</p>
        </div>
      ) : (
        <div id="barcode-reader" className="w-full"></div>
      )}
    </div>
  );
}