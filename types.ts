import { Country } from "@prisma/client";

export enum LoaderType {
  PROVERB_INSIGHT = "PROVERB_INSIGHT",
  PROVERB_IMAGE = "PROVERB_IMAGE",
}

export type Region = {
  name: string;
  code: RegionCode;
  countries: CountryCode[];
};

export type Countries = {
  [key in Country]: {
    name: string;
    code: CountryCode;
  };
};

export enum RegionCode {
  NA = "NA",
  SSA = "SSA",
  EA = "EA",
  CA = "CA",
  WA = "WA",
  SA = "SA",
}

export enum CountryCode {
  DZ = "DZ",
  AO = "AO",
  BJ = "BJ",
  BW = "BW",
  BF = "BF",
  BI = "BI",
  CV = "CV",
  CM = "CM",
  CF = "CF",
  TD = "TD",
  KM = "KM",
  CG = "CG",
  CD = "CD",
  DJ = "DJ",
  EG = "EG",
  GQ = "GQ",
  ER = "ER",
  SZ = "SZ",
  ET = "ET",
  GA = "GA",
  GM = "GM",
  GH = "GH",
  GN = "GN",
  GW = "GW",
  CI = "CI",
  KE = "KE",
  LS = "LS",
  LR = "LR",
  LY = "LY",
  MG = "MG",
  MW = "MW",
  ML = "ML",
  MR = "MR",
  MU = "MU",
  MA = "MA",
  MZ = "MZ",
  NA = "NA",
  NE = "NE",
  NG = "NG",
  RW = "RW",
  ST = "ST",
  SN = "SN",
  SC = "SC",
  SL = "SL",
  SO = "SO",
  ZA = "ZA",
  SS = "SS",
  SD = "SD",
  TZ = "TZ",
  TG = "TG",
  TN = "TN",
  UG = "UG",
  ZM = "ZM",
  ZW = "ZW",
}
