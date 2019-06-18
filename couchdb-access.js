const decrypt = require('./decrypter').decrypt;
const couchbase = require("couchbase");
const N1qlQuery = couchbase.N1qlQuery;

const bucketName = 'sp-search-results';
const cluster = new couchbase.Cluster('http://rkem:bricksimple@ec2-18-221-141-36.us-east-2.compute.amazonaws.com:8091');
const bucket = cluster.openBucket(bucketName, '0a70b6865e3a9cb748f13fbc77c0ab36');

// console.log(bucket);

const statement = 'select * from `sp-search-results` AS searchResults where META().id = $1';
const query = N1qlQuery.fromString(statement);
bucket.query(query, ['key::01c5daeb87b106cf44ced643fcab3082'], function(error, result) {
    if (error) {
        console.log('Error', error);
    } else {
        // console.log('Result', result[0].searchResults);
        const decryptedResult = decrypt(result[0].searchResults);
        console.log('Decrypted Result', decryptedResult);
    }
});
