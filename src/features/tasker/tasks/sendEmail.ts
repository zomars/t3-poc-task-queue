import { z } from "zod";

const sendEmailPayloadSchema = z.object({
  /**  */
  to: z.string(),
  /** The email template to send */
  template: z.string(),
});

export async function sendEmail(payload: string): Promise<void> {
  try {
    const parsedPayload = sendEmailPayloadSchema.parse(JSON.parse(payload));
    console.log(parsedPayload);
    // ... send email
  } catch (error) {
    // ... handle error
    throw error;
  }
}
