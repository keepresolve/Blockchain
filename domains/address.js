
const {  Resolution } = require('@unstoppabledomains/resolution');
const resolution = new Resolution();

function resolve(domain, currency) {
  resolution
    .addr(domain, currency)
    .then((address) => console.log(domain, 'resolves to', address))
    .catch(console.error);
}

function resolveMultiChain(domain, currency, chain) {
  resolution
    .multiChainAddr(domain, currency, chain)
    .then((address) => console.log(domain, 'resolves to', address, version))
    .catch(console.error);
}

function resolveIpfsHash(domain) {
    resolution
      .ipfsHash(domain)
      .then((hash) =>
        console.log(
          `You can access this website via a public IPFS gateway: https://gateway.ipfs.io/ipfs/${hash}`,
        ),
      )
      .catch(console.error);
}

// resolve('brad.crypto', 'ETH');
resolve('brad.zil', 'ZIL');
// resolveMultiChain('brad.crypto', 'USDT', 'ERC20');
// resolveMultiChain('brad.crypto', 'USDT', 'OMNI');

  
// resolveIpfsHash('homecakes.crypto');