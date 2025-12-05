import React from 'react'

export default function Head() {
  return (
    <>
      <title>Cinesense</title>
      <meta name="description" content="Your AI-powered movie recommendation app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content="Cinesense" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Cinesense",
        "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        "description": "AI-powered movie and TV recommendation app",
      }) }} />
    </>
  )
}
