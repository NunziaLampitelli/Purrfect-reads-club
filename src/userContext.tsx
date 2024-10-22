import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
	username: string | null;
	setUsername: (username: string | null) => void;
}

// create a new usercontext starting with undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// This is to create the hook needed
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

// provider with the content that needs to be inside
export function UserProvider({ children }: { children: ReactNode }) {
	const [username, setUsername] = useState<string | null>(null);

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			{children}
		</UserContext.Provider>
	);
}
