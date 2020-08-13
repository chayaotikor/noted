import React from 'react';
import {  AppHeader,
  SortOption,
  SearchInput,
  SettingsButton,
  SortContainer,
  LogoutButton,
  TopBarContainer} from '../style'

export const TopBar = ({ toggleMode, search, sort, mode, logout }) => {
    return (
      <TopBarContainer>
        <SettingsButton
          to="/settings"
          onClick={() => {
            toggleMode("settings");
          }}
        />
        <SearchInput
          onChange={(e) => search(e)}
          placeholder={"search notes..."}
          type="text"
          mode={mode}
        />
        <AppHeader mode={mode} to='/notes'>Noted</AppHeader>
        <SortContainer
          mode={mode}
          defaultValue="sort..."
          onClick={(e) => {
            e.target.defaultValue = e.target.value;
          }}
        >
          <SortOption value="sort..." disabled hidden>
            sort...
          </SortOption>
          <SortOption value="ascending" onClick={(e) => sort(e)}>
            Title (Ascending)
          </SortOption>
          <SortOption value="descending" onClick={(e) => sort(e)}>
            Title (Descending)
          </SortOption>
          <SortOption value="newest" onClick={(e) => sort(e)}>
            Date (Newest)
          </SortOption>
          <SortOption value="oldest" onClick={(e) => sort(e)}>
            Date (Oldest)
          </SortOption>
        </SortContainer>
        <LogoutButton
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </LogoutButton>
      </TopBarContainer>
    );
}