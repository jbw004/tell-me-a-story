export const magazineTemplates = [
  {
    id: 'id-magazine-mobile',
    name: 'i-D Magazine Mobile',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
            </style>
            <div class="logo editable" contenteditable="true" style="position: absolute; top: 20px; left: 20px; font-size: 24px; font-weight: bold; color: #000; z-index: 10;">i-D</div>
            <img src="/api/placeholder/375/812" alt="Cover model" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover;">
            <h1 class="headline editable" contenteditable="true" style="position: absolute; bottom: 100px; left: 20px; right: 20px; font-size: 36px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); line-height: 1.2;">The Bold & Beautiful Issue</h1>
            <p class="subheadline editable" contenteditable="true" style="position: absolute; bottom: 50px; left: 20px; right: 20px; font-size: 16px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Exploring fashion's fearless frontiers</p>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .toc-item { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
              .toc-title { font-weight: bold; }
              .toc-page { color: #999; }
            </style>
            <div class="logo editable" contenteditable="true" style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">i-D</div>
            <h1 id="contents" class="section-title editable" contenteditable="true" style="font-size: 36px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase;">Contents</h1>
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
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #999;">03</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile-1',
        name: 'Feature Article Page 1',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
            </style>
            <h1 class="article-title editable" contenteditable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">The Future of Fashion</h1>
            <h2 class="article-subtitle editable" contenteditable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic;">How sustainable practices are reshaping the industry</h2>
            <img src="/api/placeholder/375/300" alt="Sustainable fashion" id="articleImage" data-upload-target="true" style="width: 100%; height: 300px; object-fit: cover; margin-bottom: 20px;">
            <div class="article-text editable" contenteditable="true" style="font-size: 16px; line-height: 1.6;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #999;">12</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile-2',
        name: 'Feature Article Page 2',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
            </style>
            <div class="pull-quote editable" contenteditable="true" style="font-size: 24px; font-weight: bold; padding: 20px; background-color: #f0f0f0; margin: 20px 0;">
              "Sustainability is not just a trend, it's the future of fashion."
            </div>
            <div class="article-text editable" contenteditable="true" style="font-size: 16px; line-height: 1.6;">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #999;">13</div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile-1',
        name: 'Photo Editorial Page 1',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
            </style>
            <img src="/api/placeholder/375/700" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 700px; object-fit: cover;">
            <div class="caption editable" contenteditable="true" style="position: absolute; bottom: 60px; left: 20px; right: 20px; font-size: 14px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Model wears Jacket by Designer A, Pants by Designer B</div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">18</div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile-2',
        name: 'Photo Editorial Page 2',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
            </style>
            <div class="editorial-title editable" contenteditable="true" style="position: absolute; top: 20px; left: 20px; font-size: 36px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); z-index: 10;">URBAN CHIC</div>
            <img src="/api/placeholder/375/700" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 700px; object-fit: cover;">
            <div class="caption editable" contenteditable="true" style="position: absolute; bottom: 60px; left: 20px; right: 20px; font-size: 14px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Dress by Designer C, Shoes by Designer D</div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">19</div>
          </div>
        `
      },
      {
        id: 'interview-mobile-1',
        name: 'Interview Page 1',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .question { font-weight: bold; margin-top: 15px; }
              .answer { margin-bottom: 15px; }
            </style>
            <h1 class="interview-title editable" contenteditable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">Fashion Forward</h1>
            <h2 class="interview-subtitle editable" contenteditable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic;">An exclusive chat with Designer X</h2>
            <img src="/api/placeholder/375/300" alt="Designer X portrait" id="interviewImage" data-upload-target="true" style="width: 100%; height: 300px; object-fit: cover; margin-bottom: 20px;">
            <div class="interview-text">
              <div class="question editable" contenteditable="true">i-D: How would you describe your design philosophy?</div>
              <div class="answer editable" contenteditable="true">Designer X: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #999;">24</div>
          </div>
        `
      },
      {
        id: 'interview-mobile-2',
        name: 'Interview Page 2',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .question { font-weight: bold; margin-top: 15px; }
              .answer { margin-bottom: 15px; }
            </style>
            <div class="pull-quote editable" contenteditable="true" style="font-size: 24px; font-weight: bold; padding: 20px; background-color: #f0f0f0; margin: 0 0 20px 0;">
              "Fashion is a language that creates itself in clothes to interpret reality."
            </div>
            <div class="interview-text">
              <div class="question editable" contenteditable="true">i-D: How do you see the future of sustainable fashion?</div>
              <div class="answer editable" contenteditable="true">Designer X: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
              <div class="question editable" contenteditable="true">i-D: What advice would you give to aspiring designers?</div>
              <div class="answer editable" contenteditable="true">Designer X: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #999;">25</div>
          </div>
        `
      },
      {
        id: 'trend-report-mobile',
        name: 'Trend Report',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .trend-item { margin-bottom: 20px; }
              .trend-name { font-weight: bold; margin: 10px 0 5px; }
              .trend-description { font-size: 14px; }
            </style>
            <h1 class="trend-title editable" contenteditable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">Spring/Summer Trends</h1>
            <h2 class="trend-subtitle editable" contenteditable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic;">What's hot this season</h2>
            <div class="trend-grid">
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="trend-name editable" contenteditable="true">Neon Accents</div>
                <div class="trend-description editable" contenteditable="true">Bold pops of color to brighten any outfit</div>
              </div>
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="trend-name editable" contenteditable="true">Oversized Blazers</div>
                <div class="trend-description editable" contenteditable="true">Relaxed silhouettes for effortless chic</div>
              </div>
            </div>
            <div class="style-tip editable" contenteditable="true" style="background-color: #f0f0f0; padding: 15px; margin-top: 20px;">
              <strong>Style Tip:</strong> Mix and match these trends for a truly unique look!
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #999;">32</div>
          </div>
        `
      }
    ]
  },
  {
    id: 'ray-gun-magazine-mobile',
    name: 'Ray Gun Magazine Mobile',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
            <div class="logo editable" contenteditable="true" style="position: absolute; top: 20px; left: 20px; font-size: 40px; font-weight: bold; color: #fff; transform: rotate(-90deg); transform-origin: left top;">RAY GUN</div>
            <h1 class="headline editable" contenteditable="true" style="position: absolute; bottom: 100px; left: 20px; right: 20px; font-size: 48px; font-weight: bold; color: #fff; line-height: 0.9; text-transform: uppercase; mix-blend-mode: difference;">Sonic Revolution</h1>
            <p class="subheadline editable" contenteditable="true" style="position: absolute; bottom: 50px; left: 20px; right: 20px; font-size: 14px; color: #fff; font-style: italic; transform: skew(-10deg);">Exploring the chaotic soundscapes of tomorrow</p>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              .toc-item { margin-bottom: 15px; font-size: 16px; border-bottom: 1px solid #000; padding-bottom: 10px; }
              .toc-title { font-weight: bold; }
              .toc-page { float: right; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <div class="logo editable" contenteditable="true" style="font-size: 24px; font-weight: bold; margin-bottom: 20px; transform: skew(-15deg);">RAY GUN</div>
            <h1 id="contents" class="section-title editable" contenteditable="true" style="font-size: 36px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; writing-mode: vertical-rl; text-orientation: mixed; height: 200px;">CONTENTS</h1>
            <div id="tocContainer" style="margin-left: 40px;">
              <div class="toc-item">
                <span class="toc-title editable" contenteditable="true">Noise Makers</span>
                <span class="toc-page editable" contenteditable="true">08</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable" contenteditable="true">Analog Dreams</span>
                <span class="toc-page editable" contenteditable="true">16</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable" contenteditable="true">Distortion Diaries</span>
                <span class="toc-page editable" contenteditable="true">24</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable" contenteditable="true">Feedback Loop</span>
                <span class="toc-page editable" contenteditable="true">32</span>
              </div>
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; transform: rotate(90deg);">03</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <h1 class="article-title editable" contenteditable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: skew(-5deg);">Sonic Rebellion</h1>
            <h2 class="article-subtitle editable" contenteditable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; transform: rotate(-2deg);">How underground noise is reshaping music</h2>
            <img src="/api/placeholder/375/250" alt="Feature image" id="featureImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 20px; transform: perspective(500px) rotateX(5deg);">
            <div class="article-text editable" contenteditable="true" style="font-size: 14px; line-height: 1.6; column-count: 2; column-gap: 20px; text-align: justify;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <div class="pull-quote editable" contenteditable="true" style="font-size: 24px; font-weight: bold; padding: 20px; background-color: #000; color: #fff; margin: 20px 0; transform: rotate(-3deg);">
              "Noise is the new melody"
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; transform: rotate(90deg);">12</div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile',
        name: 'Photo Editorial',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <img src="/api/placeholder/375/600" alt="Editorial photo" id="editorialImage" data-upload-target="true" style="width: 100%; height: 600px; object-fit: cover; opacity: 0.8;">
            <div class="editorial-title editable" contenteditable="true" style="position: absolute; top: 20px; left: 20px; font-size: 36px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); transform: rotate(-90deg); transform-origin: left top;">STATIC DREAMS</div>
            <div class="caption editable" contenteditable="true" style="position: absolute; bottom: 60px; left: 20px; right: 20px; font-size: 14px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); transform: skew(-5deg);">Guitarist wears custom distressed denim by Designer X, boots by Designer Y</div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #fff; transform: rotate(90deg);">18</div>
          </div>
        `
      },
      {
        id: 'interview-mobile',
        name: 'Interview',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              .question { font-weight: bold; margin-top: 15px; transform: skew(-5deg); }
              .answer { margin-bottom: 15px; text-align: justify; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <h1 class="interview-title editable" contenteditable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: rotate(-3deg);">Noise Architect</h1>
            <h2 class="interview-subtitle editable" contenteditable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; transform: skew(-5deg);">A chat with sound sculptor Jane Doe</h2>
            <img src="/api/placeholder/375/250" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 20px; transform: perspective(500px) rotateY(5deg);">
            <div class="interview-text">
              <div class="question editable" contenteditable="true">RG: How would you describe your sound?</div>
              <div class="answer editable" contenteditable="true">JD: It's like a collision between a freight train and a synthesizer, with a sprinkle of stardust.</div>
              <div class="question editable" contenteditable="true">RG: What inspires your compositions?</div>
              <div class="answer editable" contenteditable="true">JD: The chaos of everyday life, the hum of machines, and the silence between heartbeats.</div>
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; transform: rotate(90deg);">24</div>
          </div>
        `
      },
      {
        id: 'trend-report-mobile',
        name: 'Trend Report',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              .trend-item { margin-bottom: 20px; transform: skew(-3deg); }
              .trend-name { font-weight: bold; margin: 10px 0 5px; text-transform: uppercase; }
              .trend-description { font-size: 14px; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <h1 class="trend-title editable" contenteditable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: rotate(-5deg);">Sound Waves</h1>
            <h2 class="trend-subtitle editable" contenteditable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; transform: skew(-5deg);">This season's audio-visual disruptions</h2>
            <div class="trend-grid">
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="trend-name editable" contenteditable="true">Glitch Couture</div>
                <div class="trend-description editable" contenteditable="true">Digital errors as high fashion statements</div>
              </div>
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="trend-name editable" contenteditable="true">Frequency Fringe</div>
                <div class="trend-description editable" contenteditable="true">Oscillating between style and soundwaves</div>
              </div>
            </div>
            <div class="style-tip editable" contenteditable="true" style="background-color: #000; color: #fff; padding: 15px; margin-top: 20px; transform: rotate(2deg);">
              <strong>Style Tip:</strong> Embrace the discord, let your style scream louder than words!
            </div>
            <div class="page-number editable" contenteditable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; transform: rotate(90deg);">32</div>
          </div>
        `
      }
    ]
  }
];