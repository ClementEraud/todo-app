/* eslint-disable @typescript-eslint/no-unused-vars */
interface HookDeclaration {
	hook: {
		name: string;
		function: (...dependencies: any) => (...params: any) => any;
	};
	providers: any[];
}

export class AppModule {
	/**
	 * Contains all prepared hooks with providers.
	 */
	readonly hooks: {
		[name: string]: (...params: any) => any;
	} = {};

	/**
	 * Contains all providers already instanciated.
	 */
	readonly instanciatedProviders: any[] = [];

	constructor(hooksDeclarations: HookDeclaration[]) {
		hooksDeclarations.forEach(({ hook, providers }) => {
			// Construct providers for hook
			const providersInstances = providers.map(providerClass => {
				// Check if provider already been instanciated.
				const instanciatedProvider = this.instanciatedProviders.find(
					provider => provider instanceof providerClass,
				);
				if (instanciatedProvider) return instanciatedProvider;

				const instance = new providerClass();
				this.instanciatedProviders.push(instance);

				return instance;
			});

			const preparedHook = hook.function(...providersInstances);

			this.hooks[hook.name] = preparedHook;

			return;
		});
	}
}
