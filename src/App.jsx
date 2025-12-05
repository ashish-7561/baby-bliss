import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  Bell, 
  Heart, 
  Star, 
  Home, 
  User, 
  X, 
  ShoppingBag, 
  Baby, 
  Filter, 
  ArrowRight,
  Download // <--- This icon is for the Install Button
} from 'lucide-react';

// --- Skeleton Component ---
const CartSkeleton = () => (
  <div className="bg-white p-3 rounded-2xl shadow-sm flex gap-4 animate-pulse">
    <div className="w-20 h-20 bg-gray-200 rounded-xl shrink-0" />
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="flex justify-between items-end">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="w-20 h-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

// --- Static Data ---
const CATEGORIES = [
  { id: 1, name: 'Girl Fashion', color: 'bg-pink-100', icon: '👗' },
  { id: 2, name: 'Boy Fashion', color: 'bg-blue-100', icon: '👕' },
  { id: 3, name: 'Toys', color: 'bg-yellow-100', icon: '🧸' },
  { id: 4, name: 'Diapering', color: 'bg-green-100', icon: '👶' },
  { id: 5, name: 'Feeding', color: 'bg-purple-100', icon: '🍼' },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Soft Cotton Romper Set",
    category: "Girl Fashion",
    price: 15.99,
    originalPrice: 25.00,
    rating: 4.5,
    reviews: 120,
    discount: "36% OFF",
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 2,
    name: "Dino Print Tee & Shorts",
    category: "Boy Fashion",
    price: 12.50,
    originalPrice: 18.00,
    rating: 4.8,
    reviews: 85,
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 3,
    name: "Plush Elephant Toy",
    category: "Toys",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 230,
    discount: "33% OFF",
    image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 4,
    name: "Premium Diapers (Pack of 50)",
    category: "Diapering",
    price: 24.00,
    originalPrice: 30.00,
    rating: 4.7,
    reviews: 410,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 5,
    name: "Silicone Feeding Set",
    category: "Feeding",
    price: 18.50,
    originalPrice: 22.00,
    rating: 4.6,
    reviews: 56,
    discount: "15% OFF",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    id: 6,
    name: "Cute Bunny Hoodie",
    category: "Girl Fashion",
    price: 22.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviews: 112,
    discount: "37% OFF",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

// --- OPTIMIZED CHILD COMPONENTS ---

const HomeView = React.memo(({ 
  onAddToCart, 
  onNavigate, 
  notificationStatus, 
  isInstallable, 
  onRequestNotify, 
  onSendNotify, 
  onInstall 
}) => {
  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-10">
          <Baby size={180} />
        </div>
        <div className="relative z-10 mt-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">New Arrivals</span>
          <h1 className="text-3xl font-bold mt-2 leading-tight">Comfort for your<br />Little One</h1>
          <p className="mt-2 text-pink-50 text-sm">Discover the softest styles & safest toys.</p>
          <button onClick={() => onNavigate('products')} className="mt-4 bg-white text-pink-500 px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-gray-50 transition active:scale-95">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Shop by Category</h2>
          <span className="text-xs text-pink-500 font-bold">See All</span>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="flex flex-col items-center min-w-[70px]">
              <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-2xl shadow-sm mb-2`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-600 text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 mt-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Trending Now</h2>
          <button className="p-2 bg-gray-100 rounded-full"><Filter size={16} /></button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.slice(0, 4).map(product => (
            <div key={product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative mb-2">
                <img 
                  loading="lazy" 
                  decoding="async" 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-cover rounded-xl bg-gray-100" 
                />
                <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-gray-400 hover:text-red-500">
                  <Heart size={14} />
                </button>
                <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {product.discount}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
              <div className="flex items-center mt-1">
                <Star size={12} className="text-yellow-400 fill-current" />
                <span className="text-xs text-gray-500 ml-1">{product.rating} ({product.reviews})</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-1">${product.originalPrice}</span>
                </div>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition shadow-sm active:scale-90"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PWA Demo Section (With Install Button) */}
      <div className="m-4 mt-8 p-6 bg-indigo-900 rounded-2xl text-white relative overflow-hidden shadow-xl">
         <div className="relative z-10">
           <h3 className="text-xl font-bold mb-2">PWA Features Demo</h3>
           <p className="text-indigo-200 text-sm mb-4">Try native features like Push Notifications and Home Screen Installation.</p>
           
           <div className="space-y-3">
             {/* Notification Button */}
             {notificationStatus === 'granted' ? (
               <button 
                 onClick={onSendNotify}
                 className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
               >
                 <Bell size={20} />
                 Send Notification
               </button>
             ) : (
               <button 
                 onClick={onRequestNotify}
                 className="w-full bg-indigo-600 text-white border border-indigo-400 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
               >
                 <Bell size={20} />
                 Enable Notifications
               </button>
             )}

             {/* INSTALL BUTTON LOGIC */}
             {isInstallable ? (
               <button 
                 onClick={onInstall}
                 className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition animate-pulse"
               >
                 <Download size={20} />
                 Install BabyBliss App
               </button>
             ) : (
                // This message helps you know the code IS working, but the browser isn't ready
                <div className="text-center text-xs text-indigo-300 border border-indigo-700 rounded-lg p-2">
                   Install button hidden: Browser not ready.<br/>(Did you rename the icons?)
                </div>
             )}
           </div>
           
           <p className="text-xs text-center mt-3 text-indigo-300">Works on Desktop & Android (Chrome)</p>
         </div>
      </div>
    </div>
  );
});

const CartView = React.memo(({ cart, onRemove, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Optimized total calculation
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0).toFixed(2), [cart]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-20 bg-slate-50 min-h-screen pt-20 px-4">
       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Cart ({cart.length})</h2>
       
       {isLoading ? (
         <div className="space-y-4">
           <CartSkeleton />
           <CartSkeleton />
           <CartSkeleton />
         </div>
       ) : cart.length === 0 ? (
         <div className="flex flex-col items-center justify-center h-64 text-gray-400">
           <ShoppingBag size={64} className="mb-4 opacity-50" />
           <p>Your cart is empty</p>
           <button onClick={() => onNavigate('home')} className="mt-4 text-pink-500 font-bold hover:underline">Start Shopping</button>
         </div>
       ) : (
         <div className="space-y-4">
           {cart.map((item) => (
             <div key={item.cartId} className="bg-white p-3 rounded-2xl shadow-sm flex gap-4 animate-fade-in transition-all">
               <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
               <div className="flex-1 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                    <button onClick={() => onRemove(item.cartId)} className="text-gray-400 hover:text-red-500 p-1"><X size={16} /></button>
                 </div>
                 <div className="flex justify-between items-end">
                   <span className="text-pink-500 font-bold">${item.price}</span>
                   <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                     <button className="w-6 h-6 flex items-center justify-center bg-white rounded shadow text-xs">-</button>
                     <span className="text-xs font-bold">1</span>
                     <button className="w-6 h-6 flex items-center justify-center bg-white rounded shadow text-xs">+</button>
                   </div>
                 </div>
               </div>
             </div>
           ))}
           <div className="bg-white p-4 rounded-2xl shadow-sm mt-6">
             <div className="flex justify-between mb-4 text-gray-600 text-sm">
               <span>Subtotal</span>
               <span className="font-bold text-gray-900">${cartTotal}</span>
             </div>
             <button className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-pink-600 transition flex items-center justify-center gap-2 active:scale-95">
               Checkout <ArrowRight size={18} />
             </button>
           </div>
         </div>
       )}
    </div>
  );
});

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState('default');
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // --- Cart Logic (Persisted in Local Storage) ---
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('babybliss-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Auto-save cart to storage whenever it changes
  useEffect(() => {
    localStorage.setItem('babybliss-cart', JSON.stringify(cart));
  }, [cart]);

  // --- Optimized Event Handlers (useCallback) ---
  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
    if (navigator.vibrate) navigator.vibrate(50);
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  // --- PWA & Notifications Logic ---
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationStatus(Notification.permission);
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support notifications");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
    if (permission === 'granted') {
      // Use Service Worker if available (Better Mobile Support)
      if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification("Welcome to BabyBliss!", {
            body: "Thanks for enabling notifications.",
            icon: "/pwa-192x192.png",
            vibrate: [100, 50, 100]
          });
        });
      } else {
        new Notification("Welcome to BabyBliss!");
      }
    }
  };

  const sendDemoNotification = () => {
    if (notificationStatus === 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Flash Sale Alert! ⚡", {
            body: "50% OFF on all Diapers for the next hour only at BabyBliss!",
            icon: "/pwa-192x192.png",
            vibrate: [200, 100, 200],
            tag: 'flash-sale'
          });
        });
      } else {
        new Notification("Flash Sale Alert! ⚡", {
          body: "50% OFF on all Diapers!"
        });
      }
    } else {
      setShowNotificationModal(true);
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <div className="font-sans text-gray-800 max-w-md mx-auto shadow-2xl min-h-screen bg-white relative overflow-hidden">
      
      {/* Top Navigation */}
      <div className="fixed top-0 w-full max-w-md bg-white/90 backdrop-blur-md z-50 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <button className="text-gray-600"><Menu size={24} /></button>
          <div className="flex items-center gap-1">
             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">BabyBliss</h1>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-600"><Search size={22} /></button>
          <div className="relative" onClick={() => setActiveTab('cart')}>
            <ShoppingCart size={22} className={activeTab === 'cart' ? 'text-pink-500' : 'text-gray-600'} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-16">
        {activeTab === 'home' && (
          <HomeView 
            onAddToCart={addToCart} 
            onNavigate={setActiveTab}
            notificationStatus={notificationStatus}
            isInstallable={isInstallable} // Passing install state
            onRequestNotify={requestNotificationPermission}
            onSendNotify={sendDemoNotification}
            onInstall={handleInstallClick} // Passing install handler
          />
        )}
        
        {activeTab === 'cart' && (
          <CartView 
            cart={cart}
            onRemove={removeFromCart}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'products' && (
             <div className="pt-4 pb-20 bg-slate-50 min-h-screen">
                <div className="px-4 mb-4 flex items-center gap-2">
                    <button onClick={() => setActiveTab('home')} className="bg-white p-2 rounded-full shadow-sm"><ArrowRight className="rotate-180" size={20}/></button>
                    <h2 className="text-xl font-bold">All Products</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 px-4">
                    {PRODUCTS.map(product => (
                         <div key={product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                         <div className="relative mb-2">
                           <img loading="lazy" decoding="async" src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl" />
                           <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                             {product.discount}
                           </span>
                         </div>
                         <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">{product.name}</h3>
                         <div className="flex justify-between items-center mt-3">
                           <div>
                             <span className="text-lg font-bold text-gray-900">${product.price}</span>
                           </div>
                           <button 
                             onClick={() => addToCart(product)}
                             className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition shadow-sm active:scale-95"
                           >
                             <ShoppingBag size={16} />
                           </button>
                         </div>
                       </div>
                    ))}
                </div>
             </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center py-3 pb-safe z-50">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-pink-500' : 'text-gray-400'}`}
        >
          <Home size={24} fill={activeTab === 'home' ? "currentColor" : "none"} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Heart size={24} />
          <span className="text-[10px] font-medium">Wishlist</span>
        </button>
        <div className="relative -top-6">
           <button onClick={() => setActiveTab('cart')} className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105">
             <ShoppingCart size={24} />
           </button>
        </div>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <Bell size={24} />
          <span className="text-[10px] font-medium">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400">
          <User size={24} />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </div>

      {/* Permissions Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs text-center">
            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Enable Notifications</h3>
            <p className="text-sm text-gray-500 mb-6">Stay updated on flash sales, order status, and exclusive offers for your baby!</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowNotificationModal(false)}
                className="flex-1 py-2 text-gray-500 font-bold text-sm"
              >
                Later
              </button>
              <button 
                onClick={() => {
                  requestNotificationPermission();
                  setShowNotificationModal(false);
                }}
                className="flex-1 bg-pink-500 text-white py-2 rounded-xl font-bold text-sm shadow-lg shadow-pink-200"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}