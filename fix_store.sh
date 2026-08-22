# Remove import persist
sed -i 's/import { persist } from .zustand\/middleware.;//g' src/store/userStore.ts

# Remove persist wrap
sed -i 's/export const useUserStore = create<UserState>()(/export const useUserStore = create<UserState>()(/g' src/store/userStore.ts
