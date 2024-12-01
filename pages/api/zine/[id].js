async function fetchZineData() {
    const response = await fetch('https://raw.githubusercontent.com/jbw004/zine-data/main/data.json')
    return response.json()
  }
  
  export default async function handler(req, res) {
    try {
      const { id } = req.query
      const zineData = await fetchZineData()
      
      const zine = zineData.zines.find(z => z.id === id)
      
      if (!zine) {
        return res.redirect('https://tellmeastory.press')
      }
  
      // Ensure image URL is absolute and properly formatted
      const imageUrl = new URL(zine.cover_image_url).toString()
  
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Check out issues of ${zine.name}!</title>
            
            <!-- Open Graph meta tags with additional properties -->
            <meta property="og:title" content="Check out issues of ${zine.name}!" />
            <meta property="og:description" content="${zine.bio}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:image:secure_url" content="${imageUrl}" />
            <meta property="og:type" content="website" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            
            <!-- Twitter Card meta tags -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Check out issues of ${zine.name}!" />
            <meta name="twitter:description" content="${zine.bio}" />
            <meta name="twitter:image" content="${imageUrl}" />
            
            <!-- Additional meta tags for better iMessage preview -->
            <link rel="image_src" href="${imageUrl}" />
            
            <script>
              window.location.href = 'https://tellmeastory.press'
            </script>
          </head>
          <body>
            <h1>${zine.name}</h1>
            <img src="${imageUrl}" alt="${zine.name} cover" />
            <p>${zine.bio}</p>
          </body>
        </html>
      `
      
      // Set cache headers to ensure fresh metadata
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      res.setHeader('Content-Type', 'text/html')
      res.status(200).send(html)
    } catch (error) {
      console.error('Error handling zine request:', error)
      res.redirect('https://tellmeastory.press')
    }
  }