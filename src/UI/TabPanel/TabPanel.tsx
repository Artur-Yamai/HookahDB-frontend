import { useState } from "react";
import { SelectOption } from "Types";
import "./TabPanel.scss";

interface TabPanelProps {
  options: SelectOption[];
  onClick: (option: SelectOption) => void;
}

export const TabPanel = ({ options, onClick }: TabPanelProps) => {
  const [selectedTab, toSelectTab] = useState<SelectOption>(options[0]);

  const toClickOnTab = (option: SelectOption) => {
    toSelectTab(option);
    onClick(option);
  };

  return (
    <div className="tab-panel">
      <ul className="tab-panel__tabs-list">
        {options.map((opt: SelectOption) => (
          <li
            className={`tab-panel__tab${
              selectedTab.value === opt.value ? " tab-panel__tab--selected" : ""
            }`}
            key={opt.value}
            onClick={() => toClickOnTab(opt)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
