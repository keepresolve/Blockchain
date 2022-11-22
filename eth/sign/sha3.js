const sha3 = require('js-sha3');

function keccak256(data) {
    data = hex.arrayify(data);
    return '0x' + sha3.keccak_256(data);
}


console.log(keccak256("1"))