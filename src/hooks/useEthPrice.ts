import { useQuery } from '@tanstack/react-query';

interface PriceData {
  ethereum: {
    usd: number;
  };
}

async function fetchEthPrice(): Promise<number> {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch ETH price');
  }
  
  const data: PriceData = await response.json();
  return data.ethereum.usd;
}

export function useEthPrice() {
  const { data: ethPrice, isLoading, error } = useQuery({
    queryKey: ['eth-price'],
    queryFn: fetchEthPrice,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    refetchInterval: 1000 * 60 * 2, // Refresh every 2 minutes
    retry: 3,
  });

  // Calculate ETH equivalent for a given USD amount
  const getEthEquivalent = (usdAmount: number): string => {
    if (!ethPrice) return '—';
    const ethAmount = usdAmount / ethPrice;
    // Show 4 decimal places for precision
    return ethAmount.toFixed(4);
  };

  return {
    ethPrice,
    isLoading,
    error,
    getEthEquivalent,
  };
}
