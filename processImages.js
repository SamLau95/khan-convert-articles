import toMarkdown from './toMarkdown';

const processImages = ($, $elem, sectionJSON) => {
    if ($('img', $elem).get().length === 0) return;

    // Index of widgets are scoped to a section
    let imageIndex = 1;
    const snowman = (tag) => `[[☃ ${tag}]]`;

    // Convert inline images
    const $inlineImages = $('.inline-image', $elem);
    $inlineImages.each((_, inlineImage) => {
        const imageTag = `image ${imageIndex}`;

        $(inlineImage).replaceWith(snowman(imageTag));
        imageIndex++;

        const imageSrc = $('img', inlineImage).attr('src');
        const imageAlt = $('img', inlineImage).attr('alt');
        let imageCaption = "";
        if ($('.image-caption', inlineImage).length) {
            imageCaption = $('.image-caption', inlineImage).html()
        }

        sectionJSON.widgets[imageTag] = {
            "type": "image",
            "alignment": "float-left",
            "options": {
                "backgroundImage": {
                    "url": imageSrc
                },
                "alt": imageAlt,
                "caption": toMarkdown(imageCaption),
            }
        }
    });

    // Convert block images
    const $blockImages = $('.block-image', $elem);
    $blockImages.each((_, blockImage) => {
        const imageTag = `image ${imageIndex}`;

        $(blockImage).replaceWith(snowman(imageTag));
        imageIndex++;

        const imageSrc = $('img', blockImage).attr('src');
        const imageAlt = $('img', blockImage).attr('alt');
        let imageCaption = "";
        if ($('.image-caption', blockImage).length) {
            imageCaption = $('.image-caption', blockImage).html()
        }

        sectionJSON.widgets[imageTag] = {
            "type": "image",
            "alignment": "block",
            "options": {
                "backgroundImage": {
                    "url": imageSrc
                },
                "alt": imageAlt,
                "caption": toMarkdown(imageCaption),
            }
        }
    });

    // Convert plain img tags
    const $leftoverImages = $('img', $elem);
    $leftoverImages.each((_, image) => {
        const imageTag = `image ${imageIndex}`;

        const $image = $(image);
        $image.replaceWith(snowman(imageTag));
        imageIndex++;

        const imageSrc = $image.attr('src');
        const imageAlt = $image.attr('alt');

        sectionJSON.widgets[imageTag] = {
            "type": "image",
            "alignment": "block",
            "options": {
                "backgroundImage": {
                    "url": imageSrc
                },
                "alt": imageAlt,
                "caption": "",
            }
        }
    });

    // console.log(sectionJSON);
};

export default processImages;
