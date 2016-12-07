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


const changePasswordHtmlFilePath = path.join(__dirname, '../../../build/html', 'change-password.html');
const changePasswordHtml = fs.readFileSync(changePasswordHtmlFilePath, 'utf8');

export function changePasswordHtmlTemplater(renderPlaceholder, mainContent) {
  return changePasswordHtml.replace(renderPlaceholder, mainContent);
}

const termsAndPolicyHtmlFilePath = path.join(__dirname, '../../../build/html', 'terms-and-policy.html');
const termsAndPolicyHtml = fs.readFileSync(termsAndPolicyHtmlFilePath, 'utf8');

export function termsAndPolicyHtmlTemplater(renderPlaceholder, mainContent) {
  return termsAndPolicyHtml.replace(renderPlaceholder, mainContent);
}
