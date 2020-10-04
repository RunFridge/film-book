import React, { ReactElement } from "react";
import styled from "styled-components";

// Type
import { Theme } from "../@types/style";

// Hooks
import useThemeSwitcher from "../Hooks/useThemeSwitcher";

/*
==========================
    Styled Components
==========================
*/
const Container = styled.div`
  /* Size */
  height: calc(100vh - 261px);
  padding: 30px;
`;

const SettingContent = styled.div`
  /* Border */
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.enabled};
  border-radius: 2em;

  /* Size */
  padding: 30px;
  height: 30%;
`;

const Title = styled.h1`
  /* Size */
  border-bottom: 1px solid;
  margin-bottom: 1.5em;
`;

const SettingList = styled.ul`
  /* List Style */
  list-style-type: none;
`;

const Select = styled.select`
  /* Size */
  margin-left: 0.5em;
`;

/*
==========================
    React Element
==========================
*/
const Settings = (): ReactElement => {
  const handleChange = (event: any) => {
    changeTheme(event.target.value);
  };
  const { themeString, changeTheme } = useThemeSwitcher();
  return (
    <Container>
      <SettingContent>
        <Title>설정</Title>
        <SettingList>
          <li>
            테마 설정:{" "}
            <Select onChange={handleChange} defaultValue={themeString}>
              <option value="light">라이트 모드</option>
              <option value="dark">다크 모드</option>
            </Select>
          </li>
        </SettingList>
      </SettingContent>
    </Container>
  );
};

export default Settings;
