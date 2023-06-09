export interface IOrphanage {
	name: string;
	latitude: number;
	longitude: number;
	instructions: string,
	about: string;
	opening_hours: string;
	open_on_weekends: boolean;
	images: Array<{ id: number; url: string; }>;
}
