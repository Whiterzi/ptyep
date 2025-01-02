import { readdir, statSync, writeFile } from 'fs';
import { join, parse, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_DIR = join(__dirname, 'src/qst');
const OUTPUT_FILE = join(__dirname, 'src/ts/qstlist.ts');

readdir(IMAGE_DIR, (err, files) => {
    if (err) {
        console.error('Failed to read directory:', err);
        return;
    }

    const imageList = {};

    files.forEach(file => {
        const filePath = join(IMAGE_DIR, file);
        if (statSync(filePath).isFile() && /\.(jpg|jpeg|png|gif|webp)$/.test(file)) {
            const fileNameWithoutExtension = parse(file).name;
            imageList[fileNameWithoutExtension] = { path: `/src/qst/${file}` };
        }
    });

    const jsContent = `const quests = ${JSON.stringify(imageList, null, 2)}; \n export default quests;`;

    writeFile(OUTPUT_FILE, jsContent, err => {
        if (err) {
            console.error('Failed to write file:', err);
            return;
        }
        console.log('Image list has been written to', OUTPUT_FILE);
    });
});