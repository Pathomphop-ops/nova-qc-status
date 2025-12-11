'use client';

import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VscDebugRestart } from 'react-icons/vsc'; // Using an icon for the switch button

export default function ScannerPage() {
  const router = useRouter();
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | undefined>(undefined);
  const [scannerState, setScannerState] = useState<string>("Initializing...");
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs once to get the available cameras
    Html5Qrcode.getCameras()
      .then(devices => {
        if (devices && devices.length) {
          setCameras(devices);
          // Set the rear camera as the default if available
          const rearCamera = devices.find(device => device.label.toLowerCase().includes('back'));
          setSelectedCameraId(rearCamera ? rearCamera.id : devices[0].id);
        }
      })
      .catch(err => {
        console.error("Error getting cameras:", err);
        setScannerState("Could not get camera devices.");
      });
  }, []);

  useEffect(() => {
    if (!selectedCameraId || scanResult) {
      return;
    }

    const scanner = new Html5Qrcode("reader");
    setScannerState("Requesting camera access...");

    const onScanSuccess = (decodedText: string) => {
      if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
        scanner.pause();
      }
      setScanResult(decodedText);
      
      const [element_no, name_cus] = decodedText.split('|');
      if (element_no && name_cus) {
        // A short delay to show the "Scanned!" message
        setTimeout(() => {
           router.push(`/checklist/${encodeURIComponent(name_cus)}/${encodeURIComponent(element_no)}`);
        }, 1000);
      } else {
        alert('Invalid QR code format. Expected "element_no|name_cus".');
      }
    };

    const onScanError = (errorMessage: string) => {
      // This gets called frequently, so we don't do much here to avoid spamming the console.
    };
    
    scanner.start(
      selectedCameraId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      onScanSuccess,
      onScanError
    ).then(() => {
        setScannerState("Scanning...");
    }).catch((err) => {
        console.error("Scanner start error:", err);
        setScannerState(`Error: ${err.name === 'NotAllowedError' ? 'Camera permission denied.' : err.message}`);
    });

    // Cleanup function to stop the scanner
    return () => {
      if (scanner && scanner.isScanning) {
        scanner.stop().catch(err => console.error("Error stopping scanner:", err));
      }
    };
  }, [selectedCameraId, router, scanResult]);

  const handleSwitchCamera = () => {
    if (cameras.length > 1) {
      const currentIndex = cameras.findIndex(c => c.id === selectedCameraId);
      const nextIndex = (currentIndex + 1) % cameras.length;
      setSelectedCameraId(cameras[nextIndex].id);
      setScannerState("Switching camera...");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="relative w-full max-w-lg mx-auto">
        <div id="reader" className="w-full aspect-square bg-gray-800 rounded-lg shadow-lg overflow-hidden"></div>
        
        {/* Status Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="bg-black bg-opacity-50 text-white text-lg px-4 py-2 rounded-md">
              {scanResult ? `Scanned: ${scanResult}` : scannerState}
            </p>
        </div>
        
        {/* Switch Camera Button */}
        {cameras.length > 1 && !scanResult && (
            <button
                onClick={handleSwitchCamera}
                className="absolute top-4 right-4 z-10 p-3 bg-gray-900 bg-opacity-60 rounded-full text-white hover:bg-opacity-80 transition-opacity"
                aria-label="Switch Camera"
            >
                <VscDebugRestart size={24} />
            </button>
        )}
      </div>

      <button
        onClick={() => router.back()}
        className="mt-8 rounded-lg bg-gray-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-transform duration-150 ease-in-out hover:scale-105 hover:bg-gray-700"
      >
        Go Back
      </button>
    </main>
  );
}