/* eslint-disable no-unused-vars */
export default interface CodeExecutorStrategy {
  // eslint-disable-next-line no-unused-vars
  execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string,
  ): Promise<ExecutionResponse>;
}

export type ExecutionResponse = { output: string; status: string };
