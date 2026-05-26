import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletStore } from '@/store/wallet.store';
import { calculateShortfall } from '@/utils/math';
import { formatNGN } from '@/utils/formatters';

/**
 * Wallet balance guard for checkout flows
 * Calculates deficit, routes to deposit screen with exact amount, returns success state
 */
export const useWalletGuard = () => {
  const balance = useWalletStore(state => state.balance);
  const navigate = useNavigate();

  const checkBalance = useCallback((requiredAmount: number) => {
    const shortfall = calculateShortfall(requiredAmount, balance);
    return { hasSufficientFunds: shortfall === 0, shortfall };
  }, [balance]);

  const handleInsufficientFunds = useCallback((requiredAmount: number) => {
    const { shortfall } = checkBalance(requiredAmount);
    
    if (shortfall > 0) {
      // Pass exact deficit to wallet page for auto-populated deposit
      navigate('/wallet', {
        state: {
          depositAmount: shortfall,
          message: `Deposit Exactly ${formatNGN(shortfall)}`,
          redirectOnSuccess: true
        }
      });
      return true;
    }
    return false;
  }, [checkBalance, navigate]);

  return {
    checkBalance,
    handleInsufficientFunds,
    balance,
  };
};