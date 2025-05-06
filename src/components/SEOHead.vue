<script setup>
import { onMounted } from 'vue'
import info from '../../info'

const updateMetaTags = () => {
  // Update title
  document.title = `${info.name} - Portfolio | Full Stack Developer`

  // Update meta tags
  const metaTags = {
    'description': 'Full Stack Developer specializing in Laravel, Vue.js, and modern web technologies. View my portfolio of projects and professional experience.',
    'keywords': 'Full Stack Developer, Laravel, Vue.js, PHP, JavaScript, Web Development, Portfolio',
    'author': info.name,
    'og:title': `${info.name} - Portfolio | Full Stack Developer`,
    'og:description': 'Full Stack Developer specializing in Laravel, Vue.js, and modern web technologies.',
    'og:type': 'website',
    'og:url': window.location.href,
    'twitter:card': 'summary_large_image',
    'twitter:title': `${info.name} - Portfolio | Full Stack Developer`,
    'twitter:description': 'Full Stack Developer specializing in Laravel, Vue.js, and modern web technologies.'
  }

  // Update or create meta tags
  Object.entries(metaTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`)
    
    if (!meta) {
      meta = document.createElement('meta')
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name)
      } else if (name.startsWith('twitter:')) {
        meta.setAttribute('name', name)
      } else {
        meta.setAttribute('name', name)
      }
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  })

  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": info.name,
    "url": window.location.href,
    "jobTitle": "Full Stack Developer",
    "knowsAbout": info.skills.flatMap(skill => skill.info),
    "sameAs": [
      info.links.linkedin,
      info.links.github
    ]
  }

  let script = document.querySelector('script[type="application/ld+json"]')
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData)
}

onMounted(() => {
  updateMetaTags()
})
</script>

<template>
  <!-- This component doesn't render anything visible -->
</template> 