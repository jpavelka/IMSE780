import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function customPP() {
	return {
		name: 'emoji',
		markup: ({ content, filename }) => {
			if (filename.search('src/lib/sections') < 0) {
				return
			}
			console.log(filename)
			const regexpStart = '<Math[^>]*>'
			const regexpEnd = '</Math[^>]*>'
			let converted = [];
			let unconverted = content;
			let mt = unconverted.match(regexpStart);
			while (!!mt) {
				let idx = mt.index;
				let s = mt[0];
				converted.push(unconverted.slice(0, idx));
				converted.push(s);
				unconverted = unconverted.slice(idx + s.length);
				mt = unconverted.match(regexpEnd);
				idx = mt.index;
				s = mt[0];
				let math = unconverted.slice(0, idx);
				math = math.replaceAll('_', '{:underscore:}');
				if (!math.match('String.raw')) {
					math = '{String.raw`' + math + '`}';
				}
				converted.push(math);
				converted.push(s);
				unconverted = unconverted.slice(idx + s.length);
				mt = unconverted.match(regexpStart);
			}
			converted.push(unconverted);
			return { code: converted.join('') }
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		customPP(),
		vitePreprocess()
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
