export default class Item
{
    constructor()
    {
        this._id = null;
        this._url = null;
        this._tags = null;
    }

    getId()
    {
        return this._id;
    }

    setId(id)
    {
        this._id = id;
    }

    getUrl()
    {
        return this._url;
    }

    setUrl(url)
    {
        this._url = url;
    }

    getTags()
    {
        return this._tags;
    }

    setTags()
    {
        this._tags = tags;
    }
}