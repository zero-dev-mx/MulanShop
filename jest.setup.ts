import '@testing-library/jest-dom';

// jsdom does not implement the Web Animations API; stub it so components that
// call element.animate() (e.g. the size-selector shake) can render in tests.
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = () =>
    ({ cancel() {}, finished: Promise.resolve() }) as unknown as Animation;
}
