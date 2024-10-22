import { createContext, useContext, useState } from "react";

interface SearchContextType {
	searchItem: string;
	setSearchItem: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [searchItem, setSearchItem] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);

	console.log("Current search term in context:", searchItem);
	console.log("Current page in context:", currentPage);

	return (
		<SearchContext.Provider
			value={{ searchItem, setSearchItem, currentPage, setCurrentPage }}
		>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearch() {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
}
