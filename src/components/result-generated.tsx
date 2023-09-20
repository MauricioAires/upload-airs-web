import { useGenerateCompletion } from "@/context/generate-completion";
import { Textarea } from "./ui/textarea";
import { Trans, useTranslation } from "react-i18next";

export function ResultGenerated() {
  const { t } = useTranslation();
  const { input, handleInputChange, completion } = useGenerateCompletion();

  return (
    <div className="flex px-1 md:px-0 md:mt-0 mt-4 flex-col md:h-auto min-h-[30rem] h-[70dvh] flex-1  gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <div className="min-h-[10rem]  flex flex-col">
          <span className="font-semibold my-1 md:hidden">
            {t("result_generated.prompt")}
          </span>
          <Textarea
            placeholder={t("result_generated.prompt_placeholder")}
            className="resize-none p-4 leading-relaxed  flex-1"
            value={input}
            onChange={handleInputChange}
          ></Textarea>
        </div>
        <div className="min-h-[10rem]  flex flex-col">
          <span className="font-semibold my-1 md:hidden">
            {t("result_generated.result")}
          </span>
          <Textarea
            placeholder={t("result_generated.result_placeholder")}
            readOnly
            className="resize-none p-4 flex-1 leading-relaxed"
            value={completion}
          ></Textarea>
        </div>
      </div>
      <p className="text-xs md:text-sm px-2 text-center text-muted-foreground">
        <Trans
          i18nKey={"result_generated.tip"}
          components={{ code: <code /> }}
        />
      </p>
    </div>
  );
}
