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
    // 30% chance of failing
    if (Math.random() > 0.7) throw new Error("Failed to send email");
    // ... send email
  } catch (error) {
    // ... handle error
    console.error(error);
    throw error;
  }
}
