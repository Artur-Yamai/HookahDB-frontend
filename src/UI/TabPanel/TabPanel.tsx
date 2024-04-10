import { useState } from "react";
import { SelectOption } from "Types";
import "./TabPanel.scss";

interface TabPanelProps {
  options: SelectOption[];
  onClick: (option: SelectOption) => void;
  defaultOption?: SelectOption;
  children?: JSX.Element;
}

export const TabPanel = ({
  options,
  onClick,
  defaultOption,
  children,
}: TabPanelProps) => {
  const [selectedTab, toSelectTab] = useState<SelectOption>(
    defaultOption ?? options[0]
  );

  const toClickOnTab = (option: SelectOption): void => {
    if (option.value === selectedTab.value) return;

    toSelectTab(option);
    onClick(option);
  };

  return (
    <div className="tab-panel w100 h100">
      <ul className="tab-panel__titles-list">
        {options.map((opt: SelectOption) => (
          <li
            className={`tab-panel__title${
              selectedTab.value === opt.value
                ? " tab-panel__title--selected"
                : ""
            }`}
            key={opt.value}
            onClick={() => toClickOnTab(opt)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
      <div className="tab-panel__tabs-place">{children}</div>
    </div>
  );
};
