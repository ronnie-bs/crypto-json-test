const fs = require('fs');
const path = require('path');
const cryptoJSON = require('crypto-json');

const CRYPTO_ALGORITHM = 'camellia-128-cbc';
const CRYPTO_ENCODING = 'hex';
const CRYPTO_PASSWORD = 'Br1ckS1mpl3Rul3s1234!';
const CRYPTO_KEYS = [
    'id', 'title', 'description', 'usageCount', 'status', 'locale', 'jobRoleTypeId', 'standardHayGrade', 'levelName', 'familyName',
    'subFamilyName', 'accessRoles', 'isTemplateJob', 'profileType', 'isProfileInProfileCollection', 'enableProfileMatchTool', 'source',
    'id', 'type', 'firstName', 'lastName', 'effectiveDateTime'
];

const FILE_PATH = 'data';
const INPUT_FILENAME  = 'SP-Search-Results.json'
const OUTPUT_FILENAME = 'SP-Search-Results-Decrypted.json';
const INPUT_PATH  = path.join(__dirname, FILE_PATH, INPUT_FILENAME);
const OUTPUT_PATH = path.join(__dirname, FILE_PATH, OUTPUT_FILENAME);

function decrypt(input) {
    return cryptoJSON.decrypt(input, CRYPTO_PASSWORD, {
        encoding: CRYPTO_ENCODING,
        keys: CRYPTO_KEYS,
        algorithm: CRYPTO_ALGORITHM
    });
}

function readJSONFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if (!err) {
                resolve({ status: 'success', data: JSON.parse(data) });
            } else {
                reject({ status: 'error', error: err });
            }
        });
    });
}

function writeJSONToFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (!err) {
                resolve({ status: 'success' });
            } else {
                reject({ status: 'error', error: err });
            }
        })
    });
}

async function main() {
    const readResponse = await readJSONFromFile(INPUT_PATH);
    const output = [];
    const data = readResponse.data;
    data.forEach((datum) => {
        const decryptedDatum = decrypt(datum);
        output.push(decryptedDatum);
    });
    
    const writeResponse = await writeJSONToFile(OUTPUT_PATH, output);
}

main();
