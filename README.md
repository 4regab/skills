# Agent Skills for Product Work

The two app-planning skills activate whenever you say **"I want to make an app that does X"** or start a new project idea.

Instead of writing code right away, this pack checks whether the project is worth building, finds existing tools, and makes sure you have a real reason to build it.

---

## Install

Run this command in your terminal to install the skills:

```bash
npx skills add 4regab/skills

```
## Included Skills

| Skill | Folder | What It Does |
| --- | --- | --- |
| **Look Before Building** | `look-before-building` | Flags over-copied app ideas, searches live for existing apps, built-in features, and GitHub repos, then gives one verdict: USE, EXTEND, VALIDATE, or BUILD. |
| **Why This Is Different** | `why-this-is-different` | Makes you name one clear reason the app is not a clone, then asks for named people or a paid signal before more features. |

## How It Works

**Heat check** → **Live search** → **USE / EXTEND / VALIDATE / BUILD** → **Wedge sentence** → **Proof of demand**

By default, the agent pauses and points you to an existing product if one already does the job well. It pushes back once, then builds if you still want it. Learning and personal projects skip the demand check.

## Safety

The skills only suggest GitHub repos. They never clone, install, or run code from them. Not every repo is safe, so review any suggested repo yourself before installing it.
