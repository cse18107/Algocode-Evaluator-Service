import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { CreateSubmissionDto } from "../dtos/CreateSubmissionDto";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
      });

      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Invalid request params received",
        data: {},
        error: error,
      });
    }
  };
