/**
 * Creates a bound signal that synchronizes with an external signal if provided.
 * This hook is useful for two-way binding scenarios, especially when dealing with
 * component props that may or may not be signals.
 *
 * @param givenSignal - An optional external signal to bind to.
 * @param initialValue - The initial value to use if no external signal is provided.
 * @returns A signal that is either bound to the external signal or a new internal signal.
 *
 * The returned signal will update the external signal (if provided) whenever its value changes,
 * and will also update itself when the external signal changes.
 */

import { type Signal, createSignal, useConstant, useTask$ } from "@qwik.dev/core";

export const useBoundSignal = <T,>(
  givenSignal?: Signal<T>,
  initialValue?: T,
  valueBasedSignal?: Signal<T | undefined>
): Signal<T> => {
  const signal = useConstant(
    () => givenSignal || (createSignal(initialValue) as Signal<T>)
  );

  if (!valueBasedSignal) return signal;

  useTask$(({ track }) => {
    const value = track(() => valueBasedSignal.value);
    if (value === undefined) return;
    signal.value = value;
  });

  return signal;
};
