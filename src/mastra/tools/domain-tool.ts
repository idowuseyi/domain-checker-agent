import { createTool } from '@mastra/core/tools';
import { z } from "zod";
import whis, { getRaw } from "whis";

const DomainToolSchema = z.object({
	domain: z.string().describe("The domain name to check (e.g., example.com)"),
});

const WhoisResultSchema = z.string().describe("The raw WHOIS data as a string");

export const DomainTool = createTool({
	id: "domain-checker",
	description: "Check a domain name and return it's basic info including the expiry date",
	inputSchema: DomainToolSchema,
	outputSchema: WhoisResultSchema,
	execute: async ({ context }) => {
		if (!context.domain) {
			throw new Error("No domain provided. Input a valid domain name");
		}
		const { domain } = context;
		try {
			const domainData = await getRaw(domain);
			return domainData;
			
		} catch (error: any) {
			throw new Error(`Error checking domain: ${error.message}`);
		}
	},
});
