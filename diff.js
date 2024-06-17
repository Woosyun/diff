"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
var modification_type;
(function (modification_type) {
    modification_type[modification_type["ADD"] = 0] = "ADD";
    modification_type[modification_type["DELETE"] = 1] = "DELETE";
    modification_type[modification_type["MOVE"] = 2] = "MOVE";
})(modification_type || (modification_type = {}));
function read_file(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const lines = data.split('\n');
            resolve(lines);
        });
    });
}
//longest common continuous subsequence
function lccs(file1, file2, memo) {
    file1.forEach((line, index) => {
        let max = 0;
        for (let j = 0; j < file2.length; j++) {
            const temp = memo[j];
            if (line === file2[j]) {
                memo[j] = Math.max(max + 1, memo[j]);
            }
            max = Math.max(max, temp);
        }
    });
}
function diff(file_path1, file_path2) {
    return __awaiter(this, void 0, void 0, function* () {
        let file1 = yield read_file(file_path1);
        let file2 = yield read_file(file_path2);
        let log = [];
        let memo = new Array(file2.length).fill(0);
        console.log(memo);
        lccs(file1, file2, memo);
        console.log(memo);
        //get max value in memo
        const max = memo.reduce((acc, cur) => Math.max(acc, cur), 0);
        console.log(max);
        return log;
    });
}
const file_path1 = './sample/hello_world1.xml';
const file_path2 = './sample/hello_world2.xml';
diff(file_path1, file_path2);
