export function isRateLimitError(response: Response): boolean {
  return (
    response.status === 403 &&
    response.headers.get("X-RateLimit-Remaining") === "0"
  );
}

export function isNotFoundError(response: Response): boolean {
  return response.status === 404;
}

function buildRateLimitError(response: Response): Error {
  const resetTime = response.headers.get("X-RateLimit-Reset");
  const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
  return new Error(
    `Rate limit exceeded. Resets at ${resetDate?.toLocaleTimeString()}`,
  );
}

const errorHandlers: Array<{
  match: (response: Response) => boolean;
  build: (response: Response) => Error;
}> = [
  { match: isRateLimitError, build: buildRateLimitError },
  { match: isNotFoundError, build: () => new Error("Resource not found") },
];

export function mapGithubError(response: Response): Error {
  const handler = errorHandlers.find(({ match }) => match(response));
  return handler
    ? handler.build(response)
    : new Error(`HTTP error: ${response.status}`);
}
