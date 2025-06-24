# DESDR - Developer Guide

##  Updating Documentation

To update the deployment for documentation, follow these steps:

1. **Build the Documentation**  
   Run the following command to build your documentation:
   ```
   npm run build
   ```

2. **Preview Changes Locally**  
   After building, preview the changes locally to ensure everything looks correct:
   ```
   npm run preview
   ```

3. **Push Changes**  
   Once satisfied with the changes, push them to the `main` branch. The updates will be automatically deployed to the live site.

---

##  Project Structure

Inside your Astro + Starlight project, you will find the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Important Directories

- **`src/content/docs/`**  
  Look for `.md` or `.mdx` files in this directory. Each file corresponds to a route based on its file name.

- **`src/assets/`**  
  Images can be added here and embedded in Markdown using relative links.

- **`public/`**  
  Place static assets, such as favicons, in this directory.

---

##  Commands

All commands should be run from the root of the project in a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs the necessary dependencies              |
| `npm run dev`             | Starts the local development server at `localhost:4321` |
| `npm run build`           | Builds your production site to `./dist/`       |
| `npm run preview`         | Previews your build locally before deploying     |
| `npm run astro ...`       | Runs CLI commands like `astro add` or `astro check` |
| `npm run astro -- --help` | Provides help for using the Astro CLI           |

---

##  Updating Existing Documentation

To update existing documentation files:

1. **Clone the Repository**  
   Clone the DESER documentation repository from the GitHub page. Replace "github.com" with "github.dev" in the URL.

2. **Open the Terminal**  
   If the terminal does not appear, open the search bar at the top and type `>Terminal`.

3. **Install Dependencies**  
   Navigate to the terminal and install the required dependencies:
   ```
   npm install
   ```

4. **Locate the Document**  
   Navigate to the desired document in the `src/content/docs/` directory. The structure is as follows:
   ```
   ├── index.mdx
   ├── noki users manual
   |──noki/
   │   ├── running.md
   │   ├── setup.md
   │   
   ├── reptile/
   │   ├── configuration.md
   │   ├── installation.md
   │   └── modification.md
   └── sliders/
       ├── deployment.md
       ├── installation.md
       └── modification.md
   ```
   
5. **Make Updates**  
   Update the document as needed, ensuring that each page retains a title and description.

6. **Build Changes**  
   After making updates, return to the terminal and build the project:
   ```
   npm run build
   ```

---

##  Adding New Documentation

If you wish to add new items or documentation:

1. **Create a New File**  
   To add a new document, such as `developers_manual.md`, create the file in the appropriate folder (e.g., `noki`).

2. **Update `astro.config.mjs`**  
   Open `astro.config.mjs` and add the new item to the sidebar configuration. For example:
   ```
   {
     label: 'Noki',
     items: [
       { label: 'Noki Setup', slug: 'noki/setup' },
       { label: 'Noki Running', slug: 'noki/running' },
       { label: 'Noki Developers Manual', slug: 'noki/developers_manual' },
     ],
   }
   ```

3. **Create a New Folder for New Tools**  
   If adding documentation for a new tool, create a folder in the `docs` directory:
   ```
   mkdir "src/content/docs/NewTool"
   ```

4. **Sidebar Configuration**  
   Follow up by adding the new tool to the sidebar in `astro.config.mjs`:
   ```
   sidebar: [
     {
       label: 'NewTool',
       items: [
         { label: 'Setup', slug: 'NewTool/setup' },
       ],
     },
   ]
   ```

5. **Final Steps**  
   Build the project again with:
   ```
   npm run build
   ```
   Preview your updates with:
   ```
   npm run preview
   ```

6. **Push Your Changes**  
   If everything looks good, push your changes to the `main` branch to make them permanent.

---

This guide provides a structured approach to updating and managing documentation within the DESDR project. Follow these steps closely to ensure successful updates and deployments.
