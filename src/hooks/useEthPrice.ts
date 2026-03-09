import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const PriceSchema = z.object({
  ethereum: z.object({
    usd: z.number().positive().finite().min(100).max(1_000_000),
  }),
});

async function fetchEthPrice(): Promise<number> {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    { cache: 'no-store' }
  );
  if (!response.ok) throw new Error('Failed to fetch ETH price');
  const parsed = PriceSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error('Unexpected ETH price data shape');
  return parsed.data.ethereum.usd;
}

export function useEthPrice() {
  const { data: ethPrice, isLoading, error } = useQuery({
    queryKey: ['eth-price'],
    queryFn: fetchEthPrice,
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 2,
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  const getEthEquivalent = (usdAmount: number): string => {
    if (!ethPrice) return '—';
    return (usdAmount / ethPrice).toFixed(4);
  };

  return { ethPrice, isLoading, error, getEthEquivalent };
}
