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
						{ label: 'Noki Setup', slug: 'noki/setup' },
						{ label: 'Noki Running', slug: 'noki/running' },
					],
				},
				{
					label: 'Reptile',
					items: [
						{ label: 'Reptile Installation', slug: 'reptile/installation' },
						{ label: 'Reptile Modification', slug: 'reptile/modification' },
					],
				},
				{
					label: 'Sliders',
					items: [
						{ label: 'Sliders Installation', slug: 'sliders/installation' },
						{ label: 'Sliders Modification', slug: 'sliders/modification' },
						{ label: 'Sliders Deployment', slug: 'sliders/deployment' },
					],
				},
			],
		}),
	],
	output: 'static',
	outDir: './docs',
	build: {
		assets: 'astro'
	},
	base: '/desdr-documentation/'
});
