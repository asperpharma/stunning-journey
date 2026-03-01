import { describe, expect, it, vi } from "vitest";
import { storefrontApiRequest } from "@/lib/shopify";

// Mock fetch globally
global.fetch = vi.fn();

describe("Shopify Integration", () => {
  it("should make a successful API request", async () => {
    const mockResponse = {
      data: {
        products: {
          edges: [],
        },
      },
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await storefrontApiRequest("query { products { edges { node { id } } } }");
    
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("myshopify.com"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("should handle 402 payment required error", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 402,
    });

    const result = await storefrontApiRequest("query { }");
    
    expect(result).toBeNull();
  });

  it("should throw error on non-ok response", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(storefrontApiRequest("query { }")).rejects.toThrow("HTTP error! status: 500");
  });

  it("should handle GraphQL errors", async () => {
    const mockResponse = {
      errors: [
        { message: "GraphQL error" },
      ],
    };

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    await expect(storefrontApiRequest("query { }")).rejects.toThrow("Error calling Shopify: GraphQL error");
  });
});
