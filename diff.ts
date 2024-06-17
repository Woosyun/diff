import * as fs from 'fs';

enum modification_type {
    ADD,
    DELETE,
    MOVE
}

function read_file (file_path: string): Promise<string[]>{
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err: any, data: any) => {
            if (err) {
                console.error(err);
                return;
            }
            const lines = data.split('\n');
            resolve(lines);
        })
    })
}

//longest common continuous subsequence
function lccs (file1: string[], file2: string[], memo: number[]) {
    file1.forEach((line: string, index: number) => {
        let max = 0;
        for (let j=0; j<file2.length; j++) {
            const temp = memo[j];
            if (line === file2[j]) {
                memo[j] = Math.max (max + 1, memo[j]);
            }
            max = Math.max (max, temp);
        }
    })
}

async function diff (file_path1: string, file_path2: string): Promise<Array<{type: modification_type, content: string}>> {
    let file1: string[] = await read_file(file_path1);
    let file2: string[] = await read_file(file_path2);
    let log: Array<{type: modification_type, content: string}> = [];
  
    let memo = new Array(file2.length).fill(0);
    console.log(memo);

    lccs (file1, file2, memo);
    console.log(memo);

    //get max value in memo
    const max = memo.reduce((acc, cur) => Math.max(acc, cur), 0);

    console.log(max);
    
    return log;
}

const file_path1 = './sample/hello_world1.xml';
const file_path2 = './sample/hello_world2.xml';

diff(file_path1, file_path2);