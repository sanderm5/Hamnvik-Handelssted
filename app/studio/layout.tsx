export const metadata = {
  title: 'Hamnvik Handelssted — Studio',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
