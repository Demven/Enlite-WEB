import fs from 'fs';
import path from 'path';

const indexHtmlFilePath = path.join(__dirname, '../../../build/html', 'index.html');
const indexHtml = fs.readFileSync(indexHtmlFilePath, 'utf8');

export function indexHtmlTemplater(renderPlaceholder, mainContent) {
  return indexHtml.replace(renderPlaceholder, mainContent);
}


const confirmationHtmlFilePath = path.join(__dirname, '../../../build/html', 'confirmation.html');
const confirmationHtml = fs.readFileSync(confirmationHtmlFilePath, 'utf8');

export function confirmationHtmlTemplater(renderPlaceholder, mainContent) {
  return confirmationHtml.replace(renderPlaceholder, mainContent);
}
