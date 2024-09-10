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
          <div id="magazine-page" style="width: 210mm; height: 297mm; margin: 20px auto; background-color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1); position: relative; overflow: hidden; padding: 20mm; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .toc-item { display: flex; justify-content: space-between; margin-bottom: 5mm; font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5mm; }
              .toc-title { font-weight: bold; }
              .toc-page { color: #999; }
            </style>
            <div class="logo editable" contenteditable="true" style="font-size: 24px; font-weight: bold; margin-bottom: 10mm; position: absolute; top: 10mm; left: 10mm;">i-D</div>
            <h1 id="contents" class="section-title editable" contenteditable="true" style="font-size: 48px; font-weight: bold; margin-bottom: 20mm; text-transform: uppercase;">Contents</h1>
            <div id="tocContainer" style="margin-top: 40mm;">
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
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm; font-size: 14px; color: #999;">03</div>
          </div>
        `
      },
      {
        id: 'article-spread',
        name: 'Article Spread',
        content: `
          <div id="magazine-spread" style="display: flex; width: 420mm; height: 297mm; margin: 20px auto; background-color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
      <div class="page left" style="width: 50%; padding: 20mm; position: relative;">
        <h1 id="the-future-of-fashion" class="article-title editable" contenteditable="true" style="font-size: 36px; margin-bottom: 10mm;">The Future of Fashion</h1>
        <h2 id="how-sustainable-practices-are-reshaping-the-industry" class="article-subtitle editable" contenteditable="true" style="font-size: 24px; margin-bottom: 10mm;">How sustainable practices are reshaping the industry</h2>
        <img id="articleImage" src="/api/placeholder/800/600" alt="Sustainable fashion" class="article-image" style="width: 100%; margin-bottom: 10mm;" data-upload-target="true">
        <div class="article-text editable" contenteditable="true" style="font-size: 14px; line-height: 1.6;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">12</div>
      </div>
            <div class="page right" style="width: 50%; padding: 20mm; position: relative;">
              <div class="pull-quote editable" contenteditable="true" style="font-size: 24px; font-style: italic; margin-bottom: 20mm;">
                "Sustainability is not just a trend, it's the future of fashion."
              </div>
              <div class="article-text editable" contenteditable="true" style="font-size: 14px; line-height: 1.6;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </div>
              <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">13</div>
            </div>
          </div>
        `
      },
      {
        id: 'editorial-spread',
        name: 'Editorial Spread',
        content: `
          <div id="magazine-spread" style="display: flex; width: 420mm; height: 297mm; margin: 20px auto; background-color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
      <div class="page left" style="width: 50%; padding: 10mm; position: relative;">
        <img id="photo1" src="/api/placeholder/800/1200" alt="Editorial photo 1" class="photo" style="width: 100%; height: 277mm; object-fit: cover;" data-upload-target="true">
        <div class="caption editable" contenteditable="true" style="position: absolute; bottom: 20mm; left: 10mm; right: 10mm; background: rgba(255,255,255,0.7); padding: 5mm;">
          Model wears Jacket by Designer A, Pants by Designer B
        </div>
        <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">18</div>
      </div>
      <div class="page right" style="width: 50%; padding: 10mm; position: relative;">
        <img id="photo2" src="/api/placeholder/800/1200" alt="Editorial photo 2" class="photo" style="width: 100%; height: 277mm; object-fit: cover;" data-upload-target="true">
        <div class="editorial-title editable" contenteditable="true" style="position: absolute; top: 20mm; left: 10mm; right: 10mm; font-size: 36px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
          URBAN CHIC
        </div>
        <div class="caption editable" contenteditable="true" style="position: absolute; bottom: 20mm; left: 10mm; right: 10mm; background: rgba(255,255,255,0.7); padding: 5mm;">
          Dress by Designer C, Shoes by Designer D
        </div>
        <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">19</div>
      </div>
    </div>
        `
      },
      {
        id: 'interview-spread',
        name: 'Interview Spread',
        content: `
          <div id="magazine-spread" style="display: flex; width: 420mm; height: 297mm; margin: 20px auto; background-color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
      <div class="page left" style="width: 50%; padding: 20mm; position: relative;">
        <h1 id="fashion-forward" class="interview-title editable" contenteditable="true" style="font-size: 36px; margin-bottom: 10mm;">Fashion Forward</h1>
        <h2 id="an-exclusive-chat-with-designer-x" class="interview-subtitle editable" contenteditable="true" style="font-size: 24px; margin-bottom: 10mm;">An exclusive chat with Designer X</h2>
        <img id="interviewImage" src="/api/placeholder/800/600" alt="Designer X portrait" class="interview-image" style="width: 100%; margin-bottom: 10mm;" data-upload-target="true">
        <div class="interview-text" style="font-size: 14px; line-height: 1.6;">
                <div class="question editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">i-D: How would you describe your design philosophy?</div>
                <div class="answer editable" contenteditable="true" style="margin-bottom: 10mm;">Designer X: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div class="question editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">i-D: What inspired your latest collection?</div>
                <div class="answer editable" contenteditable="true" style="margin-bottom: 10mm;">Designer X: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
              </div>
              </div>
        <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">24</div>
      </div>
            <div class="page right" style="width: 50%; padding: 20mm; position: relative;">
              <div class="pull-quote editable" contenteditable="true" style="font-size: 24px; font-style: italic; margin-bottom: 20mm;">
                "Fashion is a language that creates itself in clothes to interpret reality."
              </div>
              <div class="interview-text" style="font-size: 14px; line-height: 1.6;">
                <div class="question editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">i-D: How do you see the future of sustainable fashion?</div>
                <div class="answer editable" contenteditable="true" style="margin-bottom: 10mm;">Designer X: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div class="question editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">i-D: What advice would you give to aspiring designers?</div>
                <div class="answer editable" contenteditable="true" style="margin-bottom: 10mm;">Designer X: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
              </div>
              <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">25</div>
            </div>
          </div>
        `
      },
      {
        id: 'trend-spread',
        name: 'Trend Spread',
        content: `
          <div id="magazine-spread" style="display: flex; width: 420mm; height: 297mm; margin: 20px auto; background-color: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1);">
      <div class="page left" style="width: 50%; padding: 20mm; position: relative;">
        <h1 id="springsummer-trends" class="trend-title editable" contenteditable="true" style="font-size: 36px; margin-bottom: 10mm;">Spring/Summer Trends</h1>
        <h2 id="whats-hot-this-season" class="trend-subtitle editable" contenteditable="true" style="font-size: 24px; margin-bottom: 20mm;">What's hot this season</h2>
        <div class="trend-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20mm;">
          <div class="trend-item">
            <img id="trendImage1" src="/api/placeholder/300/200" alt="Trend 1" class="trend-image" style="width: 100%; margin-bottom: 10mm;" data-upload-target="true">
            <div class="trend-name editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">Neon Accents</div>
            <div class="trend-description editable" contenteditable="true">Bold pops of color to brighten any outfit</div>
          </div>
          <div class="trend-item">
            <img id="trendImage2" src="/api/placeholder/300/200" alt="Trend 2" class="trend-image" style="width: 100%; margin-bottom: 10mm;" data-upload-target="true">
            <div class="trend-name editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">Oversized Blazers</div>
            <div class="trend-description editable" contenteditable="true">Relaxed silhouettes for effortless chic</div>
          </div>
        </div>
                <div class="trend-item">
                  <div style="position: relative; margin-bottom: 10mm;">
                    <img id="trendImage2" src="/api/placeholder/300/200" alt="Trend 2" class="trend-image" style="width: 100%;">
                    <button onclick="alert('Upload image functionality to be implemented')" style="position: absolute; top: 10px; right: 10px;">Upload</button>
                  </div>
                  <div class="trend-name editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">Oversized Blazers</div>
                  <div class="trend-description editable" contenteditable="true">Relaxed silhouettes for effortless chic</div>
                </div>
              </div>
              <div class="style-tip" style="margin-top: 20mm; padding: 10mm; background-color: #f0f0f0;">
                <strong>Style Tip:</strong> <span class="editable" contenteditable="true">Mix and match these trends for a truly unique look!</span>
              </div>
              <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">32</div>
      </div>
      <div class="page right" style="width: 50%; padding: 20mm; position: relative;">
        <div class="trend-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20mm;">
          <div class="trend-item">
            <img id="trendImage3" src="/api/placeholder/300/200" alt="Trend 3" class="trend-image" style="width: 100%; margin-bottom: 10mm;" data-upload-target="true">
            <div class="trend-name editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">Platform Sandals</div>
            <div class="trend-description editable" contenteditable="true">Elevate your style, literally</div>
          </div>
          <div class="trend-item">
            <img id="trendImage4" src="/api/placeholder/300/200" alt="Trend 4" class="trend-image" style="width: 100%; margin-bottom: 10mm;" data-upload-target="true">
            <div class="trend-name editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">Crochet Everything</div>
            <div class="trend-description editable" contenteditable="true">Handcrafted texture is in</div>
          </div>
        </div>
                <div class="trend-item">
                  <div style="position: relative; margin-bottom: 10mm;">
                    <img id="trendImage4" src="/api/placeholder/300/200" alt="Trend 4" class="trend-image" style="width: 100%;">
                    <button onclick="alert('Upload image functionality to be implemented')" style="position: absolute; top: 10px; right: 10px;">Upload</button>
                  </div>
                  <div class="trend-name editable" contenteditable="true" style="font-weight: bold; margin-bottom: 5mm;">Crochet Everything</div>
                  <div class="trend-description editable" contenteditable="true">Handcrafted texture is in</div>
                </div>
              </div>
              <div class="style-tip" style="margin-top: 20mm; padding: 10mm; background-color: #f0f0f0;">
                <strong>Editor's Pick:</strong> <span class="editable" contenteditable="true">Our favorite trend this season is the return of Y2K inspired accessories. Think mini bags and chunky jewelry!</span>
              </div>
              <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 10mm; right: 10mm;">33</div>
            </div>
          </div>
        `
      },
        // ... Add 3 more template types for i-D Magazine
      ]
    },
    // ... Add more magazine types (e.g., Vogue, Elle, etc.)
  ];