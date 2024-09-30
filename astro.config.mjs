import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'DESDR',
			social: {
				github: 'https://github.com/Columbia-DESDR',
			},
			sidebar: [
				{
					label: 'Noki',
					items: [
						{ label: 'Installation', slug: 'noki/installation' },
					],
				},
				{
					label: 'Reptile',
					items: [
						{ label: 'Installation', slug: 'reptile/installation' },
						{ label: 'Modification', slug: 'reptile/modification' },
					],
				},
				{
					label: 'Sliders',
					items: [
						{ label: 'Installation', slug: 'sliders/installation' },
						{ label: 'Modification', slug: 'sliders/modification' },
						{ label: 'Deployment', slug: 'sliders/deployment' },
					],
				},
			],
		}),
	],
	output: 'static',
	outDir: './docs',
	build: {
		assets: 'astro'
	}
});
