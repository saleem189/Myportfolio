import { useRouter } from 'vue-router';

/**
 * Composable for smooth scrolling functionality
 * Provides utilities to scroll to elements, sections, or top of page
 *
 * @returns {Object} Scroll utilities
 * @returns {Function} scrollToElement - Scroll to element by ID
 * @returns {Function} scrollToTop - Scroll to top of page
 * @returns {Function} scrollToSection - Scroll to section (home or element ID)
 *
 * @example
 * const { scrollToSection } = useScrollTo()
 * scrollToSection('contact') // Scrolls to #contact
 * scrollToSection('home') // Scrolls to top
 */
export function useScrollTo() {
  const router = useRouter();

  const scrollToElement = (elementId, offset = 35) => {
    const element = document.getElementById(elementId);
    if (element) {
      router.push({ path: '/', hash: `#${elementId}` });
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth',
      });
    }
  };

  /**
   * Scroll to the top of the page
   */
  const scrollToTop = () => {
    router.push({ path: '/', hash: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Scroll to a section by name
   * @param {string} section - Section name ('home' or element ID)
   */
  const scrollToSection = (section) => {
    if (section === 'home') {
      scrollToTop();
    } else {
      scrollToElement(section);
    }
  };

  return {
    scrollToElement,
    scrollToTop,
    scrollToSection,
  };
}
