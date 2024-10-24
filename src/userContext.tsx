import { createContext,	useContext,	useState,	ReactNode,	useEffect,} from "react";

interface UserContextType {
	username: string | null;
	setUsername: (username: string | null) => void;
	personalNotes: Record<string, string>; // this is needed to memorize personal notes for everybook
	setPersonalNotes: (notes: Record<string, string>) => void; // to updated thenotes
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// hook 
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export function UserProvider({ children }: { children: ReactNode }) {
	const [username, setUsername] = useState<string | null>(null);
	const [personalNotes, setPersonalNotes] = useState<Record<string, string>>(
		{}
	);

	useEffect(() => {
		const storedNotes = localStorage.getItem("personalNotes");
		if (storedNotes) {
			setPersonalNotes(JSON.parse(storedNotes));
		}
	}, []);

	// updates local storage when notes change
	useEffect(() => {
		localStorage.setItem("personalNotes", JSON.stringify(personalNotes));
	}, [personalNotes]);

	return (
		<UserContext.Provider
			value={{ username, setUsername, personalNotes, setPersonalNotes }}
		>
			{children}
		</UserContext.Provider>
	);
}
