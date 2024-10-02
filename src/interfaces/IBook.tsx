interface IBook {
	id: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		imageLinks?: {
			thumbnail: string;
		};
	};
}

export default IBook;