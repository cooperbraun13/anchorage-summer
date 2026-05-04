type AdminPasswordResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

export function verifyAdminPassword(
  password: FormDataEntryValue | null,
): AdminPasswordResult {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return {
      ok: false,
      message: "ADMIN_PASSWORD is not configured.",
    };
  }

  if (typeof password !== "string" || password !== configuredPassword) {
    return {
      ok: false,
      message: "Enter the owner password to continue.",
    };
  }

  return {
    ok: true,
  };
}
