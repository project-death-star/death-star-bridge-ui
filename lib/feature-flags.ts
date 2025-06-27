// lib/feature-flags.ts

// NOTE: For Next.js, environment variables prefixed with NEXT_PUBLIC_
// are embedded at build time. This means dynamic lookups like
// `process.env['NEXT_PUBLIC_' + flagName]` will not work.
// We must reference each flag statically.

export const isEnabled = (flagName: string): boolean => {
  switch (flagName) {
    case 'FF_HEALTH_CHECK_VIEW':
      return process.env.NEXT_PUBLIC_FF_HEALTH_CHECK_VIEW === 'true';
    // Add other flags here in the future
    default:
      return false;
  }
};
