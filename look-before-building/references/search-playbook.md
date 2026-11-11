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

GitHub

- `{job}`
- `{alias} stars:>50`
- `{job} awesome`
- org-level clones of the obvious category (search "awesome-{category}")

Product and store

- `site:producthunt.com {job}`
- `site:alternativeto.net {job}`
- `site:apps.apple.com {job}`
- `site:play.google.com {job}`

Demand / complaint

- `site:reddit.com {job} app recommend`
- `site:reddit.com "I use" {alias}`
- `{job} "looking for a tool"`

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
