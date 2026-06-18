export interface NextRequest extends Request {}

export class NextResponse extends Response {
  static json(body: unknown, init?: ResponseInit) {
    return new NextResponse(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers as Record<string, string> | undefined),
      },
      status: init?.status,
      statusText: init?.statusText,
    });
  }
}
