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

    loadSavedItems();
    refresh();
};

const loadSavedItems = () => {
    const localItems = localStorage.getItem("localItems");
    if(typeof localItems !== "string") return;

    const parsedItems = JSON.parse(localItems);
    parsedItems.forEach(item => {
        const newItem = createNewItem(item._id, item._url, item._tags);
        imageboard.addItemToBoard(newItem);
    });

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
    label.id = item.getId();

    const button = document.createElement("button");
    button.id = item.getId();
    button.value = "-";
    button.className = "button";
    addListenerToImgButton(button);
    
    div.appendChild(img);
    div.appendChild(label);
    div.appendChild(button);

    const board = document.getElementById("imageboard");
    board.appendChild(div);
    /*if(item.getId()%2==0)
    {
        const br = document.createElement("br");
        board.appendChild(br);
    }*/
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
    updateSavedItems(imageboard.getBoard());
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

const updateSavedItems = (savedItems) => {
    localStorage.setItem("localItems", JSON.stringify(savedItems));
};

const addListenerToImgButton = (button) => {
    button.addEventListener("click", (event) => {
        const confirmed = confirm("You are about to delete an image, proceed?");
        
        if(!confirmed) return;
        
        imageboard.removeItemFromBoard(button.id);
        updateSavedItems();
        refresh();
    });
};