export interface ApiError {
	statusCode: number;
	timestamp: string;
	path: string;
	message: string;
	code: string;
}
