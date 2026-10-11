import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./msw/server.ts";

beforeAll(() => server.listen({ onUnhandledFrame: "error" }));

afterEach(() => {
	cleanup();
	server.resetHandlers();
});

afterAll(() => server.close());
