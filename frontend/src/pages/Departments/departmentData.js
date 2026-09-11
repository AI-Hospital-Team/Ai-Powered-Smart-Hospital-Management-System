const departmentData = {
  cardiology: {
    name: "Cardiology",
    shortName: "Heart & Cardiovascular Care",
    icon: "❤️",

    description:
      "Cardiology focuses on the prevention, diagnosis and treatment of conditions affecting the heart and blood vessels.",

    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Cardiologists evaluate heart health, cardiovascular risk factors and symptoms that may indicate heart or blood-vessel problems. Care may include preventive guidance, diagnostic testing, medicines and procedures depending on the condition.",

    conditions: [
      "High blood pressure",
      "Coronary artery disease",
      "Heart rhythm disorders",
      "Heart failure",
      "Heart valve disorders",
      "Heart attack and related cardiovascular conditions",
    ],

    tests: [
      "Electrocardiogram (ECG/EKG)",
      "Echocardiogram",
      "Holter monitoring",
      "Stress testing",
      "Blood tests",
      "Cardiac imaging when required",
    ],

    treatments: [
      "Lifestyle and risk-factor management",
      "Medicines",
      "Cardiac rehabilitation",
      "Interventional procedures when required",
      "Surgical referral when necessary",
    ],

    whenToVisit: [
      "Persistent or unexplained chest discomfort",
      "Shortness of breath",
      "Repeated palpitations",
      "Dizziness or fainting",
      "Swelling of the legs",
      "Known heart or blood-vessel disease requiring follow-up",
    ],

    resourceTitle: "Heart Disease — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/heartdiseases.html",
  },

  neurology: {
    name: "Neurology",
    shortName: "Brain, Nerve & Nervous System Care",
    icon: "🧠",

    description:
      "Neurology deals with disorders affecting the brain, spinal cord, nerves and related nervous-system functions.",

    image:
      "https://atlasuniversityhospital.com/content/uploads/2026/05/neurology.png",

    overview:
      "Neurologists assess problems involving movement, sensation, memory, balance, coordination, speech and other nervous-system functions. Diagnosis may involve neurological examination and specialized tests or imaging.",

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
      "Blood and laboratory tests when required",
    ],

    treatments: [
      "Medicines",
      "Lifestyle and risk-factor management",
      "Physical therapy",
      "Occupational therapy",
      "Speech therapy",
      "Specialist or surgical referral when required",
    ],

    whenToVisit: [
      "New or persistent severe headaches",
      "Seizures",
      "Unexplained weakness or numbness",
      "Balance or coordination problems",
      "Memory or cognitive changes",
      "Tremors or movement problems",
    ],

    resourceTitle: "Neurologic Diseases — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/neurologicdiseases.html",
  },

  orthopedics: {
    name: "Orthopedics",
    shortName: "Bone, Joint & Musculoskeletal Care",
    icon: "🦴",

    description:
      "Orthopedics focuses on conditions and injuries involving bones, joints, muscles, ligaments, tendons and related structures.",

    image:
      "https://www.slhn.org/-/media/slhn/News/2023/David-Ramski-MD.ashx",

    overview:
      "Orthopedic care covers both injuries and longer-term musculoskeletal problems. Evaluation may include physical examination, imaging and functional assessment before selecting an appropriate treatment plan.",

    conditions: [
      "Fractures",
      "Arthritis",
      "Sprains and strains",
      "Back and neck problems",
      "Sports injuries",
      "Joint and tendon disorders",
    ],

    tests: [
      "Physical examination",
      "X-ray",
      "MRI",
      "CT scan",
      "Ultrasound when appropriate",
      "Functional and movement assessment",
    ],

    treatments: [
      "Rest and activity modification",
      "Medicines",
      "Physical therapy",
      "Supportive devices",
      "Injections when appropriate",
      "Surgical treatment when necessary",
    ],

    whenToVisit: [
      "Persistent bone or joint pain",
      "Difficulty moving a joint",
      "Swelling after an injury",
      "Suspected fracture",
      "Repeated sports injuries",
      "Pain that interferes with daily activities",
    ],

    resourceTitle:
      "Bones, Joints and Muscles — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/bonesjointsandmuscles.html",
  },

  pediatrics: {
    name: "Pediatrics",
    shortName: "Healthcare for Infants, Children & Adolescents",
    icon: "👶",

    description:
      "Pediatrics provides healthcare focused on the physical, mental and social well-being of children and adolescents.",

    image:
      "https://osf-p-001.sitecorecontenthub.cloud/api/public/content/03de82b516504b739fc24b8c8a9c7868?v=62cb99f7%3Ft%3Dw800",

    overview:
      "Pediatric care includes preventive checkups, growth and development monitoring, vaccination guidance, diagnosis of childhood illnesses and management of ongoing health conditions.",

    conditions: [
      "Common childhood infections",
      "Asthma and breathing problems",
      "Allergies",
      "Growth and development concerns",
      "Nutritional problems",
      "Childhood chronic conditions",
    ],

    tests: [
      "Growth and development assessment",
      "Physical examination",
      "Blood tests when required",
      "Imaging when clinically necessary",
      "Developmental screening",
      "Vision and hearing screening",
    ],

    treatments: [
      "Preventive healthcare",
      "Vaccination",
      "Medicines appropriate for children",
      "Nutrition and lifestyle guidance",
      "Developmental support",
      "Referral to pediatric specialists when needed",
    ],

    whenToVisit: [
      "Persistent fever",
      "Breathing difficulty",
      "Dehydration or poor feeding",
      "Unusual developmental concerns",
      "Persistent pain or symptoms",
      "Routine child health and vaccination visits",
    ],

    resourceTitle: "Children's Health — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/childrenshealth.html",
  },

  gynecology: {
    name: "Gynecology",
    shortName: "Women's Reproductive & Gynecologic Health",
    icon: "♀",

    description:
      "Gynecology focuses on women's reproductive health, including menstrual, hormonal and reproductive-system conditions.",

    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Gynecologic care may cover routine preventive care, menstrual concerns, reproductive health, contraception, menopause and conditions affecting the female reproductive system.",

    conditions: [
      "Menstrual problems",
      "Polycystic ovary syndrome (PCOS)",
      "Endometriosis",
      "Ovarian cysts",
      "Uterine fibroids",
      "Menopause-related concerns",
    ],

    tests: [
      "Medical and menstrual history",
      "Physical examination",
      "Pelvic examination when appropriate",
      "Ultrasound",
      "Laboratory and hormonal tests",
      "Recommended preventive screening",
    ],

    treatments: [
      "Lifestyle guidance",
      "Medicines",
      "Hormonal treatments when appropriate",
      "Contraceptive counseling",
      "Procedures when required",
      "Surgical treatment when necessary",
    ],

    whenToVisit: [
      "Very heavy or unusual bleeding",
      "Persistent pelvic pain",
      "Irregular or missed periods",
      "Unusual vaginal symptoms",
      "Concerns related to menopause",
      "Reproductive or fertility concerns",
    ],

    resourceTitle: "Reproductive Health — Office on Women's Health",
    resourceUrl:
      "https://womenshealth.gov/topics/reproductive-health",
  },

  pulmonology: {
    name: "Pulmonology",
    shortName: "Lung & Respiratory Care",
    icon: "🫁",

    description:
      "Pulmonology focuses on diseases and conditions affecting the lungs and respiratory system.",

    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Pulmonary care helps evaluate breathing problems and diseases affecting the airways, lung tissue and respiratory function.",

    conditions: [
      "Asthma",
      "Chronic obstructive pulmonary disease (COPD)",
      "Pneumonia",
      "Tuberculosis",
      "Pulmonary fibrosis",
      "Other chronic respiratory conditions",
    ],

    tests: [
      "Pulse oximetry",
      "Spirometry",
      "Pulmonary function tests",
      "Chest X-ray",
      "CT scan",
      "Bronchoscopy when required",
    ],

    treatments: [
      "Medicines and inhalers",
      "Respiratory rehabilitation",
      "Lifestyle and risk-factor management",
      "Oxygen therapy when prescribed",
      "Treatment of underlying infections or conditions",
      "Specialist procedures when necessary",
    ],

    whenToVisit: [
      "Persistent shortness of breath",
      "Long-lasting cough",
      "Wheezing",
      "Repeated respiratory infections",
      "Chest tightness",
      "Known lung disease requiring follow-up",
    ],

    resourceTitle: "Lung Diseases — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/lungdiseases.html",
  },

  dermatology: {
    name: "Dermatology",
    shortName: "Skin, Hair & Nail Care",
    icon: "🧴",

    description:
      "Dermatology focuses on conditions affecting the skin, hair and nails.",

    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",

    overview:
      "Dermatologists evaluate changes affecting the skin, hair and nails. Care can include diagnosis, prevention, medicines, procedures and long-term management.",

    conditions: [
      "Acne",
      "Eczema",
      "Psoriasis",
      "Fungal infections",
      "Hair-loss conditions",
      "Skin infections and rashes",
    ],

    tests: [
      "Clinical skin examination",
      "Dermatoscopy",
      "Skin scraping",
      "Allergy testing when appropriate",
      "Skin biopsy when required",
      "Laboratory tests when necessary",
    ],

    treatments: [
      "Topical medicines",
      "Oral medicines",
      "Skin-care guidance",
      "Procedures",
      "Treatment of infections",
      "Long-term condition management",
    ],

    whenToVisit: [
      "A new or changing skin lesion",
      "Persistent rash or itching",
      "Sudden or significant hair loss",
      "Persistent acne",
      "Painful or infected skin lesions",
      "Changes in nails that do not resolve",
    ],

    resourceTitle: "Skin, Hair and Nails — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/skinhairandnails.html",
  },

  "general-medicine": {
    name: "General Medicine",
    shortName: "Primary & Comprehensive Adult Care",
    icon: "🩺",

    description:
      "General medicine provides broad medical evaluation, prevention and management of common adult health problems.",

    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",

    overview:
      "General medicine can be the first point of medical care for many non-emergency health concerns. Doctors assess symptoms, manage common conditions and refer patients to specialists when necessary.",

    conditions: [
      "Fever and infections",
      "Diabetes",
      "High blood pressure",
      "High cholesterol",
      "Digestive complaints",
      "Common chronic health conditions",
    ],

    tests: [
      "General physical examination",
      "Blood pressure measurement",
      "Blood tests",
      "Urine tests",
      "Health screening",
      "Imaging or specialist tests when required",
    ],

    treatments: [
      "Preventive healthcare",
      "Medicines",
      "Lifestyle guidance",
      "Chronic disease management",
      "Health monitoring",
      "Referral to specialists when necessary",
    ],

    whenToVisit: [
      "New or persistent health symptoms",
      "Routine health checkups",
      "Ongoing chronic conditions",
      "Medication reviews",
      "Preventive health screening",
      "Health concerns that need initial evaluation",
    ],

    resourceTitle:
      "Choosing a Primary Care Provider — MedlinePlus",
    resourceUrl:
      "https://medlineplus.gov/ency/article/001939.htm",
  },
};

export default departmentData;