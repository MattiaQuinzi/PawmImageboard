import ImageBoard from "./imageboard";
import Item from "*./item.js"

const ImageBoard = new ImageBoard();

document.addEventListener("readystatechange"), (event) => {
    if(event.target.readyState === "complete")
    {
        initApp();
    }
};

const initApp = () => {
    refresh();
}

const refresh = () => {
    clearBoardDisplay();
    
}