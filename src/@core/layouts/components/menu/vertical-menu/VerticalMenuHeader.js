// ** React Imports
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

// ** Config
import themeConfig from "@configs/themeConfig";

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Vars
  const user = getUserData();

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink
            to={user ? getHomeRouteForLoggedInUser(user.role) : "/"}
            className="navbar-brand"
          >
            <span className="brand-logo">
              <img src={themeConfig.app.appLogoImage} alt="logo" />
            </span>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
          </div>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
