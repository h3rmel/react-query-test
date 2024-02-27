export function wait(duration: number): Promise<unknown> {
  return new Promise((resolve: (value: unknown) => void) =>
    setTimeout(resolve, duration)
  );
}
