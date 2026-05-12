const DEFAULT_CLASSES = [
  {
    "className": "1 BAC EXP 1",
    "defaultStudents": [
      "HASNAOUI HAJAR", "ELAMMARI RIME", "JLILID AYA", "BOUSABI RAYHANA", "KAFIL ALAE",
      "AMAANI FERDAWS", "KOUZA HANAE", "AKABLI YOUSSRA", "SAAF ICHRAK", "HAFDOUNE MALAK",
      "BENAMMI NADA", "CHAHBOUNE MARWA", "ETTALBI ADAM", "AFOUFOU AKRAM", "BELKACEM HIBA",
      "BENAYAD SALMA", "EDDOU MARWA", "ALAOUI ZIDANI IBRAHIM", "BOUYAHYAOUI KAWTHAR", "TAKI SAMIA",
      "IBNOU LHADAD FATIMA EZZAHRA", "DHILOU IMANE", "FADIL MALAK", "OUMOUSSA HIBA"
    ]
  }, // [cite: 6, 7]
  {
    "className": "1 BAC EXP 2",
    "defaultStudents": [
      "AIT-ROUH SOUKAYNA", "ALKOUH FATIMA EZAHARAE", "AMRANI MALAK", "AZAMIM LAILA", "BARNASSI AYA",
      "BELHOUCINE SALMA", "DAOUF AYA", "LAHRECH ARWA", "MAHIR NADA", "TAHIR IMANE",
      "ZBAKH KHAWLA", "AITANE ZAYNEB", "AMDAH KHADIJA", "BAHAQUI IMRANE", "BOUGHA HASNA",
      "EL HILALI KHAWLA", "ELMOUNJALI MAJIDA", "IRGUI MARWA", "LAHROUMI WALID", "OUNACER NISSRINE",
      "OUTAILINE MERYEM", "RACHIDI HASSNA", "SISSOUANE SALIMA"
    ]
  }, // [cite: 13, 14]
  {
    "className": "1 BAC EXP 3",
    "defaultStudents": [
      "ABAKHOUCH AMAL", "ALLAOUI KAOUTHAR", "AMAZROU KHADIJA", "CHAHI JIHANE", "EL BARAKA MALAK",
      "EL HIRI MAHMOUD", "LAMRAZKI SARA", "QUAISSA SARA", "TAHIRI SOUAD", "TAIBI DOHA",
      "TANTAOUI DIKRA", "AIT-OUARRIM RIHABE", "ALOUANI IMANE", "AZIZI FATIMZAHRA", "DADI ROMAISSA",
      "EL FEZZIKI IMANE", "ELATTARI MALAK", "ELMANSSOURI ILYASS", "ESSALMAOUI YASSINE", "KANYONGA NADIA",
      "LAHFIDI ZINEB", "MAAZIZI ASMAE", "N'KHIKHSSI FATIMA EZAHRAE"
    ]
  }, // [cite: 20, 21]
  {
    "className": "1 BAC SM 1",
    "defaultStudents": [
      "AMAOUI ABDELOUAHID", "BAGHBA WISSAL", "BOUBKER HAJAR", "EL BEZZAZ DOUAE", "EL GAROUI DOUAE",
      "JALLOULI AYA", "JOUMADI ISRAE", "LAHSSAINI LINA", "MOUSSAFIR DOUAE", "RAMI AYOUB",
      "AIT HAMMOUBAH MOHAMED", "BENLAFKIH EL IDRIS RANIA", "ED-DABBOUGH OUMAYMA", "EL HOUDAIGUI RANIA", "ENNESYRY Jouzefa",
      "KHARBACH MERYEM", "MOUSSAOUI SALMA", "RAMLI YOUSRA", "RAZOUKI ADAM", "ZAID FIRDAOUSS"
    ]
  }, // [cite: 28, 29]
  {
    "className": "1 BAC SM 2",
    "defaultStudents": [
      "LAAJIJ IMANE", "AIT BERKA YASSER", "ROUKOUCH KHADIJA", "EL HAMZAOUI ABDELLAH", "ASSAID ILHAM",
      "GHAZOUANI MARYAM", "BOURAMDANE Ahmed", "HACHEMI FIRDAOUSSE", "AMAZOUZ AYOUB", "AKRAJAI HIBA",
      "SEGHYAR ARIJ", "KASSIMI YASMINE", "AIT SLIMANE MOSSAAB", "CHOUAY NADA", "LADIMI RIHAM",
      "HIMAMI RADIA", "ERREBAIY MALAK", "DABACHINE SALMA", "EDYANI MARWA", "ELKAMOUCH WISSAM",
      "ROSTOM LOAI"
    ]
  }, // [cite: 35, 36]
  {
    "className": "1 BAC SM 3",
    "defaultStudents": [
      "MTOUNE ABRAR", "AMAADOR DIKRA", "AWAD AYA", "ELHAIRCHE FATIMA ZAHRA", "OHGA AMINE",
      "SENOUSSI HIBA", "TABBAL HAFSA", "HMAMI BADR EDDINE", "BOUSSIHMED DIRAR", "LAKRAICHI BASMA",
      "BAKKOU KARIMA", "DDIB MOHAMED AMINE", "SABBANI NOUR ELHOUDA", "IDBELLA YOUSSEF", "EL BAHRAWI WISSAL",
      "BOUHERA MAROUA", "TRAJJA SALMA", "DAHMOUNI TASNIM", "AYACH SARA", "LANAYA KAOUTAR",
      "MOUTI MOUAD"
    ]
  }, // [cite: 42, 43]
  {
    "className": "1 BAC SM 4",
    "defaultStudents": [
      "BAKKALI KAWTAR", "BOUKHALEF DOUAE", "BOULADAN KHADIJA", "BOUMLI HAFSA", "CHADDAD IBTISSAM",
      "EL AOULI HIBA", "EL OUADGHIRI BEN HAJAR", "ELMODEN BASMA", "LAAYAD ADAM", "MRINE KENZA",
      "ADDICHI SAFA", "ADDICHI MAROUA", "BOUMLAÏN NAZHA", "BOUYAHYAOUI MOHAMED AMINE", "EL ALAMI ZAYNAB",
      "EL HILI BADR", "HAFFOUD KHADIJA", "IDRISSI OUMAIMA", "NACER NEAMA", "ZARZOUR NOUREDDINE"
    ]
  }, // [cite: 49, 50]
  {
    "className": "1 BAC SM 5",
    "defaultStudents": [
      "AGHAYOU HAJAR", "BOUKLIKHA HASSAN", "BRAHIMI LAILA", "EL AKSI FATIMA ZAHRA", "EL BASRAOUI FATIMA ZAHRA",
      "EL MOUBARKI ILYASS", "ELKAMEL MALAK", "EL-MOUJOUDI IMANE", "KRAB HAYTHAM", "SABAOUI AYA",
      "AMANE MOSTAFA", "BAGHBA NISRINE", "EL ABDELLAOUI SAID", "EL BOUKHARI YASSIN", "EL KASRI YOUSSEF",
      "FALAHI SARA", "HABBOU MARYEM", "HACHEMI SOUNDOUSSE", "ZAALI FATIMA ZAHRA", "ZEKAOUI MAYSSOUNE"
    ]
  } // [cite: 55, 56]
];

const STORAGE_KEY = "lydex-wheel-data";
const VERSION_KEY = "lydex-wheel-version";
const STORAGE_VERSION = 2;

class StorageManager {
  constructor() {
    this.data = this.load();
  }

  load() {
    const savedVersion = localStorage.getItem(VERSION_KEY);
    if (savedVersion && Number(savedVersion) !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
      return this._createDefaultData();
    }
    if (!savedVersion) {
      localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (this._isValidData(parsed)) {
          return this._mergeWithDefaults(parsed);
        }
      } catch (e) {
        console.warn("Invalid stored data, loading defaults");
      }
    }
    return this._createDefaultData();
  }

  _isValidData(data) {
    return data && Array.isArray(data) && data.length > 0;
  }

  _mergeWithDefaults(savedData) {
    return DEFAULT_CLASSES.map(defaultClass => {
      const saved = savedData.find(s => s.className === defaultClass.className);
      if (saved && Array.isArray(saved.currentStudents) && saved.currentStudents.length > 0) {
        return {
          className: defaultClass.className,
          defaultStudents: defaultClass.defaultStudents,
          currentStudents: saved.currentStudents,
          usedStudents: Array.isArray(saved.usedStudents) ? saved.usedStudents : []
        };
      }
      return {
        ...defaultClass,
        currentStudents: [...defaultClass.defaultStudents],
        usedStudents: []
      };
    });
  }

  _createDefaultData() {
    return DEFAULT_CLASSES.map(cls => ({
      className: cls.className,
      defaultStudents: [...cls.defaultStudents],
      currentStudents: [...cls.defaultStudents],
      usedStudents: []
    }));
  }

  save() {
    const toStore = this.data.map(cls => ({
      className: cls.className,
      currentStudents: cls.currentStudents,
      usedStudents: cls.usedStudents
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }

  getClass(className) {
    return this.data.find(c => c.className === className) || null;
  }

  getAllClasses() {
    return this.data.map(c => c.className);
  }

  getStudents(className) {
    const cls = this.getClass(className);
    return cls ? cls.currentStudents : [];
  }

  getStudentsForWheel(className) {
    const cls = this.getClass(className);
    if (!cls) return [];
    return cls.currentStudents.filter(s => !cls.usedStudents.includes(s));
  }

  getUsedStudents(className) {
    const cls = this.getClass(className);
    return cls ? cls.usedStudents : [];
  }

  updateStudents(className, students) {
    const cls = this.getClass(className);
    if (cls) {
      cls.currentStudents = students;
      cls.usedStudents = cls.usedStudents.filter(s => students.includes(s));
      this.save();
    }
  }

  addUsedStudent(className, student) {
    const cls = this.getClass(className);
    if (cls && !cls.usedStudents.includes(student)) {
      cls.usedStudents.push(student);
      this.save();
    }
  }

  resetWheel(className) {
    const cls = this.getClass(className);
    if (cls) {
      cls.usedStudents = [];
      this.save();
    }
  }

  resetClass(className) {
    const cls = this.getClass(className);
    if (cls) {
      cls.currentStudents = [...cls.defaultStudents];
      cls.usedStudents = [];
      this.save();
    }
  }

  resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = this._createDefaultData();
    this.save();
  }
}

const storage = new StorageManager();
