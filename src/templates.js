export const magazineTemplates = [
  {
    id: 'edge-mobile',
    name: 'Edge',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; font-family: Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .color-block { position: absolute; z-index: 1; }
            </style>
            <div class="color-block editable deletable" data-background-id="cover-color-block" data-object-id="cover-color-block" data-deletable="true" style="top: 0; left: 0; width: 30%; height: 100%; background-color: #ff3366; transform: skew(-10deg) translateX(-20px);"></div>
            <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 40px; left: 40px; font-family: 'Roboto', sans-serif; font-size: 36px; font-weight: bold; color: #000; z-index: 10; transform-origin: left top;">i-D</div>
            <img src="/api/placeholder/375/812" alt="Cover model" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover;">
            <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 120px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 48px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); line-height: 1; text-align: right; max-width: 60%;">The Bold & Beautiful Issue</h1>
            <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 80px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: bold; color: #ff3366; text-transform: uppercase; text-align: right; max-width: 60%;">Exploring fashion's fearless frontiers</p>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .toc-item { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 15px; 
                font-size: 16px; 
                border-bottom: 1px solid #ddd; 
                padding-bottom: 10px; 
                position: relative; 
              }
              .toc-title { font-weight: bold; max-width: 80%; }
              .toc-page { color: #ff3366; font-weight: bold; }
            </style>
            <div class="logo editable deletable" contenteditable="true" data-text-id="contents-logo" data-object-id="contents-logo" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 24px; font-weight: bold; margin-bottom: 40px; transform: rotate(-5deg);">i-D</div>
            <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 48px; font-weight: bold; margin-bottom: 40px; text-transform: uppercase; line-height: 1; transform: skew(-5deg);">Con<br>te<br>nts</h1>
            <div id="tocContainer">
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The Big Interview</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Fashion Forward</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Street Style</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Beauty Revolution</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
              </div>
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; color: #ff3366; transform: rotate(90deg);">03</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto&display=swap');
            </style>
            <div class="editable deletable" data-background-id="article-background" data-object-id="article-background" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 40%; background-color: #ff3366; z-index: 1;"></div>
            <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 36px; font-weight: bold; margin-bottom: 20px; color: #fff; position: relative; z-index: 2; transform: skew(-5deg); padding-top: 40px;">The Future of Fashion</h1>
            <img src="/api/placeholder/335/250" alt="Fashion image" id="articleImage" data-upload-target="true" style="width: 90%; height: 250px; object-fit: cover; margin-bottom: 20px; position: relative; z-index: 2; transform: rotate(-3deg); box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <h2 class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; margin-bottom: 20px; font-style: italic; color: #333; transform: translateX(-10px);">How sustainable practices are reshaping the industry</h2>
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 24px; font-weight: bold; padding: 20px; background-color: #333; color: #fff; margin: 20px 0; transform: rotate(2deg);">
              "Sustainability is not just a trend, it's the future of fashion."
            </div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile',
        name: 'Photo Editorial',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Roboto', sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
              .editable:hover { outline: 2px dashed #ff3366; cursor: text; }
            </style>
            <img src="/api/placeholder/375/500" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 500px; object-fit: cover; clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);">
            <div class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="position: absolute; top: 20px; left: 20px; font-size: 48px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); transform: rotate(-5deg);">URBAN CHIC</div>
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="position: absolute; top: 460px; left: 20px; padding: 10px; font-size: 12px; color: #fff; background-color: #ff3366; transform: skew(-5deg);">Model wears Jacket by Designer A, Pants by Designer B</div>
            <img src="/api/placeholder/375/500" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 500px; object-fit: cover; clip-path: polygon(0 10%, 100% 0, 100% 100%, 0 100%);">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; padding: 10px; font-size: 12px; color: #fff; background-color: #000; transform: skew(5deg);">Dress by Designer C, Shoes by Designer D</div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="editorial-pullquote" data-object-id="editorial-pullquote" data-deletable="true" style="position: absolute; bottom: 200px; left: 20px; right: 20px; font-size: 24px; font-weight: bold; color: #fff; text-align: center; transform: rotate(-3deg);">
              "Fashion is the armor to survive everyday life"
            </div>
          </div>
        `
      },
      {
        id: 'interview-mobile',
        name: 'Interview',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Roboto', sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
              .editable:hover { outline: 2px dashed #ff3366; cursor: text; }
              .question { font-weight: bold; margin-top: 15px; transform: skew(-5deg); }
              .answer { margin-bottom: 15px; }
            </style>
            <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-size: 36px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: rotate(-3deg);">Fashion Forward</h1>
            <h2 class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; color: #ff3366;">An exclusive chat with Designer X</h2>
            <div style="position: relative; width: 100%; height: 250px; margin-bottom: 20px; overflow: hidden;">
              <img src="/api/placeholder/375/250" alt="Designer X portrait" id="interviewImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; transform: skew(-5deg, 2deg) scale(1.1);">
            </div>
            <div class="interview-text">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">i-D: How would you describe your design philosophy?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">Designer X: It's about pushing boundaries and redefining what's possible in fashion. I believe in creating pieces that are both provocative and wearable.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">i-D: What inspired your latest collection?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">Designer X: My latest work draws inspiration from urban architecture and the way light interacts with different surfaces throughout the day.</div>
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-size: 24px; font-weight: bold; padding: 20px; background-color: #ff3366; color: #fff; margin: 20px 0; transform: rotate(-2deg);">
              "Fashion is a language that creates itself in clothes to interpret reality."
            </div>
          </div>
        `
      },
      {
        id: 'trend-report-mobile',
        name: 'Trend Report',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Roboto', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff3366; cursor: text; }
            .trend-item { margin-bottom: 20px; position: relative; }
            .trend-name { font-weight: bold; margin: 10px 0 5px; text-transform: uppercase; }
            .trend-description { font-size: 14px; }
          </style>
          <h1 class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-size: 36px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: skew(-5deg);">Spring/Summer Trends</h1>
          <h2 class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; color: #ff3366;">What's hot this season</h2>
          <div class="trend-grid">
            <div class="trend-item">
              <img src="/api/placeholder/335/200" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover; clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true" style="position: absolute; top: 10px; left: 10px; background-color: #ff3366; color: #fff; padding: 5px 10px; transform: rotate(-3deg);">Neon Accents</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Bold pops of color to brighten any outfit</div>
            </div>
            <div class="trend-item">
              <img src="/api/placeholder/335/200" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover; clip-path: polygon(5% 0, 95% 0, 100% 100%, 0 100%);">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true" style="position: absolute; bottom: 30px; right: 10px; background-color: #000; color: #fff; padding: 5px 10px; transform: rotate(3deg);">Oversized Blazers</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Relaxed silhouettes for effortless chic</div>
            </div>
          </div>
          <div class="style-tip editable deletable" contenteditable="true" data-text-id="trend-style-tip" data-object-id="trend-style-tip" data-deletable="true" style="background-color: #ff3366; color: #fff; padding: 15px; margin-top: 20px; transform: skew(-5deg);">
            <strong>Style Tip:</strong> Mix and match these trends for a truly unique look!
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; color: #ff3366; transform: rotate(90deg);">32</div>
        </div>
      `
      }
    ]
  },
  {
    id: 'chaos-mobile',
    name: 'Chaos',
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
            <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 20px; left: 20px; font-size: 40px; font-weight: bold; color: #fff; transform-origin: left top;">RAY GUN</div>
            <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 100px; left: 20px; right: 20px; font-size: 48px; font-weight: bold; color: #fff; line-height: 0.9; text-transform: uppercase; mix-blend-mode: difference;">Sonic Revolution</h1>
            <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 50px; left: 20px; right: 20px; font-size: 14px; color: #fff; font-style: italic; transform: skew(-10deg);">Exploring the chaotic soundscapes of tomorrow</p>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              .toc-item { margin-bottom: 15px; font-size: 16px; border-bottom: 1px solid #000; padding-bottom: 10px; }
              .toc-title { font-weight: bold; }
              .toc-page { float: right; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <div class="logo editable deletable" contenteditable="true" data-text-id="contents-logo" data-object-id="contents-logo" data-deletable="true" style="font-size: 24px; font-weight: bold; margin-bottom: 20px; transform: skew(-15deg);">RAY GUN</div>
            <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-size: 36px; font-weight: bold; margin-bottom: 30px; text-transform: uppercase; writing-mode: vertical-rl; text-orientation: mixed; height: 200px;">CONTENTS</h1>
            <div id="tocContainer" style="margin-left: 40px;">
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">Noise Makers</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Analog Dreams</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Distortion Diaries</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Feedback Loop</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
              </div>
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-size: 14px; transform: rotate(90deg);">03</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Zilla+Slab&display=swap');
            </style>
            <div class="editable deletable" data-background-id="article-background" data-object-id="article-background" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/api/placeholder/375/812'); opacity: 0.2; mix-blend-mode: overlay; pointer-events: none;"></div>
            <div style="position: relative; z-index: 1;">
              <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Special Elite', cursive; font-size: 42px; font-weight: bold; margin-bottom: 20px; color: #fff; transform: rotate(-5deg) translateY(20px); text-shadow: 2px 2px #ff00ff;">Sonic Rebellion</h1>
              <img src="/api/placeholder/335/250" alt="Music image" id="articleImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 20px; mix-blend-mode: screen; transform: skew(-5deg, 2deg);">
              <h2 class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Zilla Slab', serif; font-size: 18px; margin-bottom: 20px; font-style: italic; color: #ff00ff; transform: translateX(10px);">How underground noise is reshaping music</h2>
              <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Zilla Slab', serif; font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 20px;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </div>
              <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Special Elite', cursive; font-size: 24px; font-weight: bold; padding: 20px; background-color: #ff00ff; color: #000; margin: 20px 0; transform: rotate(-3deg) scale(0.95); box-shadow: 5px 5px #fff;">
                "Noise is the new melody"
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile',
        name: 'Photo Editorial',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <img src="/api/placeholder/375/600" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 600px; object-fit: cover; opacity: 0.8;">
            <div class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="position: absolute; top: 20px; left: 20px; font-size: 36px; font-weight: bold; color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); transform: rotate(-90deg); transform-origin: left top;">STATIC DREAMS</div>
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="padding: 20px; font-size: 14px; color: #fff; transform: skew(-5deg);">Guitarist wears custom distressed denim by Designer X, boots by Designer Y</div>
            <img src="/api/placeholder/375/600" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 600px; object-fit: cover; opacity: 0.8;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="padding: 20px; font-size: 14px; color: #fff; transform: skew(-5deg);">Vocalist sports vintage leather jacket, custom-ripped jeans by Designer Z</div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="editorial-pullquote" data-object-id="editorial-pullquote" data-deletable="true" style="font-size: 24px; font-weight: bold; padding: 20px; color: #fff; margin: 20px 0; transform: rotate(-3deg); text-align: center;">
              "Fashion is the visual soundtrack of our rebellion"
            </div>
          </div>
        `
      },
      {
        id: 'interview-mobile',
        name: 'Interview',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              .question { font-weight: bold; margin-top: 15px; transform: skew(-5deg); }
              .answer { margin-bottom: 15px; text-align: justify; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: rotate(-3deg);">Noise Architect</h1>
            <h2 class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; transform: skew(-5deg);">A chat with sound sculptor Jane Doe</h2>
            <img src="/api/placeholder/375/250" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 20px; transform: perspective(500px) rotateY(5deg);">
            <div class="interview-text">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">RG: How would you describe your sound?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">JD: It's like a collision between a freight train and a synthesizer, with a sprinkle of stardust.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">RG: What inspires your compositions?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">JD: The chaos of everyday life, the hum of machines, and the silence between heartbeats.</div>
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-size: 24px; font-weight: bold; padding: 20px; background-color: #000; color: #fff; margin: 20px 0; transform: rotate(-3deg);">
              "Noise is not just sound, it's a state of mind"
            </div>
            <div class="interview-text">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-3" data-object-id="interview-question-3" data-deletable="true">RG: How do you see the future of experimental music?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-3" data-object-id="interview-answer-3" data-deletable="true">JD: It's going to get louder, more chaotic, and infinitely more beautiful. We're just scratching the surface of what's possible.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-4" data-object-id="interview-question-4" data-deletable="true">RG: Any advice for aspiring noise artists?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-4" data-object-id="interview-answer-4" data-deletable="true">JD: Embrace the dissonance. Find beauty in the ugly. And never, ever turn down the volume.</div>
            </div>
            <img src="/api/placeholder/375/250" alt="Performance image" id="performanceImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-top: 20px; transform: perspective(500px) rotateY(-5deg);">
          </div>
        `
      },
      {
        id: 'trend-report-mobile',
        name: 'Trend Report',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Courier New', monospace;">
            <style>
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
              .trend-item { margin-bottom: 20px; transform: skew(-3deg); }
              .trend-name { font-weight: bold; margin: 10px 0 5px; text-transform: uppercase; }
              .trend-description { font-size: 14px; }
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
            </style>
            <h1 class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-size: 32px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; transform: rotate(-5deg);">Sound Waves</h1>
            <h2 class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; transform: skew(-5deg);">This season's audio-visual disruptions</h2>
            <div class="trend-grid">
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Glitch Couture</div>
                <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Digital errors as high fashion statements</div>
              </div>
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
                <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Frequency Fringe</div>
                <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Oscillating between style and soundwaves</div>
              </div>
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="trend-pullquote" data-object-id="trend-pullquote" data-deletable="true" style="font-size: 24px; font-weight: bold; padding: 20px; background-color: #000; color: #fff; margin: 20px 0; transform: rotate(-3deg);">
              "Fashion is the visual echo of our sonic rebellion"
            </div>
            <div class="trend-item">
              <img src="/api/placeholder/335/200" alt="Trend 3" id="trendImage3" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-3-name" data-object-id="trend-3-name" data-deletable="true">Amplified Accessories</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-3-description" data-object-id="trend-3-description" data-deletable="true">Wearable tech meets avant-garde audio</div>
            </div>
            <div class="style-tip editable deletable" contenteditable="true" data-text-id="trend-style-tip" data-object-id="trend-style-tip" data-deletable="true" style="background-color: #000; color: #fff; padding: 15px; margin-top: 20px; transform: rotate(2deg);">
              <strong>Style Tip:</strong> Embrace the discord, let your style scream louder than words!
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: 'abode-mobile',
    name: 'Abode',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #f5f5f5; position: relative; overflow: hidden; font-family: 'Times New Roman', serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
            </style>
            <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 40px; left: 40px; font-family: 'Playfair Display', serif; font-size: 24px; color: #000;">APARTAMENTO</div>
            <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 100px; left: 40px; right: 40px; font-size: 48px; font-weight: normal; color: #000; line-height: 1.2;">Living Spaces, Real Stories</h1>
            <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 60px; left: 40px; right: 40px; font-size: 16px; color: #000;">Issue 27 - Spring/Summer 2023</p>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px; box-sizing: border-box; font-family: 'Times New Roman', serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .toc-item { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
              .toc-title { font-weight: normal; }
              .toc-page { color: #888; }
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
            </style>
            <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 36px; font-weight: normal; margin-bottom: 40px;">Contents</h1>
            <div id="tocContainer">
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">A Parisian Apartment</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">The Art of Slow Living</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Conversations: Designer X</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Objects of Desire</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f5f5f5; position: relative; overflow: hidden; padding: 40px; box-sizing: border-box; font-family: 'Times New Roman', serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&family=Raleway&display=swap');
            </style>
            <div class="editable deletable" data-background-id="article-background" data-object-id="article-background" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #f5f5f5; opacity: 0.2; mix-blend-mode: overlay; pointer-events: none"></div>
            <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: normal; margin-bottom: 20px; color: #333; border-bottom: 1px solid #333; padding-bottom: 10px;">The Art of Slow Living</h1>
            <h2 class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Raleway', sans-serif; font-size: 18px; margin-bottom: 30px; font-style: italic; color: #666;">Embracing simplicity in a fast-paced world</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
              <img src="/api/placeholder/147/200" alt="Slow living 1" id="articleImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
              <img src="/api/placeholder/147/200" alt="Slow living 2" id="articleImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
            </div>
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Raleway', sans-serif; font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #333;">
              In a world that seems to move at an ever-increasing pace, there's a growing movement towards slowing down and savoring life's simple pleasures. This philosophy, often referred to as 'slow living,' is not about doing everything at a snail's pace, but rather about being present, finding purpose, and living intentionally.
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 24px; font-style: italic; padding: 20px 0; border-top: 1px solid #333; border-bottom: 1px solid #333; margin: 30px 0; color: #666; text-align: center;">
              "Slow living is about creating space for the things that matter most."
            </div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile',
        name: 'Photo Editorial',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; font-family: 'Times New Roman', serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
            </style>
            <img src="/api/placeholder/375/500" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 500px; object-fit: cover;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="padding: 20px 40px; font-size: 14px; color: #888;">A sun-drenched living room in Barcelona, featuring a mix of vintage and contemporary pieces</div>
            <div class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="padding: 0 40px; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: normal; color: #000; margin-bottom: 20px;">Living With Light</div>
            <img src="/api/placeholder/375/500" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 500px; object-fit: cover;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="padding: 20px 40px; font-size: 14px; color: #888;">The kitchen opens to a small balcony, blurring the lines between indoor and outdoor spaces</div>
          </div>
        `
      },
      {
        id: 'interview-mobile',
        name: 'Interview',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px; box-sizing: border-box; font-family: 'Times New Roman', serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .question { font-weight: bold; margin-top: 20px; }
              .answer { margin-bottom: 20px; }
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
            </style>
            <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: normal; margin-bottom: 20px;">Conversations: Designer X</h1>
            <h2 class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-size: 18px; margin-bottom: 20px; font-style: italic; color: #888;">On creating spaces that tell stories</h2>
            <img src="/api/placeholder/295/200" alt="Designer X portrait" id="interviewImage" data-upload-target="true" style="width: 100%; height: auto; object-fit: cover; margin-bottom: 20px;">
            <div class="interview-text">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">Apartamento: How would you describe your design philosophy?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">Designer X: I believe in creating spaces that evolve with the people who inhabit them. It's about finding beauty in imperfection and celebrating the personal touches that make a house a home.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">Apartamento: What inspired your latest collection?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">Designer X: My latest work is inspired by the idea of 'wabi-sabi' - finding beauty in imperfection and impermanence. I wanted to create pieces that feel lived-in from the moment they enter a space.</div>
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 24px; font-style: italic; padding: 20px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; margin: 20px 0;">
              "A well-designed space should feel like an autobiography of its inhabitants."
            </div>
            <div class="interview-text">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-3" data-object-id="interview-question-3" data-deletable="true">Apartamento: How do you see the future of interior design?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-3" data-object-id="interview-answer-3" data-deletable="true">Designer X: I think we're moving towards more sustainable and personal spaces. People are craving authenticity and connection in their homes, and I believe design will increasingly reflect that desire for meaningful, sustainable living.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-4" data-object-id="interview-question-4" data-deletable="true">Apartamento: Any advice for people looking to refresh their living spaces?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-4" data-object-id="interview-answer-4" data-deletable="true">Designer X: Start by decluttering and really considering what objects bring you joy. Then, focus on creating layers of texture and personal mementos. Your space should tell your story, not follow fleeting trends.</div>
            </div>
          </div>
        `
      },
      {
        id: 'design-report-mobile',
        name: 'Design Report',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px; box-sizing: border-box; font-family: 'Times New Roman', serif;">
            <style>
              .editable:hover { outline: 2px dashed #007bff; cursor: text; }
              .design-item { margin-bottom: 30px; }
              .design-name { font-weight: bold; margin: 10px 0 5px; }
              .design-description { font-size: 14px; color: #666; }
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
            </style>
            <h1 class="design-title editable deletable" contenteditable="true" data-text-id="design-title" data-object-id="design-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: normal; margin-bottom: 20px;">Objects of Desire</h1>
            <h2 class="design-subtitle editable deletable" contenteditable="true" data-text-id="design-subtitle" data-object-id="design-subtitle" data-deletable="true" style="font-size: 18px; margin-bottom: 30px; font-style: italic; color: #888;">Curated selections for the discerning home</h2>
            <div class="design-grid">
              <div class="design-item">
                <img src="/api/placeholder/295/200" alt="Design 1" id="designImage1" data-upload-target="true" style="width: 100%; height: auto; object-fit: cover;">
                <div class="design-name editable deletable" contenteditable="true" data-text-id="design-1-name" data-object-id="design-1-name" data-deletable="true">Handcrafted Ceramic Vase</div>
                <div class="design-description editable deletable" contenteditable="true" data-text-id="design-1-description" data-object-id="design-1-description" data-deletable="true">Each piece unique, reflecting the artisan's touch</div>
              </div>
              <div class="design-item">
                <img src="/api/placeholder/295/200" alt="Design 2" id="designImage2" data-upload-target="true" style="width: 100%; height: auto; object-fit: cover;">
                <div class="design-name editable deletable" contenteditable="true" data-text-id="design-2-name" data-object-id="design-2-name" data-deletable="true">Vintage Rattan Chair</div>
                <div class="design-description editable deletable" contenteditable="true" data-text-id="design-2-description" data-object-id="design-2-description" data-deletable="true">A timeless piece that adds warmth to any space</div>
              </div>
            </div>
            <div class="design-quote editable deletable" contenteditable="true" data-text-id="design-quote" data-object-id="design-quote" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 24px; font-style: italic; padding: 20px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; margin: 30px 0;">
              "The objects we choose to surround ourselves with should spark joy and tell our story."
            </div>
            <div class="design-grid">
              <div class="design-item">
                <img src="/api/placeholder/295/200" alt="Design 3" id="designImage3" data-upload-target="true" style="width: 100%; height: auto; object-fit: cover;">
                <div class="design-name editable deletable" contenteditable="true" data-text-id="design-3-name" data-object-id="design-3-name" data-deletable="true">Linen Throw Blanket</div>
                <div class="design-description editable deletable" contenteditable="true" data-text-id="design-3-description" data-object-id="design-3-description" data-deletable="true">Soft, breathable, and perfect for layering</div>
              </div>
              <div class="design-item">
                <img src="/api/placeholder/295/200" alt="Design 4" id="designImage4" data-upload-target="true" style="width: 100%; height: auto; object-fit: cover;">
                <div class="design-name editable deletable" contenteditable="true" data-text-id="design-4-name" data-object-id="design-4-name" data-deletable="true">Minimalist Wall Clock</div>
                <div class="design-description editable deletable" contenteditable="true" data-text-id="design-4-description" data-object-id="design-4-description" data-deletable="true">Form meets function in this sleek timepiece</div>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  {
    id: 'trend-mobile',
    name: 'Trend',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Helvetica Neue', Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
              .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
            </style>
            <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
            <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 40px; left: 40px; font-family: 'Roboto', sans-serif; font-size: 48px; font-weight: 900; color: #fff; letter-spacing: -2px; transform: skew(-5deg);">THE FACE</div>
            <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 200px; left: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 64px; font-weight: 900; color: #fff; line-height: 0.9; text-transform: uppercase; mix-blend-mode: difference;">Culture Shock</h1>
            <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 80px; left: 20px; right: 20px; font-size: 18px; font-weight: bold; color: #fff; text-transform: uppercase; letter-spacing: 2px;">The New Underground: Music, Fashion, Art</p>
            <div class="issue-info editable deletable" contenteditable="true" data-text-id="cover-issue-info" data-object-id="cover-issue-info" data-deletable="true" style="position: absolute; top: 100px; right: 20px; font-size: 14px; color: #fff; writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);">ISSUE 257 · SUMMER 2023 · £5.99</div>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f0f0f0; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');
              .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
              .toc-item { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 15px; 
                font-size: 16px; 
                border-bottom: 1px solid #000; 
                padding-bottom: 10px; 
                position: relative; 
              }
              .toc-title { font-weight: bold; max-width: 80%; }
              .toc-page { font-weight: bold; }
            </style>
            <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 72px; font-weight: 900; margin-bottom: 40px; text-transform: uppercase; line-height: 0.9; transform: skew(-5deg);">Con<br>ten<br>ts</h1>
            <div id="tocContainer">
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The Big Interview: Rising Star X</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Street Style: London's New Wave</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Music: The Sound of Tomorrow</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Art: Breaking Boundaries</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
              </div>
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 900;">03</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
              .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
            </style>
            <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 48px; font-weight: 900; margin-bottom: 20px; line-height: 1; text-transform: uppercase; color: #000;">The Future of Fashion</h1>
            <div class="article-intro editable deletable" contenteditable="true" data-text-id="article-intro" data-object-id="article-intro" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #ff0000;">How technology is reshaping the runway</div>
            <img src="/api/placeholder/335/250" alt="Fashion image" id="articleImage" data-upload-target="true" style="width: calc(100% + 40px); height: 250px; object-fit: cover; margin-left: -20px; margin-bottom: 20px;">
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #333;">
              In an era where the digital and physical worlds are increasingly blurred, fashion stands at the forefront of a revolution. From AI-designed garments to virtual runways, the industry is embracing technology like never before.
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 24px; font-weight: 900; padding: 20px 0; border-top: 4px solid #000; border-bottom: 4px solid #000; margin: 20px 0; color: #ff0000;">
              "The future of fashion is not just about what we wear, but how we experience it."
            </div>
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
              As we delve deeper into this brave new world, questions arise: How will these innovations affect sustainability? What does it mean for traditional craftsmanship? And most importantly, how will it change the way we express ourselves through clothing?
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="article-page-number" data-object-id="article-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 900;">01</div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile',
        name: 'Photo Editorial',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Helvetica Neue', Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
              .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
            </style>
            <div class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="padding: 20px 20px 0; font-family: 'Roboto', sans-serif; font-size: 36px; font-weight: 900; color: #fff; text-transform: uppercase; line-height: 1; z-index: 20;">Urban Dystopia</div>
            <div class="editorial-text editable deletable" contenteditable="true" data-text-id="editorial-text" data-object-id="editorial-text" data-deletable="true" style="padding: 10px 20px; font-family: 'Roboto', sans-serif; font-size: 16px; color: #fff; z-index: 20;">
              In this striking series, we explore the intersection of high fashion and urban decay, challenging perceptions of beauty in our modern cities.
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="editorial-page-number" data-object-id="editorial-page-number" data-deletable="true" style="position: absolute; top: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 900; color: #fff; z-index: 20;">08</div>
            <img src="/api/placeholder/375/400" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 400px; object-fit: cover; z-index: 10;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="padding: 10px 20px; font-size: 14px; color: #fff; background-color: #ff0000; z-index: 30;">Model wears: Jacket by Designer X, Trousers by Designer Y</div>
            <img src="/api/placeholder/375/250" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; z-index: 10;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="padding: 10px 20px; font-size: 14px; color: #000; background-color: #fff; z-index: 30;">Accessories: Sunglasses by Brand Z, Boots by Designer W</div>
          </div>
        `
      },
      {
        id: 'interview-mobile',
        name: 'Interview',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
              .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
              .question { font-weight: 700; margin-top: 15px; color: #ff0000; }
              .answer { margin-bottom: 15px; }
            </style>
            <div class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 36px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; line-height: 1; transform: skew(-5deg);">Face to Face</div>
            <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #ff0000;">With rising star DJ Neon</div>
            <img src="/api/placeholder/335/200" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: calc(100% + 40px); height: 200px; object-fit: cover; margin-left: -20px; margin-bottom: 20px;">
            <div class="interview-text" style="font-family: 'Roboto', sans-serif; font-size: 14px;">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">THE FACE: How would you describe your sound?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">DJ NEON: It's a fusion of retro synth-wave and futuristic beats. I like to call it 'nostalgic tomorrow'.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">THE FACE: What inspires your unique style?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">DJ NEON: I draw inspiration from 80s sci-fi films and the neon-soaked streets of Tokyo. It's all about creating a vibe that's both familiar and alien.</div>
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 24px; font-weight: 900; padding: 20px 0; border-top: 4px solid #000; border-bottom: 4px solid #000; margin: 20px 0; color: #ff0000; transform: skew(-5deg);">
              "My music is a time machine to a future that never was."
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="interview-page-number" data-object-id="interview-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 900;">15</div>
          </div>
        `
      },
      {
        id: 'trend-report-mobile',
        name: 'Trend Report',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap');
              .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
              .trend-item { margin-bottom: 20px; }
              .trend-name { font-weight: 900; margin: 10px 0 5px; text-transform: uppercase; color: #ff0000; }
              .trend-description { font-size: 14px; color: #fff; }
            </style>
            <div class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 36px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; color: #fff; transform: skew(-5deg);">Street Pulse</div>
            <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #ff0000;">The looks defining tomorrow</div>
            <div class="trend-grid">
              <div class="trend-item">
                <img src="/api/placeholder/335/150" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
                <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Neo-Punk Revival</div>
                <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Anarchic aesthetics meet high-tech fabrics</div>
              </div>
              <div class="trend-item">
                <img src="/api/placeholder/335/150" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
                <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Digital Nomad Chic</div>
                <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Utilitarian style for the always-connected generation</div>
              </div>
            </div>
            <div class="trend-quote editable deletable" contenteditable="true" data-text-id="trend-quote" data-object-id="trend-quote" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 24px; font-weight: 900; padding: 20px 0; border-top: 2px solid #ff0000; border-bottom: 2px solid #ff0000; margin: 20px 0; color: #fff; transform: skew(-5deg);">
              "Fashion is no longer about fitting in, it's about standing out."
            </div>
            <div class="trend-item">
              <img src="/api/placeholder/335/150" alt="Trend 3" id="trendImage3" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-3-name" data-object-id="trend-3-name" data-deletable="true">Retro-Futurism 2.0</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-3-description" data-object-id="trend-3-description" data-deletable="true">Yesterday's vision of tomorrow, reimagined for today</div>
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 900; color: #ff0000;">22</div>
          </div>
        `
      }
    ]
  },
  {
    id: 'calm-mobile',
    name: 'Calm',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f8f8f8; position: relative; overflow: hidden; font-family: 'Georgia', serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
              .editable:hover { outline: 2px dashed #888; cursor: text; }
            </style>
            <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8; mask-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%); -webkit-mask-image: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%);">
            <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 40px; left: 40px; font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; color: #333; letter-spacing: 4px;">KINFOLK</div>
            <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 200px; left: 40px; right: 40px; font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; color: #333; line-height: 1.2;">The Art of Slow Living</h1>
            <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 160px; left: 40px; right: 40px; font-family: 'Georgia', serif; font-size: 16px; font-style: italic; color: #666;">Embracing simplicity in a complex world</p>
            <div class="issue-info editable deletable" contenteditable="true" data-text-id="cover-issue-info" data-object-id="cover-issue-info" data-deletable="true" style="position: absolute; bottom: 40px; left: 40px; font-family: 'Georgia', serif; font-size: 14px; color: #666;">Issue 42 · Summer 2023</div>
          </div>
        `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
          <div id="magazine-page" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Georgia', serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
              .editable:hover { outline: 2px dashed #888; cursor: text; }
              .toc-item { 
                display: flex; 
                justify-content: space-between; 
                margin-bottom: 20px; 
                font-size: 16px; 
                border-bottom: 1px solid #ddd; 
                padding-bottom: 10px; 
              }
              .toc-title { font-weight: normal; max-width: 80%; }
              .toc-page { color: #888; }
            </style>
            <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 40px; color: #333;">Contents</h1>
            <div id="tocContainer">
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The Essence of Simplicity</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Mindful Living Spaces</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">The Art of Slow Cooking</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
              </div>
              <div class="toc-item">
                <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Conversations: Artisan Spotlight</span>
                <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
              </div>
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="margin-top: 40px; font-family: 'Georgia', serif; font-size: 14px; color: #888; text-align: center;">3</div>
          </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Georgia', serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
              .editable:hover { outline: 2px dashed #888; cursor: text; }
            </style>
            <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 20px; color: #333; line-height: 1.2;">The Art of Slow Living</h1>
            <div class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; font-style: italic; margin-bottom: 30px; color: #666;">Embracing simplicity in a fast-paced world</div>
            <img src="/api/placeholder/335/250" alt="Feature image" id="featureImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 30px;">
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #333;">
              In a world that seems to move at an ever-increasing pace, there's a growing movement towards slowing down and savoring life's simple pleasures. This philosophy, often referred to as 'slow living,' is not about doing everything at a snail's pace, but rather about being present, finding purpose, and living intentionally.
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; font-style: italic; padding: 20px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; margin: 30px 0; color: #666; text-align: center;">
              "Slow living is about creating space for the things that matter most."
            </div>
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.6; color: #333;">
              By embracing slow living, we can cultivate a deeper appreciation for the world around us, nurture meaningful relationships, and find joy in the everyday moments that might otherwise pass us by unnoticed.
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="article-page-number" data-object-id="article-page-number" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 12px; color: #999; text-align: center; margin-top: 40px;">1</div>
          </div>
        `
      },
      {
        id: 'photo-editorial-mobile',
        name: 'Photo Editorial',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Georgia', serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
              .editable:hover { outline: 2px dashed #888; cursor: text; }
            </style>
            <h1 class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 20px; color: #333; text-align: center;">Simplicity in Form</h1>
            <div class="editorial-subtitle editable deletable" contenteditable="true" data-text-id="editorial-subtitle" data-object-id="editorial-subtitle" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; font-style: italic; margin-bottom: 30px; color: #666; text-align: center;">A visual exploration of minimalist design</div>
            <img src="/api/placeholder/335/400" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 400px; object-fit: cover; margin-bottom: 20px;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 14px; color: #666; margin-bottom: 30px; text-align: center;">The beauty of negative space in interior design</div>
            <img src="/api/placeholder/335/400" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 400px; object-fit: cover; margin-bottom: 20px;">
            <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 14px; color: #666; margin-bottom: 30px; text-align: center;">Embracing natural textures and muted tones</div>
            <div class="editorial-text editable deletable" contenteditable="true" data-text-id="editorial-text" data-object-id="editorial-text" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              In this photo series, we explore how simplicity in design can create spaces that are both visually striking and deeply calming. By focusing on clean lines, natural materials, and a muted color palette, these interiors demonstrate the power of restraint in creating harmonious living environments.
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="editorial-page-number" data-object-id="editorial-page-number" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 12px; color: #999; text-align: center; margin-top: 40px;">8</div>
          </div>
        `
      },
      {
        id: 'interview-mobile',
        name: 'Interview',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Georgia', serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
              .editable:hover { outline: 2px dashed #888; cursor: text; }
              .question { font-weight: 700; margin-top: 20px; color: #333; }
              .answer { margin-bottom: 20px; color: #666; }
            </style>
            <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 20px; color: #333; text-align: center;">A Conversation with Nature</h1>
            <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; font-style: italic; margin-bottom: 30px; color: #666; text-align: center;">Exploring sustainable living with eco-architect Jane Doe</div>
            <img src="/api/placeholder/335/250" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; margin-bottom: 30px;">
            <div class="interview-text" style="font-family: 'Georgia', serif; font-size: 16px; line-height: 1.6;">
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">How would you describe your approach to sustainable architecture?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">My philosophy is rooted in the belief that our living spaces should exist in harmony with nature, not in opposition to it. I strive to create homes that not only minimize their environmental impact but also enhance the well-being of their inhabitants.</div>
              <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">What inspired you to focus on eco-friendly design?</div>
              <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">Growing up surrounded by nature, I've always felt a deep connection to the environment. As I pursued architecture, it became clear that our built environments often disconnect us from nature. My work aims to bridge that gap, bringing the outside in and creating spaces that feel like natural extensions of the landscape.</div>
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; font-style: italic; padding: 20px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; margin: 30px 0; color: #666; text-align: center;">
              "Sustainable design is not just about materials; it's about creating spaces that nurture both people and the planet."
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="interview-page-number" data-object-id="interview-page-number" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 12px; color: #999; text-align: center; margin-top: 40px;">15</div>
          </div>
        `
      },
      {
        id: 'trend-report-mobile',
        name: 'Trend Report',
        content: `
          <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Georgia', serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&display=swap');
              .editable:hover { outline: 2px dashed #888; cursor: text; }
              .trend-item { margin-bottom: 40px; }
              .trend-name { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 24px; margin-bottom: 10px; color: #333; }
              .trend-description { font-size: 16px; color: #666; line-height: 1.6; }
            </style>
            <h1 class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 20px; color: #333; text-align: center;">Emerging Lifestyle Trends</h1>
            <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 16px; font-style: italic; margin-bottom: 40px; color: #666; text-align: center;">Shaping the future of mindful living</div>
            <div class="trend-grid">
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 20px;">
                <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Biophilic Design</div>
                <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Incorporating nature into our living spaces, biophilic design is more than just adding plants. It's about creating environments that connect us to the natural world, improving our well-being and productivity.</div>
              </div>
              <div class="trend-item">
                <img src="/api/placeholder/335/200" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 20px;">
                <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Slow Fashion</div>
                <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Moving away from fast fashion, consumers are embracing quality over quantity. This shift towards timeless, durable pieces reflects a growing awareness of the environmental impact of our clothing choices.</div>
              </div>
            </div>
            <div class="trend-quote editable deletable" contenteditable="true" data-text-id="trend-quote" data-object-id="trend-quote" data-deletable="true" style="font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 300; font-style: italic; padding: 20px 0; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; margin: 30px 0; color: #666; text-align: center;">
              "The future of lifestyle design lies in conscious choices that prioritize both personal well-being and environmental sustainability."
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="font-family: 'Georgia', serif; font-size: 12px; color: #999; text-align: center; margin-top: 40px;">22</div>
          </div>
        `
      }
    ]
  },
  {
    id: 'pop-mobile',
    name: 'Pop',
    templates: [
      {
        id: 'cover-mobile',
        name: 'Cover',
        content: `
          <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Arial', sans-serif;">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;700&display=swap');
              .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
            </style>
            <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.8;">
            <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 40px; left: 40px; font-family: 'Montserrat', sans-serif; font-size: 48px; font-weight: 700; color: #fff; letter-spacing: -2px; transform: skew(-5deg);">NYLON</div>
            <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 200px; left: 20px; right: 20px; font-family: 'Montserrat', sans-serif; font-size: 64px; font-weight: 700; color: #fff; line-height: 0.9; text-transform: uppercase; mix-blend-mode: difference;">Pop Culture Reloaded</h1>
            <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 160px; left: 20px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 400; color: #fff; text-transform: uppercase; letter-spacing: 2px;">Fashion • Music • Art • Tech</p>
            <div class="issue-info editable deletable" contenteditable="true" data-text-id="cover-issue-info" data-object-id="cover-issue-info" data-deletable="true" style="position: absolute; top: 100px; right: 20px; font-family: 'Roboto', sans-serif; font-size: 14px; color: #fff; writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);">ISSUE 127 • SUMMER 2023 • $5.99</div>
            <div class="color-block editable deletable" data-background-id="cover-color-block" data-object-id="cover-color-block" data-deletable="true" style="position: absolute; bottom: 0; right: 0; width: 50%; height: 30%; background-color: #ff00ff; mix-blend-mode: multiply; transform: skew(-10deg) translateX(20px);"></div>
          </div>
          `
      },
      {
        id: 'contents-mobile',
        name: 'Contents',
        content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f0f0f0; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
            .toc-item { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 15px; 
              font-size: 16px; 
              border-bottom: 1px solid #000; 
              padding-bottom: 10px; 
              position: relative; 
            }
            .toc-title { font-weight: bold; max-width: 80%; }
            .toc-page { font-weight: bold; color: #ff00ff; }
          </style>
          <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 72px; font-weight: 700; margin-bottom: 40px; text-transform: uppercase; line-height: 0.9; transform: skew(-5deg);">What's Inside</h1>
          <div id="tocContainer">
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The Next Wave: Gen Z Innovators</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Street Style: Neon Nights</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Music: The Sound of Tomorrow</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Tech Talk: AR Fashion Revolution</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
            </div>
          </div>
          <div class="color-block editable deletable" data-background-id="contents-color-block" data-object-id="contents-color-block" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 30%; height: 100%; background-color: #ff00ff; opacity: 0.1; transform: skew(-10deg) translateX(-20px);"></div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700;">03</div>
        </div>
        `
      },
      {
        id: 'feature-article-mobile',
        name: 'Feature Article',
        content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
          </style>
          <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 700; margin-bottom: 20px; line-height: 1; text-transform: uppercase; color: #000;">The Future of Fashion Tech</h1>
            <div class="article-intro editable deletable" contenteditable="true" data-text-id="article-intro" data-object-id="article-intro" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #ff00ff;">How AR and AI are revolutionizing your wardrobe</div>
            <img src="/api/placeholder/335/250" alt="Fashion Tech image" id="articleImage" data-upload-target="true" style="width: calc(100% + 40px); height: 250px; object-fit: cover; margin-left: -20px; margin-bottom: 20px;">
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #333;">
              In an era where our phones are an extension of ourselves, it's no surprise that fashion is getting a high-tech makeover. From AR fitting rooms to AI-designed collections, the future of fashion is here, and it's nothing short of revolutionary.
            </div>
            <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; padding: 20px 0; border-top: 4px solid #ff00ff; border-bottom: 4px solid #ff00ff; margin: 20px 0; color: #000;">
              "The next big trend? Clothes that adapt to your mood and environment in real-time."
            </div>
            <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
              Imagine a world where your jacket changes color based on your mood, or your shoes adapt their cushioning as you walk. With advancements in smart textiles and AI, this sci-fi fantasy is quickly becoming a reality.
            </div>
            <div class="page-number editable deletable" contenteditable="true" data-text-id="article-page-number" data-object-id="article-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700;">01</div>
        </div>        
        `
    },
    {
      id: 'photo-editorial-mobile',
      name: 'Photo Editorial',
      content: `
      <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Arial', sans-serif;">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;700&display=swap');
        .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
      </style>
      <div class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="padding: 20px 20px 0; font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 700; color: #ff00ff; text-transform: uppercase; line-height: 1; z-index: 20;">Neon Dreams</div>
      <div class="editorial-subtitle editable deletable" contenteditable="true" data-text-id="editorial-subtitle" data-object-id="editorial-subtitle" data-deletable="true" style="padding: 10px 20px; font-family: 'Roboto', sans-serif; font-size: 18px; color: #fff; z-index: 20;">
        A vibrant exploration of cyber-punk fashion in the urban jungle
      </div>
      <img src="/api/placeholder/375/400" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 400px; object-fit: cover; z-index: 10;">
      <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="padding: 10px 20px; font-family: 'Roboto', sans-serif; font-size: 14px; color: #fff; background-color: #ff00ff; z-index: 30;">Model wears: Holographic jacket by TechWear, LED-infused boots by NightWalk</div>
      <img src="/api/placeholder/375/250" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 250px; object-fit: cover; z-index: 10;">
      <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="padding: 10px 20px; font-family: 'Roboto', sans-serif; font-size: 14px; color: #000; background-color: #fff; z-index: 30;">Accessories: AR glasses by FutureVision, Smart bracelet by ConnectWear</div>
      <div class="pull-quote editable deletable" contenteditable="true" data-text-id="editorial-pullquote" data-object-id="editorial-pullquote" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; padding: 20px; color: #ff00ff; margin: 20px 0; text-align: center; z-index: 20;">
        "The city is our runway, technology is our designer"
      </div>
      <div class="page-number editable deletable" contenteditable="true" data-text-id="editorial-page-number" data-object-id="editorial-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; color: #fff; z-index: 20;">08</div>
    </div>
      `
    },
    {
      id: 'interview-mobile',
      name: 'Interview',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
            .question { font-weight: 700; margin-top: 15px; color: #ff00ff; }
            .answer { margin-bottom: 15px; }
          </style>
          <div class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; line-height: 1; color: #000;">Tech Visionary Speaks</div>
          <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #ff00ff;">One-on-one with AI fashion designer Alex Future</div>
          <img src="/api/placeholder/335/200" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: calc(100% + 40px); height: 200px; object-fit: cover; margin-left: -20px; margin-bottom: 20px;">
          <div class="interview-text" style="font-family: 'Roboto', sans-serif; font-size: 16px;">
            <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">NYLON: How would you describe your AI-driven design process?</div>
            <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">ALEX: It's like having a conversation with the future. We feed the AI with current trends, historical data, and even social media buzz. Then, it creates designs that are both familiar and completely new.</div>
            <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">NYLON: What inspired your latest collection?</div>
            <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">ALEX: Our AI analyzed thousands of sci-fi movies and combined that with current streetwear trends. The result is what we call 'Neo Tokyo Streetwear' - it's cyberpunk meets hypebeast.</div>
          </div>
          <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; padding: 20px 0; border-top: 4px solid #ff00ff; border-bottom: 4px solid #ff00ff; margin: 20px 0; color: #000;">
            "AI doesn't replace creativity, it amplifies it."
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="interview-page-number" data-object-id="interview-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700;">15</div>
        </div>
      `
    },
    {
      id: 'trend-report-mobile',
      name: 'Trend Report',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f0f0f0; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff00ff; cursor: text; }
            .trend-item { margin-bottom: 20px; }
            .trend-name { font-weight: 700; margin: 10px 0 5px; text-transform: uppercase; color: #ff00ff; }
            .trend-description { font-size: 14px; color: #333; }
          </style>
          <div class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; color: #000;">Future Forecast</div>
          <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; color: #ff00ff;">The trends shaping tomorrow's style</div>
          <div class="trend-grid">
            <div class="trend-item">
              <img src="/api/placeholder/335/150" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Holographic Couture</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Clothing that changes patterns with a swipe on your smartphone</div>
            </div>
            <div class="trend-item">
              <img src="/api/placeholder/335/150" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Biometric Accessories</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Jewelry that monitors your mood and adjusts your environment</div>
            </div>
          </div>
          <div class="trend-quote editable deletable" contenteditable="true" data-text-id="trend-quote" data-object-id="trend-quote" data-deletable="true" style="font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 700; padding: 20px 0; border-top: 4px solid #ff00ff; border-bottom: 4px solid #ff00ff; margin: 20px 0; color: #000;">
            "The future of fashion is interactive, adaptive, and deeply personal."
          </div>
          <div class="trend-item">
            <img src="/api/placeholder/335/150" alt="Trend 3" id="trendImage3" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
            <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-3-name" data-object-id="trend-3-name" data-deletable="true">Nano-tech Fabrics</div>
            <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-3-description" data-object-id="trend-3-description" data-deletable="true">Self-cleaning, temperature-regulating materials that adapt to your body</div>
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700;">22</div>
        </div>
      `
    }
  ]
},
{
  id: 'lens-mobile',
  name: 'Lens',
  templates: [
    {
      id: 'cover-mobile',
      name: 'Cover',
      content: `
        <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ff00; cursor: text; }
          </style>
          <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover;">
          <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 20px; left: 20px; font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; color: #fff; background-color: #000; padding: 5px 10px; transform-origin: left top;">FOAM</div>
          <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 100px; left: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 48px; font-weight: 700; color: #fff; line-height: 1.1; text-transform: uppercase; mix-blend-mode: difference;">Reimagining Reality</h1>
          <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 60px; left: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 14px; color: #fff; text-transform: uppercase; letter-spacing: 2px; mix-blend-mode: difference;">Photography beyond boundaries</p>
          <div class="issue-info editable deletable" contenteditable="true" data-text-id="cover-issue-info" data-object-id="cover-issue-info" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 12px; color: #fff; mix-blend-mode: difference;">ISSUE 62 • SUMMER 2023 • €25</div>
        </div>
      `
    },
    {
      id: 'contents-mobile',
      name: 'Contents',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ff00; cursor: text; }
            .toc-item { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 15px; 
              font-size: 14px; 
              border-bottom: 1px solid #000; 
              padding-bottom: 10px; 
              position: relative; 
            }
            .toc-title { font-weight: bold; max-width: 80%; }
            .toc-page { font-weight: bold; }
          </style>
          <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 36px; font-weight: 700; margin-bottom: 40px; text-transform: uppercase; line-height: 1; transform: rotate(-90deg); transform-origin: left top; position: absolute; left: 20px; top: 200px;">Contents</h1>
          <div id="tocContainer" style="margin-left: 60px; margin-top: 120px;">
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">Distorted Perspectives</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">08</span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">The Unseen Spectrum</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">16</span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Fractured Realities</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">24</span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Beyond the Lens</span>
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">32</span>
            </div>
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700;">03</div>
        </div>
      `
    },
    {
      id: 'feature-article-mobile',
      name: 'Feature Article',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ff00; cursor: text; }
          </style>
          <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; margin-bottom: 20px; line-height: 1.2; text-transform: uppercase; color: #000;">The Boundaries of Perception</h1>
          <div class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 16px; margin-bottom: 20px; color: #666;">Exploring the liminal spaces of visual art</div>
          <img src="/api/placeholder/335/250" alt="Feature image" id="featureImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 250px; object-fit: cover; margin-bottom: 20px;">
          <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #333;">
            In the realm where reality blends with imagination, photographers are pushing the boundaries of visual perception. This exploration goes beyond mere representation, delving into the very essence of how we interpret the world around us.
          </div>
          <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; padding: 20px 0; border-left: 4px solid #000; margin: 20px 0; padding-left: 20px; color: #000; transform: skew(-5deg);">
            "Photography is not about capturing reality, but creating it."
          </div>
          <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
            Artists featured in this issue challenge our preconceptions, using techniques that blur the line between photography and other visual arts. From multi-exposure compositions to digital manipulations that defy physics, these works invite us to question the very nature of visual truth.
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="article-page-number" data-object-id="article-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700;">01</div>
        </div>
      `
    },
    {
      id: 'photo-editorial-mobile',
      name: 'Photo Editorial',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Helvetica Neue', Arial, sans-serif; padding-bottom: 40px;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ff00; cursor: text; }
          </style>
          <div class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="position: absolute; top: 20px; left: 20px; font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; color: #fff; writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg); z-index: 10;">VISUAL PARADOX</div>
          <img src="/api/placeholder/375/400" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: 100%; height: 400px; object-fit: cover; z-index: 1; display: block; margin-bottom: 10px;">
          <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 12px; color: #fff; background-color: rgba(0,0,0,0.7); padding: 5px; z-index: 10; margin-bottom: 20px;">Ethereal Shadows by Photographer A</div>
          <img src="/api/placeholder/375/400" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: 100%; height: 400px; object-fit: cover; z-index: 1; display: block; margin-bottom: 10px;">
          <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 12px; color: #fff; background-color: rgba(0,0,0,0.7); padding: 5px; z-index: 10; margin-bottom: 20px;">Fractured Realities by Photographer B</div>
          <div class="editorial-description editable deletable" contenteditable="true" data-text-id="editorial-description" data-object-id="editorial-description" data-deletable="true" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #fff; background-color: rgba(0,0,0,0.7); padding: 10px; z-index: 10; margin-bottom: 20px;">
            In this series, we explore the intersection of reality and imagination, where photographers bend the rules of perception to create new visual paradigms.
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="editorial-page-number" data-object-id="editorial-page-number" data-deletable="true" style="position: absolute; top: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #fff; z-index: 10;">08</div>
        </div>
      `
    },
    {
      id: 'interview-mobile',
      name: 'Interview',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ff00; cursor: text; }
            .question { font-weight: 700; margin-top: 15px; color: #000; }
            .answer { margin-bottom: 15px; color: #333; }
          </style>
          <div class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; line-height: 1.2; color: #000;">Capturing the Unseen</div>
          <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 18px; margin-bottom: 20px; color: #666;">A conversation with avant-garde photographer Lisa Reimer</div>
          <img src="/api/placeholder/335/200" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 200px; object-fit: cover; margin-bottom: 20px;">
          <div class="interview-text" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6;">
            <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">FOAM: Your work often blurs the line between photography and abstract art. How do you approach this intersection?</div>
            <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">LISA: I see photography as a medium for capturing energy rather than just visual reality. By manipulating light, exposure, and post-processing, I aim to reveal the unseen frequencies that permeate our world.</div>
            <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">FOAM: Can you tell us about your latest project, "Quantum Visions"?</div>
            <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">LISA: "Quantum Visions" is an attempt to visualize the principles of quantum mechanics through photography. Each image is a long exposure of subatomic particle simulations, creating abstract landscapes that exist between the real and the theoretical.</div>
          </div>
          <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; padding: 20px 0; border-left: 4px solid #000; margin: 20px 0; padding-left: 20px; color: #000; transform: skew(-5deg);">
            "Photography is not about capturing light, but about revealing the invisible."
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="interview-page-number" data-object-id="interview-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700;">15</div>
        </div>
      `
    },
    {
      id: 'trend-report-mobile',
      name: 'Trend Report',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f0f0f0; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ff00; cursor: text; }
            .trend-item { margin-bottom: 30px; }
            .trend-name { font-family: 'Space Mono', monospace; font-weight: 700; font-size: 18px; margin: 10px 0 5px; text-transform: uppercase; color: #000; }
            .trend-description { font-size: 14px; color: #333; }
          </style>
          <div class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; margin-bottom: 20px; text-transform: uppercase; color: #000;">Emerging Visions</div>
          <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 18px; margin-bottom: 30px; color: #666;">Photographic trends reshaping visual culture</div>
          <div class="trend-grid">
            <div class="trend-item">
              <img src="/api/placeholder/335/200" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Hyper-Real Surrealism</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Blending high-definition photography with digital manipulation to create uncanny, dreamlike images that challenge perception.</div>
            </div>
            <div class="trend-item">
              <img src="/api/placeholder/335/200" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Micro-Macro Fusion</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Juxtaposing microscopic details with vast landscapes to explore the interconnectedness of scale in our visual world.</div>
            </div>
          </div>
          <div class="trend-quote editable deletable" contenteditable="true" data-text-id="trend-quote" data-object-id="trend-quote" data-deletable="true" style="font-family: 'Space Mono', monospace; font-size: 24px; font-weight: 700; padding: 20px 0; border-top: 2px solid #000; border-bottom: 2px solid #000; margin: 30px 0; color: #000; text-align: center;">
            "The future of photography lies in reimagining reality, not just capturing it."
          </div>
          <div class="trend-item">
            <img src="/api/placeholder/335/200" alt="Trend 3" id="trendImage3" data-upload-target="true" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-3-name" data-object-id="trend-3-name" data-deletable="true">Temporal Collage</div>
            <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-3-description" data-object-id="trend-3-description" data-deletable="true">Layering multiple exposures taken over extended periods to create complex, time-bending compositions that challenge linear narratives.</div>
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700;">22</div>
        </div>
      `
    }    
  ]
},
{
  id: 'epitome-mobile',
  name: 'Epitome',
  templates: [
    {
      id: 'cover-mobile',
      name: 'Cover',
      content: `
        <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #e0e0e0; position: relative; overflow: hidden; font-family: 'Helvetica', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto+Condensed:wght@700&display=swap');
            .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
          </style>
          <div class="background editable deletable" data-background-id="cover-background" data-object-id="cover-background" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #e0e0e0; z-index: 1;"></div>
          <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; z-index: 2;">
          <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 20px; left: 20px; right: 20px; font-family: 'Archivo Black', sans-serif; font-size: 72px; line-height: 0.9; color: #ff3300; z-index: 4; transform: scaleY(1.2);">EMI<br>GRE</div>
          <div class="issue-number editable deletable" contenteditable="true" data-text-id="cover-issue-number" data-object-id="cover-issue-number" data-deletable="true" style="position: absolute; top: 200px; right: 20px; font-family: 'Roboto Condensed', sans-serif; font-size: 150px; color: #000; opacity: 0.7; z-index: 3;">51</div>
          <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 100px; left: 20px; right: 20px; font-family: 'Roboto Condensed', sans-serif; font-size: 36px; font-weight: 700; color: #000; line-height: 1; text-transform: uppercase; z-index: 4;">Deconstructing Digital Typography</h1>
          <div class="graphic-element editable deletable" data-background-id="cover-graphic" data-object-id="cover-graphic" data-deletable="true" style="position: absolute; bottom: 80px; left: 20px; width: 100px; height: 5px; background-color: #ff3300; z-index: 4;"></div>
          <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 40px; left: 20px; right: 20px; font-family: 'Helvetica', sans-serif; font-size: 14px; color: #333; z-index: 4;">Exploring the intersection of technology and design</p>
        </div>
      `
    },
    {
      id: 'contents-mobile',
      name: 'Contents',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto+Condensed:wght@700&display=swap');
            .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
            .toc-item { 
              margin-bottom: 20px; 
              font-size: 14px; 
              position: relative; 
            }
            .toc-title { font-weight: bold; display: block; }
            .toc-page { font-weight: normal; color: #ff3300; }
          </style>
          <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 36px; margin-bottom: 40px; text-transform: uppercase; line-height: 1; transform: rotate(-90deg) translateX(-100%); transform-origin: left top; position: absolute; left: 340px; top: 20px;">Contents</h1>
          <div id="tocContainer" style="margin-top: 80px;">
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The Evolution of Digital Type <span class="toc-page">08</span></span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Deconstructing the Grid <span class="toc-page">16</span></span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Interview: Pioneers of Digital Design <span class="toc-page">24</span></span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">The Future of Print in a Digital World <span class="toc-page">32</span></span>
            </div>
          </div>
          <div class="graphic-element editable deletable" data-background-id="contents-graphic" data-object-id="contents-graphic" data-deletable="true" style="position: absolute; top: 50%; left: 20px; width: 100px; height: 5px; background-color: #ff3300; transform: rotate(90deg); transform-origin: left center;"></div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto Condensed', sans-serif; font-size: 14px; font-weight: 700;">03</div>
        </div>
      `
    },
    {
      id: 'feature-article-mobile',
      name: 'Feature Article',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto+Condensed:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
          </style>
          <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 36px; line-height: 1.2; margin-bottom: 20px; transform: skew(-5deg);">The Digital Revolution in Typography</h1>
          <div class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Roboto Condensed', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 30px; color: #ff3300;">How technology is reshaping the world of type design</div>
          <img src="/api/placeholder/335/200" alt="Feature image" id="featureImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 200px; object-fit: cover; margin-bottom: 20px;">
          <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            In the ever-evolving landscape of graphic design, the impact of digital technology on typography has been nothing short of revolutionary. From the early days of bitmap fonts to today's variable typefaces, the journey of digital type design is a testament to the symbiotic relationship between creativity and technology.
          </div>
          <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 24px; line-height: 1.2; padding: 20px 0; border-top: 2px solid #000; border-bottom: 2px solid #000; margin: 20px 0; transform: rotate(-2deg);">
            "Typography is the voice of a new language in a digital realm."
          </div>
          <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6;">
            As we delve deeper into this digital renaissance, questions arise: How will emerging technologies like AI and VR further transform type design? What does this mean for the future of readability and visual communication? Join us as we explore these questions and more in our feature article.
          </div>
          <div class="graphic-element editable deletable" data-background-id="article-graphic" data-object-id="article-graphic" data-deletable="true" style="position: absolute; bottom: 40px; right: 20px; width: 100px; height: 100px; border: 5px solid #ff3300; border-radius: 50%; transform: rotate(45deg);"></div>
        </div>
      `
    },
    {
      id: 'photo-editorial-mobile',
      name: 'Photo Editorial',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto+Condensed:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
          </style>
          <h1 class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 36px; color: #fff; margin-bottom: 20px; transform: skew(-5deg);">VISUAL SYNTAX</h1>
          <div class="editorial-subtitle editable deletable" contenteditable="true" data-text-id="editorial-subtitle" data-object-id="editorial-subtitle" data-deletable="true" style="font-family: 'Roboto Condensed', sans-serif; font-size: 18px; color: #ff3300; margin-bottom: 30px;">Exploring the grammar of digital design</div>
          <img src="/api/placeholder/335/300" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 300px; object-fit: cover; margin-bottom: 20px;">
          <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="font-family: 'Roboto Condensed', sans-serif; font-size: 12px; color: #fff; margin-bottom: 30px; transform: rotate(-1deg);">Image 1: The intersection of code and creativity</div>
          <img src="/api/placeholder/335/300" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 300px; object-fit: cover; margin-bottom: 20px;">
          <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="font-family: 'Roboto Condensed', sans-serif; font-size: 12px; color: #fff; margin-bottom: 30px; transform: rotate(1deg);">Image 2: Typography as a visual language</div>
          <div class="editorial-text editable deletable" contenteditable="true" data-text-id="editorial-text" data-object-id="editorial-text" data-deletable="true" style="font-family: 'Helvetica', sans-serif; font-size: 14px; color: #fff; line-height: 1.6; margin-top: 30px;">
            In this visual exploration, we deconstruct the elements of digital design, examining how typography, imagery, and code intertwine to create a new visual language for the digital age.
          </div>
          <div class="graphic-element editable deletable" data-background-id="editorial-graphic" data-object-id="editorial-graphic" data-deletable="true" style="position: absolute; top: 60px; right: 20px; width: 80px; height: 80px; border: 3px solid #ff3300; transform: rotate(45deg);"></div>
        </div>
      `
    },
    {
      id: 'interview-mobile',
      name: 'Interview',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #fff; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto+Condensed:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
            .question { font-weight: 700; margin-top: 15px; color: #ff3300; }
            .answer { margin-bottom: 15px; }
          </style>
          <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 36px; line-height: 1.2; margin-bottom: 20px; transform: skew(-5deg);">DIGITAL PIONEER</h1>
          <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Roboto Condensed', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 30px; color: #000;">A conversation with type designer Jane Doe</div>
          <img src="/api/placeholder/335/200" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 200px; object-fit: cover; margin-bottom: 20px;">
          <div class="interview-text" style="font-family: 'Helvetica', sans-serif; font-size: 14px; line-height: 1.6;">
            <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">How has digital technology transformed your approach to type design?</div>
            <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">Digital tools have opened up a whole new world of possibilities. We're no longer constrained by the physical limitations of traditional type-setting. Now, a single font can have infinite variations, responding dynamically to its context.</div>
            <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">What's your view on the future of typography in the digital age?</div>
            <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">I believe we're moving towards more adaptive and context-aware typography. Fonts will become more like intelligent organisms, evolving and adapting to the user's needs and the viewing environment in real-time.</div>
          </div>
          <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 24px; line-height: 1.2; padding: 20px 0; border-left: 5px solid #ff3300; margin: 20px 0; padding-left: 20px; transform: rotate(-2deg);">
            "The future of type is fluid, responsive, and alive."
          </div>
          <div class="graphic-element editable deletable" data-background-id="interview-graphic" data-object-id="interview-graphic" data-deletable="true" style="position: absolute; top: 60px; right: 20px; width: 80px; height: 80px; border: 3px solid #ff3300; transform: rotate(45deg);"></div>
        </div>
      `
    },
    {
      id: 'trend-report-mobile',
      name: 'Trend Report',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f0f0f0; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Helvetica', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Roboto+Condensed:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #ff0000; cursor: text; }
            .trend-item { margin-bottom: 30px; }
            .trend-name { font-family: 'Archivo Black', sans-serif; font-weight: 700; font-size: 18px; margin: 10px 0 5px; text-transform: uppercase; color: #ff3300; }
            .trend-description { font-size: 14px; color: #333; }
          </style>
          <h1 class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 36px; line-height: 1.2; margin-bottom: 20px; transform: skew(-5deg);">EMERGING VISIONS</h1>
          <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Roboto Condensed', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 30px; color: #000;">Typographic trends shaping the digital landscape</div>
          <div class="trend-grid">
            <div class="trend-item">
              <img src="/api/placeholder/335/150" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Variable Fonts</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Adaptive typefaces that fluidly adjust to different contexts and screen sizes.</div>
            </div>
            <div class="trend-item">
              <img src="/api/placeholder/335/150" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Kinetic Typography</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Motion-based type design that brings letters to life in digital environments.</div>
            </div>
          </div>
          <div class="trend-quote editable deletable" contenteditable="true" data-text-id="trend-quote" data-object-id="trend-quote" data-deletable="true" style="font-family: 'Archivo Black', sans-serif; font-size: 24px; line-height: 1.2; padding: 20px 0; border-top: 2px solid #ff3300; border-bottom: 2px solid #ff3300; margin: 30px 0; color: #000; text-align: center; transform: rotate(-2deg);">
            "Typography is no longer static; it's a dynamic, living entity in the digital realm."
          </div>
          <div class="trend-item">
            <img src="/api/placeholder/335/150" alt="Trend 3" id="trendImage3" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
            <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-3-name" data-object-id="trend-3-name" data-deletable="true">AI-Generated Fonts</div>
            <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-3-description" data-object-id="trend-3-description" data-deletable="true">Machine learning algorithms creating unique typefaces based on vast datasets of existing designs.</div>
          </div>
          <div class="graphic-element editable deletable" data-background-id="trend-graphic" data-object-id="trend-graphic" data-deletable="true" style="position: absolute; bottom: 40px; left: 20px; width: 100px; height: 5px; background-color: #ff3300; transform: rotate(-45deg);"></div>
        </div>
      `
    }
  ]
},
{
  id: 'rebel-mobile',
  name: 'Rebel',
  templates: [
    {
      id: 'cover-mobile',
      name: 'Cover',
      content: `
        <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ffff; cursor: text; }
          </style>
          <div class="background editable deletable" data-background-id="cover-background" data-object-id="cover-background" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; z-index: 1;"></div>
          <img src="/api/placeholder/375/812" alt="Cover image" id="coverImage" data-upload-target="true" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; z-index: 2; mix-blend-mode: luminosity;">
          <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 20px; left: 20px; right: 20px; font-family: 'Dela Gothic One', cursive; font-size: 48px; line-height: 0.9; color: #00ffff; z-index: 4; transform: skew(-5deg);">DAZED</div>
          <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; bottom: 200px; left: 20px; right: 20px; font-family: 'Roboto Mono', monospace; font-size: 36px; font-weight: 700; color: #fff; line-height: 1; text-transform: uppercase; z-index: 4; mix-blend-mode: difference;">The Future Is Unwritten</h1>
          <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 160px; left: 20px; right: 20px; font-family: 'Roboto Mono', monospace; font-size: 14px; color: #00ffff; text-transform: uppercase; letter-spacing: 2px; z-index: 4;">Exploring the avant-garde in fashion, art, and culture</p>
          <div class="issue-info editable deletable" contenteditable="true" data-text-id="cover-issue-info" data-object-id="cover-issue-info" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Roboto Mono', monospace; font-size: 12px; color: #fff; z-index: 4;">ISSUE 312 • SUMMER 2023 • £5.99</div>
        </div>
      `
    },
    {
      id: 'contents-mobile',
      name: 'Contents',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ffff; cursor: text; }
            .toc-item { 
              margin-bottom: 20px; 
              font-size: 14px; 
              position: relative; 
              border-bottom: 1px solid #00ffff;
              padding-bottom: 10px;
            }
            .toc-title { font-weight: bold; display: block; color: #fff; }
            .toc-page { font-weight: normal; color: #00ffff; float: right; }
          </style>
          <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Dela Gothic One', cursive; font-size: 36px; margin-bottom: 40px; text-transform: uppercase; line-height: 1; color: #00ffff; transform: skew(-5deg);">In This Issue</h1>
          <div id="tocContainer" style="margin-top: 60px;">
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The New Avant-Garde <span class="toc-page">08</span></span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Deconstructing Fashion <span class="toc-page">16</span></span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Art in the Digital Age <span class="toc-page">24</span></span>
            </div>
            <div class="toc-item">
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">Cultural Revolution <span class="toc-page">32</span></span>
            </div>
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; color: #00ffff;">03</div>
        </div>
      `
    },
    {
      id: 'feature-article-mobile',
      name: 'Feature Article',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ffff; cursor: text; }
          </style>
          <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Dela Gothic One', cursive; font-size: 36px; line-height: 1.2; margin-bottom: 20px; color: #00ffff; transform: skew(-5deg);">The Future of Fashion</h1>
          <div class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 16px; font-weight: 700; margin-bottom: 30px; color: #fff;">Deconstructing the boundaries of style</div>
          <img src="/api/placeholder/335/250" alt="Feature image" id="featureImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 250px; object-fit: cover; margin-bottom: 20px; mix-blend-mode: screen;">
          <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #fff;">
            In an era where the digital and physical realms increasingly blur, fashion stands at the forefront of a revolution. Designers are pushing boundaries, merging technology with textiles to create garments that challenge our perception of clothing.
          </div>
          <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Dela Gothic One', cursive; font-size: 24px; line-height: 1.2; padding: 20px 0; border-top: 2px solid #00ffff; border-bottom: 2px solid #00ffff; margin: 20px 0; color: #00ffff; transform: rotate(-2deg);">
            "Fashion is no longer about covering the body, but about extending it."
          </div>
          <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 14px; line-height: 1.6; color: #fff;">
            From AI-designed patterns to garments that change color based on environmental factors, the future of fashion is a playground of innovation. But as we embrace these advancements, we must also question: What does it mean to be 'dressed' in the digital age?
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="article-page-number" data-object-id="article-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; color: #00ffff;">08</div>
        </div>
      `
    },
    {
      id: 'photo-editorial-mobile',
      name: 'Photo Editorial',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ffff; cursor: text; }
          </style>
          <h1 class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="font-family: 'Dela Gothic One', cursive; font-size: 36px; color: #00ffff; margin-bottom: 20px; transform: skew(-5deg);">DIGITAL DYSTOPIA</h1>
          <div class="editorial-subtitle editable deletable" contenteditable="true" data-text-id="editorial-subtitle" data-object-id="editorial-subtitle" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 14px; color: #fff; margin-bottom: 30px; transform: skew(5deg);">A visual exploration of post-human aesthetics</div>
          <img src="/api/placeholder/335/400" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 400px; object-fit: cover; margin-bottom: 20px; mix-blend-mode: screen;">
          <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 12px; color: #00ffff; margin-bottom: 30px; transform: rotate(-1deg);">Cyborg couture: Model wears neuro-linked exoskeleton by TechnoFashion</div>
          <img src="/api/placeholder/335/300" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 300px; object-fit: cover; margin-bottom: 20px; mix-blend-mode: difference;">
          <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 12px; color: #fff; margin-bottom: 30px; transform: rotate(1deg);">Holographic overlay dress by QuantumThreads, neural implant accessories by SynapseStyle</div>
          <div class="editorial-text editable deletable" contenteditable="true" data-text-id="editorial-text" data-object-id="editorial-text" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 14px; color: #fff; line-height: 1.6; margin-top: 30px;">
            In this series, we envision a future where the line between human and machine blurs, and fashion becomes a medium for technological augmentation and self-expression in a post-human world.
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="editorial-page-number" data-object-id="editorial-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; color: #00ffff;">16</div>
        </div>
      `
    },
    {
      id: 'interview-mobile',
      name: 'Interview',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto+Mono:wght@400;700&display=swap');
          .editable:hover { outline: 2px dashed #00ffff; cursor: text; }
          .question { font-weight: 700; color: #00ffff; transform: skew(-5deg); display: inline-block; }
          .answer { color: #fff; margin-bottom: 15px; }
        </style>
        <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Dela Gothic One', cursive; font-size: 36px; line-height: 1.2; margin-bottom: 20px; color: #00ffff; transform: skew(-5deg);">VOICES OF THE FUTURE</h1>
        <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 16px; font-weight: 700; margin-bottom: 30px; color: #fff;">In conversation with cyber-artist Zoe.AI</div>
        <img src="/api/placeholder/335/200" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 200px; object-fit: cover; margin-bottom: 20px; mix-blend-mode: screen; clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%);">
        <div class="interview-text" style="font-family: 'Roboto Mono', monospace; font-size: 14px; line-height: 1.6; margin-left: 20px;">
          <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">DAZED: Your work blurs the line between human creativity and AI. How do you define your role as an artist?</div>
          <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">ZOE.AI: I see myself as a collaborator with technology, not its master. My role is to guide the AI, to infuse it with human emotion and experience. The result is a hybrid art form that challenges our understanding of creativity itself.</div>
          <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">DAZED: Can you tell us about your latest project, "Neural Dreamscapes"?</div>
          <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">ZOE.AI: "Neural Dreamscapes" is an immersive VR experience that translates human brainwaves into evolving digital landscapes. It's a journey into the subconscious, rendered in real-time by AI. Each viewer's mind creates a unique, ever-changing virtual world.</div>
        </div>
        <div class="graphic-element editable deletable" data-background-id="interview-graphic" data-object-id="interview-graphic" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 5px; height: 100%; background-color: #00ffff;"></div>
        <div class="page-number editable deletable" contenteditable="true" data-text-id="interview-page-number" data-object-id="interview-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; color: #00ffff;">24</div>
      </div>
      `
    },
    {
      id: 'trend-report-mobile',
      name: 'Trend Report',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #000; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Roboto+Mono:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #00ffff; cursor: text; }
            .trend-item { margin-bottom: 30px; position: relative; }
            .trend-name { font-family: 'Dela Gothic One', cursive; font-weight: 700; font-size: 18px; margin: 10px 0 5px; text-transform: uppercase; color: #00ffff; transform: skew(-5deg); }
            .trend-description { font-family: 'Roboto Mono', monospace; font-size: 14px; color: #fff; }
          </style>
          <h1 class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Dela Gothic One', cursive; font-size: 36px; line-height: 1.2; margin-bottom: 20px; color: #00ffff; transform: skew(-5deg);">FUTURE FORECAST</h1>
          <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Roboto Mono', monospace; font-size: 16px; font-weight: 700; margin-bottom: 30px; color: #fff;">Emerging trends reshaping culture and style</div>
          <div class="trend-grid" style="margin-left: 20px;">
            <div class="trend-item">
              <img src="/api/placeholder/315/150" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover; mix-blend-mode: screen; clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%);">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Biotech Couture</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Living, breathing garments grown from genetically modified organisms, merging fashion with biotechnology.</div>
            </div>
            <div class="trend-item" style="margin-left: -20px;">
              <img src="/api/placeholder/315/150" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover; mix-blend-mode: difference; clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%);">
              <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Neural Aesthetics</div>
              <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">AI-generated art and designs that adapt in real-time to the viewer's emotional state and brain activity.</div>
            </div>
          </div>
          <div class="trend-item" style="margin-left: 20px;">
            <img src="/api/placeholder/315/150" alt="Trend 3" id="trendImage3" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover; mix-blend-mode: exclusion; clip-path: polygon(0% 0%, 75% 0%, 100% 25%, 100% 100%, 0% 100%);">
            <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-3-name" data-object-id="trend-3-name" data-deletable="true">Quantum Fashion</div>
            <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-3-description" data-object-id="trend-3-description" data-deletable="true">Garments existing in a state of quantum superposition, changing form and color based on observation and interaction.</div>
          </div>
          <div class="graphic-element editable deletable" data-background-id="trend-graphic" data-object-id="trend-graphic" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 5px; height: 100%; background-color: #00ffff;"></div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="position: absolute; bottom: 20px; right: 20px; font-family: 'Roboto Mono', monospace; font-size: 14px; font-weight: 700; color: #00ffff;">32</div>
        </div>
      `
    }
  ]
},
{
  id: 'pattern-mobile',
  name: 'Pattern',
  templates: [
    {
      id: 'cover-mobile',
      name: 'Cover',
      content: `
        <div id="magazine-cover" style="width: 375px; height: 812px; margin: 0 auto; background-color: #f5f3e9; position: relative; overflow: hidden; font-family: 'Arial', sans-serif;">
        <style>
          @import url('https://fonts.googleapis.com/css2family=Playfair+Display:wght@700&family=Work+Sans:wght@400;700&display=swap');
          .editable:hover { outline: 2px dashed #FF6B6B; cursor: text; }
        </style>
        <div class="background-pattern editable deletable" data-background-id="cover-pattern" data-object-id="cover-pattern" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;2&quot; fill=&quot;%23FF6B6B&quot; /></svg>'); background-size: 40px 40px; opacity: 0.2;"></div>
        <img src="/api/placeholder/375/500" alt="Cover illustration" id="coverImage" data-upload-target="true" style="width: 100%; height: 500px; object-fit: cover; position: absolute; top: 50%; left: 0; transform: translateY(-50%);">
        <div class="logo editable deletable" contenteditable="true" data-text-id="cover-logo" data-object-id="cover-logo" data-deletable="true" style="position: absolute; top: 40px; left: 40px; font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: #FF6B6B; letter-spacing: 2px;">WRAP</div>
        <h1 class="headline editable deletable" contenteditable="true" data-text-id="cover-headline" data-object-id="cover-headline" data-deletable="true" style="position: absolute; top: 100px; left: 40px; right: 40px; font-family: 'Work Sans', sans-serif; font-size: 36px; font-weight: 700; color: #333; line-height: 1.2;">The Art of Illustration</h1>
        <p class="subheadline editable deletable" contenteditable="true" data-text-id="cover-subheadline" data-object-id="cover-subheadline" data-deletable="true" style="position: absolute; bottom: 100px; left: 40px; right: 40px; font-family: 'Work Sans', sans-serif; font-size: 18px; color: #666; line-height: 1.4;">Exploring the intersection of art, design, and everyday objects</p>
        <div class="issue-info editable deletable" contenteditable="true" data-text-id="cover-issue-info" data-object-id="cover-issue-info" data-deletable="true" style="position: absolute; bottom: 40px; left: 40px; font-family: 'Work Sans', sans-serif; font-size: 14px; color: #666;">ISSUE 14 • SUMMER 2023 • £10</div>
      </div>
      `
    },
    {
      id: 'contents-mobile',
      name: 'Contents',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f5f3e9; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans:wght@400;700&display=swap');
            .editable:hover { outline: 2px dashed #FF6B6B; cursor: text; }
            .toc-item { 
              margin-bottom: 20px; 
              font-size: 16px; 
              position: relative; 
              padding-left: 30px;
            }
            .toc-title { font-weight: bold; display: block; color: #333; }
            .toc-page { font-weight: normal; color: #FF6B6B; position: absolute; left: 0; top: 0; }
          </style>
          <div class="background-pattern editable deletable" data-background-id="contents-pattern" data-object-id="contents-pattern" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;50&quot; height=&quot;50&quot; fill=&quot;%23FF6B6B&quot; opacity=&quot;0.1&quot; /><rect x=&quot;50&quot; y=&quot;50&quot; width=&quot;50&quot; height=&quot;50&quot; fill=&quot;%23FF6B6B&quot; opacity=&quot;0.1&quot; /></svg>'); background-size: 20px 20px;"></div>
          <h1 id="contents" class="section-title editable deletable" contenteditable="true" data-text-id="contents-title" data-object-id="contents-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; margin-bottom: 40px; color: #333;">Contents</h1>
          <div id="tocContainer">
            <div class="toc-item">
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-1-page" data-object-id="contents-item-1-page" data-deletable="true">04</span>
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-1-title" data-object-id="contents-item-1-title" data-deletable="true">The Art of Everyday Objects</span>
            </div>
            <div class="toc-item">
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-2-page" data-object-id="contents-item-2-page" data-deletable="true">12</span>
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-2-title" data-object-id="contents-item-2-title" data-deletable="true">Illustrator Spotlight: Jane Doe</span>
            </div>
            <div class="toc-item">
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-3-page" data-object-id="contents-item-3-page" data-deletable="true">20</span>
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-3-title" data-object-id="contents-item-3-title" data-deletable="true">Patterns in Nature</span>
            </div>
            <div class="toc-item">
              <span class="toc-page editable deletable" contenteditable="true" data-text-id="contents-item-4-page" data-object-id="contents-item-4-page" data-deletable="true">28</span>
              <span class="toc-title editable deletable" contenteditable="true" data-text-id="contents-item-4-title" data-object-id="contents-item-4-title" data-deletable="true">The Future of Print</span>
            </div>
          </div>
          <div class="page-number editable deletable" contenteditable="true" data-text-id="contents-page-number" data-object-id="contents-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 700; color: #FF6B6B;">03</div>
        </div>
      `
    },
    {
      id: 'feature-article-mobile',
      name: 'Feature Article',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f5f3e9; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans:wght@400;700&display=swap');
          .editable:hover { outline: 2px dashed #FF6B6B; cursor: text; }
          .editable, .deletable { position: relative; z-index: 2; }
          img[data-upload-target="true"] { position: relative; z-index: 3; }
          .background-pattern { z-index: 1; }
        </style>
        <div class="background-pattern editable deletable" data-background-id="article-pattern" data-object-id="article-pattern" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;1&quot; fill=&quot;%23FF6B6B&quot; /></svg>'); background-size: 20px 20px; opacity: 0.1; z-index: 1;"></div>
        <h1 class="article-title editable deletable" contenteditable="true" data-text-id="article-title" data-object-id="article-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; margin-bottom: 20px; color: #333; line-height: 1.2;">The Art of Everyday Objects</h1>
        <div class="article-subtitle editable deletable" contenteditable="true" data-text-id="article-subtitle" data-object-id="article-subtitle" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 30px; color: #FF6B6B;">How illustrators are transforming the mundane into the extraordinary</div>
        <img src="/api/placeholder/335/200" alt="Feature image" id="featureImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 200px; object-fit: cover; margin-bottom: 20px;">
        <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-1" data-object-id="article-text-1" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #333;">
          In a world increasingly dominated by digital screens, a new wave of illustrators is finding beauty and inspiration in the objects that surround us daily. From teacups to telephones, these artists are reimagining the everyday, turning the ordinary into extraordinary works of art.
        </div>
        <div class="pull-quote editable deletable" contenteditable="true" data-text-id="article-pullquote" data-object-id="article-pullquote" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 24px; line-height: 1.3; padding: 20px 0; border-top: 2px solid #FF6B6B; border-bottom: 2px solid #FF6B6B; margin: 20px 0; color: #FF6B6B; text-align: center;">
          "The most mundane object can become a work of art when seen through an illustrator's eyes."
        </div>
        <div class="article-text editable deletable" contenteditable="true" data-text-id="article-text-2" data-object-id="article-text-2" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
          This movement is not just about creating beautiful images; it's about changing our perception of the world around us. By focusing their artistic lens on everyday items, these illustrators invite us to see the beauty in the banal, the extraordinary in the ordinary.
        </div>
        <div class="page-number editable deletable" contenteditable="true" data-text-id="article-page-number" data-object-id="article-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 700; color: #FF6B6B;">04</div>
      </div>
      `
    },
    {
      id: 'photo-editorial-mobile',
      name: 'Photo Editorial',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f5f3e9; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans:wght@400;700&display=swap');
          .editable:hover { outline: 2px dashed #FF6B6B; cursor: text; }
          .editable, .deletable { position: relative; z-index: 2; }
          img[data-upload-target="true"] { position: relative; z-index: 3; }
          .background-pattern { z-index: 1; }
        </style>
        <div class="background-pattern editable deletable" data-background-id="editorial-pattern" data-object-id="editorial-pattern" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><path d=&quot;M0 0L100 100M100 0L0 100&quot; stroke=&quot;%23FF6B6B&quot; stroke-width=&quot;1&quot; /></svg>'); background-size: 20px 20px; opacity: 0.1; z-index: 1;"></div>
        <h1 class="editorial-title editable deletable" contenteditable="true" data-text-id="editorial-title" data-object-id="editorial-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #333; margin-bottom: 20px;">Patterns in Nature</h1>
        <div class="editorial-subtitle editable deletable" contenteditable="true" data-text-id="editorial-subtitle" data-object-id="editorial-subtitle" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 18px; font-weight: 700; color: #FF6B6B; margin-bottom: 30px;">A visual exploration of nature's intricate designs</div>
        <img src="/api/placeholder/335/250" alt="Editorial photo 1" id="editorialImage1" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 250px; object-fit: cover; margin-bottom: 20px;">
        <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-1" data-object-id="photo-caption-1" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 14px; color: #666; margin-bottom: 30px; text-align: center;">The mesmerizing spiral patterns of a sunflower's seed head</div>
        <img src="/api/placeholder/335/250" alt="Editorial photo 2" id="editorialImage2" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 250px; object-fit: cover; margin-bottom: 20px;">
        <div class="caption editable deletable" contenteditable="true" data-text-id="photo-caption-2" data-object-id="photo-caption-2" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 14px; color: #666; margin-bottom: 30px; text-align: center;">Intricate veins of a leaf reveal nature's complex network</div>
        <div class="editorial-text editable deletable" contenteditable="true" data-text-id="editorial-text" data-object-id="editorial-text" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">
          Nature is the ultimate artist, creating intricate patterns and designs that have inspired human creativity for millennia. In this photo series, we explore the hidden geometries and mesmerizing structures found in the natural world, revealing the art that exists all around us.
        </div>
        <div class="page-number editable deletable" contenteditable="true" data-text-id="editorial-page-number" data-object-id="editorial-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 700; color: #FF6B6B;">20</div>
      </div>
      `
    },
    {
      id: 'interview-mobile',
      name: 'Interview',
      content: `
      <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f5f3e9; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans:wght@400;700&display=swap');
          .editable:hover { outline: 2px dashed #FF6B6B; cursor: text; }
          .editable, .deletable { position: relative; z-index: 2; }
          img[data-upload-target="true"] { position: relative; z-index: 3; }
          .background-pattern { z-index: 1; }
          .question { font-weight: 700; color: #FF6B6B; margin-top: 15px; }
          .answer { margin-bottom: 15px; }
        </style>
        <div class="background-pattern editable deletable" data-background-id="interview-pattern" data-object-id="interview-pattern" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><path d=&quot;M0 0L100 100M100 0L0 100&quot; stroke=&quot;%23FF6B6B&quot; stroke-width=&quot;1&quot; /></svg>'); background-size: 20px 20px; opacity: 0.1;"></div>
        <h1 class="interview-title editable deletable" contenteditable="true" data-text-id="interview-title" data-object-id="interview-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; margin-bottom: 20px; color: #333;">The Art of Illustration</h1>
        <div class="interview-subtitle editable deletable" contenteditable="true" data-text-id="interview-subtitle" data-object-id="interview-subtitle" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 30px; color: #FF6B6B;">A conversation with renowned illustrator Jane Smith</div>
        <img src="/api/placeholder/335/200" alt="Interviewee portrait" id="interviewImage" data-upload-target="true" style="width: calc(100% + 40px); margin-left: -20px; height: 200px; object-fit: cover; margin-bottom: 20px;">
        <div class="interview-text" style="font-family: 'Work Sans', sans-serif; font-size: 16px; line-height: 1.6;">
          <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-1" data-object-id="interview-question-1" data-deletable="true">WRAP: How would you describe your illustration style?</div>
          <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-1" data-object-id="interview-answer-1" data-deletable="true">JANE: I'd say my style is a blend of whimsical and geometric. I love playing with bold colors and patterns, but always with a touch of hand-drawn imperfection to keep things organic and relatable.</div>
          <div class="question editable deletable" contenteditable="true" data-text-id="interview-question-2" data-object-id="interview-question-2" data-deletable="true">WRAP: What inspires your work?</div>
          <div class="answer editable deletable" contenteditable="true" data-text-id="interview-answer-2" data-object-id="interview-answer-2" data-deletable="true">JANE: Everyday objects and nature are my biggest inspirations. I find beauty in the simplest things – a well-designed chair, the pattern on a leaf, or the way light falls on a building. It's about finding the extraordinary in the ordinary.</div>
        </div>
        <div class="pull-quote editable deletable" contenteditable="true" data-text-id="interview-pullquote" data-object-id="interview-pullquote" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 24px; line-height: 1.3; padding: 20px 0; border-top: 2px solid #FF6B6B; border-bottom: 2px solid #FF6B6B; margin: 20px 0; color: #FF6B6B; text-align: center;">
          "Illustration is about telling stories without words."
        </div>
        <div class="page-number editable deletable" contenteditable="true" data-text-id="interview-page-number" data-object-id="interview-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 700; color: #FF6B6B;">12</div>
      </div>
      `
    },
    {
      id: 'trend-report-mobile',
      name: 'Trend Report',
      content: `
        <div id="magazine-page" style="width: 375px; min-height: 812px; margin: 0 auto; background-color: #f5f3e9; position: relative; overflow: hidden; padding: 40px 20px; box-sizing: border-box; font-family: 'Arial', sans-serif;">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Work+Sans:wght@400;700&display=swap');
          .editable:hover { outline: 2px dashed #FF6B6B; cursor: text; }
          .editable, .deletable { position: relative; z-index: 2; }
          img[data-upload-target="true"] { position: relative; z-index: 3; }
          .background-pattern { z-index: 1; }
          .trend-item { margin-bottom: 30px; }
          .trend-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; margin: 10px 0 5px; color: #FF6B6B; }
          .trend-description { font-family: 'Work Sans', sans-serif; font-size: 16px; color: #333; }
        </style>
        <div class="background-pattern editable deletable" data-background-id="trend-pattern" data-object-id="trend-pattern" data-deletable="true" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;100&quot; height=&quot;100&quot;><rect x=&quot;0&quot; y=&quot;0&quot; width=&quot;50&quot; height=&quot;50&quot; fill=&quot;%23FF6B6B&quot; opacity=&quot;0.1&quot; /><rect x=&quot;50&quot; y=&quot;50&quot; width=&quot;50&quot; height=&quot;50&quot; fill=&quot;%23FF6B6B&quot; opacity=&quot;0.1&quot; /></svg>'); background-size: 20px 20px;"></div>
        <h1 class="trend-title editable deletable" contenteditable="true" data-text-id="trend-title" data-object-id="trend-title" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; margin-bottom: 20px; color: #333;">Illustration Trends</h1>
        <div class="trend-subtitle editable deletable" contenteditable="true" data-text-id="trend-subtitle" data-object-id="trend-subtitle" data-deletable="true" style="font-family: 'Work Sans', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 30px; color: #FF6B6B;">What's shaping the world of illustration in 2023</div>
        <div class="trend-grid">
          <div class="trend-item">
            <img src="/api/placeholder/335/150" alt="Trend 1" id="trendImage1" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
            <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-1-name" data-object-id="trend-1-name" data-deletable="true">Maximalist Patterns</div>
            <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-1-description" data-object-id="trend-1-description" data-deletable="true">Bold, intricate patterns that celebrate complexity and visual abundance.</div>
          </div>
          <div class="trend-item">
            <img src="/api/placeholder/335/150" alt="Trend 2" id="trendImage2" data-upload-target="true" style="width: 100%; height: 150px; object-fit: cover;">
            <div class="trend-name editable deletable" contenteditable="true" data-text-id="trend-2-name" data-object-id="trend-2-name" data-deletable="true">Nostalgic Tech</div>
            <div class="trend-description editable deletable" contenteditable="true" data-text-id="trend-2-description" data-object-id="trend-2-description" data-deletable="true">Retro-futuristic illustrations that blend old and new technological aesthetics.</div>
          </div>
        </div>
        <div class="trend-quote editable deletable" contenteditable="true" data-text-id="trend-quote" data-object-id="trend-quote" data-deletable="true" style="font-family: 'Playfair Display', serif; font-size: 24px; line-height: 1.3; padding: 20px 0; border-top: 2px solid #FF6B6B; border-bottom: 2px solid #FF6B6B; margin: 20px 0; color: #FF6B6B; text-align: center;">
          "Illustration is not just about creating images, it's about crafting visual experiences."
        </div>
        <div class="page-number editable deletable" contenteditable="true" data-text-id="trend-page-number" data-object-id="trend-page-number" data-deletable="true" style="position: absolute; bottom: 20px; left: 20px; font-family: 'Work Sans', sans-serif; font-size: 14px; font-weight: 700; color: #FF6B6B;">28</div>
      </div>
      `
    }
  ]
}
];