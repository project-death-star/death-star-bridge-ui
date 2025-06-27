// lib/feature-flags.ts
export const isEnabled = (flagName: string): boolean => {
  const flag = process.env[`NEXT_PUBLIC_${flagName}`];
  return flag === 'true';
};
