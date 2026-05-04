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
  return verifyAdminPasswordValue(
    typeof password === "string" ? password : null,
  );
}

export function verifyAdminPasswordValue(
  password: string | null | undefined,
): AdminPasswordResult {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return {
      ok: false,
      message: "ADMIN_PASSWORD is not configured.",
    };
  }

  if (!password || password !== configuredPassword) {
    return {
      ok: false,
      message: "Enter the owner password to continue.",
    };
  }

  return {
    ok: true,
  };
}
