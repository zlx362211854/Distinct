/**
 * Created by saidesun on 17/10/17.
 */
const fs = require('fs');
var getData = require('./func');
const data = getData.getFile('./input'); // 数据地址
var stringify = require('csv-stringify');
const savePath = './output'; // 处理后保存地址

if (data) {
    const names = Array.from(new Set(data.names));
    const output = [];
    names.forEach(name => {
        for (let i = 0; i < data.sourceObj.length; i++) {
            if (data.sourceObj[i].name.trim() === name) {
                output.push([data.sourceObj[i].name.trim(), data.sourceObj[i].sex, data.sourceObj[i].note])
                break;
            }
        }
    });
// 数组转csv
    stringify(output, (err, out) => {
        if (out) {
            // 创建文件夹
            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath);
            }
            // 保存文件
            fs.writeFile(`${savePath}/data.csv`, out, 'utf-8', (err) => {
                if (err) {
                    console.log('操作失败!')
                    return
                }
                console.log('操作成功! 请在output文件夹下查看结果')
            })
        }
    });
}




