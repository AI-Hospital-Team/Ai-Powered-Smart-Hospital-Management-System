import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  ExternalLink,
  HeartPulse,
  Microscope,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";

import "./DepartmentInfo.css";
import departmentData from "./departmentData";

const departmentOrder = [
  "cardiology",
  "neurology",
  "orthopedics",
  "pediatrics",
  "gynecology",
  "pulmonology",
  "dermatology",
  "general-medicine",
];

const focusText = {
  cardiology: "Heart health, circulation and cardiovascular risk",
  neurology: "Brain, nerves, movement and neurological function",
  orthopedics: "Bones, joints, muscles and movement",
  pediatrics: "Growth, development and child wellness",
  gynecology: "Reproductive, menstrual and women's health",
  pulmonology: "Breathing, lungs and respiratory health",
  dermatology: "Skin, hair, nails and visible skin changes",
  "general-medicine": "Prevention, diagnosis and whole-person adult care",
};

function DepartmentInfo() {
  const { department } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  const data = departmentData[department];

  const relatedDepartments = useMemo(
    () =>
      departmentOrder
        .filter((key) => key !== department && departmentData[key])
        .slice(0, 4),
    [department]
  );

  if (!data) {
    return (
      <div className="department-not-found">
        <div className="not-found-orbit"><HeartPulse size={42} /></div>
        <span>AI SMART HOSPITAL</span>
        <h1>Department Not Found</h1>
        <p>The requested medical department could not be found.</p>
        <button type="button" onClick={() => navigate("/#departments")}>
          <ArrowLeft size={16} /> Back to Departments
        </button>
      </div>
    );
  }

  const faqItems = [
    {
      q: `What does the ${data.name} department treat?`,
      a: `${data.name} focuses on ${focusText[department] || data.shortName.toLowerCase()}. Common areas of care include the conditions listed on this page and evaluation by an appropriate healthcare professional.`,
    },
    {
      q: "What happens during a first consultation?",
      a: "A clinician generally reviews symptoms and medical history, performs an appropriate examination and decides whether tests, treatment, monitoring or specialist follow-up may be useful.",
    },
    {
      q: "Do I need a test before seeing a specialist?",
      a: "Not necessarily. The clinician can decide which investigations are appropriate after reviewing the patient's symptoms and history. Unnecessary testing should be avoided.",
    },
    {
      q: "When should I seek urgent medical attention?",
      a: "Severe or rapidly worsening symptoms, difficulty breathing, loss of consciousness, severe chest pain, major bleeding or other emergency symptoms require prompt medical attention rather than waiting for a routine appointment.",
    },
    {
      q: "Can this page replace a doctor's diagnosis?",
      a: "No. This is educational information. Diagnosis and treatment decisions should be made by a qualified healthcare professional who can assess the individual patient.",
    },
  ];

  return (
    <div className="department-page">
      <header className="department-topbar">
        <Link to="/" className="department-brand">
          <div className="department-brand-icon"><HeartPulse size={20} /></div>
          <div>
            <strong>AI Smart Hospital</strong>
            <span>Intelligent Healthcare Management</span>
          </div>
        </Link>

        <div className="department-topbar-actions">
          <div className="department-status-pill">
            <span className="status-dot" /> Department Information
          </div>
          <button type="button" className="department-back-button" onClick={() => navigate("/#departments")}>
            <ArrowLeft size={16} /> Departments
          </button>
        </div>
      </header>

      <main>
        <section className="department-hero">
          <div className="hero-grid-lines" />
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="department-hero-content">
            <div className="department-breadcrumb">
              <Link to="/">Home</Link><span>/</span><span>Departments</span><span>/</span><strong>{data.name}</strong>
            </div>

            <div className="department-kicker"><Sparkles size={14} /> SPECIALIZED MEDICAL CARE</div>
            <h1>{data.name}</h1>
            <h2>{data.shortName}</h2>
            <p>{data.description}</p>

            <div className="department-hero-actions">
              <button type="button" className="department-primary-button" onClick={() => navigate("/#contact")}>
                <CalendarDays size={17} /> Book Appointment <ArrowRight size={15} />
              </button>
              <button type="button" className="department-secondary-button" onClick={() => navigate("/#doctors")}>
                <Stethoscope size={17} /> Find Doctors
              </button>
            </div>

            <div className="hero-trust-row">
              <div><ShieldCheck size={16} /><span>Patient-focused care</span></div>
              <div><Activity size={16} /><span>Evidence-informed information</span></div>
              <div><Clock3 size={16} /><span>Care planning support</span></div>
            </div>
          </div>

          <div className="department-hero-visual">
            <div className="hero-image-frame">
              <img src={data.image} alt={`${data.name} medical care`} loading="eager" />
              <div className="image-scan-line" />
              <div className="image-overlay-label"><span>AI SMART CARE</span><strong>{data.name}</strong></div>
              <div className="hero-floating-icon">{data.icon}</div>
            </div>
            <div className="hero-data-card">
              <div className="hero-data-icon"><HeartPulse size={19} /></div>
              <div><span>CARE FOCUS</span><strong>{focusText[department] || data.shortName}</strong></div>
            </div>
          </div>
        </section>

        <div className="department-disclaimer">
          <TriangleAlert size={16} />
          <span><strong>Educational information:</strong> This page supports general health education and does not replace professional diagnosis, treatment or emergency care.</span>
        </div>

        <section className="department-content">
          <div className="department-section-intro">
            <div>
              <span className="section-eyebrow">DEPARTMENT SNAPSHOT</span>
              <h2>Everything you need to know about {data.name}</h2>
            </div>
            <p>Explore the department's focus, common conditions, diagnostic options, treatment approaches and guidance for seeking care.</p>
          </div>

          <div className="department-stat-grid">
            <div className="department-stat-card"><div className="stat-icon"><ClipboardList size={19} /></div><strong>{data.conditions.length}</strong><span>Common conditions</span></div>
            <div className="department-stat-card"><div className="stat-icon purple"><Microscope size={19} /></div><strong>{data.tests.length}</strong><span>Diagnostic options</span></div>
            <div className="department-stat-card"><div className="stat-icon green"><Stethoscope size={19} /></div><strong>{data.treatments.length}</strong><span>Care approaches</span></div>
            <div className="department-stat-card"><div className="stat-icon amber"><TriangleAlert size={19} /></div><strong>{data.whenToVisit.length}</strong><span>Care indicators</span></div>
          </div>

          <section className="department-overview-card premium-card">
            <div className="overview-copy">
              <span className="section-eyebrow">OVERVIEW</span>
              <h2>About {data.name}</h2>
              <p>{data.overview}</p>
              <div className="overview-highlight"><Sparkles size={18} /><div><strong>Care is personalized</strong><span>Assessment, medical history and individual needs help guide appropriate care decisions.</span></div></div>
            </div>
            <div className="overview-visual">
              <div className="medical-ring ring-one" /><div className="medical-ring ring-two" /><div className="overview-center"><HeartPulse size={42} /><span>{data.name}</span><small>Specialized Care</small></div>
            </div>
          </section>

          <section className="department-info-grid">
            <div className="department-info-card premium-card">
              <div className="card-heading"><div className="department-info-icon condition-icon"><ClipboardList size={20} /></div><div><span>COMMON CONDITIONS</span><h3>What We Treat</h3></div></div>
              <div className="detail-list">
                {data.conditions.map((condition, index) => <div className="detail-item" key={condition}><span className="detail-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{condition}</strong><p>Assessment and management may vary based on symptoms, history and clinical findings.</p></div><CheckCircle2 size={16} /></div>)}
              </div>
            </div>

            <div className="department-info-card premium-card">
              <div className="card-heading"><div className="department-info-icon test-icon"><Microscope size={20} /></div><div><span>DIAGNOSIS</span><h3>Common Tests & Assessments</h3></div></div>
              <div className="detail-list">
                {data.tests.map((test, index) => <div className="detail-item" key={test}><span className="detail-number purple-text">{String(index + 1).padStart(2, "0")}</span><div><strong>{test}</strong><p>Used when clinically appropriate to help evaluate the patient's condition.</p></div><Search size={16} /></div>)}
              </div>
            </div>
          </section>

          <section className="department-treatment-section premium-card">
            <div className="section-heading-row"><div><span className="section-eyebrow">CARE & TREATMENT</span><h2>Treatment & Care Options</h2></div><div className="section-heading-badge"><ShieldCheck size={15} /> Individualized care</div></div>
            <div className="department-treatment-grid">
              {data.treatments.map((treatment, index) => <article className="department-treatment-card" key={treatment}><div className="treatment-number">{String(index + 1).padStart(2, "0")}</div><div className="treatment-icon"><Stethoscope size={18} /></div><div><h3>{treatment}</h3><p>Care may be considered according to the patient's condition, medical history, response to treatment and doctor's assessment.</p></div><ArrowUpRight size={16} /></article>)}
            </div>
          </section>

          <section className="department-warning-card">
            <div className="warning-heading"><div className="warning-icon"><TriangleAlert size={21} /></div><div><span>WHEN TO SEEK CARE</span><h2>When should you consult a doctor?</h2></div></div>
            <p className="warning-intro">These signs can be useful reasons to arrange medical evaluation. If symptoms are severe, sudden or life-threatening, seek emergency care immediately.</p>
            <div className="warning-list">{data.whenToVisit.map((item, index) => <div className="warning-item" key={item}><span>{String(index + 1).padStart(2, "0")}</span><CheckCircle2 size={15} />{item}</div>)}</div>
          </section>

          <section className="department-care-path">
            <div className="section-heading-row"><div><span className="section-eyebrow">YOUR CARE JOURNEY</span><h2>From symptoms to a care plan</h2></div></div>
            <div className="care-path-grid">
              {[['01', 'Understand', 'Share your symptoms, concerns, medical history and relevant reports with the healthcare professional.'], ['02', 'Assess', 'A clinician evaluates the available information and decides what examination or investigation is appropriate.'], ['03', 'Plan', 'The care plan may include monitoring, medicines, lifestyle guidance, therapy, procedures or referral when needed.'], ['04', 'Follow up', 'Follow-up helps review progress, response to care and whether the plan needs adjustment.']].map(([number, title, text], index) => <div className="care-step" key={number}><div className="care-step-top"><span>{number}</span>{index < 3 && <div className="care-connector" />}</div><h3>{title}</h3><p>{text}</p></div>)}
            </div>
          </section>

          <section className="department-faq-section premium-card">
            <div className="section-heading-row"><div><span className="section-eyebrow">QUICK ANSWERS</span><h2>Frequently asked questions</h2></div><div className="faq-mark"><HeartPulse size={18} /></div></div>
            <div className="faq-list">
              {faqItems.map((item, index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={item.q}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{item.q}</span><ChevronDown size={18} /></button>{openFaq === index && <div className="faq-answer"><p>{item.a}</p></div>}</div>)}
            </div>
          </section>

          <section className="department-cta">
            <div className="cta-glow" />
            <div className="cta-copy"><span>NEED MEDICAL CARE?</span><h2>Ready to schedule a consultation?</h2><p>Use the hospital's appointment flow to connect with the appropriate healthcare service.</p></div>
            <div className="department-cta-actions"><button type="button" onClick={() => navigate("/#contact")}>Book Appointment <ArrowRight size={16} /></button><button type="button" onClick={() => navigate("/#doctors")}>Find a Doctor <Stethoscope size={16} /></button></div>
          </section>

          <section className="department-resource premium-card">
            <div className="resource-icon"><ExternalLink size={19} /></div><div><span>TRUSTED EDUCATIONAL RESOURCE</span><h3>{data.resourceTitle}</h3><p>Explore additional general health information from a trusted public health information source.</p></div><a href={data.resourceUrl} target="_blank" rel="noopener noreferrer">Visit Resource <ExternalLink size={14} /></a>
          </section>

          <section className="related-departments">
            <div className="section-heading-row"><div><span className="section-eyebrow">EXPLORE MORE</span><h2>Other medical departments</h2></div></div>
            <div className="related-grid">
              {relatedDepartments.map((key) => { const item = departmentData[key]; return <Link className="related-card" to={`/departments/${key}`} key={key}><div className="related-image"><img src={item.image} alt="" loading="lazy" /><span>{item.icon}</span></div><div><span>DEPARTMENT</span><h3>{item.name}</h3><p>{item.shortName}</p></div><ArrowRight size={17} /></Link>; })}
            </div>
          </section>
        </section>
      </main>

      <footer className="department-footer"><div><strong>AI Smart Hospital</strong><span>Educational healthcare management project</span></div><Link to="/">Back to Home <ArrowRight size={14} /></Link></footer>
    </div>
  );
}

export default DepartmentInfo;
