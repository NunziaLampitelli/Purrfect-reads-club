export default interface IBook {
	id: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		description?: string;
		imageLinks?: {
			thumbnail: string;
		};
		pageCount?: number;
		categories?: string[];
	};
	thumbnail?: string; // Aggiunto per BookDiary
}
