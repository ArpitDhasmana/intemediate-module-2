require("@nomiclabs/hardhat-waffle");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:
  {
    version: "0.8.0",
},
paths:{
  //when we compile it will store the compiled contract inside of our front end directory
  artifacts: "./client/src/artifacts",
}
};
