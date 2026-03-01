# AI Beauty Assistant Integration Guide

## Overview

The Asper Beauty Shop uses a centralized AI brain powered by Gemini 2.5 Flash via Supabase Functions. This architecture enables omnichannel support across web, WhatsApp, Instagram, and customer support platforms without duplicating AI logic.

## Architecture

### Centralized Brain

All AI interactions flow through a single Supabase Edge Function:

```
https://[project-id].supabase.co/functions/v1/beauty-assistant
```

This ensures:
- Consistent responses across all channels
- Single source of truth for product recommendations
- Easy updates and maintenance
- Centralized analytics and monitoring

## Dual Persona Logic

The AI assistant operates with two personas:

### Dr. Sami (The Pharmacist)
- **Role:** Medical authority and skincare expert
- **Tone:** Professional, authoritative, reassuring
- **Focus:** Skin concerns, ingredient safety, medical-grade products
- **Use Cases:** Acne treatment, sensitive skin, prescription alternatives

### Ms. Zain (The Beauty Consultant)
- **Role:** Lifestyle advisor and beauty expert  
- **Tone:** Friendly, enthusiastic, trend-aware
- **Focus:** Makeup trends, beauty routines, self-care rituals
- **Use Cases:** Makeup recommendations, anti-aging, beauty tips

## 3-Click Solution Flow

The AI assistant follows a structured three-step approach:

```
1. ANALYZE
   ↓ Ask clarifying questions about skin type, concerns, current routine
   
2. RECOMMEND  
   ↓ Suggest specific products from our catalog (Vichy, La Roche-Posay, etc.)
   
3. REGIMEN
   ↓ Provide a complete routine with usage instructions
```

## Integration Methods

### 1. ManyChat Integration (WhatsApp/Instagram)

ManyChat uses External Request nodes to communicate with the AI assistant.

#### Configuration Steps:

1. **Create External Request Node**
   - Go to Flow Builder in ManyChat
   - Add "External Request" action
   - Configure the request:

2. **Endpoint Configuration**
   ```
   Method: POST
   URL: https://[project-id].supabase.co/functions/v1/beauty-assistant
   ```

3. **Headers**
   ```json
   {
     "Content-Type": "application/json",
     "Authorization": "Bearer [SUPABASE_ANON_KEY]"
   }
   ```

4. **Request Body**
   ```json
   {
     "message": "{{last_input_text}}",
     "persona": "dr-sami",
     "userId": "{{user_id}}",
     "platform": "whatsapp",
     "sessionId": "{{session_id}}"
   }
   ```

5. **Response Mapping**
   - Create custom fields to store the response:
     - `ai_response` → Main message text
     - `product_recommendations` → Array of recommended products
     - `next_step` → Suggested next action

#### Example Flow:

```
User Input: "I have acne"
    ↓
External Request to Supabase
    ↓
AI Response with Dr. Sami persona
    ↓
Success Criteria: Recommends Vichy Normaderm or La Roche-Posay Effaclar
    ↓
Display products with "Shop Now" buttons
```

### 2. Gorgias Integration

Gorgias can integrate via webhooks to route complex queries to the AI assistant.

#### Setup:

1. **Configure Webhook in Gorgias**
   - Go to Settings → HTTP Integration
   - Add new webhook endpoint
   - Point to your Supabase function

2. **Trigger Rules**
   - When: Customer sends message containing skincare keywords
   - Action: Send to AI assistant
   - Fallback: Route to human agent if confidence is low

3. **Response Handling**
   - AI response appears as internal note
   - Agent can review and send to customer
   - Or auto-send if confidence score > 90%

### 3. Web Chat Widget

For direct website integration, create a React component:

```tsx
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
}

export function BeautyAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await fetch(
      'https://[project-id].supabase.co/functions/v1/beauty-assistant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer [SUPABASE_ANON_KEY]'
        },
        body: JSON.stringify({
          message: input,
          persona: 'ms-zain', // or 'dr-sami'
          platform: 'web'
        })
      }
    );

    const data = await response.json();
    
    setMessages([
      ...messages,
      { role: 'user', content: input },
      { 
        role: 'assistant', 
        content: data.message,
        products: data.products 
      }
    ]);
  };

  return (
    // Chat UI implementation
    <div className="beauty-assistant">
      {/* Chat interface */}
    </div>
  );
}
```

## Request/Response Schema

### Request Format

```typescript
interface AssistantRequest {
  message: string;           // User's message
  persona: 'dr-sami' | 'ms-zain';  // Which persona to use
  userId?: string;           // Optional user identifier
  platform: 'web' | 'whatsapp' | 'instagram' | 'gorgias';
  sessionId?: string;        // For conversation continuity
  context?: {
    skinType?: string;
    concerns?: string[];
    previousProducts?: string[];
  };
}
```

### Response Format

```typescript
interface AssistantResponse {
  message: string;           // AI-generated response text
  products?: Array<{         // Recommended products
    id: string;
    name: string;
    brand: string;
    price: number;
    shopifyHandle: string;
    imageUrl: string;
  }>;
  nextStep?: string;         // Suggested next action
  confidence: number;        // 0-1 confidence score
  persona: string;           // Which persona responded
}
```

## Testing & Validation

### Test Scenarios

1. **Acne Concern Test**
   ```
   Input: "I have acne"
   Expected: Recommends Vichy Normaderm or La Roche-Posay Effaclar
   Persona: Dr. Sami
   ```

2. **Anti-Aging Test**
   ```
   Input: "I want to reduce wrinkles"
   Expected: Recommends retinol or peptide products
   Persona: Ms. Zain
   ```

3. **Sensitive Skin Test**
   ```
   Input: "My skin is very sensitive and gets red easily"
   Expected: Recommends gentle, fragrance-free products
   Persona: Dr. Sami
   ```

### Success Criteria

- ✅ Response time < 2 seconds
- ✅ Relevant product recommendations from catalog
- ✅ Appropriate persona selection
- ✅ Clear, actionable advice
- ✅ No hallucinated products (all must exist in Shopify)

## Security Considerations

1. **API Key Management**
   - Never expose Supabase API keys in frontend code
   - Use environment variables
   - Implement Row Level Security (RLS) in Supabase

2. **Rate Limiting**
   - Implement rate limits per user/session
   - Prevent abuse and cost overruns

3. **Input Validation**
   - Sanitize user input before sending to AI
   - Limit message length
   - Block inappropriate content

## Monitoring & Analytics

Track these metrics:

- Request volume per platform
- Average response time
- Product recommendation conversion rate
- User satisfaction scores
- Most common queries
- Persona usage distribution

## Future Enhancements

- [ ] Voice assistant integration (Alexa, Google Assistant)
- [ ] Image analysis for skin conditions
- [ ] Multi-language support
- [ ] Personalized product bundles
- [ ] Subscription recommendations
- [ ] Before/after tracking

## Support

For technical issues with the AI assistant integration:
- Review Supabase function logs
- Check API response times
- Verify authentication headers
- Test with sample payloads

---

**Note:** The Supabase function endpoint and API keys are placeholders in this documentation. Update with actual values when deploying to production.
