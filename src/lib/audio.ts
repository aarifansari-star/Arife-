// Simple web audio synth for game sounds

class AudioController {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private musicEnabled: boolean = true;
  private vibrateEnabled: boolean = true;
  
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  setSettings(sound: boolean, music: boolean, vibrate: boolean) {
    this.enabled = sound;
    this.musicEnabled = music;
    this.vibrateEnabled = vibrate;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed', e);
    }
  }

  vibrate(ms: number | number[]) {
    if (this.vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch(e) {}
    }
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0.05);
  }

  playDiceRoll() {
    if (!this.enabled) return;
    this.vibrate(50);
    let i = 0;
    const interval = setInterval(() => {
      this.playTone(300 + Math.random() * 200, 'square', 0.05, 0.05);
      i++;
      if (i > 5) clearInterval(interval);
    }, 50);
  }

  playMove() {
    this.playTone(400, 'triangle', 0.1, 0.05);
  }

  playCapture() {
    this.vibrate([100, 50, 100]);
    this.playTone(150, 'sawtooth', 0.2, 0.1);
    setTimeout(() => this.playTone(100, 'sawtooth', 0.3, 0.1), 100);
  }

  playHome() {
    this.vibrate(200);
    this.playTone(600, 'sine', 0.1, 0.1);
    setTimeout(() => this.playTone(800, 'sine', 0.2, 0.1), 100);
  }

  playWin() {
    this.vibrate([200, 100, 200, 100, 400]);
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.1), i * 150);
    });
  }

  playSnake() {
    this.vibrate([100, 50, 100, 50, 100]);
    let freq = 400;
    for(let i=0; i<10; i++) {
       setTimeout(() => this.playTone(freq - (i*30), 'sawtooth', 0.1, 0.05), i*50);
    }
  }

  playLadder() {
    this.vibrate([50, 50, 50]);
    let freq = 300;
    for(let i=0; i<10; i++) {
       setTimeout(() => this.playTone(freq + (i*40), 'sine', 0.1, 0.05), i*50);
    }
  }
}

export const audio = new AudioController();
