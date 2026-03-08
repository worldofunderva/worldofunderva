

## Fix React forwardRef Warning on Toaster

The warning occurs because React 18.3+ deprecates string-based `forwardRef` usage, and the Radix `Toast` primitives pass refs through components. The `Toaster` component destructures props from toasts and spreads them into `<Toast>`, which can include stale ref-related props.

### Changes

**`src/components/ui/toaster.tsx`**
- Destructure and discard any `ref` prop from the toast object before spreading remaining props into `<Toast>`, preventing the forwardRef warning.

This is a minimal, single-file fix.

