import React, { useContext } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Switch from "react-switch";
import { AppContext } from "../Style/AppProvider";

const SettingsWrapper = styled.div`
  height: 60vh;
  border: 1px solid ${(props) => props.theme.colors.inputBackdrop};
  border-radius: 15px;
  padding: 20px;
`;

const SettingTitle = styled.h1`
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.inputBackdrop};
`;

const SettingSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25rem;
  padding: 20px;
`;

const SettingSwitchDesc = styled.h1`
  word-wrap: nowrap;
`;

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useContext(AppContext);
  const handleChange = () => {
    toggleTheme();
  };

  return (
    <SettingSwitchWrapper>
      <SettingSwitchDesc>다크모드</SettingSwitchDesc>
      <Switch
        checked={isDarkMode ? true : false}
        height={50}
        width={120}
        onChange={handleChange}
      />
    </SettingSwitchWrapper>
  );
};

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Film Book | Settings</title>
      </Helmet>
      <SettingsWrapper>
        <SettingTitle>설정</SettingTitle>
        <div>
          <ThemeSwitcher />
        </div>
      </SettingsWrapper>
    </>
  );
};

export default Settings;
