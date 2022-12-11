class DateTime {
    static unix() {
        return Math.floor(Date.now() / 1000);
    }

    static day() {
        return Math.floor(Date.now() / 1000 / 60 / 60 / 24);
    }
}

module.exports = DateTime;