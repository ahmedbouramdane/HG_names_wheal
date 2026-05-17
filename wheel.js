class Wheel {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.names = [];
    this.currentRotation = 0;
    this.isSpinning = false;
    this.selectedName = null;
    this.onSpinComplete = null;
    this.onTick = null;

    this._resize();
    window.addEventListener("resize", () => this._resize());
  }

  setNames(names) {
    this.names = [...new Set(names.filter(n => n.trim()))];
    this.currentRotation = 0;
    this.selectedName = null;
    this.draw();
  }

  _resize() {
    const parent = this.canvas.parentElement;
    const section = parent.closest('.wheel-section') || parent.parentElement;
    const availW = parent.clientWidth * 0.95;
    const availH = (section ? section.clientHeight : window.innerHeight * 0.8) - 20;
    const maxDim = Math.min(availW, availH);
    const size = Math.max(280, Math.min(maxDim, 960));
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = size + "px";
    this.canvas.style.height = size + "px";
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.size = size;
    this.center = size / 2;
    this.radius = size / 2 - 14;
    this.draw();
  }

  _getColors(index, total) {
    const hue = (index * 360) / total;
    const sat = 60 + (index % 3) * 8;
    const lit = 48 + (index % 2) * 8;
    return {
      fill: `hsl(${hue}, ${sat}%, ${lit}%)`,
      stroke: `hsl(${hue}, ${sat}%, ${lit - 15}%)`,
      text: "#fff"
    };
  }

  draw(rotation) {
    const ctx = this.ctx;
    const { center, radius, size } = this;
    const r = rotation || this.currentRotation;
    const total = this.names.length;

    ctx.clearRect(0, 0, size, size);

    ctx.save();
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius + 14);
    gradient.addColorStop(0, "rgba(255,255,255,0.04)");
    gradient.addColorStop(1, "rgba(0,0,0,0.2)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, radius + 14, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    if (total === 0) {
      ctx.fillStyle = "#475569";
      ctx.font = `${Math.round(size * 0.045)}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Add students to start", center, center);
      return;
    }

    const arcSize = (2 * Math.PI) / total;

    for (let i = 0; i < total; i++) {
      const startAngle = r + i * arcSize;
      const endAngle = startAngle + arcSize;
      const color = this._getColors(i, total);

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color.fill;
      ctx.fill();
      ctx.strokeStyle = color.stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const midAngle = startAngle + arcSize / 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(midAngle);
      ctx.textAlign = "right";
      ctx.fillStyle = color.text;

      const name = this.names[i];
      const maxTextWidth = radius * 0.75;
      let fontSize = Math.max(10, Math.min(18, (radius * 0.2 * arcSize) / Math.sqrt(total)));

      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 3;
      ctx.textAlign = "right";

      const words = name.split(" ");
      let fs = fontSize;
      let lines = [name];

      while (fs >= 10) {
        ctx.font = `bold ${fs}px system-ui, sans-serif`;
        if (ctx.measureText(name).width <= maxTextWidth) {
          lines = [name];
          break;
        }
        if (words.length > 1) {
          const a = Math.ceil(words.length / 2);
          const l1 = words.slice(0, a).join(" ");
          const l2 = words.slice(a).join(" ");
          ctx.font = `bold ${fs}px system-ui, sans-serif`;
          const w1 = ctx.measureText(l1).width;
          const w2 = ctx.measureText(l2).width;
          if (w1 <= maxTextWidth && w2 <= maxTextWidth) {
            lines = [l1, l2];
            break;
          }
        }
        fs--;
      }

      ctx.font = `bold ${Math.max(10, fs)}px system-ui, sans-serif`;
      if (lines.length === 1) {
        let text = lines[0];
        while (ctx.measureText(text).width > maxTextWidth && text.length > 1) {
          text = text.slice(0, -1);
        }
        ctx.fillText(text, radius - 14, 0);
      } else {
        ctx.fillText(lines[0], radius - 14, -fs * 0.5);
        ctx.fillText(lines[1], radius - 14, fs * 0.6);
      }
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(center, center, 28, 0, 2 * Math.PI);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    const cbGrad = ctx.createRadialGradient(center - 4, center - 4, 0, center, center, 24);
    cbGrad.addColorStop(0, "#2563eb");
    cbGrad.addColorStop(1, "#4f46e5");
    ctx.beginPath();
    ctx.arc(center, center, 24, 0, 2 * Math.PI);
    ctx.fillStyle = cbGrad;
    ctx.fill();
  }

  spin() {
    if (this.isSpinning) return;
    if (this.names.length === 0) return;

    this.isSpinning = true;
    this.selectedName = null;

    const totalSpin = Math.PI * 2 * (10 + Math.random() * 5);
    const targetRotation = this.currentRotation + totalSpin;
    const duration = 5000 + Math.random() * 2000;
    const startTime = performance.now();
    const startRotation = this.currentRotation;
    let lastTickIndex = -1;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3.5);

      this.currentRotation = startRotation + totalSpin * eased;
      this.draw(this.currentRotation);

      const total = this.names.length;
      if (total > 0) {
        const arcSize = (2 * Math.PI) / total;
        const normalized = ((3 * Math.PI / 2 - this.currentRotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(normalized / arcSize) % total;
        if (idx !== lastTickIndex && progress < 0.9) {
          lastTickIndex = idx;
          if (this.onTick) this.onTick();
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.currentRotation = targetRotation % (2 * Math.PI);
        this._determineWinner();
      }
    };

    requestAnimationFrame(animate);
  }

  _determineWinner() {
    const total = this.names.length;
    if (total === 0) return;

    const pointerAngle = (3 * Math.PI) / 2;
    const normalized = ((pointerAngle - this.currentRotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const arcSize = (2 * Math.PI) / total;
    const index = Math.floor(normalized / arcSize) % total;
    this.selectedName = this.names[index];

    this.draw(this.currentRotation);
    this._highlightWinner(index);

    if (this.onSpinComplete) {
      this.onSpinComplete(this.selectedName);
    }
  }

  _highlightWinner(index) {
    const ctx = this.ctx;
    const { center, radius, size } = this;
    const total = this.names.length;
    const arcSize = (2 * Math.PI) / total;
    const startAngle = this.currentRotation + index * arcSize;
    const endAngle = startAngle + arcSize;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius + 8, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 215, 0, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 4;
    ctx.shadowColor = "rgba(251, 191, 36, 0.4)";
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();
  }
}
