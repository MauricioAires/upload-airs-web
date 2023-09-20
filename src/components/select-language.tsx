import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import US from "country-flag-icons/react/3x2/US";
import BR from "country-flag-icons/react/3x2/BR";

import i18n from "@/lib/i18next-config";
import { useTranslation } from "react-i18next";

export function SelectLanguage() {
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

    i18n.reloadResources();
  };

  return (
    <div className="w-min  lg:w-[10rem]">
      <Select defaultValue={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger>
          <SelectValue placeholder={t("languages.placeholder")} />
        </SelectTrigger>

        <SelectContent className="min-w-0">
          <SelectItem value="pt-BR">
            <div className="flex flex-row">
              <BR title={t("languages.brazil")} className="w-4 h-4 mr-2" />
              <span className="hidden lg:block">{t("languages.brazil")}</span>
              <span className="lg:hidden block">BR</span>
            </div>
          </SelectItem>
          <SelectItem value="en-US">
            <div className="flex flex-row">
              <US
                title={t("languages.united_states")}
                className="w-4 h-4 mr-2"
              />
              <span className="hidden lg:block">
                {t("languages.united_states")}
              </span>
              <span className="lg:hidden block">US</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
