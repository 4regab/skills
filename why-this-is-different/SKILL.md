---
name: why-this-is-different
description: Make the user prove two things before more code - a one-line reason their app is not a clone (the wedge), and real people who have the problem (demand). Rejects fake differences like "AI-powered", "cleaner UI", or "all-in-one", and fake proof like likes, friends' praise, surveys, or Product Hunt upvotes. Use after look-before-building when the user still wants to build, when they claim a twist or niche, ask to "validate this idea", want to add auth / payments / AI / admin, plan a launch or waitlist, or have no named users yet.
---

# Why This Is Different

A clone with nicer type is still a clone. A feature nobody asked for is still waste. This skill checks both, in order:

1. **Wedge** - one sentence a stranger could prove wrong.
2. **Demand** - named people or money behind it.

Run after `look-before-building`. If that search was skipped, run it first. Tone and the push-back-once rule come from its "one hard round": blunt about the idea, never the person, then build if they insist.

Skip demand checks for learning and personal tools.

## Part 1: The wedge sentence

The user fills it in their own words, not yours:

> For `{specific person in a specific situation}` who today `{current workaround}`, this does `{one job}` that `{named incumbent}` will not do because `{constraint the incumbent ignores}`.

- **Person** is a role plus context. Not "users", "founders", or "everyone."
- **Workaround** is what they do this week: a spreadsheet, WhatsApp, memory, a named app.
- **Job** is one verb phrase.
- **Incumbent** is a real name from the `look-before-building` search.
- **Constraint** is structural: workflow, regulation, language, offline, price, distribution, or data they already hold.

**Switch test.** Ask: "If `{incumbent}` shipped your twist on Friday, would your user switch?" If yes, there is no wedge. Offer USE or EXTEND again. If no, the reason they would stay is the real constraint. Put it in the sentence.

**Reject** as the constraint: AI-powered, smarter, agents; cleaner or modern UI, dark mode; faster to build with Cursor; all-in-one, platform, OS for X; for everyone; features later; mobile and web; "no one did it exactly like this." Full list in `references/fake-wedges.md`.

**Accept** when the incumbent would have to hurt its own business to copy it:

- Works inside a tool the user cannot leave (a specific EHR, school SIS, broker terminal)
- Follows a language, regulation, or union rule the leader ignores
- Uses data the user already has that the leader cannot reach
- Offline, air-gapped, or no-account on purpose
- Priced for a buyer the leader priced out, or the reverse
- Fits an ugly real workflow (shift handover, farm radio, cash-only stall)
- A real gain in accessibility, local language, integrations, cost, simplicity, or reliability

Lived experience ("I am that user every day") is a good start. It still needs the sentence. No globally new category is required.

If the sentence is weak, do not polish it into something impressive. Show the hole and ask them to fix one slot.

## Part 2: Proof of demand

The work splits in two. The agent can find people describing the problem in public. Only the user can talk to them. Both count. Compliments do not.

**Public receipts (agent).** Search Reddit and forums, 1-star reviews of the incumbent, Discord and Slack help channels, and "does anyone have a tool for" posts. Link each one. Do not invent people or quotes. Where to look: `references/outreach.md`.

**Talks (user).** A talk counts only when a real person with the problem described their current workaround in their own words, and someone wrote notes. It does not count when it is a like, upvote, "looks nice", family being kind, a 1-10 survey, "I would use this" with no time or money, or Reddit comments on the idea.

**Paid signal beats talk.** A preorder, deposit, signed letter of intent, or a calendar hold to try a rough prototype is evidence.

**The 5-10 rule.**

1. List 10 people who showed the problem in public.
2. Talk to at least 5 before adding a second surface: a new platform, auth wall, AI layer, or admin panel.
3. Keep only requests that 3 or more people raised unprompted, or that someone committed money or time to.

If they cannot name 10 people, they do not have a market yet. Help them find where those people gather.

**Questions for talks.** No pitching on the first pass.

- Last time this happened, what did you do?
- What did that cost you in time, money, or risk?
- What have you already paid for or installed to deal with it?
- If your current fix vanished, what breaks this week?
- Who gets blamed when it fails?

Notes go in `research.md` in the **user's project**, using the template in `references/outreach.md`. Never write into this skill's folder. Read `research.md` before proposing features.

**Rules.**

- Never contact anyone, post, or publish without the user's clear go-ahead. Offer drafts only.
- Do not invent interviews, customers, willingness to pay, or traction.
- Label any success number you suggest as an experiment choice, not a fact.

## Output

```
Wedge: For {person} who today {workaround}, this does {job} that {incumbent} will not do because {constraint}.
Status: holds / weak at {slot}

- Why this is not {incumbent}:
- Will not build (the incumbent already owns it):
- Demand so far: {N} public receipts (links), {N} talks, {paid signal or none}
- Next: {smallest test, success number, stop condition}
```

## When they build anyway

- Build only the job in the wedge sentence. No second platform, custom admin, or extra AI.
- If the wedge is weak, note the clone risk once in the README.
- A feature with no named talk behind it gets tagged `unrequested` in the plan and stays tiny.
- A Product Hunt kit, launch post, or OG image with zero users: say so once, and offer to pick 10 people to message instead.
- Then do the work. Do not raise the pushback again.
