import React, { useState, useEffect } from 'react';
import { Search, Minus, Plus, Trash2, Menu, X, Receipt, Sun, Moon, TrendingUp, History, Utensils, ShoppingBag } from 'lucide-react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&q=80';

const MENU_ITEMS = [
    {
        id: 1,
        name: 'Fresh Basil Salad',
        description: 'Healthy greens with basil',
        price: 12.50,
        category: 'Salads',
        images: [
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop&q=80',
        ],
        ingredients: ['Fresh Basil', 'Baby Spinach', 'Cherry Tomatoes', 'Feta Cheese', 'Balsamic Glaze'],
        nutrition: { calories: 240, protein: '8g', carbs: '12g', fat: '18g' },
    },
    {
        id: 2,
        name: 'Classic Beef Burger',
        description: 'Juicy beef patty with cheese',
        price: 15.00,
        category: 'Burgers',
        images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=600&fit=crop&q=80',
        ],
        ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Pickles', 'Brioche Bun'],
        nutrition: { calories: 650, protein: '34g', carbs: '45g', fat: '38g' },
    },
    {
        id: 3,
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni & mozzarella',
        price: 18.00,
        category: 'Pizza',
        images: [
            'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1574071318508-1cdbcd804002?w=800&h=600&fit=crop&q=80',
        ],
        ingredients: ['Pepperoni', 'Mozzarella', 'Tomato Sauce', 'Pizza Dough', 'Olive Oil'],
        nutrition: { calories: 820, protein: '28g', carbs: '92g', fat: '36g' },
    },
    {
        id: 4,
        name: 'Crispy Onion Rings',
        description: 'Golden fried onion rings',
        price: 8.00,
        category: 'Sides',
        images: [
            'https://images.unsplash.com/photo-1639122611434-f086bbe2c527?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=800&h=600&fit=crop&q=80',
        ],
        ingredients: ['Onions', 'Batter', 'Spices', 'Vegetable Oil'],
        nutrition: { calories: 340, protein: '4g', carbs: '38g', fat: '20g' },
    },
    {
        id: 5,
        name: 'BBQ Chicken Wings',
        description: 'Spicy glaze with dip',
        price: 14.50,
        category: 'Sides',
        images: [
            'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=600&fit=crop&q=80',
        ],
        ingredients: ['Chicken Wings', 'BBQ Sauce', 'Honey', 'Garlic', 'Chili Powder'],
        nutrition: { calories: 480, protein: '26g', carbs: '22g', fat: '32g' },
    },
    {
        id: 6,
        name: 'Fresh Orange Juice',
        description: '100% organic oranges',
        price: 6.50,
        category: 'Drinks',
        images: [
            'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&h=600&fit=crop&q=80',
            'https://images.unsplash.com/photo-1588861405688-f7a1fae4e73b?w=800&h=600&fit=crop&q=80',
        ],
        ingredients: ['Hand-pressed Organic Oranges'],
        nutrition: { calories: 120, protein: '2g', carbs: '26g', fat: '0g' },
    },
];

const RECENT_PURCHASES = [MENU_ITEMS[0], MENU_ITEMS[5], MENU_ITEMS[3]];
const POPULAR_ITEMS = [MENU_ITEMS[0], MENU_ITEMS[4], MENU_ITEMS[1]];

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOrderPanelOpen, setIsOrderPanelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [cart, setCart] = useState([
        { id: 2, name: 'Classic Beef Burger', price: 15.00, quantity: 1, note: 'Extra Cheese' },
        { id: 5, name: 'BBQ Chicken Wings', price: 14.50, quantity: 1, note: 'Spicy Sauce' },
    ]);
    const [cartPulse, setCartPulse] = useState(false);
    const [floatingItems, setFloatingItems] = useState([]);
    const [isDark, setIsDark] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderType, setOrderType] = useState('dine-in');

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        document.body.style.overflow = selectedItem ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedItem]);

    const addToCart = (item, event) => {
        setCartPulse(true);
        setTimeout(() => setCartPulse(false), 500);
        if (event) {
            const id = Date.now();
            setFloatingItems(prev => [...prev, { id, x: event.clientX, y: event.clientY }]);
            setTimeout(() => setFloatingItems(prev => prev.filter(fi => fi.id !== id)), 1000);
        }
        setCart(prev => {
            const existing = prev.find(ci => ci.id === item.id);
            if (existing) return prev.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

    const updateQuantity = (id, delta) => setCart(prev => prev.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    ));

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const filteredMenuItems = MENU_ITEMS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-950 font-sans overflow-hidden transition-colors duration-300" style={{ height: '100dvh' }}>
            {/* Overlay */}
            {(isSidebarOpen || isOrderPanelOpen) && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => { setIsSidebarOpen(false); setIsOrderPanelOpen(false); }}
                />
            )}

            {/* Floating +1 indicators */}
            {floatingItems.map(item => (
                <div
                    key={item.id}
                    className="fixed z-[9999] pointer-events-none w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-glow-orange animate-float-to-cart"
                    style={{ left: item.x, top: item.y }}
                >
                    +1
                </div>
            ))}

            {/* ─── Sidebar ─── */}
            <aside className={`
                fixed lg:relative z-50 h-full flex flex-col w-64 shrink-0
                bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800
                shadow-premium-lg transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="pt-safe p-6">
                    <h1 className="text-2xl font-extrabold text-orange-500 tracking-tight">RestroBit</h1>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 font-medium">Point of Sale</p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {['Dashboard', 'Menu', 'Orders', 'Staff', 'Settings'].map((item, i) => (
                        <div
                            key={item}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-semibold text-sm transition-all duration-200
                                ${i === 0
                                    ? 'bg-orange-500 text-white shadow-glow-orange'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                                }`}
                        >
                            {item}
                        </div>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-red-500 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                        <X size={18} />
                        Close Menu
                    </button>
                </div>
            </aside>

            {/* ─── Main Content ─── */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center gap-3 px-4 py-3 pt-8 lg:pt-4 lg:px-6 lg:py-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shrink-0 shadow-sm">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1 flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5 max-w-md">
                        <Search size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsDark(d => !d)}
                            aria-label="Toggle Theme"
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-yellow-400 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:rotate-12"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Cart Button (Mobile) */}
                        <button
                            onClick={() => setIsOrderPanelOpen(true)}
                            className={`lg:hidden relative flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all ${cartPulse ? 'scale-110' : ''}`}
                        >
                            <Receipt size={22} />
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-gray-900">
                                {cart.reduce((a, b) => a + b.quantity, 0)}
                            </span>
                        </button>

                        {/* User Profile (Desktop) */}
                        <div className="hidden lg:flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">John Doe</p>
                                <p className="text-xs text-gray-400">Cashier</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-glow-orange">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-5 lg:p-6 pb-safe space-y-6">
                    {/* Order Type Toggle */}
                    {!searchQuery && (
                        <div className="flex justify-center">
                            <div className="relative flex bg-white dark:bg-gray-900 rounded-2xl p-1.5 border border-gray-100 dark:border-gray-800 shadow-premium">
                                {/* Slider */}
                                <div
                                    className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-orange-500 shadow-glow-orange transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]`}
                                    style={{ left: '6px', transform: orderType === 'takeaway' ? 'translateX(100%)' : 'translateX(0)' }}
                                />
                                {[
                                    { key: 'dine-in', label: 'Dine-in', Icon: Utensils },
                                    { key: 'takeaway', label: 'Takeaway', Icon: ShoppingBag },
                                ].map(({ key, label, Icon }) => (
                                    <button
                                        key={key}
                                        onClick={() => setOrderType(key)}
                                        className={`relative z-10 flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300
                                            ${orderType === key ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
                                    >
                                        <Icon size={16} className={`transition-transform duration-300 ${orderType === key ? 'scale-110' : ''}`} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Promoted Sections */}
                    {!searchQuery && (
                        <div className="space-y-6">
                            {/* Recent Purchases */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <History size={18} className="text-orange-500" />
                                    <h2 className="font-bold text-gray-800 dark:text-gray-100">Recent Purchases</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {RECENT_PURCHASES.map((item, idx) => (
                                        <div
                                            key={`recent-${idx}`}
                                            onClick={() => { setSelectedItem(item); setActiveImageIndex(0); }}
                                            className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-premium hover:shadow-premium-lg hover:-translate-y-1 hover:border-orange-400 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="h-28 overflow-hidden">
                                                <img src={item.images[0]} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            </div>
                                            <div className="p-3">
                                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
                                                <p className="text-sm font-bold text-orange-500 mt-0.5">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Popular Items */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp size={18} className="text-orange-500" />
                                    <h2 className="font-bold text-gray-800 dark:text-gray-100">Popular Items</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {POPULAR_ITEMS.map((item, idx) => (
                                        <div
                                            key={`popular-${idx}`}
                                            onClick={() => { setSelectedItem(item); setActiveImageIndex(0); }}
                                            className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-premium hover:shadow-premium-lg hover:-translate-y-1 hover:border-orange-400 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className="relative h-28 overflow-hidden">
                                                <img src={item.images[0]} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">Hot</span>
                                            </div>
                                            <div className="p-3">
                                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
                                                <p className="text-sm font-bold text-orange-500 mt-0.5">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Menu Grid */}
                    <div>
                        {!searchQuery && (
                            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-4 text-base">All Items</h2>
                        )}
                        {filteredMenuItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filteredMenuItems.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => { setSelectedItem(item); setActiveImageIndex(0); }}
                                        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-premium hover:shadow-premium-lg hover:-translate-y-1.5 transition-all duration-200 cursor-pointer"
                                    >
                                        <div className="relative h-44 overflow-hidden">
                                            <img src={item.images[0]} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-orange-500 text-xs font-bold px-3 py-1 rounded-full border border-orange-100 dark:border-gray-700">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-50 text-base mb-1">{item.name}</h3>
                                            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-extrabold text-orange-500">${item.price.toFixed(2)}</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); addToCart(item, e); }}
                                                    className="px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900 text-sm font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 active:scale-95 transition-all duration-200"
                                                >
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 dark:text-gray-600">
                                <Search size={52} className="mb-4 opacity-40" />
                                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-2">No items found</h3>
                                <p className="text-sm mb-6">Try searching for something else</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ─── Order Panel ─── */}
            <aside className={`
                fixed lg:relative right-0 top-0 bottom-0 z-50 w-80 xl:w-96 shrink-0
                bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800
                flex flex-col shadow-premium-lg transition-transform duration-300 ease-in-out
                ${isOrderPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-50">Current Order</h2>
                        <button
                            onClick={() => setIsOrderPanelOpen(false)}
                            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
                        <span className="flex items-center gap-1">Order #20</span>
                        <span>·</span>
                        <span>Table 4</span>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
                                {item.note && <p className="text-xs text-orange-500 italic mt-0.5">{item.note}</p>}
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg px-2 py-1 border border-gray-100 dark:border-gray-700">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors"><Minus size={14} /></button>
                                    <span className="text-sm font-bold w-4 text-center text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 dark:text-gray-500 hover:text-orange-500 transition-colors"><Plus size={14} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-0.5"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="p-5 pb-safe border-t border-gray-100 dark:border-gray-800 space-y-3">
                    {[['Subtotal', subtotal], ['Tax (10%)', tax]].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>{label}</span>
                            <span>${value.toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-extrabold text-lg text-gray-900 dark:text-gray-50 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>Total</span>
                        <span className="text-orange-500">${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => { alert(`Order for ${cart.reduce((a, b) => a + b.quantity, 0)} items placed!`); setCart([]); }}
                        className="w-full py-3.5 rounded-2xl bg-green-500 hover:bg-green-600 active:scale-[.98] text-white font-bold text-sm uppercase tracking-wide shadow-glow-green transition-all duration-200 mt-1"
                    >
                        Order Food
                    </button>
                    <button className="w-full py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Proceed to Payment
                    </button>
                </div>
            </aside>

            {/* ─── Food Detail Modal ─── */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up"
                        onClick={e => e.stopPropagation()}
                    >

                        <div className="flex flex-col md:flex-row overflow-y-auto scrollbar-hide">
                            {/* Gallery */}
                            <div className="md:w-2/5 shrink-0 bg-gray-50 dark:bg-gray-950 flex flex-col">
                                <div className="h-64 md:h-72 overflow-hidden">
                                    <img
                                        src={selectedItem.images[activeImageIndex]}
                                        alt={selectedItem.name}
                                        onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                                        className="w-full h-full object-cover transition-all duration-300"
                                    />
                                </div>
                                <div className="flex gap-2 p-3">
                                    {selectedItem.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`flex-1 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${activeImageIndex === idx ? 'border-orange-500 scale-105 shadow-glow-orange' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        >
                                            <img src={img} alt="" onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col p-6 overflow-y-auto scrollbar-hide">
                                {/* Modal Header with close button inside */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-orange-500">{selectedItem.category}</span>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50 mb-2">{selectedItem.name}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">{selectedItem.description}</p>

                                {/* Ingredients */}
                                <div className="mb-5">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-sm">Ingredients</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.ingredients.map((ing, i) => (
                                            <span key={i} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium border border-gray-200 dark:border-gray-700">{ing}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Nutrition */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-sm">Nutrition Facts</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { label: 'Calories', value: selectedItem.nutrition.calories },
                                            { label: 'Protein', value: selectedItem.nutrition.protein },
                                            { label: 'Carbs', value: selectedItem.nutrition.carbs },
                                            { label: 'Fat', value: selectedItem.nutrition.fat },
                                        ].map(({ label, value }) => (
                                            <div key={label} className="flex flex-col items-center p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                                <span className="font-extrabold text-orange-500 text-sm">{value}</span>
                                                <span className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mt-0.5">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800">
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">${selectedItem.price.toFixed(2)}</span>
                                    <button
                                        onClick={(e) => { addToCart(selectedItem, e); setSelectedItem(null); }}
                                        className="px-8 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm shadow-glow-orange transition-all duration-200"
                                    >
                                        Add to Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
