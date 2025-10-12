// app/layout.js
export const metadata = {
  title: 'LARLEED',
  description: 'LARLEED Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-300">
        {children}
      </body>
    </html>
  )
}