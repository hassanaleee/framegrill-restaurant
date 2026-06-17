const apiKey = import.meta.env.VITE_ANTHROPIC_KEY || '';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  };
};

export async function askChatbot(
  messages: { role: string; content: string }[],
  menuData: any
): Promise<string> {
  const systemPrompt = `You are a helpful assistant for Frame Grill restaurant. You help customers with menu questions, recommendations, hours, and reservations. Here is our menu data: ${JSON.stringify(menuData)} Our hours are Monday-Sunday 12pm-11pm. We are located in Islamabad. Be friendly, concise and helpful.`;

  try {
    if (!apiKey || apiKey === 'your_key_here') {
      throw new Error('Anthropic API key is not configured. Please set VITE_ANTHROPIC_KEY in your .env file.');
    }

    // Filter messages to only include role and content to adhere strictly to API format
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: formattedMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API Error Response:', data);
      throw new Error(data.error?.message || `API error: ${response.status} ${response.statusText}`);
    }

    if (data.content && data.content[0] && data.content[0].text) {
      return data.content[0].text;
    }

    throw new Error('Unexpected response format from Anthropic API.');
  } catch (error) {
    console.error('Error calling askChatbot:', error);
    throw error;
  }
}

export async function getMenuRecommendation(
  preference: string,
  menuData: any
): Promise<string> {
  const systemPrompt = `You are a menu recommendation expert for Frame Grill restaurant. Given the customer's mood or dietary preference, recommend 2-3 specific items from the menu with a brief reason why. Here is the menu: ${JSON.stringify(menuData)}`;

  try {
    if (!apiKey || apiKey === 'your_key_here') {
      throw new Error('Anthropic API key is not configured. Please set VITE_ANTHROPIC_KEY in your .env file.');
    }

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: preference,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API Error Response:', data);
      throw new Error(data.error?.message || `API error: ${response.status} ${response.statusText}`);
    }

    if (data.content && data.content[0] && data.content[0].text) {
      return data.content[0].text;
    }

    throw new Error('Unexpected response format from Anthropic API.');
  } catch (error) {
    console.error('Error calling getMenuRecommendation:', error);
    throw error;
  }
}
