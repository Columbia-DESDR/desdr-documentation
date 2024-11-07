---
title: Sliders Modification Guide
description: A step-by-step guide to modify and enhance the Sliders project.
---

### Quick Summary

-   Make sure you've followed the [installation guide](/desdr-documentation/sliders/installation).
-   `git checkout DRC_DEMO`
-   All existing components: Go to `fist` folder.
-   <u>Learn how to create routes for pages and update pages:</u> Go to `routes > folder_name > +page.svelte`. To create a website tab, navigate to the `routes` folder and create a folder with a `+page.svelte` file. The folder name specifies the tab, and the `+page.svelte` reserves space for individual components.
-   <u>Data source</u> is in: `static > .parquet` files.
    -   **Why .parquet files?** They offer efficient compression and encoding schemes.
-   <u>Configure your component:</u> Go to `assets > configure.yml`
    -   Think of your YAML file as the brain behind your website's data display and interactions. It tells your site where to get data, how to query it, and how to show it through charts and dropdown menus. You can adjust these settings to change what data is displayed and how it interacts with user inputs.

### Getting Started

-   A computer with MacOS (for PC users, use Ubuntu in a VM)
-   Basic familiarity with the Terminal app
-   Make sure you've followed the [installation guide](./installation).
-   We'll be working on the "DRC_DEMO" branch for this demo.

### Part 1: Adding a New Page with an Existing Component

#### Set Up Your Workspace

-   Switch to the "DRC_DEMO" branch:

    ```bash
    git checkout DRC_DEMO
    ```

-   Check using `git status`.
-   Start your project with `npm run dev` and keep your demo page open to see live updates.
-   You should see a page with 3 tabs - Instructions, Two Column, and demo_page.

#### Creating Routes for Pages

1. Go to the routes directory:

    ```bash
    cd ../svelte-pi/src/routes
    ```

2. Remove the Instructions and Two Column directories:

    ```bash
    rm -r Instructions
    rm -r Two\ Column
    ```

    - You should see the two tabs disappear in the webpage.

3. Go to the `demo_page` directory:

    ```bash
    cd demo_page
    ```

4. Open the `+page.svelte` file:

    ```bash
    vi ./+page.svelte
    ```

#### Update Your Page

-   Once inside `+page.svelte`, scroll to the bottom of the page below the `</script>` tag. This section is where you are reserving space for the individual components on the page. For this demo:
    -   Try changing the size of the header and the header name.
    -   Delete the `div` for the dd component (which will be covered in a later guide), and make note of the name used for the existing line chart. By default, it is "line", but you can also change it to something like "testing".

### Component Configurations

Now that we have created a new tab and reserved space for a new component, it is time to update the config file to reflect these changes.
Location: `assets > config.yml`

Your YAML file is like a recipe that tells your website how to display data and interact with users. It's divided into four main parts:

1. **Data Sources (Backends)**
    - **What It Is:** This section lists where your data comes from. In our case, we're using data stored in `.parquet` files. Why not .csv? Because .parquet files offer efficient compression and encoding schemes.
    - **What to Know:** These files are in a folder named `static`. Each file has a unique name that the website refers to when pulling data.
2. **Data Queries (Query)**
    - **What It Is:** Here, you define what data to show using SQL queries. Our example, `demo_query`, averages rainfall (`chirps`) by year and territory from the "DRC_CHIRPS" dataset.
    - **What to Know:** You can tweak this query, like changing the territory or date range. We've set a default territory (`bulungu`) to simplify interactions, but you can adjust this as needed.
3. **Display Components (Views)**
    - **Line Chart:** This part sets up a line chart (`LineArea`) showing rainfall over years.
        - **Key Details:** You choose what data appears on the x-axis (`year`) and y-axis (`rain`). It pulls data from `demo_query`.
        - **Customization:** The chart's place on the page is marked by a unique ID (`#line`). You can change this ID if you rename the chart in your webpage's code.
    - **Dropdown Menu:** This sets up a dropdown menu to let users choose different territories.
        - **Key Details:** It starts with one option (`index: 0`) and lists territories from "DRC_CHIRPS".
        - **Interactivity:** When a user picks a territory, the chart updates to show data for that choice.
4. Making it Interactive (Interactions)
    - **What It Is:** This part connects your dropdown menu to the line chart. When someone selects a territory, the chart shows the rainfall data for that area.
    - **What to Know:** This is set up under `interactions` with a change type, meaning the chart's data changes based on the dropdown's selection.

### Part 1: Results

![part1-results-1](/src/assets/docs/sliders/part1-results-1.png)
![part1-results-2](/src/assets/docs/sliders/part1-results-2.png)

### Part 2: Making Components Interactive

#### Edit Your Demo Page

-   Back in your demo page:

    ```bash
    cd ../svelte-pi/src/routes/demo_page
    ```

    -   In `+page.svelte`, make room for a new interactive component, like a dropdown button, by adding a `div` with `id="dropdown"`.

#### Update the Config File Again

In `../svelte-pi/src/assets/config.yml`, add a new dropdown item. Ensure the dropdown's ID matches what you named your `div` in the routes folder. Configure it to display territory information.

-   Make sure the dropdown is set to `index: 0` to start with the first territory.
-   Make sure the dropdown_key is set to "territory" to match the data source.
-   For data, write a new query that pulls territory information from the "DRC_CHIRPS" dataset:

```yaml
SELECT distinct territory FROM DRC_CHIRPS
```

Your dropdown should be fully functional now, but there is currently no connection between the dropdown and the chart.

#### Enable Interactivity

-   In the config, add a new interaction that connects the dropdown to the line chart. This interaction should change the territory in the query when a user selects a new territory.

```yaml
interactions:
    - type: change
      name: dropchange
      defaults:
          territory: "bulungu"
      to:
          backend: demo_query
```

### Part 2: Results

![part2-results](/src/assets/docs/sliders/part2-results.png)
You've now added a new page with a static and an interactive component, making your site more dynamic. Congratulations!
