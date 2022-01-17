import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as BhdDaiImg } from "src/assets/tokens/EVER-DAI.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wBNB.svg";
import { ReactComponent as BUSDImg } from "src/assets/tokens/BUSD.svg";


import { abi as BondBhdDaiContract } from "src/abi/bonds/BhdDaiContract.json";
import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";

import { abi as ReserveBhdDaiContract } from "src/abi/reserves/BhdDai.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { getBondCalculator } from "src/helpers/BondCalculator";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "dai",
  displayName: "DAI",
  bondToken: "DAI",
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x556135E5d756C2b045855B1e0ff377e8Bdd45128",
      reserveAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x7b10a32d15FE1196a7f1590a855AC4ACcB6fe772",
      reserveAddress: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    },
  },
});

export const busd = new StableBond({
  name: "busd",
  displayName: "BUSD",
  bondToken: "BUSD",
  bondIconSvg: BUSDImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xF4b2038ecaaec3d09A6598e03257Eb60b6f74736",
      reserveAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x7b10a32d15FE1196a7f1590a855AC4ACcB6fe772",
      reserveAddress: "0x8a9424745056Eb399FD19a0EC26A14316684e274",
    },
  },
});

export const eth = new CustomBond({
  name: "bnb",
  displayName: "wBNB",
  lpUrl: "",
  bondType: BondType.StableAsset,
  bondToken: "WBNB",
  bondIconSvg: wETHImg,
  bondContractABI: EthBondContract,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x3167b09dee7c20f79253d4fce3c0b7a7125c3add",
      reserveAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
      reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const ethBondContract = this.getContractForBond(networkID, provider);
    let ethPrice = await ethBondContract.assetPrice();
    ethPrice = ethPrice / Math.pow(10, 8);
    const token = this.getContractForReserve(networkID, provider);
    let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    ethAmount = ethAmount / Math.pow(10, 18);
    return ethAmount * ethPrice;
  },
});

export const bhd_dai = new LPBond({
  name: "bhd_dai_lp",
  displayName: "EVER-DAI LP",
  bondToken: "DAI",
  bondIconSvg: BhdDaiImg,
  bondContractABI: BondBhdDaiContract,
  reserveContract: ReserveBhdDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xA07cb8afD1408FaB6a99f75Cad8A2263dDFB99bd",
      reserveAddress: "0x1ec483fBB9eE42aED753F633DF23A171AAD4De7b",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x37346f0bdCd6B510aC3673007791C94f48CA0af4",
      reserveAddress: "0x6aCDe82dFbF8B25bf9fb9E7b0CCaF648c3f60b63",
    },
  },
  lpUrl:
    "https://pancakeswap.finance/add/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3/0x46F64ddf725090ce7442Ef7e7c7EB41AaED90424",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai, busd, eth];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

export default allBonds;
