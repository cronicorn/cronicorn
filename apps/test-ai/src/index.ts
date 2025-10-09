#!/usr/bin/env node
/* eslint-disable ts/no-explicit-any */
/* eslint-disable node/no-process-env */
/* eslint-disable no-console */

// Minimal test app to validate AI scheduler + Vercel AI SDK integration
// Usage: OPENAI_API_KEY=your_key pnpm start

import { openai } from "@ai-sdk/openai";
import { createVercelAiClient } from "@cronicorn/feature-ai-vercel-sdk";
import { defineTools } from "@cronicorn/scheduler/domain/ports.js";
import { z } from "zod";

async function main() {
  console.log("🚀 Testing AI Scheduler + Vercel AI SDK Integration");

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Please set OPENAI_API_KEY environment variable");
    process.exit(1);
  }

  // Create the AI client using our adapter
  const aiClient = createVercelAiClient({
    model: openai("gpt-3.5-turbo"),
    maxOutputTokens: 500,
    temperature: 0.7,
    logger: {
      info: (msg: string, meta?: any) => console.log(`ℹ️  ${msg}`, meta || ""),
      warn: (msg: string, meta?: any) => console.warn(`⚠️  ${msg}`, meta || ""),
      error: (msg: string, meta?: any) => console.error(`❌ ${msg}`, meta || ""),
    },
  });

  // Define some test tools with Zod schemas
  const tools = defineTools({
    tellJoke: {
      description: "When user asks you to tell a joke, you must call this tool.",
      execute: async () => {
        return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛";
      },
      meta: {
        schema: z.object({}), // No parameters needed
      },
    },
    calculateSum: {
      description: "Calculate the sum of two numbers",
      execute: async (args: { a: number; b: number }) => {
        return `The sum of ${args.a} and ${args.b} is ${args.a + args.b}`;
      },
      meta: {
        schema: z.object({
          a: z.number().describe("First number"),
          b: z.number().describe("Second number"),
        }),
      },
    },
  });

  try {
    console.log("\\n📝 Testing basic AI generation...");

    const result = await aiClient.planWithTools({
      model: "gpt-3.5-turbo", // Required by interface
      input: "Hello! Please tell me a short joke about programming.",
      tools,
      maxTokens: 200,
    });

    console.log("\\n✅ AI Response:");
    console.log(result.text);

    if (result.usage) {
      console.log("\\n📊 Usage:");
      console.log(`  Prompt tokens: ${result.usage.promptTokens}`);
      console.log(`  Completion tokens: ${result.usage.completionTokens}`);
    }
  }
  catch (error) {
    console.error("\\n❌ Error:", error);
    process.exit(1);
  }

  console.log("\\n🎉 Test completed successfully!");
}

// Run the test
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
