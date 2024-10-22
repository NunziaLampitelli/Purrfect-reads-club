import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../userContext"; 

interface PrivateRouteProps {
	children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	const { username } = useUser();
	return username ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
