import React, { useState, useEffect } from 'react';
import { fetchMarketplaceData } from './data';
import { Home, ShoppingBag, Receipt, TrendingUp, User, ChevronRight } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace'); // 'top-brands' | 'nearby' | 'marketplace'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selection States
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedEmiPlans, setSelectedEmiPlans] = useState({});

  useEffect(() => {
    fetchMarketplaceData().then((data) => {
      setProducts(data);
      // Pre-select first variant and first EMI plan for each product
      const initialVariants = {};
      const initialEmi = {};
      data.forEach((item) => {
        initialVariants[item.id] = item.variants[0];
        initialEmi[item.id] = item.emiPlans[0].id;
      });
      setSelectedVariants(initialVariants);
      setSelectedEmiPlans(initialEmi);
      setLoading(false);
    });
  }, []);

  const handleVariantSelect = (productId, variant) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  const handleEmiSelect = (productId, planId) => {
    setSelectedEmiPlans((prev) => ({ ...prev, [productId]: planId }));
  };

  return (
    <div className="mobile-container">
      {/* Top Banner Header */}
      <header className="brand-header">
        <div className="badge">NO-COST EMIs</div>
        <h1>Shop today, <i>Pay later</i> using Mutual funds.</h1>
        <p>No credit score required. No interest. Backed by your investments.</p>
      </header>

      {/* Main Tab Switcher */}
      <nav className="tab-switcher">
        <button 
          className={activeTab === 'top-brands' ? 'active' : ''} 
          onClick={() => setActiveTab('top-brands')}
        >
          Top Brands
        </button>
        <button 
          className={activeTab === 'nearby' ? 'active' : ''} 
          onClick={() => setActiveTab('nearby')}
        >
          Nearby Stores
        </button>
        <button 
          className={activeTab === 'marketplace' ? 'active' : ''} 
          onClick={() => setActiveTab('marketplace')}
        >
          1Fi Marketplace
        </button>
      </nav>

      {/* Main Content View */}
      <main className="content-area">
        {activeTab === 'top-brands' && (
          <div className="empty-state">Top Brands Section (Blank)</div>
        )}

        {activeTab === 'nearby' && (
          <div className="empty-state">Nearby Stores Section (Blank)</div>
        )}

        {activeTab === 'marketplace' && (
          <div className="marketplace-section">
            {loading ? (
              <div className="loader">Loading Marketplace Products...</div>
            ) : (
              products.map((product) => {
                const activePlan = product.emiPlans.find(
                  (p) => p.id === selectedEmiPlans[product.id]
                );

                return (
                  <div key={product.id} className="product-card">
                    <div className="product-header">
                      <img src={product.image} alt={product.name} className="product-img" />
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <span className="price-tag">₹{product.basePrice.toLocaleString('en-IN')}</span>
                        <p className="subtext">{product.tagline}</p>
                      </div>
                    </div>

                    {/* Variant Selector */}
                    <div className="section-block">
                      <label>Select Variant:</label>
                      <div className="pill-group">
                        {product.variants.map((variant) => (
                          <button
                            key={variant}
                            className={`pill ${selectedVariants[product.id] === variant ? 'selected' : ''}`}
                            onClick={() => handleVariantSelect(product.id, variant)}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* EMI Plan Selector */}
                    <div className="section-block">
                      <label>Select EMI Plan:</label>
                      <div className="emi-group">
                        {product.emiPlans.map((plan) => (
                          <div
                            key={plan.id}
                            className={`emi-card ${selectedEmiPlans[product.id] === plan.id ? 'selected' : ''}`}
                            onClick={() => handleEmiSelect(product.id, plan.id)}
                          >
                            <div>
                              <strong>{plan.months} Months</strong>
                              <span className="badge-interest">{plan.interest}</span>
                            </div>
                            <div className="emi-price">₹{plan.monthly.toLocaleString('en-IN')}/mo</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="cta-btn">
                      Proceed with ₹{activePlan?.monthly.toLocaleString('en-IN')}/mo
                      <ChevronRight size={18} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="bottom-nav">
        <button className="nav-item">
          <Home size={20} />
          <span>Home</span>
        </button>
        <button className="nav-item active">
          <ShoppingBag size={20} />
          <span>Shop</span>
        </button>
        <button className="nav-item">
          <Receipt size={20} />
          <span>EMI Dues</span>
        </button>
        <button className="nav-item">
          <TrendingUp size={20} />
          <span>Limit</span>
        </button>
        <button className="nav-item">
          <User size={20} />
          <span>Profile</span>
        </button>
      </footer>
    </div>
  );
}