if (process.env.NODE_ENV === "production") {
  for (const method of ["log", "error", "warn", "info", "debug"] as const) {
    // @ts-ignore
    console[method] = () => {};
  }
  if (typeof window !== "undefined" && (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    // @ts-ignore
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true, inject: () => {} };
  }
}
