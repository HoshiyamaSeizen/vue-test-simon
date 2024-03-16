Vue.config.devtools = true;

const rand = () => Math.floor(Math.random() * 4);
const audio = (i) => new Audio(`./sounds/${i}.ogg`);

const app = new Vue({
	el: '#root',
	data() {
		return {
			running: false,
			score: 0,
			speeds: [1500, 1000, 400],
			speed: 1000,
			prevScore: -1,
			playerTurn: false,
			seq: [],
			playerSeqInd: 0,
			shown: -1,
		};
	},
	methods: {
		start() {
			if (this.running || this.score === 10000) return this.stop();
			this.running = true;
			this.prevScore = -1;
			this.seq = [];
			this.simonTurn();
		},
		simonTurn() {
			this.playerSeqInd = 0;
			this.seq.push(rand());

			let i = 0;
			const show = () =>
				setTimeout(() => {
					if (!this.running) return;
					if (i === this.seq.length) {
						this.playerTurn = true;
						this.shown = -1;
					} else {
						this.shown = this.seq[i++];
						audio(this.shown).play();
						pause();
						show();
					}
				}, this.speed);
			const pause = () =>
				setTimeout(() => {
					this.shown = -1;
				}, this.speed - 100);
			show();
		},
		playerPick(picked) {
			if (!this.playerTurn) return;
			audio(picked).play();

			if (this.seq[this.playerSeqInd++] !== picked) return this.stop();
			if (this.playerSeqInd === this.seq.length) {
				this.score++;
				this.playerTurn = false;
				this.simonTurn();
			}
		},
		stop() {
			this.running = false;
			this.prevScore = this.score;
			this.score = 0;
			this.shown = -1;
			this.playerTurn = false;
		},
	},
});
