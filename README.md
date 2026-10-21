# IELTS Journey

**English A2 → IELTS Academic 6.5 in 52 weeks — an interactive study plan built to learn together with an AI tutor.**

🌐 **Live page:** https://nikolaikushner.github.io/ielts-journey/
🤖 **Agent instructions:** [AGENT.md](AGENT.md)

---

## Goal

| | |
| --- | --- |
| Start level | A2 |
| Target | IELTS Academic **6.5** overall, at least **6.0** in each part |
| Duration | 52 weeks (start: 2 Nov 2026) |
| Workload | ~6 hours of self-study + a tutor and 2 speaking groups per week |
| Why | Entry requirement for an online bachelor's degree, then an in-person master's |

## Phases

| Phase | Weeks | Level | Focus |
| --- | --- | --- | --- |
| 1. Foundation | 1–14 | A2 → B1 | Core grammar, Oxford 3000, short texts (100–150 words), basic speaking |
| 2. Confidence | 15–26 | B1 → B1+ | Passive, conditionals, reported speech, articles, 150–200 word texts, IELTS Speaking Part 1–2 |
| 3. Academic English | 27–38 | B1+ → B2 | Academic Word List, cohesion, paraphrasing, IELTS Writing Task 1 & 2, Speaking Part 3 |
| 4. IELTS format | 39–48 | B2 | All question types, real timing, mock tests every 2–3 weeks, exam booking |
| 5. Finish | 49–52 | — | Full mocks, weak spots, rest, exam day |

Checkpoints at weeks **14**, **26** and **38**: level test + honest review with the agent before moving on.

## Weekly structure

Each week (phases 1–3) has six tasks:

- **Grammar** — one topic, explained and drilled with the agent
- **Vocabulary** — a word block, a separate word group in [Reps: English Drills](https://apps.apple.com/search?term=Reps%20English%20Drills), reviewed daily
- **Listening** — BBC 6 Minute English → TED-Ed → TED talks
- **Reading** — graded readers → BBC Learning English → BBC Future / The Conversation
- **Writing** — one text per week, checked by the agent
- **Speaking** — a topic conversation with the agent

### Weekly rhythm

| Day | With people | Self-study |
| --- | --- | --- |
| Mon | Tutor | 30 min: vocabulary + listening |
| Tue | Speaking group | 30 min: vocabulary + listening |
| Wed | — | ~75 min: full day |
| Thu | Speaking group | 30 min: vocabulary + listening |
| Fri | — | ~75 min: full day |
| Sat | — | 2 h: writing, grammar, weekly review |
| Sun | — | Rest |

A full day: 15 min words in Reps · 20 min listening + shadowing · 25 min main task · 10–15 min speaking.

## Page features

- **Overview** — 52-week map, phases, start and exam dates
- **Week** — tasks with checkboxes and weekly notes
- **Daily** — today's routine and an 8-week streak
- **Mocks** — scores for Listening, Reading, Writing, Speaking; overall band calculated by IELTS rounding rules; progress chart against the 6.5 target
- **Errors** — personal error log ("wrong → right")
- **Resources** — exam sites, books, word lists, practice sources
- **Agent** — one-click report for the AI tutor, JSON export / import

## How to study with the agent

1. Start a new chat with an AI assistant and paste the text from [AGENT.md](AGENT.md).
2. At the start of each session, open the **Agent** tab and click **Copy report**. Send it to the agent.
3. Use commands: `daily`, `grammar`, `check writing`, `speaking`, `mock speaking`, `mock review`, `weekly review`.
4. Move the agent's **ERRORS** block into the **Errors** tab.
5. Tick completed tasks on the page.

## Data and privacy

Progress is stored only in your browser (`localStorage`). Nothing is sent to a server.
Use **Export JSON** once a week as a backup, and **Import JSON** to move to another device.

## Resources

- Exam: [IELTS.org](https://ielts.org) · [British Council](https://takeielts.britishcouncil.org) · [IDP IELTS](https://ielts.idp.com)
- Grammar: Murphy — *Essential Grammar in Use* (phase 1), *English Grammar in Use* (phases 2–3), Cambridge — *Grammar for IELTS*
- Vocabulary: [Oxford 3000 / 5000](https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000) · [Academic Word List](https://www.wgtn.ac.nz/lals/resources/academicwordlist) · Cambridge — *Vocabulary for IELTS*
- Practice: Cambridge IELTS Academic 16–19 · [IELTS Liz](https://ieltsliz.com)
- Level test: [EF SET](https://www.efset.org) · [Cambridge English](https://www.cambridgeenglish.org/test-your-english/)

## Tech

One static `index.html` — plain HTML, CSS and JavaScript, no build step, no dependencies. Hosted on GitHub Pages. Light and dark themes, mobile-friendly.
