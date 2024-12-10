const fs = require('fs');
const path = require('path');

const ecryptionSecretKey = process.env.ENCRYPTION_KEY || "encryption-secret-key";
const chatHub = process.env.CHAT_HUB || "http://localhost:7148/chathub";

const replaceInFile = (filePath, param, value) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const updatedContent = fileContent.replace(new RegExp(`${param}: .*`, 'g'), `${param}: '${value}',`);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Replaced ${param} in ${filePath}`);
};

const environmentFiles = [
    path.join(__dirname, 'src/environments/environment.ts'),
    path.join(__dirname, 'src/environments/environment.prod.ts')
];

environmentFiles.forEach(filePath => {
    replaceInFile(filePath, 'ecryptionSecretKey', ecryptionSecretKey);
    replaceInFile(filePath, 'chatHub', chatHub);
});
