export const magazineTemplates = [
    {
      id: 'id-magazine',
      name: 'i-D Magazine',
      templates: [
        { 
          id: 'cover', 
          name: 'Cover', 
          content: `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>i-D Magazine Template 1: Cover Page (A4 size)</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        height: 100%;
                        background-color: #f0f0f0;
                    }
                    .magazine-cover {
                        width: 210mm;
                        height: 297mm;
                        margin: 20px auto;
                        background-color: #fff;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        position: relative;
                        overflow: hidden;
                    }
                    .logo {
                        position: absolute;
                        top: 10mm;
                        left: 10mm;
                        font-size: 36px;
                        font-weight: bold;
                        color: #000;
                    }
                    .cover-image {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .headline {
                        position: absolute;
                        bottom: 30mm;
                        left: 10mm;
                        right: 10mm;
                        font-size: 48px;
                        font-weight: bold;
                        color: #fff;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                        line-height: 1.2;
                    }
                    .subheadline {
                        position: absolute;
                        bottom: 15mm;
                        left: 10mm;
                        right: 10mm;
                        font-size: 18px;
                        color: #fff;
                        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                    }
                    .editable:hover {
                        outline: 2px dashed #007bff;
                        cursor: text;
                    }
                    #imageUpload {
                        display: none;
                    }
                    #uploadLabel {
                        position: absolute;
                        top: 10mm;
                        right: 10mm;
                        background-color: rgba(255,255,255,0.7);
                        padding: 5mm;
                        border-radius: 2mm;
                        cursor: pointer;
                    }
                    #downloadBtn {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                </style>
            </head>
            <body>
                <div class="magazine-cover" id="magazine-cover">
            <div class="logo editable" contenteditable="true">i-D</div>
            <img src="/api/placeholder/210/297" alt="Cover model" class="cover-image" id="coverImage" data-upload-target="true">
            <h1 class="headline editable" contenteditable="true">The Bold & Beautiful Issue</h1>
            <p class="subheadline editable" contenteditable="true">Exploring fashion's fearless frontiers</p>
          </div>
                <button id="downloadBtn">Download Cover</button>
            
                
            </body>
            </html>
          `
        },
        { 
            id: 'contents', 
            name: 'Contents', 
            content: `
              <div class="magazine-page" id="magazine-page">
                <div class="logo editable" contenteditable="true">i-D</div>
                <h1 class="section-title editable" contenteditable="true">Contents</h1>
                <div id="tocContainer">
                  <div class="toc-item">
                    <span class="toc-title editable" contenteditable="true">The Big Interview</span>
                    <span class="toc-page editable" contenteditable="true">08</span>
                  </div>
                  <div class="toc-item">
                    <span class="toc-title editable" contenteditable="true">Fashion Forward</span>
                    <span class="toc-page editable" contenteditable="true">16</span>
                  </div>
                  <div class="toc-item">
                    <span class="toc-title editable" contenteditable="true">Street Style</span>
                    <span class="toc-page editable" contenteditable="true">24</span>
                  </div>
                  <div class="toc-item">
                    <span class="toc-title editable" contenteditable="true">Beauty Revolution</span>
                    <span class="toc-page editable" contenteditable="true">32</span>
                  </div>
                </div>
                <div class="page-number editable" contenteditable="true">03</div>
              </div>
            `
          },
        { 
          id: 'spread', 
          name: 'Article Spread', 
          content: `
            ::: {#magazine-spread .magazine-spread}
            ::: {.page .left}
            # The Future of Fashion {#the-future-of-fashion .article-title .editable contenteditable="true"}
  
            ## How sustainable practices are reshaping the industry {#how-sustainable-practices-are-reshaping-the-industry .article-subtitle .editable contenteditable="true"}
  
            ![Sustainable fashion](/api/placeholder/800/600){#articleImage .article-image} Upload Image
  
            ::: {.article-text .editable contenteditable="true"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            :::
  
            ::: {.page-number .editable contenteditable="true"}
            12
            :::
            :::
  
            ::: {.page .right}
            ::: {.pull-quote .editable contenteditable="true"}
            "Sustainability is not just a trend, it's the future of fashion."
            :::
  
            ::: {.article-text .editable contenteditable="true"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            :::
  
            ::: {.page-number .editable contenteditable="true"}
            13
            :::
            :::
            :::
  
            Download Spread
          `
        },
        // ... Add 3 more template types for i-D Magazine
      ]
    },
    // ... Add more magazine types (e.g., Vogue, Elle, etc.)
  ];