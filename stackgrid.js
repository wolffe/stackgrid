const stackGridResizeCards = () => {
    const element = document.querySelector(".stack-container");
    const cards = element.querySelectorAll(".stack-card");
    const totalCards = cards.length;
    const containerWidth = element.offsetWidth;
    const maxWidth = parseInt(element.getAttribute("max-width"), 10);
    const gutter = parseInt(element.getAttribute("gutter"), 10);

    let minWidth = parseInt(element.getAttribute("min-width"), 10);

    if (containerWidth < minWidth) {
        minWidth = containerWidth;
    }
    let columns = Math.floor(containerWidth / minWidth);

    if (totalCards < columns) {
        columns = totalCards;
    }

    const gutters = (columns + 1) * gutter;

    let cardWidth = (containerWidth - gutters) / columns;
    if (cardWidth > maxWidth) {
        cardWidth = maxWidth;
    }

    cards.forEach((card) => {
        card.style.width = `${cardWidth}px`;
    });

    stackGridPositionCards(cards, columns, gutter);

    // Make sure the parent stretch container updates its height to contain all cards
    // Find the bottom position of the last card
    let lastCardBottom = 0;
    cards.forEach((card) => {
        const cardBottom = card.offsetTop + card.offsetHeight;
        if (cardBottom > lastCardBottom) {
            lastCardBottom = cardBottom;
        }
    });

    // Set the height of the stretch-container element
    element.style.height = `${lastCardBottom}px`;
};

const stackGridPositionCards = (cards, columns, gutter) => {
    const cardsList = [];

    // Update the positions of all cards at once
    cards.forEach((card, i) => {
        const column = i % columns;
        const left_position = gutter * (column + 1) + column * card.offsetWidth;
        let top_position = 0;
        if (cardsList[column]) {
            top_position =
                cardsList[column][0].offsetTop +
                cardsList[column][0].offsetHeight +
                gutter;
        }
        card.style.top = `${top_position}px`;
        card.style.left = `${left_position}px`;
        cardsList[column] = [card];
    });
};

const stackGridWatchForResize = () => {
    const element = document.querySelector(".stack-container");
    const cards = element.querySelectorAll(".stack-card");
    const minWidth = parseInt(element.getAttribute("min-width"), 10);
    const gutter = parseInt(element.getAttribute("gutter"), 10);
    const containerWidth = element.offsetWidth;
    const totalWidth = minWidth * cards.length + gutter * (cards.length - 1);

    if (totalWidth !== containerWidth) {
        stackGridResizeCards();
    }
};

setInterval(stackGridWatchForResize, 500);
