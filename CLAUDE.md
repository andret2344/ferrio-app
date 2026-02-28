# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit (no emit, just type errors)
npm run lint       # biome check --write (auto-fixes in place)
```

There are no tests. Lint auto-fixes formatting — always run it after editing.

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7, react-i18next, Biome.

## Code conventions

**1 file = 1 exported component.** Every component lives in its own file.

**Biome** replaces both ESLint and Prettier. Formatting: tabs, single quotes, no trailing commas, 120-char line width. Import order is enforced: React ecosystem (react, react-i18next, react-router-dom) → Node builtins → third-party packages → internal aliases → relative paths.

**Always use curly braces** for `if`, `else`, `for`, and `while` — even single-line bodies.

**No `&&`, `||`, or ternary in JSX.** Use `if`/`else` with early returns instead:
```tsx
// Wrong
{isLoading && <Spinner />}
{error ? <Error /> : <Content />}

// Right
if (isLoading) {
    return <Spinner />;
}
if (error) {
    return <Error />;
}
return <Content />;
```
For conditional rendering of a *part* of a tree (not the whole return), extract a component.

**All functions require explicit return types.** No `any`.

**Helper logic belongs in one of two places only:** inside the component function (if it closes over props/state or is component-specific) or in a dedicated `src/utils/` file (if it is reusable or pure). No inline helpers defined outside both of these.

**Prefer `const` over `let`.** Use `let` only when the variable is actually reassigned. Never declare a variable with `let` if its value is set once.

## Virtual date system — the most important non-obvious concept

The Ferrio API serves holidays for **Feb 29** and **Feb 30** year-round, even though JS `Date` cannot represent them in non-leap years. These are "virtual" dates. All virtual-date logic lives in `src/utils/virtualDate.ts`:

- `nextDay` — virtual-aware: Feb 28→29→30→Mar 1
- `nextRealDay` — skips virtual days: Feb 28/29/30 → Mar 1 (used for loop advancement)
- `toRealCalendar` — maps virtual dates to real calendar positions for arithmetic (Feb 29→Mar 1, Feb 30→Mar 2)
- `getAdjacentDay` — full-year navigation including virtual Feb dates; forward direction delegates to `nextDay`
- `generateDateEntries(startMonth, startDay, minCount)` — returns **at least** `minCount` entries; injects Feb 29+30 after Feb 28, so the result may exceed `minCount` by up to 2
- `isValidDay(month, day)` — validates URL params including virtual Feb dates
- `advanceEntries` — advances by display-entry count, where Feb 28 = 3 entries, Feb 29 = 2 entries

## API and caching

`src/utils/ferrioApi.ts` fetches from `https://api.ferrio.app/v3/holidays?lang=&day=&month=`. Responses are cached in a module-level `Map` with a 1-hour TTL. When the cache reaches 14 entries it is cleared entirely, forcing the next batch of fetches to go to the network. `mature_content: true` items are filtered out client-side.

## Routing

```
/              → redirects to today's date
/day/:month/:day   → Day page (via DayWrapper)
/upcoming/:week    → Upcoming page (week offset from tomorrow, default 0)
/upcoming          → redirects to /upcoming/0
```

`DayWrapper` validates `:month` and `:day` params using `isValidDay` and redirects invalid URLs to today. It keys `<Day>` by `${month}-${day}` to force a full remount on date changes.

The carousel index is stored in the URL hash (`/day/2/15#3`). `Day.tsx` uses an `internalHashChange` ref to break the circular loop between `navigate(pathname + '#' + index)` and the `useEffect([location.hash])` that reads it back.

## i18n

Two locales: `en` and `pl`. Translation files at `src/i18n/locales/{en,pl}.json`. Language is detected from `localStorage` key `"language"`, falling back to the browser's `navigator.language`. `useLang()` returns the current language as `'en' | 'pl'` — components call this hook directly rather than accepting `lang` as a prop.

## Upcoming page

`useUpcomingHolidays(weekOffset)` computes a start date from tomorrow + the week offset, then fires 7–9 parallel requests (one per display entry via `Promise.allSettled`). Positive offsets use `advanceEntries`; negative offsets use `toRealCalendar` to convert virtual dates before JS `Date` arithmetic.
