# Agent Skills for Product Work

The five app-planning skills activate whenever you say **"I want to make an app that does X"** or start a new project idea.

Instead of writing code right away, this pack checks whether the project is worth building, finds existing tools, and ensures you have a unique angle.

---

## Install

Run this command in your terminal to install the skills:

```bash
npx skills add 4regab/skills

```
## Included Skills

| Skill | Folder | What It Does |
| --- | --- | --- |
| **Look Before Building** | `look-before-building` | Orchestrator. Coordinates the pipeline, compares options, and makes the go/no-go call. |
| **Overused App Ideas** | `overused-app-ideas` | Quick heat-check on over-copied startup and side-project categories. |
| **Find Existing Apps** | `find-existing-apps` | Live search across existing apps, GitHub repositories, and built-in tools. |
| **Why This Is Different** | `why-this-is-different` | Identifies one clear, falsifiable reason why this product is not just a clone. |
| **Proof of Demand** | `proof-of-demand` | Finds people describing the problem in public, then demands named conversations or a paid signal before writing extra features. |


## Studio Motion Director

Use `direct-product-motion` to plan and implement product videos, UI animations, and seamless loops. It includes a product interview, studio art direction, two timed blueprints, numeric motion tokens, deterministic render contracts, code starters, and a brief generator that creates shot lists plus complete coding and sound prompts.

Install only this skill:

```bash
npx skills add 4regab/skills --skill direct-product-motion
```

Start with:

> Use $direct-product-motion to define a visual direction and create a product video plan.

Shared motion tests and brief generation are validated. Renderer exports still require visual and audio QA for each production.

## How the App-Planning Pack Works

The skills run in a clear pipeline:

**Graveyard** → **Scan** → **Use / Extend / Validate / Build** → **Users**

By default, the agent pauses and redirects you if an existing product already does the job well. You can always override this, and learning or personal tools skip the validation bar.

## A warning about the tone

This pack is blunt on purpose. It pushes back **once**, and it does not sugar-coat it. It will name the apps that already do the job, and it may tell you the idea is a copy or that you did not look before asking. It goes after the idea, never at you.

It only does this once. Say you still want to build it and the agent builds it, with no second lecture and no reminders later. Say up front that you are practising or making something for yourself, and it skips the pushback entirely.
