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

function encrypt(input) {
    return cryptoJSON.encrypt(input, CRYPTO_PASSWORD, {
        encoding: CRYPTO_ENCODING,
        keys: CRYPTO_KEYS,
        algorithm: CRYPTO_ALGORITHM
    });
}

function mockMain() {
    const input = {
        "id": "1459",
        "title": "Personal Assistant Under Supervision I",
        "description": "Working under direct supervision or working autonomously on routine assignments (4 positions)",
        "usageCount": 0,
        "status": "PUBLISHED",
        "locale": "en",
        "jobRoleTypeId": "ASB01",
        "standardHayGrade": "8",
        "levelName": "Individual Contributor",
        "familyName": "Administration / Support / Service",
        "subFamilyName": "Secretarial",
        "accessRoles": "READ",
        "isTemplateJob": true,
        "profileType": "BEST_IN_CLASS",
        "isProfileInProfileCollection": false,
        "enableProfileMatchTool": true,
        "source": [
            {
                "id": 0,
                "type": "LAST_MODIFIED_BY",
                "firstName": "Korn",
                "lastName": "Ferry",
                "effectiveDateTime": 1517443200000
            },
            {
                "id": 0,
                "type": "CREATED_BY",
                "firstName": "Korn",
                "lastName": "Ferry",
                "effectiveDateTime": 1517443200000
            }
        ]
    };
    const output = encrypt(input);
    console.log('output', output);   
}

function main() {
    const filePath = path.join(__dirname + '/data/success_profile_search_results.json');

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
            const jsonifiedData = JSON.parse(data);
            const output = [];
            jsonifiedData.forEach((datum) => {
                const encryptedDatum = encrypt(datum);
                output.push(encryptedDatum);
            });
            console.log('output', output);
        } else {
            console.log('Error', err);
        }
    });
}

// mockMain();
main();
