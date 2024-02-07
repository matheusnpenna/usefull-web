/**
 * Creates an IntersectionObserver and starts observing all elements found using the selector.
 *
 * @param {String} selector: Selector used to find all target elements
 * @param {Number[]} threshold: Array of intersection ratios, at which the callback is executed
 * @param {Function} callback: Callback executed for each threshold
 */
function observe(selector, threshold, callback) {
  const elements = document.querySelectorAll(selector);
  const options = {
    rootMargin: '0px',
    threshold: threshold,
  };

  const observer = new IntersectionObserver(callback, options);

  for (const element of elements) {
    observer.observe(element);
  }
}

/**
 * Creates a CSS translateY value.
 *
 * @param {Number} ratio: A number between 0 and 1
 * @param {String} total: A valid CSS number and unit (10px, 100%, 30vh, …)
 * @return {String} The CSS translateY value.
 */
function translateY(ratio, total) {
  return `translateY(calc(-${ratio} * ${total * 1.4}%)`;
}

/**
 * Callback executed for the box elements
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 *
 * @param {IntersectionObserverEntry[]} entries: Intersection Observer Entries
 * @param {IntersectionObserver} observer: Intersection Observer
 */
function boxParallax(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      var speed = entry.target.getAttribute("data-parallax-speed") || "15";
      entry.target.style.transform = translateY(entry.intersectionRatio, speed);
    }
  }
}

/**
 * Create one threshold for each intersection ratio.
 *
 * @return {Number[]}
 */
function createThreshold() {
  const threshold = [];
  for (let i = 0; i <= 1.0; i += 0.01) {
    threshold.push(i);
  }

  return threshold;
}

const threshold = createThreshold();
observe('.parallax', threshold, boxParallax);
