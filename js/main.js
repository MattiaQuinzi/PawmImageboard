import ImageBoard from "./imageboard.js";
import Item from "./item.js";

const imageboard = new ImageBoard();

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete")
    {
        initApp();
    }
});

const initApp = () => {
    const itemEntryForm = document.getElementById("imgform");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processInput();
    });

    refresh();
};

const refresh = () => {
    clearBoardDisplay();
    renderBoard();
};

const clearBoardDisplay = () => {
    const parentElement = document.getElementById("imageboard");
    deleteContents(parentElement);
    clearTextbox();
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child)
    {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderBoard = () => {
    const board = imageboard.getBoard();
    board.forEach(item => {
        buildBoardItem(item);
    });
};

const buildBoardItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";

    const img = document.createElement("img");
    img.src = item.getUrl();
    img.id = item.getId();

    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getTags();

    div.appendChild(img);
    div.appendChild(label);

    const board = document.getElementById("imageboard");
    board.appendChild(div);
};

const clearTextbox = () => {
    document.getElementById("urlInput").value = "";
    document.getElementById("tagsInput").value = "";
};

const processInput = () => {
    const newUrl = getNewUrl();
    const newTags = getNewTags();
    if(!newUrl.length) return;
    const nextItemId = getNextItemId();
    const newItem = createNewItem(nextItemId, newUrl, newTags);
    imageboard.addItemToBoard(newItem);
    refresh();
};

const getNewUrl = () => {
    return document.getElementById("urlInput").value.trim();
};

const getNewTags = () => {
    return document.getElementById("tagsInput").value.trim();
};

const getNextItemId = () => {
    let nextItemId = 1;
    const board = imageboard.getBoard();
    if(board.length > 0)
    {
        nextItemId = board[board.length -1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (id, url, tags) => {
    const item = new Item();
    item.setId(id);
    item.setUrl(url);
    item.setTags(tags);
    return item;
};

//1.27.30