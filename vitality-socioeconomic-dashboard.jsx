import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis
} from "recharts";

const C = {
  bg:       "#08090B",
  surface:  "#0F1115",
  card:     "#13161C",
  border:   "#1C2030",
  accent:   "#3B82F6",
  gold:     "#F59E0B",
  green:    "#22C55E",
  red:      "#EF4444",
  purple:   "#A855F7",
  teal:     "#14B8A6",
  text:     "#E2E8F0",
  sub:      "#94A3B8",
  muted:    "#475569",
};

const TABS = ["Who They Are", "Health Profile", "Financial Standing", "Geographic Spread", "Engagement Divide"];

/* ── helpers ─────────────────────────────────────────────── */
function TT({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1A1F2E", border: `1px solid ${C.border}`, padding: "9px 13px", fontSize: 11 }}>
      <p style={{ color: C.sub, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || C.text, margin: "2px 0" }}>
          {p.name}: <strong>{p.value}{typeof p.value === "number" && p.value <= 100 && !String(p.name).includes("R") ? "%" : ""}</strong>
        </p>
      ))}
    </div>
  );
}

function Kpi({ label, value, sub, color = C.accent, note }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderTop: `2px solid ${color}`, padding: "16px 18px" }}>
      <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: "monospace", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.sub, marginTop: 5 }}>{sub}</div>}
      {note && <div style={{ fontSize: 10, color: C.muted, marginTop: 4, fontStyle: "italic" }}>{note}</div>}
    </div>
  );
}

function Sec({ children, label }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 2, height: 14, background: C.accent }} />
        <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function Insight({ icon, text, color = C.sub }) {
  return (
    <div style={{ display: "flex", gap: 9, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 14, flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: 12, color, lineHeight: 1.55 }}>{text}</span>
    </div>
  );
}

/* ── Tab 1: Who They Are ───────────────────────────────────── */
const lsmData = [
  { lsm: "LSM 1–4", pct: 0.5, pop: 35, color: C.muted },
  { lsm: "LSM 5–6", pct: 2,   pop: 22, color: "#64748B" },
  { lsm: "LSM 7",   pct: 10,  pop: 18, color: C.teal },
  { lsm: "LSM 8",   pct: 24,  pop: 13, color: C.accent },
  { lsm: "LSM 9",   pct: 38,  pop: 8,  color: C.purple },
  { lsm: "LSM 10",  pct: 25.5,pop: 4,  color: C.gold },
];

const ageData = [
  { age: "18–24", pct: 9 },
  { age: "25–34", pct: 22 },
  { age: "35–44", pct: 28 },
  { age: "45–54", pct: 24 },
  { age: "55–64", pct: 12 },
  { age: "65+",   pct: 5 },
];

function WhoTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 22 }}>
        <Kpi label="Total DHMS members" value="4.14M" sub="2023 · incl. dependants" color={C.accent} />
        <Kpi label="Main members" value="1.36M" sub="Primary policyholders" color={C.teal} />
        <Kpi label="SA financially healthy" value="16%" sub="Only 1 in 6 South Africans" color={C.red} note="Vitality members are in the top tier of this 16%" />
        <Kpi label="Private med aid penetration" value="~15%" sub="of SA population" color={C.purple} note="Formal sector, upper-income skew" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Estimated LSM distribution — Vitality members vs. SA population">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              {lsmData.map((d, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 11, color: d.color, fontWeight: 600 }}>{d.lsm}</span>
                    <span style={{ fontSize: 10, color: C.muted }}>Vitality: <strong style={{ color: d.color }}>{d.pct}%</strong> vs SA: {d.pop}%</span>
                  </div>
                  <div style={{ height: 5, background: C.border, display: "flex" }}>
                    <div style={{ height: "100%", width: `${d.pct}%`, background: d.color, maxWidth: "100%" }} />
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.6 }}>
              Vitality membership is overwhelmingly concentrated in LSM 8–10 — the top ~25% of the SA living standards spectrum. LSM 8–10 earns R13,210–R32,521+/month. In contrast, 77% of SA's population falls below LSM 7.
            </p>
          </Sec>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Age distribution of DHMS / Vitality members (est.)">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={ageData}>
                <XAxis dataKey="age" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<TT />} />
                <Bar dataKey="pct" fill={C.accent} name="Members %" radius={[2,2,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              35–44 is the core Vitality segment — peak earning years, highest Vitality engagement. Notably, the medical scheme population is <em>older and sicker</em> than the non-scheme population, as younger healthier lives delay joining.
            </p>
          </Sec>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 20 }}>
        <Sec label="Structural socioeconomic context">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <Insight icon="💼" text="Vitality members are overwhelmingly formally employed — full-time salaried workers. Over 50% of SA's full-time employees come from LSM 7–10." />
            <Insight icon="🏙️" text="Gauteng (39% of LSM 7–10) and Western Cape (18.5%) dominate. Vitality is an urban, metro-centric product by design and distribution." />
            <Insight icon="🎓" text="LSM 9–10 members typically hold tertiary qualifications. Discovery Bank explicitly targets higher-income earning South Africans — the same demographic as premium Vitality tiers." />
            <Insight icon="🚗" text="65% of SA cars are uninsured. Vitality Drive members, by definition, own insured vehicles — placing them firmly in the upper-income bracket." />
            <Insight icon="🍎" text="Vitality HealthyFoods rewards presuppose grocery spend at retailers like Pick n Pay and Woolworths — strongly skewed to higher-income formal sector shoppers." />
            <Insight icon="✈️" text="Up to 75% flight discounts via Discovery Bank are only unlocked with qualifying Black/Purple Suite accounts, requiring significant monthly spend — an HNW product signal." />
          </div>
        </Sec>
      </div>
    </div>
  );
}

/* ── Tab 2: Health Profile ──────────────────────────────── */
const chronicTrend = [
  { year: "2018", diabetes: 100, hypertension: 100, chol: 100 },
  { year: "2019", diabetes: 106, hypertension: 104, chol: 108 },
  { year: "2020", diabetes: 110, hypertension: 108, chol: 115 },
  { year: "2021", diabetes: 116, hypertension: 113, chol: 121 },
  { year: "2022", diabetes: 121, hypertension: 117, chol: 128 },
  { year: "2023", diabetes: 129, hypertension: 122, chol: 135 },
];

const obeCityData = [
  { city: "Cape Town",    healthyWt: 53.5, workouts: 68, healthyFood: 72 },
  { city: "Johannesburg", healthyWt: 49,   workouts: 73, healthyFood: 65 },
  { city: "Durban",       healthyWt: 46,   workouts: 62, healthyFood: 61 },
  { city: "Pretoria",     healthyWt: 44,   workouts: 60, healthyFood: 58 },
  { city: "Bloemfontein", healthyWt: 42,   workouts: 55, healthyFood: 60 },
  { city: "Gqeberha",     healthyWt: 39,   workouts: 57, healthyFood: 56 },
];

const healthCheckAge = [
  { age: "18", inRange: 72 },
  { age: "22", inRange: 61 },
  { age: "26", inRange: 52 },
  { age: "28", inRange: 45 },
  { age: "30", inRange: 40 },
  { age: "32", inRange: 37 },
  { age: "34", inRange: 35 },
];

function HealthTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        <Kpi label="SA adults overweight/obese" value="54%" sub="More than half the population" color={C.red} />
        <Kpi label="Obesity rise by 2030 (projected)" value="+10%" sub="World Obesity Federation" color={C.gold} />
        <Kpi label="Obesity cost to SA health system" value="R33bn/yr" sub="Wits University research" color={C.red} />
        <Kpi label="Diabetes deaths SA (2019)" value="26,000+" sub="Top natural cause of death" color={C.purple} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Chronic disease prevalence among DHMS members — indexed to 2018 (2018=100)">
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={chronicTrend}>
                <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} domain={[95, 140]} />
                <Tooltip content={<TT />} />
                <Line type="monotone" dataKey="diabetes" stroke={C.red} strokeWidth={2} dot={{ r: 2 }} name="Diabetes" />
                <Line type="monotone" dataKey="hypertension" stroke={C.gold} strokeWidth={2} dot={{ r: 2 }} name="Hypertension" />
                <Line type="monotone" dataKey="chol" stroke={C.purple} strokeWidth={2} dot={{ r: 2 }} name="Hypercholesterolaemia" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {[["Diabetes", C.red, "+29%"], ["Hypertension", C.gold, "+22%"], ["Cholesterol", C.purple, "+35%"]].map(([l, c, v]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 12, height: 3, background: c }} />
                  <span style={{ fontSize: 10, color: C.muted }}>{l} <strong style={{ color: c }}>{v}</strong></span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              Chronic disease prevalence among DHMS members grew substantially between 2018–2023. Critically, DHMS members show <em>higher</em> NCD burden than the non-scheme population — explained by an older, sicker member age profile as younger lives exit the risk pool.
            </p>
          </Sec>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Health check all-results-in-range (%) by member age — 2024">
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={healthCheckAge}>
                <defs>
                  <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.green} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="age" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "Age", position: "insideBottomRight", offset: 0, fill: C.muted, fontSize: 10 }} />
                <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<TT />} />
                <Area type="monotone" dataKey="inRange" stroke={C.green} fill="url(#hcGrad)" strokeWidth={2} name="All in range %" />
              </AreaChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              72% of 18-year-old Vitality members had all 5 health metrics in range — dropping sharply to just 35% by age 34. The working-age core of the Vitality base is already under significant metabolic stress despite their higher socioeconomic status.
            </p>
          </Sec>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
        <Sec label="ObeCity Index 2023 — Vitality member healthy weight & activity by city (% members)">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={obeCityData} layout="vertical">
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} unit="%" domain={[0, 80]} />
              <YAxis type="category" dataKey="city" tick={{ fill: C.text, fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<TT />} />
              <Bar dataKey="healthyWt" fill={C.green} name="Healthy weight %" />
              <Bar dataKey="workouts" fill={C.accent} name="Logging workouts %" />
              <Bar dataKey="healthyFood" fill={C.teal} name="Healthy food purchasing %" />
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 11, color: C.muted, marginTop: 10, lineHeight: 1.55 }}>
            Analysed across ~300,000 Vitality Health Checks (2022). Cape Town leads on healthy weight (53.5%) and food purchasing. Johannesburg leads on workout logging. Even the "healthiest" city has fewer than 54% of members at a healthy weight — reflecting the national obesity crisis that cuts across income brackets.
          </p>
        </Sec>
      </div>
    </div>
  );
}

/* ── Tab 3: Financial Standing ──────────────────────────────── */
const planCostData = [
  { plan: "KeyCare Core",    monthly: 1127, annualMin: 13524,  income_needed: 45000 },
  { plan: "Essential Smart", monthly: 2500, annualMin: 30000,  income_needed: 83000 },
  { plan: "Classic Smart",   monthly: 4200, annualMin: 50400,  income_needed: 140000 },
  { plan: "Priority Smart",  monthly: 6500, annualMin: 78000,  income_needed: 216000 },
  { plan: "Executive",       monthly: 9122, annualMin: 109464, income_needed: 303000 },
];

const finHealthData = [
  { label: "SA Pop: financially healthy", value: 16, color: C.red },
  { label: "Medical aid penetration", value: 15, color: C.accent },
  { label: "LSM 7–10 of SA population", value: 23, color: C.teal },
  { label: "Cars uninsured (SA)", value: 65, color: C.gold },
  { label: "Mid/upper income w/o med aid", value: 32, color: C.purple },
];

function FinanceTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        <Kpi label="Implied monthly income (KeyCare)" value="~R15k" sub="Minimum to sustain entry plan" color={C.teal} note="~10% of gross income rule of thumb" />
        <Kpi label="Implied income (Executive plan)" value="R100k+" sub="Monthly household income" color={C.gold} />
        <Kpi label="DHMS contribution hike 2026" value="7.9%" sub="vs. avg salary growth of 1–2%" color={C.red} note="Affordability pressure mounting" />
        <Kpi label="Discovery Bank customers" value="1.2M" sub="As of May 2025 — high-income target" color={C.accent} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Monthly Discovery plan cost vs. approximate income required (R/month)">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={planCostData}>
                <XAxis dataKey="plan" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<TT />} formatter={(v, n) => [`R${v.toLocaleString()}`, n]} />
                <Bar dataKey="monthly" fill={C.accent} name="Monthly premium (R)" />
                <Bar dataKey="income_needed" fill={C.purple + "55"} name="Approx income needed (R/month)" />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              Based on the widely-used guideline that medical aid should not exceed ~10% of gross monthly income. The Executive plan implies a household income exceeding R91,000/month — well above the R32,521 LSM 10 threshold.
            </p>
          </Sec>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Key financial health metrics — SA population context">
            {finHealthData.map((d, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: C.text }}>{d.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.value}%</span>
                </div>
                <div style={{ height: 4, background: C.border }}>
                  <div style={{ height: "100%", width: `${d.value}%`, background: d.color, maxWidth: "100%" }} />
                </div>
              </div>
            ))}
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              32% of middle- and upper-income South Africans still lack medical aid — underscoring that even LSM 8–9 membership is not universal. Vitality targets the insured slice of this already-privileged group.
            </p>
          </Sec>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 20 }}>
          <Sec label="The Vitality Money financial profile (Discovery Bank context)">
            {[
              { label: "Savings gap", text: "More than 50% of South Africans can't cover an unexpected R10,000 expense without debt. Vitality Money targets fixing this among its banked members.", icon: "💳" },
              { label: "Debt burden", text: "SA has more people with unsecured debt than employed people. Even higher-income earners carry significant unsecured debt — a key target of Vitality Money scoring.", icon: "📉" },
              { label: "Retirement gap", text: "A Diamond Vitality member can expect to live 20 years longer than a Blue member. Long-term savings adequacy is a core challenge even for LSM 9–10 members.", icon: "🧓" },
              { label: "Interest reward", text: "Financially healthy Vitality Money customers earn up to 1.5% additional interest on savings and pay up to 7% lower rates on unsecured lending — a structural wealth advantage.", icon: "📈" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 9, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </Sec>
        </div>
        <div style={{ background: "#0C0A00", border: `1px solid ${C.gold}22`, padding: 20, borderLeft: `3px solid ${C.gold}` }}>
          <div style={{ fontSize: 10, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>KEY INSIGHT — INCOME PARADOX</div>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 12 }}>
            Vitality members are in the top income quartile of South Africa, yet they still face significant financial vulnerability. Medical inflation running at 7.9% against salary growth of 1–2% means that even upper-middle-class members face a <strong>real-terms squeeze</strong> on their cover.
          </p>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 12 }}>
            The average 40-year-old Vitality member who identifies and manages their diabetes risk could live <strong>5 years longer</strong> — but that longevity compounds the retirement savings shortfall if financial health is not also addressed.
          </p>
          <p style={{ fontSize: 12, color: C.sub, lineHeight: 1.6 }}>
            Discovery's Vitality Money product is explicitly designed to address this — recognising that high physical health status does not automatically translate to financial security even among LSM 9–10 members.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Tab 4: Geography ──────────────────────────────────────── */
const provinceData = [
  { province: "Gauteng",       beneficiaries: 38.5, lsmShare: 39, color: C.accent },
  { province: "Western Cape",  beneficiaries: 15.5, lsmShare: 18.5, color: C.teal },
  { province: "KwaZulu-Natal", beneficiaries: 14,   lsmShare: 16.7, color: C.purple },
  { province: "Eastern Cape",  beneficiaries: 8,    lsmShare: 7, color: C.gold },
  { province: "Mpumalanga",    beneficiaries: 6,    lsmShare: 4, color: C.green },
  { province: "Other",         beneficiaries: 18,   lsmShare: 14, color: C.muted },
];

function GeoTab() {
  return (
    <div>
      <div style={{ background: "#050A12", border: `1px solid ${C.accent}22`, padding: "14px 18px", marginBottom: 20, borderLeft: `3px solid ${C.accent}` }}>
        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.65 }}>
          Medical scheme membership — and therefore Vitality membership — is overwhelmingly concentrated in South Africa's three major metro provinces. As of 2021, Gauteng alone accounts for <strong>~3.44 million</strong> of the 8.94 million total medical scheme beneficiaries nationwide. Vitality's reward partners (Discovery Stores, Dis-Chem, Clicks, airport lounges) also cluster in urban metros, reinforcing the geographic skew.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Medical scheme beneficiaries by province vs. LSM 7–10 share (%)">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={provinceData} layout="vertical">
                <XAxis type="number" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="province" tick={{ fill: C.text, fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip content={<TT />} />
                <Bar dataKey="beneficiaries" fill={C.accent} name="Med scheme beneficiaries %" />
                <Bar dataKey="lsmShare" fill={C.purple + "88"} name="LSM 7–10 share of province %" />
              </BarChart>
            </ResponsiveContainer>
          </Sec>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="ObeCity Index — city health ranking (Vitality members, 2022 data)">
            {[
              { rank: 1, city: "Cape Town", note: "Highest % healthy weight (53.5%). Most healthy food purchased.", best: true },
              { rank: 2, city: "Johannesburg", note: "Highest workout logging (5% above Bloemfontein baseline)." },
              { rank: 3, city: "Durban", note: "Lowest salt purchasing. Moderate healthy weight scores." },
              { rank: 4, city: "Pretoria", note: "Purchased least healthy food — 7.5% below Cape Town." },
              { rank: 5, city: "Bloemfontein", note: "Most sugar purchased. Lowest workout logging." },
              { rank: 6, city: "Gqeberha", note: "Lowest healthy weight %. Most room to improve — all metrics.", worst: true },
            ].map((r) => (
              <div key={r.rank} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.border}`, alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: r.best ? C.green : r.worst ? C.red : C.muted, width: 18, flexShrink: 0 }}>#{r.rank}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: r.best ? C.green : r.worst ? C.red : C.text }}>{r.city}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{r.note}</div>
                </div>
              </div>
            ))}
          </Sec>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 20 }}>
        <Sec label="Geographic access gap — structural exclusion">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <Insight icon="🗺️" text="In Limpopo, only 11.5% of the population is LSM 7–10. Private medical aid penetration is minimal — Vitality is virtually inaccessible to these communities." color={C.text} />
            <Insight icon="🏥" text="Vitality Health Checks are available at Dis-Chem, Clicks, and Discovery Stores — all urban retail chains. Rural South Africans cannot access the program." color={C.text} />
            <Insight icon="📱" text="Vitality Active Rewards tracking requires a smartphone and wearable device (Apple Watch, Garmin). The digital divide excludes lower-income individuals structurally." color={C.text} />
          </div>
        </Sec>
      </div>
    </div>
  );
}

/* ── Tab 5: Engagement Divide ──────────────────────────────── */
const engageDeathData = [
  { year: "2010", engaged: 116, unengaged: 310 },
  { year: "2012", engaged: 112, unengaged: 320 },
  { year: "2014", engaged: 108, unengaged: 340 },
  { year: "2016", engaged: 105, unengaged: 350 },
  { year: "2018", engaged: 110, unengaged: 360 },
  { year: "2020", engaged: 100, unengaged: 400 },
  { year: "2021", engaged: 94,  unengaged: 370 },
  { year: "2022", engaged: 98,  unengaged: 330 },
];

const statusBenefits = [
  { status: "Blue (unengaged)", flightDisc: 10, gymSave: 0, groceryBoost: 0, deviceDisc: 0 },
  { status: "Bronze", flightDisc: 15, gymSave: 20, groceryBoost: 5, deviceDisc: 20 },
  { status: "Silver", flightDisc: 20, gymSave: 30, groceryBoost: 10, deviceDisc: 35 },
  { status: "Gold", flightDisc: 25, gymSave: 75, groceryBoost: 15, deviceDisc: 50 },
  { status: "Diamond", flightDisc: 75, gymSave: 75, groceryBoost: 25, deviceDisc: 50 },
];

function EngageTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        <Kpi label="Death rate — unengaged (Blue)" value="370/100k" sub="Per life year, 2021" color={C.red} />
        <Kpi label="Death rate — engaged (Diamond)" value="94/100k" sub="Per life year, 2021" color={C.green} note="4x lower than unengaged" />
        <Kpi label="Diamond vs. Blue longevity gap" value="+20 yrs" sub="Healthy life years" color={C.teal} />
        <Kpi label="High-risk → treatment uptake" value="11×" sub="More likely within 3 months of health check" color={C.accent} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Death rates per 100,000 life years — engaged vs. unengaged Vitality members (2010–2022)">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={engageDeathData}>
                <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<TT />} formatter={(v, n) => [`${v} per 100k`, n]} />
                <Line type="monotone" dataKey="unengaged" stroke={C.red} strokeWidth={2} dot={{ r: 2 }} name="Blue (unengaged)" />
                <Line type="monotone" dataKey="engaged" stroke={C.green} strokeWidth={2} dot={{ r: 2 }} name="Diamond (highly engaged)" />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              Based on Discovery's 13-year comparative review (2010–2022). The mortality gap between highly engaged and unengaged Vitality members has widened over time. Cardiovascular disease causes 23% of unengaged deaths vs. 18% of engaged deaths.
            </p>
          </Sec>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 22 }}>
          <Sec label="Max reward % by Vitality Status tier">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={statusBenefits.slice(0, 3).concat(statusBenefits.slice(-1))}>
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="status" tick={{ fill: C.muted, fontSize: 9 }} />
                <Radar name="Flight %" dataKey="flightDisc" stroke={C.accent} fill={C.accent} fillOpacity={0.1} />
                <Radar name="Gym %" dataKey="gymSave" stroke={C.green} fill={C.green} fillOpacity={0.1} />
                <Radar name="Device %" dataKey="deviceDisc" stroke={C.gold} fill={C.gold} fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: 11, color: C.muted, marginTop: 8, lineHeight: 1.55 }}>
              The reward structure is designed to be regressive in access: Diamond benefits require consistent gym attendance, Apple Watch use, and Discovery Bank spend — all more accessible to higher-income members.
            </p>
          </Sec>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 20 }}>
          <Sec label="Socioeconomic drivers of engagement gap">
            {[
              { icon: "⏰", head: "Time availability", text: "Lower-income formal sector workers in demanding jobs have less time for gym visits and health checks — key Vitality point earners." },
              { icon: "💰", head: "Device cost barrier", text: "Earning an Apple Watch requires a qualifying Discovery Bank Suite card with R3,000/month spend — structurally excluding lower earners within the membership." },
              { icon: "🏋️", head: "Gym access", text: "Planet Fitness and Virgin Active — Vitality's gym partners — are concentrated in malls and urban centres, not accessible to outer-suburban or peri-urban members." },
              { icon: "🥗", head: "Healthy food cost", text: "HealthyFoods rewards apply to items typically more expensive than their equivalents. The 'health food premium' disproportionately burdens lower-income Vitality members." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 9, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 2 }}>{item.head}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{item.text}</div>
                </div>
              </div>
            ))}
          </Sec>
        </div>

        <div style={{ background: "#030A08", border: `1px solid ${C.green}22`, padding: 20, borderLeft: `3px solid ${C.green}` }}>
          <div style={{ fontSize: 10, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>BOTTOM LINE — SOCIOECONOMIC PORTRAIT</div>
          {[
            "Vitality members represent South Africa's top ~15–20% income earners — overwhelmingly formal sector, urban, LSM 8–10, Gauteng and Western Cape-based.",
            "Despite their relative affluence, they carry a high and growing burden of non-communicable disease — diabetes, hypertension, and obesity — driven by sedentary white-collar lifestyles and processed food consumption.",
            "The reward architecture is self-reinforcing: higher income → higher engagement → better health outcomes → longer life → greater accumulated wealth advantage over non-members.",
            "Within the membership, a socioeconomic gradient persists: Blue (unengaged) members are statistically older, sicker, and likely lower in the LSM 8–10 range than Diamond members.",
            "Medical inflation at 7.9% annually is outpacing income growth, creating a squeeze that threatens to push lower-LSM members off higher plans — a structural affordability crisis even within this privileged cohort.",
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
              <span style={{ color: C.green, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>→</span>
              <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.55 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState(0);
  const content = [<WhoTab />, <HealthTab />, <FinanceTab />, <GeoTab />, <EngageTab />];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans', 'DM Sans', sans-serif", color: C.text, paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 20, background: C.accent }} />
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em" }}>DISCOVERY VITALITY — SOCIOECONOMIC PROFILE</span>
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4, marginLeft: 13 }}>Who are Vitality members? Their income, health, geography, and engagement divide.</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: C.green, marginBottom: 2 }}>● DATA CURRENT</div>
          <div style={{ fontSize: 10, color: C.muted }}>Sources: Discovery 2024/25 · CMS · StatsSA · ObeCity Index</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "0 30px", display: "flex" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            background: "none", border: "none",
            borderBottom: tab === i ? `2px solid ${C.accent}` : "2px solid transparent",
            color: tab === i ? C.accent : C.muted,
            padding: "13px 18px", fontSize: 11, cursor: "pointer",
            letterSpacing: "0.06em", textTransform: "uppercase",
            fontWeight: tab === i ? 600 : 400, transition: "all 0.15s"
          }}>{t}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px 30px" }}>
        {content[tab]}
      </div>

      {/* Footer */}
      <div style={{ padding: "0 30px", marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
        <p style={{ fontSize: 10, color: C.muted, lineHeight: 1.6 }}>
          Sources: Discovery Limited Annual Results & Integrated Reports 2023–2025 · Discovery Health Medical Scheme member data · UNSGSA/Discovery Bank report (May 2025) · Discovery Vitality ObeCity Index 2023 · Discovery 13-year mortality review (2024) · Discovery chronic disease prevalence analysis (2024) · Council for Medical Schemes data · Statistics South Africa General Household Survey 2023 · Moneyweb (2025) · LSM data: SAARF/Eighty20. Estimates and inferences are clearly labelled. This dashboard is for intelligence and research purposes only.
        </p>
      </div>
    </div>
  );
}
