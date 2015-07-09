'use strict'

import cheerio from 'cheerio';
import fs      from 'fs';

import processImages from './processImages';
import toMarkdown    from './toMarkdown';

const convert = (baseFileName) => {
    const inFileName = `${baseFileName}.html`;
    const outFileName = `${baseFileName}.json`;

    const articleHtml = fs.readFileSync(inFileName, {encoding: 'utf-8'});
    const $ = cheerio.load(articleHtml);

    const convertSectionToPerseus = (_, elem) => {
        const $elem = $(elem);

        const sectionJSON = {
            "content": "",
            "images": {},
            "widgets": {}
        };

        processImages($, $elem, sectionJSON);
        // processVideos($elem, sectionJSON);

        sectionJSON.content = toMarkdown($.html($elem));
        return sectionJSON;
    };

    const perseusJSON = $.root().children()
                         .map(convertSectionToPerseus)
                         .get();

    fs.writeFileSync(outFileName, JSON.stringify(perseusJSON, null, 4));
}

// const articles = ['sampled_articles/0',
//                   'sampled_articles/1',
//                   'sampled_articles/2',
//                   'sampled_articles/3',
//                   'sampled_articles/4',
//                   'sampled_articles/5',
//                   'sampled_articles/6',
//                   'sampled_articles/7',
//                   'sampled_articles/8',
//                   'sampled_articles/9']

const articles = ['articles/code',
                  'articles/images',
                  'articles/math',
                  'articles/text',
                  'articles/video']
articles.forEach(convert)

export default convert;
