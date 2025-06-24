---
title: Custom Functions Reference
description: Detailed reference guide for all custom functions available in NOKi scripts
---

This section details the custom functions available for use in NOKi scripts. Each function is described with its purpose, arguments, and examples.

## 5.1 Response Functions

### 1. get_from_response(default, args)

**What it does:**
Fetches the latest response given by the user for a specific step in the survey or form.

**Arguments needed:**
- `args[0]` (string): The name of the step you want the response from.

**Example usage:**
```json
"args": ["start_step"]
```

### 2. get_unique_matching_responses(default, args)

**What it does:**
Calculates and returns the percentage of other users who gave the same answer as the current user for a specific question.

**Arguments needed:**
None (Usually an empty list []).

**Example usage:**
```json
"args": []
```

## 5.2 Scoring Functions

### 1. get_score(default, args)

**What it does:**
Calculates a score for the user's answer based on one of three scoring methods:
- **"Consensus"** → Match with the majority answer.
- **"Database"** → Match based on data stored in a table (using ranks).
- **"Right Answer"** → Direct match with a provided correct answer.

**Arguments needed:**
- `args[0]` (string): Scoring method ("Consensus", "Database", or "Right Answer").
- `args[1]` (string or null):
  - If method is "Right Answer", this is the correct answer string.
  - If method is "Database", this is the usecase (a type of dataset to refer to).
  - If method is "Consensus", this can be null.
- `args[2]` (integer): Points to award if the answer is correct.
- `args[3]` (integer): Points to award if the answer is wrong.

**Example usage:**
```json
"args": ["Consensus", null, 30, 0]
```

## 5.3 Comparison Functions

### 1. get_pairwise_comparison_string_option(default, args)

**What it does:**
Selects pairs of comparison items (like cities, products, etc.) from a dataset and returns one item from the current pair.

**Arguments needed:**
- `args[0]` (string): The dataset name (use case) from which to pull comparison objects.
- `args[1]` (integer): Supposed to represent maximum comparisons per user (not used in code currently).
- `args[2]` (integer): Which object to return, i.e, first or second object in the pair.
- `args[3]` (boolean): Supposed to allow repeatable comparisons (not used in the code currently).

**Example usage:**
```json
"args": ["rainfall_data", 5, 1, false]
```