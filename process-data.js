const fs = require('fs');
const readline = require('readline');


const folder = './data/';
const data = {}

fs.readdir(folder, async (err, files) => {
    for await (const file of files) {
        console.log(`Processing ${file}`);
        const fileStream = fs.createReadStream(`${folder}${file}`);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
            const [name, className, ...levelsInfo] = line.split(';')
            data[name] = data[name] || {}
            data[name].className = className
            data[name].levels = data[name].levels || {}

            for (const levelInfo of levelsInfo) {
                const [level, time] = levelInfo.split('-')
                if (data[name].levels[level]) {
                    data[name].levels[level] = Math.min(data[name].levels[level], time)
                } else {
                    data[name].levels[level] = time
                }
            }
        }
    }
    for await (const name of Object.keys(data)) {
        let maxLevel = 60;
        for (const level of Object.keys(data[name].levels)) {
            maxLevel = Math.max(maxLevel, level)
        }
        if(maxLevel <= 60) {
            delete data[name]
        }
    }
    const writeStream = fs.createWriteStream("data.js");
    writeStream.once('open', function(fd) {
        writeStream.write("const graphData = ");
        writeStream.write(JSON.stringify(data));
        writeStream.end();
    });
    console.log('done')
});
