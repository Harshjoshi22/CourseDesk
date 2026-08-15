import { useLoaduserQuery } from "@/features/api/authapi";
import { useSelector } from "react-redux"
import { Navigate,useLocation  } from "react-router-dom";
import LoadingSpinner from "./Loading";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  const { isLoading } = useLoaduserQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector(store => store.auth);
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect");

  if (isAuthenticated) {
    return <Navigate to={redirect || "/"} replace />;
  }

  return children;
};

export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "instructor"){
        return <Navigate to="/"/>
    }

    return children;
}

export const LectureRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/admin/course"/>
    }

    return children;
}