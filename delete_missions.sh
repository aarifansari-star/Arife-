sed -i '/{\/\* Daily Missions \*\/}/,/<\/div>/ {
  /{\/\* Featured Goti \*\/}/!d
}' src/screens/MainMenu.tsx
