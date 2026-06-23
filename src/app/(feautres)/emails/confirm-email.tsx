type ConfirmEmailProps = {
  name: string;
  confirmUrl: string;
};

export default function ConfirmEmailTemplate({
  name,
  confirmUrl,
}: ConfirmEmailProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Confirm your email</title>
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

                {/* Body */}
                <tr>
                  <td style={styles.content}>
                    <h1 style={styles.heading}>Confirm your email</h1>
                    <p style={styles.text}>
                      Hi {name}, thanks for signing up. Click the button below
                      to verify your email address and activate your account.
                    </p>
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      style={{ margin: "32px auto" }}
                    >
                      <tr>
                        <td>
                          <a href={confirmUrl} style={styles.button}>
                            Confirm email address
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style={styles.subtext}>
                      This link expires in <strong>24 hours</strong>. If you
                      didn&apos;t create an account, you can safely ignore this
                      email.
                    </p>
                    <div style={styles.divider} />
                    <p style={styles.fallbackLabel}>
                      Or copy this link into your browser:
                    </p>
                    <p style={styles.fallbackUrl}>{confirmUrl}</p>
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
  content: {
    padding: "36px 40px 32px",
    textAlign: "center" as const,
  },
  iconWrap: {
    width: "52px",
    height: "52px",
    backgroundColor: "#fff7ed",
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
    color: "#C2622D",
  },
  heading: {
    margin: "0 0 12px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#18181b",
    letterSpacing: "-0.3px",
  },
  text: {
    margin: "0 0 0",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#71717a",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#C2622D",
    color: "#fff7ed",
    textDecoration: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    letterSpacing: "-0.1px",
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
    margin: "24px 0 16px",
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
