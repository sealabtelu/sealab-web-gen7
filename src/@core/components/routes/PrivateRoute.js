// ** React Imports
import { Navigate } from "react-router-dom"
import { Suspense } from "react"

// ** Utils
import { getUserData } from "@utils"

// ** Context Imports
// import { AbilityContext } from "@src/utility/context/Can";

// ** Spinner Import
import Spinner from "../spinner/Loading-spinner"

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  // const ability = useContext(AbilityContext);
  const user = getUserData()

  if (route) {
    // let action = null;
    // let resource = null;
    let restrictedRoute = false

    if (route.meta) {
      // action = route.meta.action;
      // resource = route.meta.resource;
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      return <Navigate to="/login" />
    } else {
      if (user.role !== route.meta?.role) {
        return <Navigate to='/auth/not-auth' />
      }
    }
    if (user && restrictedRoute) {
      return <Navigate to={getHomeRouteForLoggedInUser(user.role)} />
    }
    // if (user && restrictedRoute && user.role === "Student") {
    //   return <Navigate to="/access-control" />;
    // }
    // if (user && !ability.can(action || "read", resource)) {
    //   return <Navigate to="/misc/not-authorized" replace />;
    // }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  )
}

export default PrivateRoute
