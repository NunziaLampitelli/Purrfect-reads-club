import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../userContext"; 

interface PrivateRouteProps {
	children: ReactNode;
}
//component to have private routes and if not loggedin it redirects to the login page, after getting the username from useUser context
export function PrivateRoute({ children }: PrivateRouteProps) {
	const { username } = useUser();
	return username ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
