"use client";

import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import BarcodeScanner from "../../components/BarcodeScanner";

export default function GroceriesPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  const handleStartScanner = async () => {
    try {
      // This official library function natively asks the browser for camera permissions.
      // It works perfectly on both Desktop webcams and Mobile phone cameras!
      const cameras = await Html5Qrcode.getCameras();
      
      if (cameras && cameras.length > 0) {
        // Permission was granted and a camera was found. Turn on the UI!
        setIsScanning(true); 
      } else {
        alert("No cameras found on this device.");
      }
    } catch (err: any) {
      alert("Camera blocked. Please ensure permissions are allowed. Error: " + err);
    }
  };

  const handleBarcodeScanned = (barcode: string) => {
    setIsScanning(false);
    setScannedBarcode(barcode);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Scanner</h1>

      {!isScanning ? (
        <button 
          onClick={handleStartScanner}
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center space-x-2"
        >
          <span className="text-xl">📷</span>
          <span>Start Barcode Scanner</span>
        </button>
      ) : (
        <div className="space-y-4">
          <BarcodeScanner onScan={handleBarcodeScanned} />
          <button 
            onClick={() => setIsScanning(false)}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel Scan
          </button>
        </div>
      )}

      {scannedBarcode && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-2">
            Barcode Detected!
          </h3>
          <p className="text-3xl font-mono font-bold text-green-900 mb-4">
            {scannedBarcode}
          </p>
        </div>
      )}
    </div>
  );
}