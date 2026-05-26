import type { DrawState } from '@/types/lottery.types'; // ✅ Removed unused Tier
import { LOTTERY_TIERS } from '@/utils/constants';
import { 
  deductBalance, 
  addTransaction, 
  addActiveTicket,
  getBalance 
} from './shared-mock-state';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const MOCK_ACTIVE_DRAW: DrawState = {
  id: 'draw_20240524_2000',
  closesAt: Date.now() + 2 * 60 * 60 * 1000,
  status: 'open',
  jackpotPool: 50_000_000
};

const MOCK_WINNING_NUMBERS = [7, 14, 23, 31, 42, 49];

export const mockLotteryApi = {
  getTiers: async () => {
    await delay(200);
    return { data: { tiers: LOTTERY_TIERS } };
  },
  getActiveDraw: async () => {
    await delay(200);
    const draw = { ...MOCK_ACTIVE_DRAW, closesAt: Date.now() + 2 * 60 * 60 * 1000 };
    return { data: draw };
  },
purchaseTicket: async (data: { tierId: string; numbers: number[] }) => {
  await delay(1000);
  if (data.numbers.length === 0) throw new Error('Select at least one number');
  
  const tier = LOTTERY_TIERS.find(t => t.id === data.tierId);
  if (!tier) throw new Error('Invalid tier');
  
  // ✅ FIX: Flat price per ticket (not multiplied by number count)
  const totalCost = tier.price;
  
  const currentBalance = getBalance();
  if (totalCost > currentBalance) throw new Error('Insufficient balance');
  
  deductBalance(totalCost);
  
  addTransaction({
    date: new Date().toISOString(),
    type: 'purchase',
    amount: -totalCost, // ✅ Deduct flat price
    status: 'completed',
    reference: `REF_TKT_${Date.now()}`,
    description: `Ticket purchase: ${data.numbers.length} numbers in ${tier.name}`,
    color: 'red'
  });
  
  const newTicket = {
    id: `ticket_${Date.now()}`,
    drawId: MOCK_ACTIVE_DRAW.id,
    numbers: data.numbers,
    tierId: data.tierId,
    status: 'active' as const,
    purchasedAt: new Date().toISOString(),
    price: tier.price // ✅ Store flat price on ticket
  };
  addActiveTicket(newTicket);
  
  return {
    data: {
      ticketId: newTicket.id,
      drawId: MOCK_ACTIVE_DRAW.id,
      status: 'confirmed' as const
    }
  };
},
  getDrawResults: async (_drawId: string) => {
    await delay(300);
    return { data: { winningNumbers: MOCK_WINNING_NUMBERS, jackpotAmount: 50_000_000, winners: Math.floor(Math.random() * 100) } };
  }
};