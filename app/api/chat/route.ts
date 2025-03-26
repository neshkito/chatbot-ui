export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const question = messages[messages.length - 1].content;

    const response = await fetch("http://167.99.216.45:8000/ask", {
      method: "POST",
      body: new URLSearchParams({ query: question }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        message: {
          role: "assistant",
          content: data.answer,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong." }),
      { status: 500 }
    );
  }
}
