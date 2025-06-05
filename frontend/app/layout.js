
import "./globals.css";
import { MantineProvider } from '@mantine/core'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <MantineProvider withGlobalStyles withNormalizeCSS
          theme={{
            fontFamily: 'Inter, sans-serif',
            primaryColor: 'blue',
            components: {
              Card: {
                styles: {
                  root: { backgroundColor: '#f8f9fa' },
                },
              },
            },
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
