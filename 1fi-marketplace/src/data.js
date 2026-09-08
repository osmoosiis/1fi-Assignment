export const fetchMarketplaceData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Apple iPhone 15 Pro',
          tagline: 'No-cost EMIs up to 24 months',
          basePrice: 134900,
          image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=60',
          variants: ['128GB', '256GB', '512GB'],
          emiPlans: [
            { id: 'plan-3', months: 3, monthly: 44966, interest: '0% Interest' },
            { id: 'plan-6', months: 6, monthly: 22483, interest: '0% Interest' },
            { id: 'plan-12', months: 12, monthly: 11241, interest: 'No Cost EMI' }
          ]
        },
        {
          id: '2',
          name: 'MacBook Air M2',
          tagline: 'No-cost EMIs up to 18 months',
          basePrice: 114900,
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=60',
          variants: ['8GB / 256GB', '16GB / 512GB'],
          emiPlans: [
            { id: 'plan-6-mac', months: 6, monthly: 19150, interest: '0% Interest' },
            { id: 'plan-12-mac', months: 12, monthly: 9575, interest: 'No Cost EMI' }
          ]
        }
      ]);
    }, 400); 
  });
};