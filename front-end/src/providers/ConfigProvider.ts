interface Config {
	API_HOSTNAME: string;
	API_PORT: number;
}

export class ConfigProvider {
	static async getConfig(): Promise<Config> {
		const baseUrl = process.env.PUBLIC_URL + '/config/';
		if (process.env.NODE_ENV === 'production') {
			return await fetch(baseUrl + 'config.prod.json').then(res => res.json());
		}
		return await fetch(baseUrl + 'config.dev.json').then(res => res.json());
	}
}
