import { NumberRange } from "./NumberRange.js";

export interface JPGOptions {
  quality?: NumberRange<1, 100>;
  compress?: boolean;
  progressive?: boolean;
}
