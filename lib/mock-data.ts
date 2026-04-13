export interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  notes: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  color: string;
}

export interface Discount {
  id: string;
  brand: string;
  offer: string;
  expiryDate: string;
  category: string;
  logo: string;
}

export const MOCK_INCOME: Income[] = [
  { id: '1', amount: 1200, source: 'Part-time Job', date: '2026-04-01' },
  { id: '2', amount: 300, source: 'Allowance', date: '2026-04-05' },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', amount: 15.50, category: 'Food', date: '2026-04-10', notes: 'Lunch at cafeteria' },
  { id: '2', amount: 45.00, category: 'Transport', date: '2026-04-09', notes: 'Monthly bus pass' },
  { id: '3', amount: 12.99, category: 'Entertainment', date: '2026-04-08', notes: 'Netflix subscription' },
  { id: '4', amount: 85.00, category: 'Education', date: '2026-04-07', notes: 'Textbook for Calculus' },
  { id: '5', amount: 25.00, category: 'Food', date: '2026-04-06', notes: 'Pizza night with friends' },
  { id: '6', amount: 10.00, category: 'Other', date: '2026-04-05', notes: 'Laundry' },
];

export const MOCK_SAVINGS: SavingsGoal[] = [
  { id: '1', title: 'New Laptop', targetAmount: 1200, currentAmount: 450, color: '#3b82f6' },
  { id: '2', title: 'Summer Trip', targetAmount: 800, currentAmount: 200, color: '#10b981' },
  { id: '3', title: 'Emergency Fund', targetAmount: 500, currentAmount: 150, color: '#f59e0b' },
];

export const MOCK_DISCOUNTS: Discount[] = [
  { id: '1', brand: 'Spotify', offer: 'Student Premium - 50% Off', expiryDate: '2026-12-31', category: 'Music', logo: 'https://picsum.photos/seed/spotify/100/100' },
  { id: '2', brand: 'Apple', offer: 'Education Pricing on Mac & iPad', expiryDate: '2026-09-30', category: 'Tech', logo: 'https://picsum.photos/seed/apple/100/100' },
  { id: '3', brand: 'Nike', offer: '10% Student Discount', expiryDate: '2026-06-30', category: 'Fashion', logo: 'https://picsum.photos/seed/nike/100/100' },
  { id: '4', brand: 'Amazon Prime', offer: '6 Months Free for Students', expiryDate: '2026-12-31', category: 'Shopping', logo: 'https://picsum.photos/seed/amazon/100/100' },
  { id: '5', brand: 'Adobe', offer: '60% Off Creative Cloud', expiryDate: '2026-08-31', category: 'Software', logo: 'https://picsum.photos/seed/adobe/100/100' },
];

export const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Education', 'Shopping', 'Health', 'Other'];

export const USER_PROFILE = {
  name: 'Alex Student',
  email: 'alex.student@university.edu',
  avatar: 'https://picsum.photos/seed/alex/100/100',
  income: 1500,
};
