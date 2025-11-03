# Domain Expiry Checker Agent  
**Built with Mastra.ai + TypeScript + `whis`**

A **lightweight, AI-powered agent** that checks **domain expiration dates** using WHOIS lookup and intelligent parsing via an LLM.

---

## Features
- Input a domain → Get clean expiry output  

Domain: x.com → Expires: 2031-06-15 (2040 days left)

- Uses **`whis`** – a modern, fast, Promise-based WHOIS client with TypeScript support
- **Mastra.ai** handles agent logic, tool calling, and LLM parsing
- Handles **all TLDs** (.com, .io, .ai, .dev, etc.)
- **No regex hell** – LLM parses messy WHOIS formats
- CLI + extensible for web, cron, or workflows

---

## Tech Stack
| Component       | Tool |
|----------------|------|
| Framework      | [Mastra.ai](https://mastra.ai) |
| Language       | TypeScript |
| WHOIS Client   | [`whis`](https://www.npmjs.com/package/whis) |
| LLM            | OpenAI (`gpt-4o-mini`) or xAI (`grok-beta`) |
| Runtime        | Node.js ≥ 20 |

---

## Project Structure

domain-expiry-agent/
├── agents/
│   └── domainExpiryAgent.ts     # Mastra agent logic
├── tools/
│   └── whois.ts                 # WHOIS tool using whis
├── mastra.config.ts             # LLM & tracing config
├── index.ts                     # CLI entrypoint
├── package.json
├── tsconfig.json
└── README.md


---

## Setup

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd domain-expiry-agent
npm install
```

### 2. Set Up LLM API Key

cp .env.example .env

Edit .env:

```text
OPENAI_API_KEY=sk-...
# OR for Grok:
XAI_API_KEY=gsk_...
```

Mastra automatically picks the provider based on mastra.config.ts.

### Configuration

```ts
mastra.config.ts

import { defineConfig } from '@mastra-ai/core/config';

export default defineConfig({
  models: {
    default: {
      provider: 'openai',      // or 'xai'
      model: 'gpt-4o-mini',    // or 'grok-beta'
    },
  },
  tracing: true,
});
```

### Run the Agent

CLI Usage

```bash
# Check one domain
npx tsx index.ts google.com

# Default fallback
npx tsx index.ts
# → checks google.com
```

### Output:

Domain: google.com → Expires: 2028-09-14 (1412 days left)

How It Works

User inputs domain → Mastra agent receives it
Agent calls whois_lookup tool → whis fetches raw WHOIS
LLM parses the unstructured text for expiry field
Computes days left from today
Returns clean, formatted string


No fragile regex. LLM handles 100+ WHOIS formats.

### Tools: whis WHOIS Lookup

```ts
// tools/whois.ts
import whis from 'whis';

await whis('example.com');
```

- Promise-based
- No callbacks
- Auto-detects WHOIS server
- Handles timeouts & errors

Agent Prompt (Smart Parsing)

```text
Parse expiry from fields like:
- Registry Expiry Date
- Expiration Date
- paid-till
- Expires on

Output ONLY:
"Domain: {domain} → Expires: {YYYY-MM-DD} ({days} days left)"
```

### Batch Mode (Optional)

```ts
Update input schema:
ts

domains: z.array(z.string())
```

Agent will return one line per domain.

### Testing

```bash
# Test various TLDs
npx tsx index.ts x.com
npx tsx index.ts mastra.ai
npx tsx index.ts github.io
```

Troubleshooting
Issue,Solution
whis timeout,"Some TLDs block bots. Try .com, .org first"
No expiry found,LLM may miss field. Add example in prompt
Rate-limited,Add delay or cache results

### Contributing

Fork the repo
Create a branch: feat/batch-mode
Commit changes
Open a PR


### License

MIT © 2025

### Made with Mastra.ai

Build intelligent agents in TypeScript.
https://mastra.ai

#### Want a UI? Email alerts? CSV import?

Open an issue — we’ll build it.
