import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { TabPanel } from "UI";
import { SelectOption } from "Types";
import { SafetysSettings } from "components";

import "./SettingsPage.scss";
import { useState } from "react";

export const SettingsPage: React.FC = () => {
  const options: SelectOption[] = [{ value: "safety", label: "Безопасность" }];

  const [searchParams, setSearchParams] = useSearchParams();

  const listName = searchParams.get("panel");
  const option = options.find((opt) => opt.value === listName) ?? options[0];

  const [selectedOption, setSelectedOption] = useState<SelectOption>(option);

  const onChange = (option: SelectOption) => {
    setSelectedOption(option);
    setSearchParams({ panel: option.value });
  };

  const getSettingsPanel = () => {
    switch (selectedOption.value) {
      case "safety":
        return <SafetysSettings />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Настройки</title>
      </Helmet>

      <TabPanel
        options={options}
        onClick={onChange}
        defaultOption={selectedOption}
      >
        {getSettingsPanel()}
      </TabPanel>
    </>
  );
};
