export default interface CodeExecutorStrategy {
  // eslint-disable-next-line no-unused-vars
  execute(code: string, inputTestCase: string): Promise<ExecutionResponse>;
}

export type ExecutionResponse = { output: string, status: string };
