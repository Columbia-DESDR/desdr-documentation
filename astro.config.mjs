import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'DESDR',
			social: {
				github: 'https://github.com/Columbia-DESDR',
			},			sidebar: [
				{
					label: 'Noki Users Manual',
					items: [
						{ label: 'Introduction', slug: 'noki_users_manual/introduction' },
						{ label: 'Admin Page Guide', slug: 'noki_users_manual/admin_page_guide' },
						{ label: 'Creating a Basic Survey', slug: 'noki_users_manual/survey' },
						{ label: 'Creating a Form', slug: 'noki_users_manual/form' },
						{ label: 'Custom Functions Reference', slug: 'noki_users_manual/custom_function_references' },
					],
				},
				{
				   label: 'Noki',
				   items: [
					   { label: 'Setup', slug: 'noki/setup' },
					   { label:'Running and Updating',slug: 'noki/running'},
				   ]
				},
				{
					label: 'Reptile',
					items: [
						{ label: 'Reptile Installation', slug: 'reptile/installation' },
						{ label: 'Reptile Configuration', slug: 'reptile/configuration' },
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
