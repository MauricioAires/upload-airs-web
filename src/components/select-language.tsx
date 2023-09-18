import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import US from "country-flag-icons/react/3x2/US";
import BR from "country-flag-icons/react/3x2/BR";

export function SelectLanguage() {
  return (
    <div className="w-min  lg:w-[10rem]">
      <Select defaultValue="BR" autoComplete="asd">
        <SelectTrigger>
          <SelectValue placeholder="Selecione um idioma" />
        </SelectTrigger>

        <SelectContent className="min-w-0">
          <SelectItem value="BR">
            <div className="flex flex-row">
              <BR title="Brazil" className="w-4 h-4 mr-2" />
              <span className="hidden lg:block">Brazil</span>
              <span className="lg:hidden block">BR</span>
            </div>
          </SelectItem>
          <SelectItem value="US">
            <div className="flex flex-row">
              <US title="United States" className="w-4 h-4 mr-2" />
              <span className="hidden lg:block">United States</span>
              <span className="lg:hidden block">US</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
