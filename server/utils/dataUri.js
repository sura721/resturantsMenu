import DatauriParser from 'datauri/parser.js';
import path from 'path';

const parser = new DatauriParser();
export const formatBufferToDataURI = (file) => {
    if (!file || !file.buffer || !file.originalname) return null;
    try {
    
        const extName = path.extname(file.originalname).toString();
        return parser.format(extName, file.buffer);
    } catch (error) {
        return null;
    }
}