import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send, Crown } from 'lucide-react';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Custom Gold Dori / Cord Sizing');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDFD] border border-[#F0E2DF] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-[#2D1A20] shadow-2xl relative">
        <button
          id="close-custom-order-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#FAF5F5] text-[#8C6B75] hover:text-[#4A1525] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#4A1525] text-[10px] font-bold uppercase tracking-widest border border-[#E8C5CE] mb-2">
                <Crown className="w-3 h-3 text-[#C5A059]" />
                <span>Ragini Garodia Bespoke Desk</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#4A1525]">Custom Gold Request</h3>
              <p className="text-xs text-[#5A3E46] font-normal mt-1">
                Need custom silk dori sizing, modified coin haram lengths, or bulk bridal gifting? Submit your request and our artisans will respond within 12 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#5A3E46] font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyal Sharma"
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#5A3E46] font-semibold mb-1">Email or Phone Number</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priyal@example.com or +91 98765..."
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#5A3E46] font-semibold mb-1">Inquiry Category</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="Custom Gold Dori / Cord Sizing">Custom Gold Dori / Cord Sizing</option>
                  <option value="Coin Haram / Chain Length Modification">Coin Haram / Chain Length Modification</option>
                  <option value="Bulk Bridesmaid Gold Gifting">Bulk Bridesmaid Gold Gifting</option>
                  <option value="Bespoke Metal Filigree Design">Bespoke Metal Filigree Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[#5A3E46] font-semibold mb-1">Describe Requirements</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  placeholder="Describe necklace length, wedding date, or custom quantity..."
                  className="w-full bg-[#FAF5F5] border border-[#E8D7D3] text-[#2D1A20] rounded-xl p-2.5 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <button
                type="submit"
                id="submit-custom-request-btn"
                className="w-full bg-[#4A1525] hover:bg-[#5C1D2E] text-rose-50 font-bold py-3 rounded-full text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit Gold Request</span>
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#4A1525]">Request Received!</h3>
            <p className="text-xs text-[#5A3E46] max-w-xs mx-auto">
              Thank you, <strong>{name}</strong>. Our Master Goldsmith will review your custom <strong>{inquiryType}</strong> request and contact you at {email}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#4A1525] text-white font-bold text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
