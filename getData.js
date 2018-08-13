const fetch = require('node-fetch');
var fs = require('fs');

const url = 'http://int.prod.frontpage-api.virginia.dj01.onservo.com/lists?id=FP_US_TOPPER_1&id=FP_US_TOPPER_PACKAGE_1&id=FP_US_TOPPER_2&id=FP_US_LEAD_1&id=FP_US_LEAD_2&id=FP_US_OPINION&id=FP_US_FEATURE_STRIP&id=FP_US_FEATURE_A_1&id=FP_US_FEATURE_A_2&id=FP_US_FEATURE_B_1&id=FP_US_FEATURE_B_2&id=FP_US_FEATURE_BELOW_A_1&id=FP_US_FEATURE_C_1&id=FP_US_FEATURE_C_2&id=FP_US_LIFE&id=FP_US_ARTS&id=FP_JOURNAL_REPORTS&id=FP_BUCKET_REAL_ESTATE&id=FP_BUCKET_WORLD&id=FP_BUCKET_POLITICS&id=FP_BUCKET_US&id=FP_BUCKET_TECH&id=FP_BUCKET_BUSINESS&id=FP_BUCKET_MARKETS&id=FP_BUCKET_MW&id=FP_BUCKET_MG&id=FP_BUCKET_SPORTS&id=FP_NEWSLETTER_10_POINT&id=FP_NEWSLETTER_CAPITAL_JOURNAL&id=FP_POPULAR_ON_WSJ&id=FP_US_EDITORS_PICKS_VIDEOS&id=FP_MOST_POPULAR_VIDEOS&id=FP_BUCKET_CMO&id=FP_BUCKET_CIO&id=FP_BUCKET_CFO';

fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
        const data = {articles: []};
        json.forEach( (item) => {
            if (item.articles.length > 0) {
                item.articles.forEach((article) => {
                    const thisArticle = { 
                        id: article.articleId,
                        title: article.headline,
                        summary: article.summary,
                        media: false,
                        byline: article.byline,
                        flashline: article.hasOwnProperty('flashline') && article.flashline ? article.flashline.flashline : '',
                        category: article.articleSection,
                        storyType: article.articleSection,
                        avatar: false,
                        timestamp: article.timestamp,
                        bullets: []
                    }
                    if (article.hasOwnProperty('arthurV2Image')) {
                        thisArticle.media = article.arthurV2Image.location;
                    } else if (article.hasOwnProperty('image') && 
                        article.image && 
                        article.image.widths &&
                        article.image.widths['620']) {
                        thisArticle.media = article.image.widths['620'].url;
                    }
                    if (article.hasOwnProperty('authors') && article.authors[0].hasOwnProperty('hedcutImage')) {
                        thisArticle.avatar = article.authors[0].hedcutImage;
                    }
                    if (article.articleSection === 'Life' || 
                        article.articleSection === 'Arts' ||
                        article.articleSection === 'Homes' ||
                        article.articleSection === 'Real Estate' ||
                        article.articleSection === 'Slideshow' ) {
                        thisArticle.storyType = 'Life';
                    } else if(article.articleSection === 'Decos and Corrections' ||
                        article.articleSection === 'Opinion' ||
                        article.articleSection === '') {
                        // skip these
                    }
                    else {
                        thisArticle.storyType = 'News'
                    }

                    if (article.hasOwnProperty('bullets')) {
                        for (const item of article.bullets) {
                            if (item.html[1].children.length > 0 && item.html[1].children[0].hasOwnProperty('text')) {
                                thisArticle.bullets.push(
                                    {
                                        title: item.html[1].children[0].text,
                                        type: item.hasOwnProperty('iconType') ? item.iconType : 'story'
                                    }
                                )
                            }
                        }
                    }
                    data.articles.push(thisArticle);
                })
            }
        })
        const writeableJson = JSON.stringify(data);
        fs.writeFile('data.json', writeableJson, 'utf8', () => {
            console.log('json written');
        });
    });