import React from "react";
import { Still } from "remotion";
import { Preview1, Preview2, Preview3, Preview4 } from "./Previews";

export const RemotionRoot: React.FC = () => (
  <>
    <Still id="Preview1" component={Preview1} width={1920} height={1080} />
    <Still id="Preview2" component={Preview2} width={1920} height={1080} />
    <Still id="Preview3" component={Preview3} width={1920} height={1080} />
    <Still id="Preview4" component={Preview4} width={1920} height={1080} />
  </>
);
