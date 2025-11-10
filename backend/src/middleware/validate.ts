import { AnyZodObject, ZodEffects } from 'zod';
import { Request, Response, NextFunction } from 'express';

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;

export function validate(schema: Schema) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params
    };
    const parsed = await schema.safeParseAsync(data);
    if (!parsed.success) {
      return next(parsed.error);
    }
    next();
  };
}

