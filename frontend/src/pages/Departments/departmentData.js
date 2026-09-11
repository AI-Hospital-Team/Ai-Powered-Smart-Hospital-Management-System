const departmentData = {
  cardiology: {
    name: "Cardiology",
    shortName: "Heart & Cardiovascular Care",
    description:
      "Cardiology focuses on the prevention, diagnosis and treatment of diseases affecting the heart and blood vessels.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Cardiology provides specialized care for conditions involving the heart and circulatory system. Cardiologists evaluate symptoms, assess cardiovascular risk and use diagnostic tests to understand heart function.",

    icon: "❤️",

    conditions: [
      "Coronary artery disease",
      "High blood pressure",
      "Heart failure",
      "Heart rhythm disorders",
      "Heart valve diseases",
      "High cholesterol",
    ],

    tests: [
      "Electrocardiogram (ECG)",
      "Echocardiogram",
      "Blood pressure monitoring",
      "Holter monitoring",
      "Stress testing",
      "Cardiac imaging",
    ],

    treatments: [
      "Medicines",
      "Lifestyle modification",
      "Blood pressure management",
      "Cholesterol management",
      "Cardiac rehabilitation",
      "Specialist procedures when required",
    ],

    whenToVisit: [
      "Chest pain or pressure",
      "Shortness of breath",
      "Irregular or racing heartbeat",
      "Unexplained dizziness",
      "Swelling in the legs",
      "Persistent high blood pressure",
    ],

    medicalResources: [
      {
        title: "Heart Disease",
        description:
          "Learn about heart disease, risk factors, symptoms, diagnosis and treatment.",
        url: "https://medlineplus.gov/heartdiseases.html",
      },
      {
        title: "Heart Health",
        description:
          "Information about keeping your heart healthy and reducing cardiovascular risk.",
        url: "https://www.nhlbi.nih.gov/health/heart-health",
      },
    ],

    resourceTitle: "Heart Disease — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/heartdiseases.html",
  },

  neurology: {
    name: "Neurology",
    shortName: "Brain, Nerve & Nervous System Care",
    description:
      "Neurology deals with disorders affecting the brain, spinal cord, nerves and related nervous-system functions.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Neurologists assess problems involving movement, sensation, memory, balance, coordination, speech and other nervous-system functions. Diagnosis may involve neurological examination, laboratory tests and specialized imaging.",

    icon: "🧠",

    conditions: [
      "Migraine and headache disorders",
      "Epilepsy and seizures",
      "Stroke",
      "Parkinson's disease",
      "Multiple sclerosis",
      "Peripheral nerve disorders",
    ],

    tests: [
      "Neurological examination",
      "MRI or CT imaging",
      "EEG",
      "Nerve conduction studies",
      "Electromyography",
      "Blood and laboratory tests",
    ],

    treatments: [
      "Medicines",
      "Lifestyle and risk-factor management",
      "Physical therapy",
      "Occupational therapy",
      "Speech therapy",
      "Specialist referral when required",
    ],

    whenToVisit: [
      "New or persistent severe headaches",
      "Seizures",
      "Unexplained weakness or numbness",
      "Balance or coordination problems",
      "Memory or cognitive changes",
      "Tremors or movement problems",
    ],

    medicalResources: [
      {
        title: "Neurologic Diseases",
        description:
          "Information about disorders affecting the brain, spinal cord and nerves.",
        url: "https://medlineplus.gov/neurologicdiseases.html",
      },
      {
        title: "Migraine",
        description:
          "Learn about migraine symptoms, causes, diagnosis and treatment.",
        url: "https://medlineplus.gov/migraine.html",
      },
      {
        title: "Epilepsy",
        description:
          "Learn about epilepsy, seizures, diagnosis and treatment options.",
        url: "https://medlineplus.gov/epilepsy.html",
      },
      {
        title: "Multiple Sclerosis",
        description:
          "Information about MS, symptoms, diagnosis and treatment.",
        url: "https://medlineplus.gov/multiplesclerosis.html",
      },
      {
        title: "Brain & Nerves",
        description:
          "Explore information about brain, nerve and spinal-cord conditions.",
        url: "https://medlineplus.gov/brainandnerves.html",
      },
    ],

    resourceTitle: "Neurologic Diseases — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/neurologicdiseases.html",
  },

  orthopedics: {
    name: "Orthopedics",
    shortName: "Bone, Joint & Musculoskeletal Care",
    description:
      "Orthopedics focuses on the diagnosis and treatment of problems involving bones, joints, muscles, ligaments and movement.",
    image:
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Orthopedic care helps patients manage injuries and conditions affecting the musculoskeletal system, including bones, joints, muscles, tendons and ligaments.",

    icon: "🦴",

    conditions: [
      "Arthritis",
      "Bone fractures",
      "Joint injuries",
      "Back and neck problems",
      "Sports injuries",
      "Osteoporosis",
    ],

    tests: [
      "X-ray",
      "MRI",
      "CT scan",
      "Bone density testing",
      "Physical examination",
      "Joint and movement assessment",
    ],

    treatments: [
      "Medicines",
      "Physiotherapy",
      "Exercise programs",
      "Bracing and support",
      "Injections when appropriate",
      "Surgery when required",
    ],

    whenToVisit: [
      "Persistent joint pain",
      "Difficulty walking or moving",
      "Bone or joint injury",
      "Swelling around a joint",
      "Persistent back pain",
      "Reduced range of movement",
    ],

    medicalResources: [
      {
        title: "Bone Diseases",
        description:
          "Learn about common diseases and conditions affecting bones.",
        url: "https://medlineplus.gov/bonediseases.html",
      },
      {
        title: "Arthritis",
        description:
          "Information about arthritis symptoms, diagnosis and treatment.",
        url: "https://medlineplus.gov/arthritis.html",
      },
    ],

    resourceTitle: "Bone Diseases — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/bonediseases.html",
  },

  pediatrics: {
    name: "Pediatrics",
    shortName: "Child & Adolescent Healthcare",
    description:
      "Pediatrics provides medical care for infants, children and adolescents, including preventive and developmental healthcare.",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Pediatric care supports children's physical, developmental and emotional health from infancy through adolescence.",

    icon: "👶",

    conditions: [
      "Childhood infections",
      "Asthma",
      "Allergies",
      "Growth and development concerns",
      "Nutritional problems",
      "Childhood fever",
    ],

    tests: [
      "Physical examination",
      "Growth assessment",
      "Blood tests",
      "Urine tests",
      "Immunization assessment",
      "Developmental screening",
    ],

    treatments: [
      "Medicines",
      "Vaccination",
      "Nutrition guidance",
      "Developmental support",
      "Lifestyle guidance",
      "Specialist referral when required",
    ],

    whenToVisit: [
      "Persistent fever",
      "Breathing difficulty",
      "Poor feeding",
      "Unusual weakness or sleepiness",
      "Growth concerns",
      "Developmental concerns",
    ],

    medicalResources: [
      {
        title: "Child Health",
        description:
          "Trusted information about children's health, development and common conditions.",
        url: "https://medlineplus.gov/childrenshealth.html",
      },
      {
        title: "Children's Health",
        description:
          "Health information for children and families from the NIH.",
        url: "https://www.nichd.nih.gov/health",
      },
    ],

    resourceTitle: "Child Health — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/childrenshealth.html",
  },

  gynecology: {
    name: "Gynecology",
    shortName: "Women's Reproductive Healthcare",
    description:
      "Gynecology focuses on women's reproductive health, preventive care and conditions affecting the female reproductive system.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Gynecological care includes preventive examinations, reproductive health services and evaluation of conditions affecting the female reproductive system.",

    icon: "🌸",

    conditions: [
      "Menstrual disorders",
      "Polycystic ovary syndrome",
      "Endometriosis",
      "Pelvic pain",
      "Vaginal infections",
      "Menopause-related concerns",
    ],

    tests: [
      "Pelvic examination",
      "Ultrasound",
      "Pap test",
      "Blood tests",
      "Hormone testing",
      "Pregnancy testing",
    ],

    treatments: [
      "Medicines",
      "Hormonal therapy",
      "Lifestyle management",
      "Preventive care",
      "Counselling",
      "Surgical treatment when required",
    ],

    whenToVisit: [
      "Abnormal bleeding",
      "Persistent pelvic pain",
      "Irregular periods",
      "Unusual vaginal discharge",
      "Pain during intercourse",
      "Menopause-related symptoms",
    ],

    medicalResources: [
      {
        title: "Women's Health",
        description:
          "Trusted information covering women's health and reproductive conditions.",
        url: "https://medlineplus.gov/womenshealth.html",
      },
      {
        title: "Women's Health",
        description:
          "Health information and resources from the Office on Women's Health.",
        url: "https://womenshealth.gov/",
      },
    ],

    resourceTitle: "Women's Health — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/womenshealth.html",
  },

  pulmonology: {
    name: "Pulmonology",
    shortName: "Lung & Respiratory Care",
    description:
      "Pulmonology specializes in diseases and conditions affecting the lungs and respiratory system.",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Pulmonary care evaluates breathing problems and diseases affecting the lungs, airways and respiratory system.",

    icon: "🫁",

    conditions: [
      "Asthma",
      "Chronic obstructive pulmonary disease",
      "Pneumonia",
      "Sleep apnea",
      "Chronic cough",
      "Respiratory infections",
    ],

    tests: [
      "Chest X-ray",
      "CT scan",
      "Pulmonary function tests",
      "Spirometry",
      "Oxygen level testing",
      "Sleep studies",
    ],

    treatments: [
      "Inhaled medicines",
      "Oral medicines",
      "Oxygen therapy",
      "Breathing exercises",
      "Pulmonary rehabilitation",
      "Specialist procedures when required",
    ],

    whenToVisit: [
      "Persistent cough",
      "Shortness of breath",
      "Wheezing",
      "Chest tightness",
      "Repeated respiratory infections",
      "Sleep-related breathing problems",
    ],

    medicalResources: [
      {
        title: "Lung Diseases",
        description:
          "Learn about lung diseases, symptoms, diagnosis and treatment.",
        url: "https://medlineplus.gov/lungdiseases.html",
      },
      {
        title: "Asthma",
        description:
          "Information about asthma symptoms, causes and management.",
        url: "https://medlineplus.gov/asthma.html",
      },
    ],

    resourceTitle: "Lung Diseases — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/lungdiseases.html",
  },

  dermatology: {
    name: "Dermatology",
    shortName: "Skin, Hair & Nail Care",
    description:
      "Dermatology focuses on conditions affecting the skin, hair and nails and provides medical and preventive skin care.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Dermatologists diagnose and manage a wide range of skin, hair and nail conditions and can also provide guidance for long-term skin health.",

    icon: "🧴",

    conditions: [
      "Acne",
      "Eczema",
      "Psoriasis",
      "Skin infections",
      "Hair loss",
      "Allergic skin conditions",
    ],

    tests: [
      "Skin examination",
      "Dermatoscopy",
      "Skin biopsy",
      "Allergy testing",
      "Laboratory tests",
      "Fungal testing",
    ],

    treatments: [
      "Topical medicines",
      "Oral medicines",
      "Skin care plans",
      "Light therapy",
      "Minor procedures",
      "Specialist treatment when required",
    ],

    whenToVisit: [
      "Persistent rash",
      "New or changing skin growth",
      "Severe acne",
      "Unexplained hair loss",
      "Persistent itching",
      "Skin infection symptoms",
    ],

    medicalResources: [
      {
        title: "Skin Conditions",
        description:
          "Learn about common skin diseases, symptoms and treatment options.",
        url: "https://medlineplus.gov/skinconditions.html",
      },
      {
        title: "Acne",
        description:
          "Information about acne causes, symptoms and treatment.",
        url: "https://medlineplus.gov/acne.html",
      },
    ],

    resourceTitle: "Skin Conditions — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/skinconditions.html",
  },

  "general-medicine": {
    name: "General Medicine",
    shortName: "Comprehensive Adult Medical Care",
    description:
      "General medicine provides comprehensive healthcare for common illnesses, chronic conditions and overall adult health.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",

    overview:
      "General medicine provides first-line evaluation and ongoing care for a broad range of adult health concerns. Physicians assess symptoms, manage chronic diseases and coordinate specialist care when needed.",

    icon: "🩺",

    conditions: [
      "Diabetes",
      "High blood pressure",
      "Common infections",
      "Digestive problems",
      "Thyroid disorders",
      "Cholesterol problems",
    ],

    tests: [
      "Physical examination",
      "Blood tests",
      "Urine tests",
      "Blood pressure monitoring",
      "Blood sugar testing",
      "Health screening tests",
    ],

    treatments: [
      "Medicines",
      "Lifestyle changes",
      "Nutrition guidance",
      "Preventive healthcare",
      "Chronic disease management",
      "Specialist referral when required",
    ],

    whenToVisit: [
      "Persistent unexplained symptoms",
      "Fever or infection symptoms",
      "Changes in blood pressure",
      "Changes in blood sugar",
      "Digestive problems",
      "Regular health checkups",
    ],

    medicalResources: [
      {
        title: "MedlinePlus Health Topics",
        description:
          "Explore trusted information about diseases, conditions, medicines and general health.",
        url: "https://medlineplus.gov/healthtopics.html",
      },
      {
        title: "Health Information",
        description:
          "Reliable health information from the National Institutes of Health.",
        url: "https://www.nih.gov/health-information",
      },
    ],

    resourceTitle: "Health Topics — MedlinePlus",
    resourceUrl: "https://medlineplus.gov/healthtopics.html",
  },
};

export default departmentData;