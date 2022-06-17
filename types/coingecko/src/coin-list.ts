export interface ICoinGeckoCoinListItem {
  id: string;
  symbol: string;
  name: string;
  platforms: {
    [key: string]: string;
  };
}
