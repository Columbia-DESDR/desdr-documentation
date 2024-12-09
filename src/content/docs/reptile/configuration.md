---
title: Reptile Configuration Guide
description: A step-by-step guide to configure a Reptile instance.
---

### Configurration

Configuring a Reptile instance is done via a `config.json` file in the root directory.

### Example config file

Configuration for a new instance is doing via a config.json file. 
An example config file:

```json
{
    "DEBUG": true,
    "DATA_SOURCES": {
        "FILENAME": "./data/test/DRC_badyears_forzach.csv",
        "SATELLITE_DATA": [
            {
                "NAME": "source_a",
                "PATH": "./data/test/season_a.csv"
            },
            {
                "NAME": "source_b",
                "PATH": "./data/test/season_b.csv"
            },
            {
                "NAME": "source_c",
                "PATH": "./data/test/season_c.csv"
            }
        ]
    },
    "HIERARCHY": ["province", "sector", "village", "survey_id"],
    "FEEDBACK_LEVEL": "sector",
    "TIMESPAN": {
        "START": 1990,
        "END": 2023
    },
    "DISPLAY": {
        "INSTANCE_TITLE": "Africa - Democratic Republic of the Congo",
        "TIME_NAME": "year",
        "NUMERICAL_NAME": "rank",
        "COMMENT_NAME": "comments"
    },
    "COLORS": {
        "FARMERS": "#9F2B68",
        "SATELLITE": ""
    },
    "PASSWORD": "foobar"
}
```
