const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const url = 'https://www.ckom.com';

axios(url)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];
    $('.title', html).each(function () {
      const title = $(this).text();
      const scrapedUrl = $(this).find('a').attr('href');
      articles.push({
        title,
        scrapedUrl,
      });
    });
    console.log(articles);
  })
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
