import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
    projectId: 'iot-alubee',
    keyFilename: './keyfile.json',
});

export default bigquery;