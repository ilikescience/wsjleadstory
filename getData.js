const fetch = require('node-fetch');
var fs = require('fs');

const url = 'http://int.prod.frontpage-api.virginia.dj01.onservo.com/lists?id=FP_US_TOPPER_1&id=FP_US_TOPPER_PACKAGE_1&id=FP_US_TOPPER_2&id=FP_US_BREAKING_NEWS&id=FP_US_LEAD_1&id=FP_US_LEAD_2&id=FP_US_OPINION&id=FP_US_FEATURE_STRIP&id=FP_US_FEATURE_A_1&id=FP_US_FEATURE_A_2&id=FP_US_FEATURE_B_1&id=FP_US_FEATURE_B_2&id=FP_US_FEATURE_BELOW_A_1&id=FP_US_FEATURE_C_1&id=FP_US_FEATURE_C_2&id=FP_US_LIFE&id=FP_US_ARTS&id=FP_JOURNAL_REPORTS&id=FP_BUCKET_REAL_ESTATE&id=FP_BUCKET_WORLD&id=FP_BUCKET_POLITICS&id=FP_BUCKET_US&id=FP_BUCKET_TECH&id=FP_BUCKET_BUSINESS&id=FP_BUCKET_MARKETS&id=FP_BUCKET_MW&id=FP_BUCKET_MG&id=FP_BUCKET_SPORTS&id=FP_NEWSLETTER_10_POINT&id=FP_NEWSLETTER_CAPITAL_JOURNAL&id=FP_POPULAR_ON_WSJ&id=FP_US_EDITORS_PICKS_VIDEOS&id=FP_MOST_POPULAR_VIDEOS&id=FP_BUCKET_CMO&id=FP_BUCKET_CIO&id=FP_BUCKET_CFO';

fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
        const articles = {
            news: [],
            opinion: [],
            life: [],
            magazine: [],
            categories: {}
        };
        json.forEach( (item) => {
            if (item.articles.length > 0) {
                item.articles.forEach((article) => {
                    let thisFlashline = '';
                    let thisImage = '';
                    let thisAvatar = '';
                    let thisSection = article.articleSection;
                    if (article.hasOwnProperty('flashline') && article.flashline) {
                        thisFlashline =  article.flashline.flashline;
                    };
                    if (article.hasOwnProperty('image') && 
                        article.image && 
                        article.image.widths &&
                        article.image.widths['620']) {
                        thisImage = article.image.widths['620'].url;
                    }
                    if (article.hasOwnProperty('authors') && article.authors[0].hasOwnProperty('hedcutImage')) {
                        thisAvatar = article.authors[0].hedcutImage;
                    }
                    const thisArticle = { 
                        id: article.articleId,
                        title: article.headline,
                        summary: article.summary,
                        image: thisImage,
                        byline: article.byline,
                        flashline: thisFlashline,
                        storyType: article.articleSection,
                        avatar: thisAvatar,
                        timestamp: article.timestamp
                    }
                    if (thisArticle.storyType === 'Life' || 
                        thisArticle.storyType === 'Arts' ||
                        thisArticle.storyType === 'Homes' ||
                        thisArticle.storyType === 'Real Estate' ||
                        thisArticle.storyType === 'Slideshow' ) {
                        thisArticle.storyType = 'Life';
                        articles.life.push(thisArticle);
                    } 
                    else if (thisArticle.storyType === 'Opinion')
                        articles.opinion.push(thisArticle)
                    else if (thisArticle.storyType ==='Magazine')
                        articles.magazine.push(thisArticle)
                    else if(thisArticle.storyType !== 'Decos and Corrections' || thisArticle.storyType !=='Slideshow') {
                        thisArticle.storyType = 'News';
                        articles.news.push(thisArticle);
                    }
                    if (articles.categories.hasOwnProperty(thisSection))
                        articles.categories[thisSection].push(thisArticle);
                    else {
                        articles.categories[thisSection] = [];
                        articles.categories[thisSection].push(thisArticle);
                    }
                })
            }
        })
    const writeableJson = JSON.stringify(articles);
    fs.writeFile('data.json', writeableJson, 'utf8', () => {
        console.log('json written');
    });
    });