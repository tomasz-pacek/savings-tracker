type DeleteAccountProps = {
  name: string;
  confirmUrl?: string;
  requiresConfirmation?: boolean;
};

export default function DeleteAccountTemplate({
  name,
  confirmUrl,
  requiresConfirmation = false,
}: DeleteAccountProps) {
  const heading = requiresConfirmation
    ? "Confirm account deletion"
    : "Your account has been deleted";
  const body = requiresConfirmation
    ? `Hi ${name}, we received a request to permanently delete your account. This action cannot be undone. Click below to confirm.`
    : `Hi ${name}, your account and all associated data have been permanently deleted. We're sorry to see you go.`;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{heading}</title>
      </head>
      <body style={styles.body}>
        <table style={styles.wrapper} cellPadding={0} cellSpacing={0}>
          <tr>
            <td align="center">
              <table style={styles.container} cellPadding={0} cellSpacing={0}>
                {/* Header */}
                <tr>
                  <td style={styles.header}>
                    <div style={styles.logoMark}>✦</div>
                    <p style={styles.logoText}>Savings Tracker</p>
                  </td>
                </tr>

                {/* Destructive accent bar */}
                <tr>
                  <td style={styles.accentBar} />
                </tr>

                {/* Body */}
                <tr>
                  <td style={styles.content}>
                    <div style={styles.iconWrap}>
                      <span style={styles.icon}>⚠</span>
                    </div>
                    <h1 style={styles.heading}>{heading}</h1>
                    <p style={styles.text}>{body}</p>

                    {requiresConfirmation && confirmUrl && (
                      <table
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ margin: "32px auto" }}
                      >
                        <tr>
                          <td>
                            <a
                              href={confirmUrl}
                              style={styles.buttonDestructive}
                            >
                              Yes, delete my account
                            </a>
                          </td>
                        </tr>
                      </table>
                    )}

                    {requiresConfirmation && (
                      <p style={styles.subtext}>
                        This link expires in <strong>24 hours</strong>. If you
                        didn&apos;t request this, your account is safe — no
                        action is needed.
                      </p>
                    )}

                    <div style={styles.divider} />

                    {requiresConfirmation && confirmUrl && (
                      <>
                        <p style={styles.fallbackLabel}>
                          Or copy this link into your browser:
                        </p>
                        <p style={styles.fallbackUrl}>{confirmUrl}</p>
                      </>
                    )}
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={styles.footer}>
                    <p style={styles.footerText}>
                      © {new Date().getFullYear()} Savings Tracker ·{" "}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f4f4f5",
    margin: 0,
    padding: "40px 16px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  wrapper: {
    width: "100%",
  },
  container: {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #e4e4e7",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: "28px 40px 20px",
    borderBottom: "1px solid #f4f4f5",
    textAlign: "left" as const,
  },
  logoMark: {
    display: "inline-block",
    color: "#C2622D",
    fontSize: "18px",
    marginRight: "6px",
  },
  logoText: {
    display: "inline-block",
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#18181b",
    verticalAlign: "middle",
  },
  accentBar: {
    height: "3px",
    backgroundColor: "#ef4444",
    display: "block",
  },
  content: {
    padding: "36px 40px 32px",
    textAlign: "center" as const,
  },
  iconWrap: {
    width: "52px",
    height: "52px",
    backgroundColor: "#fef2f2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  icon: {
    fontSize: "22px",
    lineHeight: "52px",
    display: "block",
    color: "#ef4444",
  },
  heading: {
    margin: "0 0 12px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#18181b",
    letterSpacing: "-0.3px",
  },
  text: {
    margin: "0",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#71717a",
  },
  buttonDestructive: {
    display: "inline-block",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    letterSpacing: "-0.1px",
  },
  buttonSecondary: {
    display: "inline-block",
    backgroundColor: "#f4f4f5",
    color: "#18181b",
    textDecoration: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  subtext: {
    fontSize: "13px",
    color: "#a1a1aa",
    lineHeight: "1.6",
    margin: "0",
  },
  divider: {
    height: "1px",
    backgroundColor: "#f4f4f5",
    margin: "24px 0",
  },
  fallbackLabel: {
    fontSize: "12px",
    color: "#a1a1aa",
    margin: "0 0 6px",
  },
  fallbackUrl: {
    fontSize: "11px",
    color: "#C2622D",
    wordBreak: "break-all" as const,
    margin: 0,
  },
  footer: {
    backgroundColor: "#fafafa",
    padding: "16px 40px",
    borderTop: "1px solid #f4f4f5",
    textAlign: "center" as const,
  },
  footerText: {
    margin: 0,
    fontSize: "12px",
    color: "#a1a1aa",
  },
  footerLink: {
    color: "#a1a1aa",
    textDecoration: "underline",
  },
};
