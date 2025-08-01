import React, { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [doNotShow, setDoNotShow] = useState(false);

  useEffect(() => {
    // Check if user has previously opted out or if it's their first visit
    const hasSeenPopup = localStorage.getItem("hasSeenNewsletterPopup");
    const hasOptedOut = localStorage.getItem("newsletterPopupOptOut");

    if (!hasSeenPopup && !hasOptedOut) {
      setShowPopup(true);
      localStorage.setItem("hasSeenNewsletterPopup", "true");
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
    alert(`Subscribed with: ${email}`);
    closePopup();
  };

  const closePopup = () => {
    setShowPopup(false);
    if (doNotShow) {
      localStorage.setItem("newsletterPopupOptOut", "true");
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-black font-bold text-lg">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address to receive all news, updates on new arrivals,
          special offers and other discount information...
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-black border-gray-300 rounded px-4 py-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            SUBSCRIBE
          </button>
        </form>
        <div className="mt-4 text-center">
          <label className="text-gray-600 text-sm">
            <input
              type="checkbox"
              checked={doNotShow}
              onChange={(e) => setDoNotShow(e.target.checked)}
              className="mr-2"
            />
            Do not show this popup again
          </label>
        </div>
      </div>
    </div>
  );
}
