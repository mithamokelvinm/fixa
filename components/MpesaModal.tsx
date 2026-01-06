
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, CheckCircle2, Phone } from 'lucide-react';

interface MpesaModalProps {
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

const MpesaModal: React.FC<MpesaModalProps> = ({ amount, onSuccess, onClose }) => {
  const [step, setStep] = useState<'INITIAL' | 'PROCESSING' | 'SUCCESS'>('INITIAL');
  const [phone, setPhone] = useState('254712345678');

  const handlePay = () => {
    setStep('PROCESSING');
    // Simulate STK Push and callback delay
    setTimeout(() => {
      setStep('SUCCESS');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="bg-emerald-600 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold">M-Pesa Payment</h2>
          <p className="opacity-90">Secure STK Push Transaction</p>
        </div>

        <div className="p-8">
          {step === 'INITIAL' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-gray-500 text-sm">Amount to Pay</span>
                <p className="text-3xl font-bold text-gray-900">KES {amount.toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">M-Pesa Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    placeholder="2547XXXXXXXX"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <p className="text-sm text-amber-800">
                  Please have your phone unlocked. You will receive a prompt to enter your M-Pesa PIN.
                </p>
              </div>

              <button 
                onClick={handlePay}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition transform active:scale-[0.98]"
              >
                Pay Now
              </button>
              <button onClick={onClose} className="w-full text-gray-400 text-sm font-medium">Cancel Transaction</button>
            </div>
          )}

          {step === 'PROCESSING' && (
            <div className="text-center py-12 space-y-6">
              <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pushing STK Prompt...</h3>
                <p className="text-gray-500 mt-2">Check your phone for the M-Pesa PIN prompt.</p>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-900">Payment Successful!</h3>
                <p className="text-gray-600 mt-2">Thank you. Your booking is now confirmed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MpesaModal;
