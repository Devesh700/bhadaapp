
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['Roboto', 'system-ui', 'sans-serif'],
				body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'rgb(var(--border))',
				input: 'rgb(var(--input))',
				ring: 'rgb(var(--ring))',
				background: 'rgb(var(--background))',
				foreground: 'rgb(var(--foreground))',
				primary: {
					DEFAULT: 'rgb(var(--primary))',
					foreground: 'rgb(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'rgb(var(--secondary))',
					foreground: 'rgb(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'rgb(var(--destructive))',
					foreground: 'rgb(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'rgb(var(--muted))',
					foreground: 'rgb(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'rgb(var(--accent))',
					foreground: 'rgb(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'rgb(var(--popover))',
					foreground: 'rgb(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'rgb(var(--card))',
					foreground: 'rgb(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'rgb(var(--sidebar-background))',
					foreground: 'rgb(var(--sidebar-foreground))',
					primary: 'rgb(var(--sidebar-primary))',
					'primary-foreground': 'rgb(var(--sidebar-primary-foreground))',
					accent: 'rgb(var(--sidebar-accent))',
					'accent-foreground': 'rgb(var(--sidebar-accent-foreground))',
					border: 'rgb(var(--sidebar-border))',
					ring: 'rgb(var(--sidebar-ring))'
				},
				navy: {
					DEFAULT: '#1a365d', // Deep navy blue
					light: '#2d4a6b',
					dark: '#142a4a',
					50: '#f0f4f8',
					100: '#d6e4f0',
					200: '#adc2de',
					300: '#85a0cc',
					400: '#5c7eba',
					500: '#345ca8',
					600: '#2d4a6b',
					700: '#1a365d',
					800: '#142a4a',
					900: '#0e1e37',
				},
				warm: {
					red: '#e53e3e', // Warm accent red
					gold: '#d69e2e', // Warm gold
				},
				neutral: {
					light: '#f7fafc', // Light gray
					medium: '#718096', // Medium gray
					DEFAULT: '#2d3748', // Default text
				},
				success: {
					DEFAULT: '#38a169', // Success green
					light: '#48bb78',
					dark: '#2f855a',
				},
				granite: {
					DEFAULT: '#333333', // Granite black
					light: '#555555',
					dark: '#222222',
				},
				'cyan-blue': {
					DEFAULT: '#05D1EB', // Cyan blue
					light: '#05D1EB',
					dark: '#0077B6',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out'
			},
			boxShadow: {
				'property': '0 4px 20px rgba(26, 54, 93, 0.08)',
				'feature': '0 10px 30px rgba(26, 54, 93, 0.05)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 25px -3px rgba(26, 54, 93, 0.15), 0 4px 6px -2px rgba(26, 54, 93, 0.05)',
				'premium': '0 20px 40px -10px rgba(229, 62, 62, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
