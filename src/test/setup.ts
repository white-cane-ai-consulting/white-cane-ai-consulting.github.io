import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// framer-motion's whileInView needs IntersectionObserver, which jsdom does not implement.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", { writable: true, value: MockIntersectionObserver });
Object.defineProperty(globalThis, "IntersectionObserver", { writable: true, value: MockIntersectionObserver });

// jsdom has no ResizeObserver; components that measure layout need a stub.
class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", { writable: true, value: MockResizeObserver });
Object.defineProperty(globalThis, "ResizeObserver", { writable: true, value: MockResizeObserver });

// jsdom does not implement media playback; Hero's background video calls play() on mount.
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  writable: true,
  value: () => Promise.resolve(),
});
Object.defineProperty(HTMLMediaElement.prototype, "pause", { writable: true, value: () => {} });
