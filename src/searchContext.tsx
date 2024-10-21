import { createContext, useContext, useState } from "react";

interface SearchContextType {
	searchItem: string;
	setSearchItem: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [searchItem, setSearchItem] = useState<string>("");

	return (
		<SearchContext.Provider value={{ searchItem, setSearchItem }}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
};
