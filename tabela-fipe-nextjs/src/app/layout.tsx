//css
import "./globals.css";
// app/layout.tsx
import { FipeProvider } from '../contexts/FipeContext'; 


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <FipeProvider>
          {children}
        </FipeProvider>
      </body>
    </html>
  )
}