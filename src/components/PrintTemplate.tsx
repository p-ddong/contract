import MB from "@/components/HDBT/MB";
import GUQ from "@/components/HDBT/GUQ";
import TX from "@/components/HDBT/TX";
import PLTX from "@/components/HDBT/PLTX";
import BGBT from "@/components/HDBT/BG";

import CC from "@/components/HDCM/CC";
import SD from "@/components/HDCM/SD";
import QL from "@/components/HDCM/QL";
import TB from "@/components/HDCM/TB";
import BGCM from "@/components/HDCM/BG";

export function PrintTemplate({ type }: { type: string | null, data: any }) {
  if (!type) return null;

  return (
    <div id="print-area" className="hidden print:block">
      {type === "hirePurchase" ? (
        <>
          <div className="contract-page"><MB /></div>
          <div className="contract-page"><GUQ /></div>
          <div className="contract-page"><TX /></div>
          <div className="contract-page"><PLTX /></div>
          <div className="contract-page"><BGBT /></div>
        </>
      ) : (
        <>
          <div className="contract-page"><CC /></div>
          <div className="contract-page"><SD /></div>
          <div className="contract-page"><QL/></div>
          <div className="contract-page"><TB /></div>
          <div className="contract-page"><BGCM /></div>
        </>
      )}
    </div>
  );
}