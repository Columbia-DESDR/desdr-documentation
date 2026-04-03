---
title: "Sliders Export & Save Data"
description: How user state and chart data are persisted via Convex, and how to include new features in the save/load cycle.
---

## Convex Save/Load System

This section documents how user state and chart data are persisted via Convex, and how to include new features in the save/load cycle.

---

### Save Flow

When the user clicks **Save**:

1. `magic.exportData()` captures the latest query results from every backend marked `save: true` in `config.yml`. This is sent to the `dataTable`.
2. `magic.exportState()` captures the interaction state of all registered views (slider positions, dropdown selections). This is parsed as JSON, then the current `uiToggles` store (all checkbox states) is embedded under a `__uiToggles` key. The combined object is sent to the `stateTable`.

### Load Flow

When the user clicks **Login**:

1. The `stateTable` is queried for the username.
2. If `__uiToggles` exists in the response, it is **merged** into the current `uiToggles` store (preserving any dynamically added keys that aren't in the saved data).
3. The remaining state is passed to `magic.importState()`, which iterates **all** registered views and calls each view's `load()` function to restore slider positions, dropdown selections, etc.

### Logout

Triggers `window.location.reload()` — a full page reset that returns everything to initial defaults.

### Convex Table Configuration

Table names are set in `config.yml` under the Login view. Tables are created automatically on first save.

```yaml
- type: Login
  name: Login
  selector: "#login"
  dataTable: Madagascar_Red_Cross_Data
  stateTable: Madagascar_Red_Cross_State
```

Change these names to isolate data between deployments or countries.

---

## Saving a New Feature to Convex

There are four types of features you might want to persist. Each has a different integration path.

---

### Type A: New Chart Overlay on the Performance Chart

**Files to edit:** `config.yml` only

This is the simplest case. The data-driven overlay system handles everything automatically.

**Step 1.** Add the parquet source under `backends > duckdb > sources`:

```yaml
  - parquet: "my_data.parquet"
    name: my_data
```

**Step 2.** Add a query backend. Use `query_template` for simple queries, or `query: ""` with an entry in `model_out.ts` for complex ones:

```yaml
- type: query
  name: my_overlay
  db: duckdb
  query_template: year_overlay_region   # or year_overlay (no region filter)
  source_table: my_data                 # omit if same as name
  defaults:
    region: 1
    freq: 0.23
    year_start: 1993
    year_end: 2024
  save: true                            # REQUIRED for Convex data saving
```

**Two query templates are available:**
- `year_overlay` — filters by year only. Use when the data is the same for all regions (e.g., badyear, ipc).
- `year_overlay_region` — filters by year AND `gid = 'var(region)'`. Use when data changes per village (e.g., wrsi, ndvi).

**Step 3.** Add to the BarGrouped view's `overlays:` block and `data:` list:

```yaml
- type: BarGrouped
  name: severity_combined
  overlays:
    # ... existing entries ...
    my_overlay:
      label: "My Overlay"         # checkbox label
      stroke: "#ff0000"           # line color
      fill: "#ffcccc"             # background fill color
      default: false              # checked by default?
      strokeWidth: 1.5            # optional (default: 1.5)
      fillOpacity: 0.2            # optional (default: 0.2)
  data:
  - backend: severity_combined
  # ... existing backends ...
  - backend: my_overlay            # ADD THIS
  - backend: overlay
    target: overlay
```

**Step 4.** Wire to the dropdown and sliders so the overlay responds to user interactions:

```yaml
# Village_Autocomplete > interactions > to:
        - backend: my_overlay
          region: $gid

# FrequencySlider > interactions > to:
    - backend: my_overlay
      freq: $left

# StartYearSlider > interactions > to:
    - backend: my_overlay
      year_start: $left
      year_end: $right
```

**What happens automatically:**
- A checkbox appears in the Performance chart controls
- Plot marks (link + rect) render when the checkbox is checked
- The toggle state is stored in `uiToggles` under the key `overlay_my_overlay`
- Convex saves and restores the toggle state on login
- CSV export includes the toggle state

---

### Type B: New Backend / Data Query (no chart overlay)

**Files to edit:** `config.yml` (and optionally `model_out.ts`)

If you have a new data source whose query results should be saved to Convex but it is NOT a chart overlay (e.g., a new matching table, a new chart type, or background data):

**Step 1.** Add the parquet source (same as Type A Step 1).

**Step 2.** Add the backend with `save: true`:

```yaml
- type: query
  name: my_new_backend
  db: duckdb
  query: ""                # empty string -- SQL comes from model_out.ts
  defaults:
    region: 1
    freq: 0.23
    year_start: 1993
    year_end: 2024
  save: true
```

**Step 3.** Add the SQL query to `src/context/parameters/model_out.ts`:

```typescript
my_new_backend: {
  name: "my_new_backend",
  query: "SELECT * FROM my_data WHERE ..."
},
```

**Step 4.** Wire the backend to a view and to interactions in `config.yml`. A backend must be listed in a view's `data:` array so the view receives its query results, and added to interaction `to:` lists so it responds to user input.

```yaml
# In the view that should display this data, add it to the data list:
- type: MatchingTable              # or BarGrouped, Line, etc.
  name: matching_table
  selector: "#chart-4"
  data:
  - backend: mtb
  - backend: my_new_backend        # ADD -- view now receives this backend's results

# In Village_Autocomplete interactions, so it re-queries on region change:
- type: DropDown
  name: Village_Autocomplete
  interactions:
    - type: change
      name: ddc
      to:
        # ... existing backends ...
        - backend: my_new_backend  # ADD
          region: $gid

# In FrequencySlider interactions (if the query uses freq):
- type: SliderFreq
  name: FrequencySlider
  interactions:
  - type: change
    to:
    # ... existing backends ...
    - backend: my_new_backend      # ADD
      freq: $left

# In StartYearSlider interactions (if the query uses year_start/year_end):
- type: Slider
  name: StartYearSlider
  interactions:
  - type: change
    to:
    # ... existing backends ...
    - backend: my_new_backend      # ADD
      year_start: $left
      year_end: $right
```

Only add the interaction wiring for parameters your query actually uses (e.g., skip FrequencySlider if your query doesn't use `var(freq)`).

**What happens automatically:**
- `magic.saveBackends()` detects `save: true` and captures query results
- `magic.exportData()` includes this backend's data in the Convex `dataTable`
- CSV export includes the data

---

### Type C: New Checkbox / Toggle

There are two sub-types:

#### C1: Chart overlay checkbox (on the Performance chart)

**Files to edit:** `config.yml`

Follow Type A above. The checkbox is generated automatically from the `overlays:` config.

#### C2: Page-level section toggle (show/hide an entire chart section)

**Files to edit:** `src/stores.ts` and `src/routes/+page.svelte`

**Step 1.** Add the key to `uiToggles` in `src/stores.ts`:

```typescript
export const uiToggles = writable({
  showClimatology: true,
  showFarmingCycle: true,
  showActionTimeline: true,
  showMyNewSection: false,       // ADD THIS
});
```

**Step 2.** Add the checkbox and visibility binding in `src/routes/+page.svelte`:

```svelte
<!-- In the script block -->
$: showMyNewSection = $uiToggles.showMyNewSection;

<!-- In the template -->
<span>My New Section</span>
<input type="checkbox"
  checked={$uiToggles.showMyNewSection}
  on:change={() => $uiToggles.showMyNewSection = !$uiToggles.showMyNewSection}
  class="w-4 h-4"
/>
<div id="my-new-chart" class:hidden={!showMyNewSection} />
```

**What happens automatically:**
- `Login.svelte` saves the entire `uiToggles` store (including your new key) to Convex on Save
- On Login, `uiToggles.update()` merges saved values back, restoring your toggle
- On Logout, page reload resets to the default value from `stores.ts`
- CSV export includes the toggle state

---

### Type D: New Slider or Dropdown

**Files to edit:** `config.yml` only

Sliders and dropdowns are automatically saved/restored by the Magic framework if they follow the standard pattern.

**Step 1.** Add the view in `config.yml`:

```yaml
# For a range slider:
- type: Slider
  name: MyNewSlider
  selector: "#my-slider"
  min: 0
  max: 100
  description: "My Slider"
  interactions:
  - type: change
    to:
    - backend: some_backend
      my_param: $left

# For a single-value slider:
- type: SliderFreq
  name: MySingleSlider
  selector: "#my-freq"
  min: 0.1
  max: 1
  description: "My Frequency"
  interactions:
  - type: change
    to:
    - backend: some_backend
      freq: $left

# For a dropdown:
- type: DropDown
  name: MyDropdown
  selector: "#my-dropdown"
  interactions:
  - type: change
    name: my-dropdown-change
    to:
    - backend: some_backend
      some_param: $value
  index: 0
  dropdown_key: value
  data:
  - query: "SELECT * FROM ..."
```

**Step 2.** Add the DOM container in `src/routes/+page.svelte`:

```svelte
<div id="my-slider" />
```

**What happens automatically:**
- `Config.loadViews()` creates and registers the component
- `magic.view()` registers it for state tracking
- When the user interacts, Magic records the state in `dependencies.states`
- `magic.exportState()` serializes all view states (including your new slider/dropdown)
- `magic.importState()` iterates all registered views and calls `load()` to restore them
- The slider/dropdown component must expose a `load(state)` function:
  - `Slider` expects `{ left, right }`
  - `SliderFreq` expects `{ left }`
  - `DropDown` restores via its internal state mechanism

---

