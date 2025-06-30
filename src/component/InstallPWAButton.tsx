import React, { useEffect, useState } from 'react';

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setVisible(false);
      });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleInstallClick}
      style={{
        background: 'linear-gradient(90deg, #2563eb 0%, #1f2937 100%)',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        margin: 16
      }}
    >
      Install App
    </button>
  );
};

export default InstallPWAButton; 