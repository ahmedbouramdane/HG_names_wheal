class SoundManager {
  constructor() {
    this.enabled = true;
    this.audioCtx = null;
  }

  _getContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioCtx;
  }

  playTick() {
    if (!this.enabled) return;
    try {
      const ctx = this._getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 600 + Math.random() * 400;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playCelebration() {
    if (!this.enabled) return;
    try {
      const ctx = this._getContext();
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        const start = ctx.currentTime + i * 0.15;
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch (e) {}
  }

  playApplause() {
    if (!this.enabled) return;
    try {
      const ctx = this._getContext();
      for (let i = 0; i < 15; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.value = 200 + Math.random() * 2000;
        gain.gain.setValueAtTime(0.025, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.06);
      }
    } catch (e) {}
  }

  setEnabled(val) {
    this.enabled = val;
  }
}

class Confetti {
  constructor() {
    this.canvas = document.getElementById("confetti-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animating = false;
    this._resize();
    window.addEventListener("resize", () => this._resize());
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst() {
    const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#f97316"];
    this.particles = [];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = 4 + Math.random() * 14;
      this.particles.push({
        x: cx + (Math.random() - 0.5) * 100,
        y: cy + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: Math.random() * 7 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.25 + Math.random() * 0.15,
        opacity: 1
      });
    }
    if (!this.animating) {
      this.animating = true;
      this._animate();
    }
  }

  _animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let alive = false;
    for (const p of this.particles) {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.006;
      if (p.opacity <= 0) continue;
      alive = true;
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }
    if (alive) {
      requestAnimationFrame(() => this._animate());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

const _Swal = typeof Swal !== "undefined" ? Swal : null;

const HG_DATA = {
  history: {
    title: "مادة التاريخ",
    lessons: [
      {
        title: "1. التحولات الاقتصادية والمالية والاجتماعية والفكرية في العالم خلال القرن 19",
        subtitles: [
          "أ. مظاهر التحولات الاقتصادية والمالية للعالم الرأسمالي خلال القرن 19",
          "ب. العوامل المفسرة للتحولات الاقتصادية",
          "ج. الانعكاسات الاجتماعية والفكرية لتطور الاقتصاد الرأسمالي"
        ]
      },
      {
        title: "2. التنافس الإمبريالي واندلاع الحرب العالمية الأولى",
        subtitles: [
          "أ. مظاهر ومناطق التنافس الإمبريالي",
          "ب. أساليب ووسائل التنافس الإمبريالي",
          "ج. الأزمات الدولية واندلاع الحرب العالمية الأولى"
        ]
      },
      {
        title: "3. أوربا من نهاية الحرب العالمية الأولى إلى أزمة 1929",
        subtitles: [
          "أ. نتائج الحرب العالمية الأولى",
          "ب. الثورة البلشفية الاشتراكية 1917",
          "ج. أهم التطورات السياسية بروسيا",
          "د. آثار أزمة 1929 على أوربا"
        ]
      },
      {
        title: "4. الحرب العالمية الثانية: الأسباب والنتائج",
        subtitles: [
          "أ. أسباب الحرب العالمية الثانية",
          "ب. نتائج الحرب العالمية الثانية"
        ]
      },
      {
        title: "5. الضغوط الاستعمارية على المغرب ومحاولات الإصلاح",
        subtitles: [
          "أ. الضغوط العسكرية على المغرب خلال القرن 19",
          "ب. الضغوط الدبلوماسية وانتزاع امتيازات تجارية وسياسية أوربية بالمغرب",
          "ج. محاولات الإصلاح بالمغرب لمواجهة الضغوط الأجنبية وعوامل محدوديتها"
        ]
      },
      {
        title: "6. نظام الحماية بالمغرب والاستغلال الاستعماري",
        subtitles: [
          "أ. الظروف التاريخية لفرض الحماية الفرنسية على المغرب",
          "ب. المقاومة المسلحة المغربية ومراحل الاحتلال العسكري",
          "ج. مظاهر الاستغلال الاستعماري وانعكاساته على المغرب"
        ]
      },
      {
        title: "7. نضال المغرب من أجل الاستقلال واستكمال الوحدة الترابية",
        subtitles: [
          "أ. ظروف نشأة الحركة الوطنية ومطالبها الإصلاحية خلال الثلاثينات",
          "ب. مراحل ومجهودات الحركة الوطنية من اندلاع الحرب العالمية الثانية 1939 إلى استقلال المغرب 1956",
          "ج. مراحل وأساليب استكمال المغرب لوحدته الترابية (1956-1979)"
        ]
      },
      {
        title: "8. تاريخ المشرق العربي",
        subtitles: [
          "أ. دوافع ظهور النهضة الفكرية بالمشرق العربي",
          "ب. التيارات الفكرية بالمشرق العربي",
          "ج. دور اليقظة الفكرية في التطورات الفكرية التي عرفها المشرق العربي"
        ]
      }
    ]
  },
  geography: {
    title: "مادة الجغرافيا",
    lessons: [
      {
        title: "1. التنمية: المفهوم والتقسيمات الكبرى للعالم",
        subtitles: [
          "أ. مفهوم التنمية",
          "ب. المقاربات في تحديد ودراسة مفهوم التنمية",
          "ج. التقسيمات الكبرى للعالم من خلال خريطة التنمية"
        ]
      },
      {
        title: "2. المجال المغربي: الموارد الطبيعية والبشرية",
        subtitles: [
          "أ. وضعية الموارد الطبيعية بالمغرب وأساليب تدبيرها",
          "ب. وضعية الموارد البشرية بالمغرب وأساليب تدبيرها"
        ]
      },
      {
        title: "3. التهيئة الحضرية والريفية: أزمة المدينة والريف وأشكال التدخل",
        subtitles: [
          "أ. مظاهر أزمة المدينة المغربية",
          "ب. عوامل أزمة المدينة المغربية",
          "ج. أشكال التدخل لمعالجة أزمة المدينة المغربية",
          "د. مظاهر أزمة الأرياف المغربية",
          "هـ. عوامل أزمة الأرياف المغربية",
          "و. أشكال التدخل لمعالجة أزمة الأرياف المغربية"
        ]
      },
      {
        title: "4. الاختيارات الكبرى لسياسة إعداد التراب الوطني",
        subtitles: [
          "أ. مفهوم سياسة إعداد التراب الوطني",
          "ب. المبادئ الموجهة لسياسة إعداد التراب الوطني",
          "ج. الاختيارات الكبرى لسياسة إعداد التراب الوطني"
        ]
      },
      {
        title: "5. العالم العربي: مشكل الماء وظاهرة التصحر",
        subtitles: [
          "أ. مظاهر الخصاص المائي بالعالم العربي",
          "ب. عوامل الخصاص المائي بالعالم العربي",
          "ج. تدابير مواجهة مشكل الماء بالعالم العربي",
          "د. مظاهر التصحر بالعالم العربي",
          "هـ. عوامل التصحر بالعالم العربي",
          "و. تدابير مواجهة التصحر بالعالم العربي"
        ]
      },
      {
        title: "6. الاتحاد الأوروبي: نحو اندماج شامل",
        subtitles: [
          "أ. مظاهر اندماج بلدان الاتحاد الأوروبي",
          "ب. عوامل اندماج بلدان الاتحاد الأوروبي",
          "ج. حصيلة الاندماج الأوروبي وتحدياته"
        ]
      },
      {
        title: "7. الولايات المتحدة الأمريكية: قوة اقتصادية عظمى",
        subtitles: [
          "أ. مظاهر قوة الاقتصاد الأمريكي",
          "ب. العوامل المفسرة لقوة الاقتصاد الأمريكي",
          "ج. التحديات التي تواجه الاقتصاد الأمريكي"
        ]
      },
      {
        title: "8. الصين: قوة اقتصادية صاعدة",
        subtitles: [
          "أ. مظاهر قوة الاقتصاد الصيني",
          "ب. العوامل المفسرة لقوة الاقتصاد الصيني",
          "ج. التحديات التي تواجه الاقتصاد الصيني"
        ]
      }
    ]
  }
};

function getRandomHG() {
  const components = Object.values(HG_DATA);
  const component = components[Math.floor(Math.random() * components.length)];
  const lesson = component.lessons[Math.floor(Math.random() * component.lessons.length)];
  const subtitle = lesson.subtitles[Math.floor(Math.random() * lesson.subtitles.length)];
  return {
    componentName: component.title,
    lessonName: lesson.title,
    subtitleName: subtitle
  };
}

class App {
  constructor() {
    this.currentClass = "1 BAC SM 2";
    this.editMode = false;
    this.sound = new SoundManager();
    this.confetti = new Confetti();

    this.wheel = new Wheel("wheel-canvas");
    this.wheel.onSpinComplete = (name) => this._onWheelComplete(name);
    this.wheel.onTick = () => this.sound.playTick();

    this.pickHistory = [];

    this._cacheElements();
    this._populateClassSelector();
    this._loadSettings();
    this._selectClass(this.currentClass);
    this._bindEvents();
  }

  _cacheElements() {
    this.el = {
      classSelector: document.getElementById("class-selector"),
      studentInput: document.getElementById("student-input"),
      studentCount: document.getElementById("student-count"),
      studentListDisplay: document.getElementById("student-list-display"),
      editArea: document.getElementById("edit-area"),
      editToggleBtn: document.getElementById("edit-toggle-btn"),
      doneEditBtn: document.getElementById("done-edit-btn"),
      spinBtn: document.getElementById("spin-btn"),
      settingsBtn: document.getElementById("settings-btn"),
      fullscreenBtn: document.getElementById("fullscreen-btn"),
      emptyState: document.getElementById("empty-state"),
      emptyIcon: document.getElementById("empty-state-icon"),
      emptyTitle: document.getElementById("empty-state-title"),
      emptyDesc: document.getElementById("empty-state-desc"),
      wheelArea: document.getElementById("wheel-area"),
      selectedValue: document.querySelector(".selected-value"),
      historySection: document.getElementById("history-section"),
      historyList: document.getElementById("history-list"),
      mainGrid: document.getElementById("main-grid")
    };
  }

  _populateClassSelector() {
    const classes = storage.getAllClasses();
    this.el.classSelector.innerHTML = "";
    classes.forEach((cls) => {
      const btn = document.createElement("button");
      btn.className = `class-tab ${cls === this.currentClass ? "active" : ""}`;
      btn.dataset.class = cls;
      btn.textContent = cls;
      this.el.classSelector.appendChild(btn);
    });
  }

  _selectClass(className) {
    this.currentClass = className;
    document.querySelectorAll(".class-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.class === className);
    });

    this.editMode = false;
    this.el.editToggleBtn.classList.remove("active");
    this.el.editArea.classList.add("hidden");
    this._clearHistory();

    const allStudents = storage.getStudents(className);
    const wheelStudents = storage.getStudentsForWheel(className);
    const usedStudents = storage.getUsedStudents(className);

    this._renderStudentTags(allStudents, usedStudents);
    this.el.studentInput.value = allStudents.join(", ");
    this._updateStudentCount(allStudents, usedStudents);

    if (wheelStudents.length === 0) {
      if (allStudents.length === 0) {
        this._showEmpty("no-students");
      } else {
        this._showEmpty("all-selected");
      }
    } else {
      this._hideEmpty();
      this.wheel.setNames(wheelStudents);
    }

    this._updateSelectedDisplay(null);
  }

  _showEmpty(type) {
    this.el.emptyState.classList.remove("hidden");
    this.el.wheelArea.classList.add("hidden");
    if (type === "all-selected") {
      this.el.emptyIcon.textContent = "✅";
      this.el.emptyTitle.textContent = "All Students Selected";
      this.el.emptyDesc.textContent = "Every student has been picked. Reset the wheel to start again.";
    } else {
      this.el.emptyIcon.textContent = "🎯";
      this.el.emptyTitle.textContent = "No Students Yet";
      this.el.emptyDesc.textContent = "Add student names to start using the wheel.";
    }
  }

  _hideEmpty() {
    this.el.emptyState.classList.add("hidden");
    this.el.wheelArea.classList.remove("hidden");
  }

  _renderStudentTags(students, usedStudents) {
    const valid = students.filter((s) => s.trim());
    const used = usedStudents || [];
    this.el.studentListDisplay.innerHTML = "";
    if (valid.length === 0) {
      this.el.studentListDisplay.innerHTML = '<span class="student-empty-msg">No students added yet</span>';
      return;
    }
    valid.forEach((name) => {
      const tag = document.createElement("span");
      const isUsed = used.includes(name);
      tag.className = `student-tag${isUsed ? " used" : ""}`;
      tag.textContent = name;
      if (isUsed) tag.title = "Already selected";
      this.el.studentListDisplay.appendChild(tag);
    });
  }

  _updateStudentCount(allStudents, usedStudents) {
    const total = allStudents.filter((s) => s.trim()).length;
    const used = usedStudents ? usedStudents.length : 0;
    const available = total - used;
    this.el.studentCount.textContent = `${available}/${total}`;
  }

  _updateSelectedDisplay(name) {
    if (name) {
      this.el.selectedValue.textContent = name;
      this.el.selectedValue.className = "selected-value highlight";
    } else {
      this.el.selectedValue.textContent = "—";
      this.el.selectedValue.className = "selected-value";
    }
  }

  _addHistory(name) {
    this.pickHistory.unshift(name);
    if (this.pickHistory.length > 10) this.pickHistory.pop();

    this.el.historySection.classList.remove("hidden");
    this.el.historyList.innerHTML = "";
    this.pickHistory.forEach((h, i) => {
      const pill = document.createElement("span");
      pill.className = "history-pill";
      if (i === 0) pill.classList.add("latest");
      pill.textContent = h;
      this.el.historyList.appendChild(pill);
    });
  }

  _clearHistory() {
    this.pickHistory = [];
    this.el.historySection.classList.add("hidden");
    this.el.historyList.innerHTML = "";
  }

  _bindEvents() {
    this.el.classSelector.addEventListener("click", (e) => {
      const btn = e.target.closest(".class-tab");
      if (btn) this._selectClass(btn.dataset.class);
    });

    this.el.editToggleBtn.addEventListener("click", () => {
      this.editMode = !this.editMode;
      this.el.editToggleBtn.classList.toggle("active", this.editMode);
      this.el.editArea.classList.toggle("hidden", !this.editMode);
      if (this.editMode) {
        this.el.studentInput.focus();
      } else {
        this._saveStudents();
      }
    });

    this.el.doneEditBtn.addEventListener("click", () => {
      this.editMode = false;
      this.el.editToggleBtn.classList.remove("active");
      this.el.editArea.classList.add("hidden");
      this._saveStudents();
    });

    this.el.studentInput.addEventListener("input", () => {
      const names = this.el.studentInput.value.split(",").map((s) => s.trim()).filter((s) => s);
      const used = storage.getUsedStudents(this.currentClass);
      this._updateStudentCount(names, used);
    });

    this.el.spinBtn.addEventListener("click", () => this._spin());

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !e.repeat) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if (!_Swal || !_Swal.isVisible()) {
          e.preventDefault();
          this._spin();
        }
      }
    });

    this.el.settingsBtn.addEventListener("click", () => this._openSettings());
    this.el.fullscreenBtn.addEventListener("click", () => this._toggleFullscreen());

    document.getElementById("random-q-btn")?.addEventListener("click", () => this._showRandomQuestionOnly());

    document.addEventListener("fullscreenchange", () => { this._updateFullscreenIcon(); this._onFullscreenChange(); });
    document.addEventListener("webkitfullscreenchange", () => { this._updateFullscreenIcon(); this._onFullscreenChange(); });

    document.body.addEventListener("click", (e) => {
      // Don't re-trigger if click was on the fullscreen button itself (it toggles)
      if (this.el.fullscreenBtn && this.el.fullscreenBtn.contains(e.target)) return;
      // Don't re-trigger if click was on the random question FAB (it opens a modal)
      const fab = document.getElementById("random-q-btn");
      if (fab && fab.contains(e.target)) return;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const el = document.documentElement;
        if (el.requestFullscreen) {
          el.requestFullscreen().catch(() => {});
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      }
    });

    this._initResizeHandle();
  }

  _initResizeHandle() {
    const grid = this.el.mainGrid;
    if (!grid) return;

    const handle = document.createElement("div");
    handle.className = "resize-handle";
    handle.innerHTML = '<div class="resize-handle-line"></div>';
    grid.appendChild(handle);

    let dragging = false;

    const updatePos = () => {
      const rect = grid.getBoundingClientRect();
      const leftPanel = grid.querySelector(".left-panel");
      if (!leftPanel) return;
      const leftRect = leftPanel.getBoundingClientRect();
      const pct = ((leftRect.right - rect.left) / rect.width) * 100;
      handle.style.left = pct + "%";
    };

    updatePos();
    window.addEventListener("resize", updatePos);

    const onDown = (e) => {
      dragging = true;
      handle.classList.add("active");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      e.preventDefault();
    };

    const onMove = (e) => {
      if (!dragging) return;
      const rect = grid.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const pct = Math.max(20, Math.min(70, (x / rect.width) * 100));
      grid.style.setProperty("--left-w", pct + "fr");
      grid.style.setProperty("--right-w", (100 - pct) + "fr");
      handle.style.left = pct + "%";
      this.wheel._resize();
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove("active");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    handle.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);

    handle.addEventListener("touchstart", onDown, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onUp);
  }

  _onFullscreenChange() {
    setTimeout(() => {
      this.wheel._resize();
    }, 200);
  }

  _toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  _updateFullscreenIcon() {
    const isFull = document.fullscreenElement || document.webkitFullscreenElement;
    this.el.fullscreenBtn.querySelector("svg").innerHTML = isFull
      ? '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>'
      : '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>';
  }

  _loadSettings() {
    this.removeEnabled = localStorage.getItem("lydex-remove-enabled") === "true";
    const sound = localStorage.getItem("lydex-sound-enabled");
    if (sound !== null) {
      this.sound.setEnabled(sound === "true");
    }
  }

  _saveStudents() {
    const raw = this.el.studentInput.value;
    const names = raw.split(",").map((s) => s.trim()).filter((s) => s);
    const unique = [...new Set(names)];
    storage.updateStudents(this.currentClass, unique);
    this.el.studentInput.value = unique.join(", ");
    const used = storage.getUsedStudents(this.currentClass);
    this._renderStudentTags(unique, used);
    this._updateStudentCount(unique, used);
    this._refreshWheel();
    this._clearHistory();
  }

  _refreshWheel() {
    const wheelStudents = storage.getStudentsForWheel(this.currentClass);
    const allStudents = storage.getStudents(this.currentClass);

    if (wheelStudents.length === 0) {
      if (allStudents.length === 0) {
        this._showEmpty("no-students");
      } else {
        this._showEmpty("all-selected");
      }
    } else {
      this._hideEmpty();
      this.wheel.setNames(wheelStudents);
    }
  }

  _showRandomQuestionOnly() {
    if (!_Swal) return;
    const initialHg = getRandomHG();
    const htmlContent = `
      <div id="hg-random-container" class="hg-container" dir="rtl" style="margin-top: 5px;">
        <div class="hg-item hg-component">
           <span class="hg-label">المكون:</span>
           <span class="hg-val hg-highlight hg-hidden" id="hg-val-1"></span>
        </div>
        <div class="hg-item hg-lesson">
           <span class="hg-label">الدرس:</span>
           <span class="hg-val hg-hidden" id="hg-val-2"></span>
        </div>
        <div class="hg-item hg-subtitle">
           <span class="hg-label">المحور:</span>
           <span class="hg-val hg-hidden" id="hg-val-3"></span>
        </div>
        <button id="hg-retry-btn" class="swal-retry-btn hg-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.87-11.6L2.5 8"/></svg>
          إعادة المحاولة (مرة واحدة)
        </button>
      </div>
    `;

    const doReveal = (hgData, isRetry = false) => {
      const v1 = document.getElementById("hg-val-1");
      const v2 = document.getElementById("hg-val-2");
      const v3 = document.getElementById("hg-val-3");
      const btn = document.getElementById("hg-retry-btn");
      
      if (v1) { v1.className = "hg-val hg-highlight hg-hidden"; v1.textContent = hgData.componentName; }
      if (v2) { v2.className = "hg-val hg-hidden"; v2.textContent = hgData.lessonName; }
      if (v3) { v3.className = "hg-val hg-hidden"; v3.textContent = hgData.subtitleName; }
      
      if (isRetry && btn) {
        btn.style.display = "none";
      } else if (btn) {
        btn.className = "swal-retry-btn hg-hidden";
      }

      setTimeout(() => {
        if (v1) { v1.classList.remove("hg-hidden"); v1.classList.add("hg-revealed"); this.sound.playTick(); }
      }, 500);

      setTimeout(() => {
        if (v2) { v2.classList.remove("hg-hidden"); v2.classList.add("hg-revealed"); this.sound.playTick(); }
      }, 2500);

      setTimeout(() => {
        if (v3) { v3.classList.remove("hg-hidden"); v3.classList.add("hg-revealed"); this.sound.playCelebration(); }
        if (!isRetry && btn) {
          setTimeout(() => { btn.classList.remove("hg-hidden"); btn.classList.add("hg-revealed"); }, 800);
        }
      }, 4500);
    };

    _Swal.fire({
      title: "سؤال عشوائي",
      html: htmlContent,
      iconHtml: "❓",
      showConfirmButton: true,
      confirmButtonText: "إغلاق",
      confirmButtonColor: "#2563eb",
      background: "#1a2332",
      color: "#e2e8f0",
      backdrop: "rgba(0,0,0,0.6)",
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        confirmButton: "swal-custom-btn",
        htmlContainer: "swal-custom-html"
      },
      didOpen: () => {
        doReveal(initialHg, false);
        const retryBtn = document.getElementById("hg-retry-btn");
        if (retryBtn) {
          retryBtn.addEventListener("click", () => {
            doReveal(getRandomHG(), true);
          });
        }
      }
    });
  }

  _spin() {
    const wheelStudents = storage.getStudentsForWheel(this.currentClass);
    if (wheelStudents.length === 0) return;

    this.el.spinBtn.disabled = true;
    this.el.spinBtn.textContent = "...";
    this._updateSelectedDisplay(null);
    this.wheel.spin();
  }

  _onWheelComplete(name) {
    this.el.spinBtn.disabled = false;
    this.el.spinBtn.textContent = "SPIN";

    if (!name) return;

    this._updateSelectedDisplay(name);
    this._addHistory(name);

    this.sound.playCelebration();
    setTimeout(() => this.sound.playApplause(), 350);
    this.confetti.burst();

    if (_Swal) {
      const initialHg = getRandomHG();
      const htmlContent = `
        <div class="swal-student-name">${name}</div>
        <div id="hg-random-container" class="hg-container" dir="rtl">
          <div class="hg-item hg-component">
             <span class="hg-label">المكون:</span>
             <span class="hg-val hg-highlight hg-hidden" id="hg-val-1"></span>
          </div>
          <div class="hg-item hg-lesson">
             <span class="hg-label">الدرس:</span>
             <span class="hg-val hg-hidden" id="hg-val-2"></span>
          </div>
          <div class="hg-item hg-subtitle">
             <span class="hg-label">المحور:</span>
             <span class="hg-val hg-hidden" id="hg-val-3"></span>
          </div>
          <button id="hg-retry-btn" class="swal-retry-btn hg-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.87-11.6L2.5 8"/></svg>
            إعادة المحاولة (مرة واحدة)
          </button>
        </div>
      `;

      const doReveal = (hgData, isRetry = false) => {
        const v1 = document.getElementById("hg-val-1");
        const v2 = document.getElementById("hg-val-2");
        const v3 = document.getElementById("hg-val-3");
        const btn = document.getElementById("hg-retry-btn");
        
        if (v1) { v1.className = "hg-val hg-highlight hg-hidden"; v1.textContent = hgData.componentName; }
        if (v2) { v2.className = "hg-val hg-hidden"; v2.textContent = hgData.lessonName; }
        if (v3) { v3.className = "hg-val hg-hidden"; v3.textContent = hgData.subtitleName; }
        
        if (isRetry && btn) {
          btn.style.display = "none";
        } else if (btn) {
          btn.className = "swal-retry-btn hg-hidden";
        }

        setTimeout(() => {
          if (v1) { v1.classList.remove("hg-hidden"); v1.classList.add("hg-revealed"); this.sound.playTick(); }
        }, 500);

        setTimeout(() => {
          if (v2) { v2.classList.remove("hg-hidden"); v2.classList.add("hg-revealed"); this.sound.playTick(); }
        }, 2500);

        setTimeout(() => {
          if (v3) { v3.classList.remove("hg-hidden"); v3.classList.add("hg-revealed"); this.sound.playCelebration(); }
          if (!isRetry && btn) {
            setTimeout(() => { btn.classList.remove("hg-hidden"); btn.classList.add("hg-revealed"); }, 800);
          }
        }, 4500);
      };

      _Swal.fire({
        title: "The Selected",
        html: htmlContent,
        iconHtml: "👤",
        showConfirmButton: true,
        confirmButtonText: "Continue",
        confirmButtonColor: "#2563eb",
        background: "#1a2332",
        color: "#e2e8f0",
        backdrop: "rgba(0,0,0,0.6)",
        customClass: {
          popup: "swal-custom-popup",
          title: "swal-custom-title",
          confirmButton: "swal-custom-btn",
          htmlContainer: "swal-custom-html"
        },
        didOpen: () => {
          doReveal(initialHg, false);
          const retryBtn = document.getElementById("hg-retry-btn");
          if (retryBtn) {
            retryBtn.addEventListener("click", () => {
              doReveal(getRandomHG(), true);
            });
          }
        }
      });
    }

    if (this.removeEnabled) {
      storage.addUsedStudent(this.currentClass, name);
      const allStudents = storage.getStudents(this.currentClass);
      const usedStudents = storage.getUsedStudents(this.currentClass);
      this.el.studentInput.value = allStudents.join(", ");
      this._renderStudentTags(allStudents, usedStudents);
      this._updateStudentCount(allStudents, usedStudents);
      this._refreshWheel();
    }
  }

  _openSettings() {
    if (!_Swal) return;
    const soundChecked = this.sound.enabled;
    const removeChecked = this.removeEnabled;
    const usedStudents = storage.getUsedStudents(this.currentClass);
    const hasUsed = usedStudents.length > 0;

    const settingsHtml = `
      <div class="swal-settings">
        <div class="swal-setting">
          <div class="swal-setting-left">
            <div class="swal-setting-icon swal-icon-sound">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </div>
            <div class="swal-setting-text">
              <p class="swal-setting-label">Sound Effects</p>
              <p class="swal-setting-desc">Spin tick and celebration sounds</p>
            </div>
          </div>
          <label class="swal-toggle">
            <input type="checkbox" class="swal-sound-input" ${soundChecked ? "checked" : ""}>
            <span class="swal-toggle-slider"></span>
          </label>
        </div>
        <div class="swal-setting">
          <div class="swal-setting-left">
            <div class="swal-setting-icon swal-icon-remove">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div class="swal-setting-text">
              <p class="swal-setting-label">Remove Selected</p>
              <p class="swal-setting-desc">Exclude selected student from the wheel</p>
            </div>
          </div>
          <label class="swal-toggle">
            <input type="checkbox" class="swal-remove-input" ${removeChecked ? "checked" : ""}>
            <span class="swal-toggle-slider"></span>
          </label>
        </div>
        <hr class="swal-divider">
        <div class="swal-reset-section">
          <p class="swal-reset-title">Wheel Controls</p>
          <div class="swal-reset-actions">
            <button class="swal-reset-btn swal-reset-info swal-reset-wheel-btn" ${!hasUsed ? "disabled" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              Reset Wheel
            </button>
          </div>
          <p class="swal-reset-hint" style="${!hasUsed ? "opacity:0.4" : ""}">${hasUsed ? usedStudents.length + " student(s) will be put back on the wheel" : "No students have been selected yet"}</p>
        </div>
        <hr class="swal-divider">
        <div class="swal-reset-section">
          <p class="swal-reset-title">Restore Defaults (From File)</p>
          <div class="swal-reset-actions">
            <button class="swal-reset-btn swal-reset-warning swal-reset-class-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Restore Class
            </button>
            <button class="swal-reset-btn swal-reset-danger swal-reset-all-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Factory Reset All
            </button>
          </div>
        </div>
      </div>
    `;

    _Swal.fire({
      title: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Settings',
      html: settingsHtml,
      showConfirmButton: false,
      showCloseButton: true,
      background: "#1a2332",
      color: "#e2e8f0",
      customClass: {
        popup: "swal-settings-popup",
        closeButton: "swal-close-btn"
      },
      didOpen: () => {
        const popup = _Swal.getPopup();
        if (!popup) return;

        popup.querySelector(".swal-sound-input")?.addEventListener("change", (e) => {
          this.sound.setEnabled(e.target.checked);
          localStorage.setItem("lydex-sound-enabled", e.target.checked);
        });

        popup.querySelector(".swal-remove-input")?.addEventListener("change", (e) => {
          this.removeEnabled = e.target.checked;
          localStorage.setItem("lydex-remove-enabled", e.target.checked);
        });

        popup.querySelector(".swal-reset-wheel-btn")?.addEventListener("click", () => {
          const used = storage.getUsedStudents(this.currentClass);
          _Swal.fire({
            title: "Reset Wheel?",
            text: `${used.length} student(s) will be put back on the wheel.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3b82f6",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Reset",
            background: "#1a2332",
            color: "#e2e8f0"
          }).then((res) => {
            if (res.isConfirmed) {
              storage.resetWheel(this.currentClass);
              this._selectClass(this.currentClass);
              _Swal.close();
            }
          });
        });

        popup.querySelector(".swal-reset-class-btn")?.addEventListener("click", () => {
          _Swal.fire({
            title: "Restore Class?",
            text: `Restore ${this.currentClass} to default students from file?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f59e0b",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Restore",
            background: "#1a2332",
            color: "#e2e8f0"
          }).then((res) => {
            if (res.isConfirmed) {
              storage.resetClass(this.currentClass);
              this._selectClass(this.currentClass);
              _Swal.close();
            }
          });
        });

        popup.querySelector(".swal-reset-all-btn")?.addEventListener("click", () => {
          _Swal.fire({
            title: "Factory Reset All?",
            text: "All stored changes will be removed. The page will reload to apply defaults.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Reset & Reload",
            background: "#1a2332",
            color: "#e2e8f0"
          }).then((res) => {
            if (res.isConfirmed) {
              storage.resetAll();
              location.reload();
            }
          });
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    .swal-custom-popup { border-radius: 20px !important; padding: 24px 20px 16px !important; width: 440px !important; }
    .swal-student-name { font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 12px; text-shadow: 0 2px 10px rgba(59,130,246,0.3); }
    .hg-container { background: rgba(30, 41, 59, 0.7); border-radius: 14px; padding: 12px; border: 1px solid rgba(255,255,255,0.05); text-align: right; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
    .hg-item { display: flex; flex-direction: column; gap: 2px; padding-bottom: 8px; border-bottom: 1px dashed rgba(255,255,255,0.1); min-height: 48px; justify-content: center; }
    .hg-item:last-of-type { border-bottom: none; padding-bottom: 0; min-height: auto; }
    .hg-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
    .hg-val { font-size: 0.95rem; color: #e2e8f0; font-weight: 700; line-height: 1.3; display: inline-block; }
    .hg-highlight { color: #60a5fa; font-size: 1.05rem; text-shadow: 0 0 15px rgba(96,165,250,0.3); }
    .hg-hidden { opacity: 0; transform: scale(0.5); visibility: hidden; }
    .hg-revealed { animation: surpriseReveal 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; visibility: visible; }
    @keyframes surpriseReveal {
      0% { opacity: 0; transform: scale(0.3) translateY(20px); }
      60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
      100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    .swal-retry-btn { margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 8px; border-radius: 10px; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); color: #fcd34d; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.3s; }
    .swal-retry-btn:hover { background: rgba(245,158,11,0.25); transform: translateY(-1px); }
    .swal-custom-popup .swal2-icon { font-size: 2.2rem !important; width: auto !important; height: auto !important; border: none !important; margin: 0 0 6px !important; }
    .swal-custom-title { font-size: 1.3rem !important; font-weight: 800 !important; padding: 0 !important; margin-bottom: 10px !important;}
    .swal-custom-btn { border-radius: 10px !important; font-weight: 600 !important; padding: 8px 20px !important; font-size: 0.85rem !important; width: 100% !important; }
    .swal-settings-popup { border-radius: 20px !important; padding: 24px 20px 18px !important; width: 420px !important; }
    .swal-settings-popup .swal2-title { font-size: 1.05rem !important; display: flex !important; align-items: center !important; gap: 8px !important; padding: 0 0 16px !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; margin-bottom: 16px !important; font-weight: 700 !important; }
    .swal-close-btn { color: #64748b !important; transition: color 0.2s !important; }
    .swal-close-btn:hover { color: #e2e8f0 !important; }
    .swal-settings { display: flex; flex-direction: column; gap: 14px; }
    .swal-setting { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .swal-setting-left { display: flex; align-items: center; gap: 10px; flex: 1; }
    .swal-setting-icon { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .swal-icon-sound { background: rgba(59,130,246,0.12); color: #60a5fa; }
    .swal-icon-remove { background: rgba(239,68,68,0.12); color: #f87171; }
    .swal-setting-text { text-align: left; }
    .swal-setting-label { font-size: 0.85rem; font-weight: 600; color: #e2e8f0; }
    .swal-setting-desc { font-size: 0.72rem; color: #64748b; margin-top: 1px; }
    .swal-toggle { position: relative; width: 42px; height: 22px; flex-shrink: 0; display: inline-block; }
    .swal-toggle input { opacity: 0; width: 0; height: 0; }
    .swal-toggle-slider { position: absolute; inset: 0; background: #1e293b; border-radius: 11px; cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.06); }
    .swal-toggle-slider::before { content: ""; position: absolute; width: 16px; height: 16px; left: 2px; bottom: 2px; background: #64748b; border-radius: 50%; transition: all 0.3s ease; }
    .swal-toggle input:checked + .swal-toggle-slider { background: linear-gradient(135deg, #2563eb, #4f46e5); border-color: rgba(255,255,255,0.12); }
    .swal-toggle input:checked + .swal-toggle-slider::before { transform: translateX(20px); background: #fff; }
    .swal-divider { border: none; height: 1px; background: rgba(255,255,255,0.06); margin: 2px 0; }
    .swal-reset-section { display: flex; flex-direction: column; gap: 10px; }
    .swal-reset-title { font-size: 0.8rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; text-align: left; }
    .swal-reset-hint { font-size: 0.7rem; color: #64748b; text-align: center; margin: 0; }
    .swal-reset-actions { display: flex; gap: 8px; }
    .swal-reset-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 9px 10px; border-radius: 10px; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.25s ease; border: 1px solid; background: transparent; }
    .swal-reset-btn:disabled { opacity: 0.35; cursor: not-allowed; }
    .swal-reset-info { background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.2); color: #60a5fa; }
    .swal-reset-info:hover:not(:disabled) { background: rgba(59,130,246,0.2); }
    .swal-reset-warning { background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.2); color: #fcd34d; }
    .swal-reset-warning:hover { background: rgba(245,158,11,0.2); }
    .swal-reset-danger { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #fca5a5; }
    .swal-reset-danger:hover { background: rgba(239,68,68,0.2); }
  `;
  document.head.appendChild(style);
  new App();
});
