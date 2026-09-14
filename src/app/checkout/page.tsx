"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display, Outfit } from "next/font/google";
import { useCartStore, CartItem } from "../../../store/cartStore";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const COUNTRIES = [
  { name: "Afghanistan", code: "AF", dial: "+93" },
  { name: "Albania", code: "AL", dial: "+355" },
  { name: "Algeria", code: "DZ", dial: "+213" },
  { name: "Andorra", code: "AD", dial: "+376" },
  { name: "Angola", code: "AO", dial: "+244" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Armenia", code: "AM", dial: "+374" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Austria", code: "AT", dial: "+43" },
  { name: "Azerbaijan", code: "AZ", dial: "+994" },
  { name: "Bahamas", code: "BS", dial: "+1-242" },
  { name: "Bahrain", code: "BH", dial: "+973" },
  { name: "Bangladesh", code: "BD", dial: "+880" },
  { name: "Barbados", code: "BB", dial: "+1-246" },
  { name: "Belarus", code: "BY", dial: "+375" },
  { name: "Belgium", code: "BE", dial: "+32" },
  { name: "Belize", code: "BZ", dial: "+501" },
  { name: "Benin", code: "BJ", dial: "+229" },
  { name: "Bhutan", code: "BT", dial: "+975" },
  { name: "Bolivia", code: "BO", dial: "+591" },
  { name: "Bosnia and Herzegovina", code: "BA", dial: "+387" },
  { name: "Botswana", code: "BW", dial: "+267" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Brunei", code: "BN", dial: "+673" },
  { name: "Bulgaria", code: "BG", dial: "+359" },
  { name: "Burkina Faso", code: "BF", dial: "+226" },
  { name: "Burundi", code: "BI", dial: "+257" },
  { name: "Cambodia", code: "KH", dial: "+855" },
  { name: "Cameroon", code: "CM", dial: "+237" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Cape Verde", code: "CV", dial: "+238" },
  { name: "Central African Republic", code: "CF", dial: "+236" },
  { name: "Chad", code: "TD", dial: "+235" },
  { name: "Chile", code: "CL", dial: "+56" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Colombia", code: "CO", dial: "+57" },
  { name: "Comoros", code: "KM", dial: "+269" },
  { name: "Congo", code: "CG", dial: "+242" },
  { name: "Costa Rica", code: "CR", dial: "+506" },
  { name: "Croatia", code: "HR", dial: "+385" },
  { name: "Cuba", code: "CU", dial: "+53" },
  { name: "Cyprus", code: "CY", dial: "+357" },
  { name: "Czech Republic", code: "CZ", dial: "+420" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Djibouti", code: "DJ", dial: "+253" },
  { name: "Dominica", code: "DM", dial: "+1-767" },
  { name: "Dominican Republic", code: "DO", dial: "+1-809" },
  { name: "Ecuador", code: "EC", dial: "+593" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "El Salvador", code: "SV", dial: "+503" },
  { name: "Equatorial Guinea", code: "GQ", dial: "+240" },
  { name: "Eritrea", code: "ER", dial: "+291" },
  { name: "Estonia", code: "EE", dial: "+372" },
  { name: "Eswatini", code: "SZ", dial: "+268" },
  { name: "Ethiopia", code: "ET", dial: "+251" },
  { name: "Fiji", code: "FJ", dial: "+679" },
  { name: "Finland", code: "FI", dial: "+358" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Gabon", code: "GA", dial: "+241" },
  { name: "Gambia", code: "GM", dial: "+220" },
  { name: "Georgia", code: "GE", dial: "+995" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "Ghana", code: "GH", dial: "+233" },
  { name: "Greece", code: "GR", dial: "+30" },
  { name: "Grenada", code: "GD", dial: "+1-473" },
  { name: "Guatemala", code: "GT", dial: "+502" },
  { name: "Guinea", code: "GN", dial: "+224" },
  { name: "Guinea-Bissau", code: "GW", dial: "+245" },
  { name: "Guyana", code: "GY", dial: "+592" },
  { name: "Haiti", code: "HT", dial: "+509" },
  { name: "Honduras", code: "HN", dial: "+504" },
  { name: "Hungary", code: "HU", dial: "+36" },
  { name: "Iceland", code: "IS", dial: "+354" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "Indonesia", code: "ID", dial: "+62" },
  { name: "Iran", code: "IR", dial: "+98" },
  { name: "Iraq", code: "IQ", dial: "+964" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Israel", code: "IL", dial: "+972" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Jamaica", code: "JM", dial: "+1-876" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Jordan", code: "JO", dial: "+962" },
  { name: "Kazakhstan", code: "KZ", dial: "+7" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "Kiribati", code: "KI", dial: "+686" },
  { name: "Kuwait", code: "KW", dial: "+965" },
  { name: "Kyrgyzstan", code: "KG", dial: "+996" },
  { name: "Laos", code: "LA", dial: "+856" },
  { name: "Latvia", code: "LV", dial: "+371" },
  { name: "Lebanon", code: "LB", dial: "+961" },
  { name: "Lesotho", code: "LS", dial: "+266" },
  { name: "Liberia", code: "LR", dial: "+231" },
  { name: "Libya", code: "LY", dial: "+218" },
  { name: "Liechtenstein", code: "LI", dial: "+423" },
  { name: "Lithuania", code: "LT", dial: "+370" },
  { name: "Luxembourg", code: "LU", dial: "+352" },
  { name: "Madagascar", code: "MG", dial: "+261" },
  { name: "Malawi", code: "MW", dial: "+265" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Maldives", code: "MV", dial: "+960" },
  { name: "Mali", code: "ML", dial: "+223" },
  { name: "Malta", code: "MT", dial: "+356" },
  { name: "Marshall Islands", code: "MH", dial: "+692" },
  { name: "Mauritania", code: "MR", dial: "+222" },
  { name: "Mauritius", code: "MU", dial: "+230" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Micronesia", code: "FM", dial: "+691" },
  { name: "Moldova", code: "MD", dial: "+373" },
  { name: "Monaco", code: "MC", dial: "+377" },
  { name: "Mongolia", code: "MN", dial: "+976" },
  { name: "Montenegro", code: "ME", dial: "+382" },
  { name: "Morocco", code: "MA", dial: "+212" },
  { name: "Mozambique", code: "MZ", dial: "+258" },
  { name: "Myanmar", code: "MM", dial: "+95" },
  { name: "Namibia", code: "NA", dial: "+264" },
  { name: "Nauru", code: "NR", dial: "+674" },
  { name: "Nepal", code: "NP", dial: "+977" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Nicaragua", code: "NI", dial: "+505" },
  { name: "Niger", code: "NE", dial: "+227" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "North Korea", code: "KP", dial: "+850" },
  { name: "North Macedonia", code: "MK", dial: "+389" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Oman", code: "OM", dial: "+968" },
  { name: "Pakistan", code: "PK", dial: "+92" },
  { name: "Palau", code: "PW", dial: "+680" },
  { name: "Palestine", code: "PS", dial: "+970" },
  { name: "Panama", code: "PA", dial: "+507" },
  { name: "Papua New Guinea", code: "PG", dial: "+675" },
  { name: "Paraguay", code: "PY", dial: "+595" },
  { name: "Peru", code: "PE", dial: "+51" },
  { name: "Philippines", code: "PH", dial: "+63" },
  { name: "Poland", code: "PL", dial: "+48" },
  { name: "Portugal", code: "PT", dial: "+351" },
  { name: "Qatar", code: "QA", dial: "+974" },
  { name: "Romania", code: "RO", dial: "+40" },
  { name: "Russia", code: "RU", dial: "+7" },
  { name: "Rwanda", code: "RW", dial: "+250" },
  { name: "Saint Kitts and Nevis", code: "KN", dial: "+1-869" },
  { name: "Saint Lucia", code: "LC", dial: "+1-758" },
  { name: "Saint Vincent and the Grenadines", code: "VC", dial: "+1-784" },
  { name: "Samoa", code: "WS", dial: "+685" },
  { name: "San Marino", code: "SM", dial: "+378" },
  { name: "Sao Tome and Principe", code: "ST", dial: "+239" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Senegal", code: "SN", dial: "+221" },
  { name: "Serbia", code: "RS", dial: "+381" },
  { name: "Seychelles", code: "SC", dial: "+248" },
  { name: "Sierra Leone", code: "SL", dial: "+232" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Slovakia", code: "SK", dial: "+421" },
  { name: "Slovenia", code: "SI", dial: "+386" },
  { name: "Solomon Islands", code: "SB", dial: "+677" },
  { name: "Somalia", code: "SO", dial: "+252" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "South Korea", code: "KR", dial: "+82" },
  { name: "South Sudan", code: "SS", dial: "+211" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Sri Lanka", code: "LK", dial: "+94" },
  { name: "Sudan", code: "SD", dial: "+249" },
  { name: "Suriname", code: "SR", dial: "+597" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Syria", code: "SY", dial: "+963" },
  { name: "Taiwan", code: "TW", dial: "+886" },
  { name: "Tajikistan", code: "TJ", dial: "+992" },
  { name: "Tanzania", code: "TZ", dial: "+255" },
  { name: "Thailand", code: "TH", dial: "+66" },
  { name: "Timor-Leste", code: "TL", dial: "+670" },
  { name: "Togo", code: "TG", dial: "+228" },
  { name: "Tonga", code: "TO", dial: "+676" },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1-868" },
  { name: "Tunisia", code: "TN", dial: "+216" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "Turkmenistan", code: "TM", dial: "+993" },
  { name: "Tuvalu", code: "TV", dial: "+688" },
  { name: "Uganda", code: "UG", dial: "+256" },
  { name: "Ukraine", code: "UA", dial: "+380" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "Uruguay", code: "UY", dial: "+598" },
  { name: "Uzbekistan", code: "UZ", dial: "+998" },
  { name: "Vanuatu", code: "VU", dial: "+678" },
  { name: "Vatican City", code: "VA", dial: "+379" },
  { name: "Venezuela", code: "VE", dial: "+58" },
  { name: "Vietnam", code: "VN", dial: "+84" },
  { name: "Yemen", code: "YE", dial: "+967" },
  { name: "Zambia", code: "ZM", dial: "+260" },
  { name: "Zimbabwe", code: "ZW", dial: "+263" }
];

export default function CheckoutClient() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [selectedDial, setSelectedDial] = useState(COUNTRIES.find(c => c.code === "PK") || COUNTRIES[0]);
  const [dialOpen, setDialOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.name === "Pakistan") || COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  
  const totalAmount = items.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

const handleTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);
    const customerPhone = `${formData.get("dialCode")} ${formData.get("phone")}`;

    const payload = {
      customerEmail: formData.get("email"),
      customerPhone,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address1: formData.get("address1"),
      address2: formData.get("address2") || "",
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      country: formData.get("country"),
      totalAmount,
      items,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push(`/checkout/success?orderId=${data.orderId}`);
      }
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center pt-32">
        <p className={`${outfit.className} text-black/50 tracking-widest uppercase`}>Your archive queue is empty.</p>
      </main>
    );
  }

  const inputStyles = `bg-[#f9f8f6] border border-black/10 rounded-xl px-5 py-4 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/40 focus:bg-white transition-all w-full`;
  const labelStyles = `${outfit.className} text-[10px] uppercase tracking-[0.15em] text-black/60 font-semibold pl-2 mb-2 block`;

  return (
    <main className="bg-white min-h-screen text-black pt-32 pb-24 relative">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <div className="lg:col-span-7 flex flex-col">
          <div className="mb-12 border-b border-black/10 pb-8">
            <p className={`${outfit.className} text-[10px] md:text-xs text-black/40 uppercase tracking-[0.4em] font-bold mb-4`}>
              SECURE CHECKOUT
            </p>
            <h1 className={`${playfair.className} text-4xl md:text-5xl font-medium tracking-tight`}>
              Fulfillment Details.
            </h1>
          </div>
          
          <form onSubmit={handleTransaction} className="flex flex-col space-y-12">
            
            <div className="flex flex-col space-y-6">
              <h2 className={`${playfair.className} text-2xl font-medium text-black`}>01. Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="w-full">
                  <label className={labelStyles}>Email Address</label>
                  <input required name="email" type="email" className={inputStyles} placeholder="recipient@example.com" />
                </div>
                
                <div className="w-full relative">
                  <label className={labelStyles}>Phone Number</label>
                  <div className="flex relative">
                    <input type="hidden" name="dialCode" value={selectedDial.dial} />
                    
                    <button 
                      type="button" 
                      onClick={() => setDialOpen(true)} 
                      className="flex items-center gap-2 bg-[#f9f8f6] border border-black/10 border-r-0 rounded-l-xl px-4 py-4 text-sm text-black hover:bg-white transition-all w-[110px] z-20 relative"
                    >
                       <img src={`https://flagcdn.com/w20/${selectedDial.code.toLowerCase()}.png`} alt="flag" className="w-5 h-auto rounded-sm shadow-sm" />
                       <span className="font-medium">{selectedDial.dial}</span>
                    </button>

                    <AnimatePresence>
                      {dialOpen && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setDialOpen(false)} />
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 mt-2 w-[280px] max-h-[300px] overflow-y-auto bg-white border border-black/10 rounded-xl shadow-2xl z-40 custom-scrollbar p-2"
                          >
                            {COUNTRIES.map(c => (
                              <button 
                                type="button" 
                                key={`dial-${c.code}`} 
                                onClick={() => { setSelectedDial(c); setDialOpen(false); }} 
                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#f5f5f5] rounded-lg text-left text-sm transition-colors"
                              >
                                <img src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} alt="flag" className="w-5 h-auto rounded-sm shadow-sm" />
                                <span className="font-medium w-12">{c.dial}</span>
                                <span className="text-black/60 truncate">{c.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>

                    <input 
                      required 
                      name="phone" 
                      type="tel" 
                      className="bg-[#f9f8f6] border border-black/10 rounded-r-xl px-5 py-4 text-sm text-black placeholder-black/30 focus:outline-none focus:border-black/40 focus:bg-white transition-all w-full" 
                      placeholder="300 1234567" 
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h2 className={`${playfair.className} text-2xl font-medium text-black`}>02. Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="w-full">
                  <label className={labelStyles}>First Name</label>
                  <input required name="firstName" type="text" className={inputStyles} placeholder="First" />
                </div>
                <div className="w-full">
                  <label className={labelStyles}>Last Name</label>
                  <input required name="lastName" type="text" className={inputStyles} placeholder="Last" />
                </div>
              </div>

              <div className="w-full mt-4">
                <label className={labelStyles}>Street Address</label>
                <input required name="address1" type="text" className={inputStyles} placeholder="123 Gallery Route" />
              </div>

              <div className="w-full mt-4">
                <label className={labelStyles}>Apartment, suite, etc. (optional)</label>
                <input name="address2" type="text" className={inputStyles} placeholder="Apt 4B" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4">
                <div className="w-full">
                  <label className={labelStyles}>City</label>
                  <input required name="city" type="text" className={inputStyles} placeholder="City" />
                </div>
                <div className="w-full">
                  <label className={labelStyles}>State / Province</label>
                  <input required name="state" type="text" className={inputStyles} placeholder="State" />
                </div>
                <div className="w-full">
                  <label className={labelStyles}>Postal Code</label>
                  <input required name="zip" type="text" className={inputStyles} placeholder="ZIP" />
                </div>
              </div>

              <div className="w-full mt-4 relative">
                <label className={labelStyles}>Country</label>
                <input type="hidden" name="country" value={selectedCountry.name} />
                
                <button 
                  type="button" 
                  onClick={() => setCountryOpen(true)} 
                  className="flex items-center justify-between bg-[#f9f8f6] border border-black/10 rounded-xl px-5 py-4 text-sm text-black hover:bg-white transition-all w-full z-20 relative text-left"
                >
                  <div className="flex items-center gap-3">
                    <img src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`} alt="flag" className="w-5 h-auto rounded-sm shadow-sm" />
                    <span>{selectedCountry.name}</span>
                  </div>
                  <svg className={`w-4 h-4 text-black/50 transition-transform ${countryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {countryOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setCountryOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-full mb-2 left-0 w-full max-h-[300px] overflow-y-auto bg-white border border-black/10 rounded-xl shadow-2xl z-40 custom-scrollbar p-2"
                      >
                        {COUNTRIES.map(c => (
                          <button 
                            type="button" 
                            key={`country-${c.code}`} 
                            onClick={() => { setSelectedCountry(c); setCountryOpen(false); }} 
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f5f5f5] rounded-lg text-left text-sm transition-colors"
                          >
                            <img src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} alt="flag" className="w-5 h-auto rounded-sm shadow-sm" />
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isProcessing}
                type="submit"
                className={`${outfit.className} w-full bg-black text-white font-bold uppercase tracking-[0.2em] text-xs py-5 rounded-xl transition-all disabled:opacity-50 shadow-xl shadow-black/10`}
              >
                {isProcessing ? "Processing Transaction..." : `Finalize Secure Order — $${totalAmount}`}
              </motion.button>
              <div className="flex items-center justify-center gap-2 mt-6 text-black/40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className={`${outfit.className} text-[10px] uppercase tracking-widest`}>Encrypted 256-bit Connection</span>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="bg-[#fbfaf8] border border-black/5 rounded-3xl p-8 sticky top-32 shadow-2xl shadow-black/5">
            <h2 className={`${playfair.className} text-2xl font-medium mb-8`}>Acquisition Summary</h2>
            <div className="flex flex-col space-y-6 mb-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item: CartItem) => (
                <div key={item.id} className="flex gap-5 items-center bg-white p-3 rounded-2xl border border-black/5">
                  <div className="w-20 h-24 bg-[#f5f5f5] rounded-xl overflow-hidden shrink-0 shadow-inner">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1 pr-2">
                    <span className={`${outfit.className} text-sm font-medium mb-1`}>{item.title}</span>
                    <span className={`${outfit.className} text-xs text-black/50 mb-3`}>Quantity: {item.quantity}</span>
                    <span className={`${outfit.className} text-sm font-bold`}>${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col space-y-4 pt-6 border-t border-black/10">
              <div className="flex justify-between items-center">
                <span className={`${outfit.className} text-xs uppercase tracking-widest text-black/50`}>Subtotal</span>
                <span className={`${outfit.className} text-sm font-medium`}>${totalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${outfit.className} text-xs uppercase tracking-widest text-black/50`}>Shipping</span>
                <span className={`${outfit.className} text-xs font-medium text-black/60 uppercase tracking-widest`}>Calculated next</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-black/5">
                <span className={`${outfit.className} text-sm uppercase tracking-widest text-black`}>Total</span>
                <span className={`${playfair.className} text-4xl font-medium`}>${totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); }
      `}} />
    </main>
  );
}