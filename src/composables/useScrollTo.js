import { useRouter } from 'vue-router'

export function useScrollTo() {
  const router = useRouter()

  const scrollToElement = (elementId, offset = 35) => {
    const element = document.getElementById(elementId)
    if (element) {
      router.push({ path: '/', hash: `#${elementId}` })
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    router.push({ path: '/', hash: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (section) => {
    if (section === 'home') {
      scrollToTop()
    } else {
      scrollToElement(section)
    }
  }

  return {
    scrollToElement,
    scrollToTop,
    scrollToSection
  }
}

