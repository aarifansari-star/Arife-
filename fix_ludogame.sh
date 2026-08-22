sed -i 's/const \[showResult, setShowResult\] = useState(false);/const [showResult, setShowResult] = useState(false);\n  const rewardGiven = React.useRef(false);/g' src/screens/LudoGame.tsx
