import toMarkdownBase from 'to-markdown';

// Handles math code tags and loose spans correctly
const toMarkdown = (htmlString) => {
    return toMarkdownBase(htmlString, {
        converters: [{
            filter: (node) => node.nodeName === 'CODE' && node.className === 'latex',
            replacement: (content) => `$ ${content} $`
        },
        {
            filter: 'span',
            replacement: (content) => content
        },
        {
            filter: 'style',
            replacement: (content) => ""
        }],

        gfm: true
    });
};

export default toMarkdown;
