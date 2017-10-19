/**
 * Created by saidesun on 17/10/17.
 */
const fs = require('fs');
exports.getFile = (dirname) => {
    const data = [], source = [], names = [], sourceObj = [];
    // 遍历文件夹,得到文件名的数组
    const dir = fs.readdirSync(dirname);

    dir && dir.length > 0 && dir.forEach(item => {
        // 去除隐藏文件夹
        if (! /^\./.test(item)) {
            data.push(fs.readFileSync(`${dirname}/${item}`, 'utf-8'))
        }
    });

    data.length > 0 && data.forEach(item => {
        source.push(item.split(/\r?\n/).filter(Boolean))
    });

    source.forEach(item => {
        item.forEach(i => {
            const arr = i.split(',');
            names.push(arr[0].trim());
            sourceObj.push({name: arr[0], sex: arr[1], note: arr[2]})
        })
    });

    return {names, sourceObj}

};