/**
 * Created by saidesun on 17/10/17.
 */
const fs = require('fs');
const getData = require('./func');
const data = getData.getFile('./input'); // 数据地址
const stringify = require('csv-stringify');

const savePath = './output'; // 处理后保存地址

if (data) {
    const names = Array.from(new Set(data.names));
    const all = data.sourceArr.length;
    const distinct = names.length;
    const output = [];
    names.forEach(name => {
        for (let i = 0; i < data.sourceArr.length; i++) {
            if (data.sourceArr[i].name.trim() === name) {
                output.push([data.sourceArr[i].name.trim(), data.sourceArr[i].sex, data.sourceArr[i].note])
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
                console.log(`操作成功!总数据:${all}条, 去重后数据${distinct}条, 重复数据${all - distinct}条 请在output文件夹下查看结果`)
            })
        }
    });
}




