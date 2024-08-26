const client = require('./client.js');

async function test() {
    // const result  = await client.set('surendra:2', 'tharaBhaiSurendraKyaKarRaaH');
    const result2 = await client.mget(['surendra:1','surendra:2', 'surendra:5']);
    console.log(result2);
    process.exit();
}

test();