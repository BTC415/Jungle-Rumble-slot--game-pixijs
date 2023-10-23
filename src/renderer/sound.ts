

import { sound } from '@pixi/sound';
sound.add('spin-sound', '/assets/audio/sfx/spin.mp3');
sound.play('spin-sound');
sound.volumeAll = 0.5