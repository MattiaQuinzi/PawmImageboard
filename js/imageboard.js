export default class ImageBoard
{
    constructor()
    {
        this._board = [];
    }

    getList()
    {
        return this._board;
    }

    clearList()
    {
        this._board = [];
    }

    addItemToBoard(item)
    {
        this._board.push(item);
    }

    removeItemToBoard(id)
    {
        const board = this._board;
        for(let i=0; i<board.length;i++)
        {
            if(list[i]._id == id)
            {
                list.splice(i, 1);
                break;
            }
        }
    }
}