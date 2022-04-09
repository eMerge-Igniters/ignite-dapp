import { Networks } from './blockchain';

const ETH_MAINNET = {
  IGNITE_ADDRESS: '0x88a4A5d5ef0A0Bab5aD4528Cf02edc28cEBcaEdA',
  IGNITE_GOVERNOR_ADDRESS: '0xAcC90C616d39FD60A18Df50DbB007CD3BD643ebf',
  IGNITE_PROPERTY_ADDRESS: '0xED74b8F16502D1165F52cD1545F0484B733591f8',
};

export const getAddresses = (networkID: number) => {
  if (networkID === Networks.ETH) return ETH_MAINNET;

  throw Error("Network don't support");
};
