# Agent Skills for Product Work

The app-planning skill activates whenever you say **"I want to make an app that does X"** or start a new project idea.

Instead of writing code right away, it checks whether the project is worth building and finds existing tools that already do the job.

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

## How It Works

**Heat check** → **Live search** → **USE / EXTEND / VALIDATE / BUILD**

By default, the agent pauses and points you to an existing product if one already does the job well. It pushes back once, then builds if you still want it. Learning and personal projects skip the market check.

## Safety

The skill only suggests GitHub repos. It never clones, installs, or runs code from them. Not every repo is safe, so review any suggested repo yourself before installing it.
