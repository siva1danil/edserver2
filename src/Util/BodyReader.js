class BodyReader {
    static async read(req, encoding = 'buffer') {
        let buffer = await new Promise((resolve, reject) => {
            let data = [];
            req.on('data', buffer => data.push(buffer));
            req.on('end', () => resolve(Buffer.concat(data)));
            req.on('error', error => reject(error));
        });
        if(encoding == 'buffer') return buffer;
        else if(encoding == 'json') return JSON.parse(buffer.toString());
    }
}

module.exports = BodyReader;