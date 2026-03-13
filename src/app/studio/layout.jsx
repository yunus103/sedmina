export const metadata = {
  title: "SedMina Studio",
  description: "SedMina İçerik Yönetim Paneli",
};

export default function StudioLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ height: "100vh" }}>{children}</div>
      </body>
    </html>
  );
}
