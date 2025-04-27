import { useState } from "react";

const PaymentModal = ({ isOpen, onClose, selectedPlan }: any) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('card');
    const [processingPayment, setProcessingPayment] = useState(false);
    
    const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setProcessingPayment(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setProcessingPayment(false);
        onClose();
        // Show success message
        alert('Thank you for supporting SkillSync! Your payment was successful.');
      }, 2000);
    };
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative max-w-lg w-full backdrop-blur-lg bg-black/50 border border-white/10 rounded-2xl p-6 shadow-xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            disabled={processingPayment}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 className="text-xl font-medium mb-2">Support SkillSync</h3>
          <p className="text-gray-400 mb-6">
            {selectedPlan ? `You selected the ${selectedPlan.name} plan ($${selectedPlan.price}/month)` : 'Choose a payment method to continue'}
          </p>
          
          <form onSubmit={handlePayment} className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm ${paymentMethod === 'card' ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-gray-400'}`}
                onClick={() => setPaymentMethod('card')}
              >
                Credit Card
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm ${paymentMethod === 'paypal' ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-gray-400'}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                PayPal
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm ${paymentMethod === 'crypto' ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-gray-400'}`}
                onClick={() => setPaymentMethod('crypto')}
              >
                Cryptocurrency
              </button>
            </div>
            
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Expiration Date</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">CVC</label>
                    <input 
                      type="text" 
                      placeholder="123" 
                      className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="flex items-center justify-center p-6 bg-black/20 border border-white/10 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">PayPal</div>
                  <p className="text-gray-400 mb-4">You'll be redirected to PayPal to complete your payment</p>
                </div>
              </div>
            )}
            
            {paymentMethod === 'crypto' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-6 bg-black/20 border border-white/10 rounded-lg">
                  <div className="text-center">
                    <div className="text-xl font-medium mb-2">Send Cryptocurrency</div>
                    <p className="text-gray-400 mb-4">Send your payment to one of the following addresses:</p>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium mb-1">Bitcoin (BTC)</div>
                        <div className="px-3 py-2 bg-black/40 rounded text-xs text-gray-300 break-all">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-1">Ethereum (ETH)</div>
                        <div className="px-3 py-2 bg-black/40 rounded text-xs text-gray-300 break-all">
                          0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Transaction Hash (optional)</label>
                  <input 
                    type="text" 
                    placeholder="Enter your transaction hash for verification" 
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-600/20 transition-all flex items-center justify-center"
                disabled={processingPayment}
              >
                {processingPayment ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Payment'
                )}
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-500">
              Your payment information is secure and encrypted. By proceeding, you agree to the Terms of Service.
            </div>
          </form>
        </div>
      </div>
    );
  };


  export default PaymentModal;