async function fetchZineData() {
    const response = await fetch('https://raw.githubusercontent.com/jbw004/zine-data/main/data.json')
    return response.json()
  }
  
  export default async function handler(req, res) {
    try {
      const { id } = req.query
      const zineData = await fetchZineData()
      
      // Find the specific zine
      const zine = zineData.zines.find(z => z.id === id)
      
      if (!zine) {
        return res.redirect('https://tellmeastory.press')
      }
  
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Check out issues of ${zine.name}!</title>
            
            <!-- Open Graph meta tags -->
            <meta property="og:title" content="Check out issues of ${zine.name}!" />
            <meta property="og:description" content="${zine.bio}" />
            <meta property="og:image" content="${zine.cover_image_url}" />
            
            <!-- Twitter Card meta tags -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Check out issues of ${zine.name}!" />
            <meta name="twitter:description" content="${zine.bio}" />
            <meta name="twitter:image" content="${zine.cover_image_url}" />
            
            <script>
              window.location.href = 'https://tellmeastory.press'
            </script>
          </head>
          <body>
            <h1>${zine.name}</h1>
            <p>${zine.bio}</p>
          </body>
        </html>
      `
      
      res.setHeader('Content-Type', 'text/html')
      res.status(200).send(html)
    } catch (error) {
      console.error('Error handling zine request:', error)
      res.redirect('https://tellmeastory.press')
    }
  }