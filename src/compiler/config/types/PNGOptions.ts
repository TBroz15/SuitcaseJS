import { NumberRange } from "./NumberRange.js";

export interface PNGOptions {
  compressionLevel?: NumberRange<0, 9>;
  quality?: NumberRange<1, 100>;
  compress?: boolean;
}
