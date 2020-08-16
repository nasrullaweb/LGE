class Storage {
    set (key, value) {
        return localStorage.setItem(key, value)
    }
    get (key) {
        return localStorage.getItem(key)
    }
    remove (key) {
        return localStorage.removeItem(key)
    }
    clearStorage () {
        return localStorage.clear()
    }
}

export default Storage