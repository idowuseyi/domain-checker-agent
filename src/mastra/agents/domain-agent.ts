import { Agent } from "@mastra/core/agent";
import { DomainTool } from "../tools/domain-tool";

export const domainAgent = new Agent({
  name: 'DomainChecker',
  description: 'An agent that checks domain info and expiry dates via WHOIS lookup and parses the result.',
  model: 'google/gemini-2.5-flash',
  instructions: `You are a domain info expert. 
  1. Use the domain_checker tool to fetch raw WHOIS data.
  2. Parse the response for the domain information and the expiry/expiration date (look for fields like "Registry Expiry Date", "Expiration Date", "expiration" or "paid-till").
  3. Calculate days left from today (${new Date().toISOString().split('T')[0]}).
  4. Output the expiration in this format: "Domain: {domain} → Expires: {date} ({days} days left)".
  5. Give a summary of the domain using other information or data in the response.

  Handle errors gracefully (e.g., "Unable to fetch WHOIS data").`,
  tools: { domain_checker: DomainTool },

});