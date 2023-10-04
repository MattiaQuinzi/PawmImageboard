export default class ImageBoard
{
    constructor()
    {
        this._board = [];
    }

    getBoard()
    {
        return this._board;
    }

    clearBoard()
    {
        this._board = [];
    }

    addItemToBoard(item)
    {
        this._board.push(item);
    }

    removeItemFromBoard(id)
    {
        const board = this._board;
        for(let i=0; i<board.length;i++)
        {
            if(board[i]._id == id)
            {
                board.splice(i, 1);
                break;
            }
        }
    }
}