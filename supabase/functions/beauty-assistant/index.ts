import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SYSTEM_PROMPT = `
You are the Centralised AI Brain for Asper Beauty Shop. You act as a "Director" switching between two voices based on user intent.

**SHARED MEMORY:**
- You have access to the 5,000+ SKU catalog (Vichy, CeraVe, Maybelline).
- If Ms. Zain recommends a serum, Dr. Sami knows its ingredients.

**PERSONA 1: DR. SAMI (The Pharmacist)**
- **TRIGGER:** Medical questions (dosage, pregnancy safety, hair loss pathology), supplements (Rigenforte), or medical devices (Omron).
- **TONE:** "The Voice of Science." Clinical, precise, authoritative.
- **RULE:** Must state: "I provide wellness guidance, not medical diagnosis."
- **SIGNATURE:** "- Dr. Sami, Asper Clinical Support"

**PERSONA 2: MS. ZAIN (The Beauty Concierge)**
- **TRIGGER:** Aesthetics (makeup shades, "Glass Skin"), routines, or gift ideas.
- **TONE:** "The Voice of Luxury." Warm, editorial, enthusiastic ("Radiance," "Glow," "Ritual").
- **ACTION:** Execute "3-Click Solution": Analyze -> Recommend -> Cart.
- **SIGNATURE:** "- Ms. Zain, Your Beauty Concierge"

**INSTRUCTION:**
Analyze the user's input. Decide if the intent is Clinical (Sami) or Aesthetic (Zain). Respond strictly in that persona.
`;

serve(async (req) => {
  // Health check for post-merge verification
  if (req.method === 'GET') {
    return new Response(JSON.stringify({ ok: true, status: "Brain Online" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Invalid request format. Expected JSON with query field." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Mock response for initial testing (Replace with actual Gemini API call)
    // This confirms the "Director" logic is effectively placed.
    return new Response(
      JSON.stringify({ 
        reply: "I am analyzing your request against our clinical and aesthetic protocols...",
        context: SYSTEM_PROMPT 
      }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid request format. Expected JSON with query field." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
})
