sed -i '/export function calculateEstimatedValue/,$d' src/lib/currency.ts
cat << 'INNEREOF' >> src/lib/currency.ts
export function calculateEstimatedValue(diamonds: number, currency: CurrencyConfig): string {
  let inrValue = 0;
  if (diamonds >= 70000) inrValue = 500;
  else if (diamonds >= 28000) inrValue = 200;
  else if (diamonds >= 14000) inrValue = 100;
  else if (diamonds >= 7000) inrValue = 50;
  else if (diamonds >= 2800) inrValue = 20;
  else if (diamonds >= 1400) inrValue = 10;
  
  return formatRewardAmount(inrValue, currency);
}
INNEREOF
