import { describe, it, expect } from "vitest";
import { getDemoExtraction } from "@/lib/ai/demo-adapter";
import { ExtractionResultSchema } from "@/lib/ai/types";

describe("AI Extractor", () => {
  it("extracts actions from multiline text", () => {
    const text = "- Review the report\n- Send email to John\n- Update documentation";
    const result = getDemoExtraction(text);
    expect(result.actions.length).toBeGreaterThan(0);
    expect(result.actions[0].title).toBeTruthy();
  });

  it("returns valid schema-compliant result", () => {
    const text = "Buy groceries, call the dentist";
    const result = getDemoExtraction(text);
    const parsed = ExtractionResultSchema.safeParse(result);
    expect(parsed.success).toBe(true);
  });

  it("marks uncertain fields", () => {
    const text = "Do something important";
    const result = getDemoExtraction(text);
    result.actions.forEach((action) => {
      expect(action.uncertain_fields).toBeInstanceOf(Array);
    });
  });

  it("handles single line input", () => {
    const text = "Submit the quarterly report";
    const result = getDemoExtraction(text);
    expect(result.actions.length).toBeGreaterThanOrEqual(1);
    expect(result.actions[0].title.length).toBeGreaterThan(0);
  });

  it("never invents data - due_date is null for uncertain dates", () => {
    const text = "Complete the project";
    const result = getDemoExtraction(text);
    result.actions.forEach((action) => {
      // Demo adapter should not invent dates
      if (action.uncertain_fields.includes("due_date")) {
        expect(action.due_date).toBeNull();
      }
    });
  });
});
