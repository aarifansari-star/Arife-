sed -i 's/const hasAppliedCoin = localStorage.getItem('\''dev-coin-999g'\'');/const hasAppliedCoinReset = localStorage.getItem('\''dev-coin-reset-0'\'');/g' src/App.tsx
sed -i 's/if (!hasAppliedCoin) {/if (!hasAppliedCoinReset) {/g' src/App.tsx
sed -i 's/useUserStore.setState({ coins: 999999999999 });/useUserStore.setState({ coins: 0 });/g' src/App.tsx
sed -i 's/localStorage.setItem('\''dev-coin-999g'\'', '\''true'\'');/localStorage.setItem('\''dev-coin-reset-0'\'', '\''true'\'');/g' src/App.tsx
