export type SuccessResult<Output> = {
  success: true;
  data: Output;
  error?: never;
};

export type ErrorResult<Err> = {
  success: false;
  error: Err;
  data?: never;
};

export type Result<Output, Err> = SuccessResult<Output> | ErrorResult<Err>;
