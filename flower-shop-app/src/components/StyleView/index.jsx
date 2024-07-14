import { memo, useContext } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import styles from './styles.module.scss'
import { StyleViewContext } from "/src/stores";

const StyleView = () => {
  const viewContext = useContext(StyleViewContext)
  return (
    <ToggleButtonGroup
      className={styles["icon__stylelist"]}
      orientation="vertical"
      value={viewContext.styleList}
      exclusive
      onChange={viewContext.handleChangeStyleList}
    >
      <ToggleButton value="list" aria-label="list">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="row" aria-label="row">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default memo(StyleView);
