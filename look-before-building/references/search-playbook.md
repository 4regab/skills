# Search playbook

Use live tools. Memory is a hint, not evidence.

## 1. Name the job, not the product

Bad: "AI productivity assistant for founders"
Good: "capture tasks from Slack and put them in one list"

Write

- Job phrase (5–12 words)
- User they claim (role + context)
- 3–6 search aliases (synonyms, old category names, competitor names)

## 2. Queries to run

Replace `{job}` and `{alias}`.

Web

- `{job} app`
- `{job} software`
- `best {job} tools {this year}` and `{last year}`
- `{alias} alternative`
- `{job} open source`
- `{job} iPhone setting` / `built in` / `Chrome extension already`
- `{closest product} limitations {constraint}`

GitHub: see section 2b.

Product and store

- `site:producthunt.com {job}`
- `site:alternativeto.net {job}`
- `site:apps.apple.com {job}`
- `site:play.google.com {job}`

Demand / complaint

- `site:reddit.com {job} app recommend`
- `site:reddit.com "I use" {alias}`
- `{job} "looking for a tool"`

## 2b. GitHub search

Goal: find the 3-5 best open-source matches in about 6 calls. Every step below is read-only. None of them downloads code.

### Pick a tool, best first

1. **`gh` CLI**, if installed. Results come back as JSON with stars, dates, and license in one call.
2. **GitHub REST API** through a page fetch: `https://api.github.com/search/repositories?q={url-encoded query}&sort=stars&per_page=10`. Without a login it allows 10 searches a minute, so stay within the budget.
3. **Web search** as a last resort: `site:github.com {keywords}` and the page `https://github.com/topics/{slug}`.

### Query rules

- Use **2-3 keywords**, not a sentence. GitHub only returns repos that match every word. "app to track daily habits and keep streaks" returns 0. "habit tracker" returns 66,000.
- Plain keywords search the name, description, and topics. Add `in:readme` (or `--match readme`) only when names are vague.
- Always add `archived:false` and `stars:>20`. This drops dead repos and one-off practice clones.
- Use `pushed:>{date 12 months ago}` when you only want living projects.

### The calls, in order

Replace `{kw}` with the keywords, `{slug}` with a hyphenated topic such as `habit-tracker`, and `{Incumbent}` with the closest product name.

```
# 1. How crowded is it? One number.
gh api -X GET search/repositories -f q='{kw}' --jq .total_count

# 2. Best keyword matches, with everything you need to judge them.
gh search repos {kw} 'stars:>20' --archived=false --sort=stars --limit 10 --json fullName,description,stargazersCount,pushedAt,createdAt,license,url

# 3. Topic match. Finds repos the keywords missed.
gh search repos --topic={slug} --archived=false --sort=stars --limit 10 --json fullName,description,stargazersCount,pushedAt,url

# 4. Repeat step 2 with one alias, only if steps 2-3 missed a must-have.
```

API version of step 2: `https://api.github.com/search/repositories?q={kw}+stars:>20+archived:false&sort=stars&per_page=10`. Read `full_name`, `description`, `stargazers_count`, `pushed_at`, `created_at`, `license.spdx_id`, `html_url`.

### Open-source copies of a named app

Don't search for "{Incumbent} clone" or "alternative to {Incumbent}". In testing, both returned practice clones with 0 stars, or awesome lists. Instead, fetch one curated list as raw text and search it for the incumbent's name or the category:

| List | Covers |
|---|---|
| `RunaCapital/awesome-oss-alternatives` (branch `main`) | Open-source alternatives to well-known SaaS, by name |
| `awesome-selfhosted/awesome-selfhosted` (branch `master`) | Self-hostable web apps, by category |
| `dkhamsing/open-source-ios-apps` (branch `master`) | iOS apps |
| `offa/android-foss` (branch `master`) | Android apps |

Raw URL: `https://raw.githubusercontent.com/{list}/{branch}/README.md`. Search the text and do not paste the whole file into context.

Optional count check: `gh api -X GET search/repositories -f q='{Incumbent} clone' --jq .total_count`. Use only the number, never the repos. Many clones (for example, "habitica clone" returned 27) means people already build this as practice.

### Judge from the results you already have

The search JSON is enough to sort most hits. Don't open a repo page to learn its stars or dates.

- Drop forks and repos whose description is off-job.
- Last push over 2 years ago: list it as a dead attempt, not an option.
- Big star count but created in the last few months: flag it (see 3b).
- Only for the 1-3 finalists, read the README to confirm the feature really exists and see how to set it up: `gh repo view {owner/repo}` or `https://raw.githubusercontent.com/{owner/repo}/HEAD/README.md`.

### Never

`git clone`, `gh repo clone`, `gh repo fork`, `gh release download`, downloading archives, or running any install command from a repo. Searching and reading is all this skill does.

## 3. Life signals

Treat as living if any of these hold

- App Store / Play reviews in the last 12 months
- GitHub commit in the last 12 months, or a documented archive note
- Public pricing or a working marketing site
- Active changelog, Discord, or changelog tweet

Treat as dead if the site 404s, last commit is years old with no fork activity, or every review says "abandoned." Dead products still count — someone already tried this shape.

## 3b. Repo warning signs

Read these from the repo page only. Never clone, install, or run the code to check.

- Account or repo created days ago, with a big star count
- Name one letter off a famous project, or a copied README
- Install steps that pipe a script into a shell (`curl ... | sh`, `iwr ... | iex`)
- Release binaries or zips with no matching source
- Obfuscated or minified source in a project that should be plain code
- No license, or issues full of "malware" / "stole my keys" reports

Report any sign you see. Always tell the user to review the repo themselves before installing.

## 4. How many is enough

Stop at 8–12 solid hits or 6 searches that return the same 3 names. Repeating names is the signal.

## 5. What to record per hit

- Name
- URL
- One sentence job
- Pricing or license
- Life signal
- Gap vs the user's request (one line, factual)

## 6. Thin-market rule

If you cannot find 3 living products and 1 repo after a real search, note "no close match found in scope." That is rare. Double-check you searched the job, not the user's invented brand. This is a note, not a verdict — still pick VALIDATE or BUILD.
