const stories = [
    {
        flashline: 'Market Report',
        headline: 'An Edgier Take on Romantic Cool Looks',
        excerpt: 'This spring brings a new wave of edgy leather and boldly patterned styles',
        byline: 'Photography by Quentin de Briey; Styling by Vittoria Cerciello',
        photo: 'images/1.jpg',
        caption: 'Loewe dress, Hue leggings, Albertus Swanepoel Hat and Laura Lombardi Earings.'
    },
    {
        flashline: 'On the Cover',
        headline: 'How Jessica Chastain Is Changing the Hollywood Game',
        excerpt: 'In Aaron Sorkin’s directorial debut, Chastain tackles a challenging role—one that’s helping to redefine the rules for women',
        byline: 'By Leslie Bennetts',
        photo: 'images/2.jpg',
        caption: '“We need to look at ourselves and say, ‘What can we do to move the needle in a positive direction?’ ” says Chastain, who was nominated for a Golden Globe for her role in Molly’s Game. “Because being normalized to inequality isn’t good enough anymore.” Chloé jacket and belt, $2,895, chloe.com.'
    },
    {
        flashline: 'Design',
        headline: 'Inside Beats President Luke Wood’s John Lautner-Designed L.A. Home',
        excerpt: 'One of Lautner’s masterworks was left unfinished until Wood and his wife decided to realize his plan—and update it for the 21st century',
        byline: 'By Christina Binkley',
        photo: 'images/3.jpg',
        caption: 'The ceiling in the guesthouse is cedar with Douglas fir beams and was restored from Lautner’s original design. Photo: Magnus Mårding for WSJ. Magazine'
    }
];

const loadStory = (index) => {
    const mainStory = stories[index];
    const secondaryStories = [stories[(index + 1) % 3], stories[(index + 2) % 3]];

    updateImage(mainStory.photo, mainStory.caption);
    setTimeout(() => {
        updatePrimaryText(mainStory);
        updateSecondaryText(secondaryStories);
        const progressIndicator = document.querySelector('.slideshow--progress');
        setTimeout(() => {
            progressIndicator.classList.toggle('transition');
        }, 610);
    }, 610);
}

const updateImage = (url, captionText) => {
    const image = document.querySelector('.slideshow--image img');
    const captionHolder = document.querySelector('.slideshow--image-caption');
    image.classList.remove('fadeIn');
    captionHolder.classList.remove('fadeIn');
    setTimeout(() => {
        image.setAttribute('src', url);
        image.classList.add('fadeIn');
        captionHolder.classList.add('fadeIn');
        captionHolder.innerHTML = captionText;
    }, 710);
}

const updatePrimaryText = (text) => {
    const textHolder = document.querySelector('.slideshow--items-main');
    textHolder.innerHTML = `
        <div class="t--family-sans t--weight-light t--size-xs t--transform-uppercase t--kering-m">${text.flashline}</div>
        <div class="t--family-condensed t--weight-light t--size-xl t--transform-uppercase l--margin-bottom-m">${text.headline}</div>
        <div class="divider--large l--margin-bottom-m">
            <div class="slideshow--progress"></div>
        </div>
        <div class="t--family-serif t--weight-light t--size-m l--margin-bottom-l t--color-nickel">${text.excerpt}</div>
        <div class="t--size-xs t--weight-light t--transform-uppercase t--kering-m t--color-nickel">${text.byline}</div>
    `;
}

const updateSecondaryText = (text) => {
    const textHolder = document.querySelector('.slideshow--items-secondary');
    textHolder.innerHTML = '';
    for (const story of text) {
        const storyHTML = `
            <div class="slideshow--item">
                <div class="t--family-sans t--size-xs t--weight-light t--transform-uppercase t--kering-m l--margin-bottom-s">${story.flashline}</div>
                <div class="t--family-condensed t--size-l">${story.headline}</div>
            </div>
        `;
        textHolder.insertAdjacentHTML('beforeend', storyHTML);
    }
}

loadStory(0);

let count = 1;
setInterval(() => {
    loadStory(count % 3);
    count++;
}, 12000);
