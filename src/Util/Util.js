class Util {
    static ipport(string) {
        let split = string.split(':');
        split[1] = parseInt(split[1]);
        return split;
    }
}

module.exports = Util;