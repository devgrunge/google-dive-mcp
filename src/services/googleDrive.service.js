"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFiles = listFiles;
// src/services/googleDriveService.ts
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: path_1.default.join(__dirname, '../../credentials.json'),
    scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = googleapis_1.google.drive({ version: 'v3', auth });
function listFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield drive.files.list({
            pageSize: 10,
            fields: 'files(id, name)',
        });
        return res.data.files || [];
    });
}
