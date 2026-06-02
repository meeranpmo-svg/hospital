// Seed data for Jyothi Hospital, Chennai — Indian context.
// Currency: INR (₹). Tax: GST (CGST + SGST split, healthcare services exempt).
// Patient IDs: Aadhaar, PAN, ABHA. Regulators: IRDAI / MCI / NMC / PCI / INC / CDSCO.

const today = new Date().toISOString().slice(0, 10);

// ─────────────────────────────────────────────────────────────────
// HOSPITAL — Branding + statutory info
// ─────────────────────────────────────────────────────────────────
export const HOSPITAL = {
  name: 'Jyothi Hospital',
  shortName: 'JH',
  tagline: 'Caring with Compassion',
  address: '142, Anna Salai, Teynampet, Chennai 600018, Tamil Nadu, India',
  phone: '+91 44 2434 5678',
  email: 'info@jyothihospital.in',
  gstin: '33AAACJ9876H1ZQ',          // 33 = Tamil Nadu state code
  stateCode: '33',
  state: 'Tamil Nadu',
  stateAbbr: 'TN',
  pan: 'AAACJ9876H',
  cin: 'U85110TN2008PTC067890',
  mohRegNo: 'TN/HFR/2008/01234',     // Health Facility Registry number
  drugLicense: 'TN-CHN-Z-20A/21B/1234',
};

// ─────────────────────────────────────────────────────────────────
// ROLES — unchanged (universal)
// ─────────────────────────────────────────────────────────────────
export const ROLES = [
  { key: 'admin',              label: 'Admin',              color: 'bg-gray-800' },
  { key: 'doctor',             label: 'Doctor',             color: 'bg-emerald-600' },
  { key: 'chief_doctor',       label: 'Chief Doctor',       color: 'bg-emerald-800' },
  { key: 'nurse',              label: 'Nurse',              color: 'bg-pink-600' },
  { key: 'receptionist',       label: 'Receptionist',       color: 'bg-blue-600' },
  { key: 'pharmacist',         label: 'Pharmacist',         color: 'bg-purple-600' },
  { key: 'lab_tech',           label: 'Lab Technician',     color: 'bg-orange-600' },
  { key: 'finance',            label: 'Finance Officer',    color: 'bg-yellow-600' },
  { key: 'accountant',         label: 'Accountant',         color: 'bg-amber-700' },
  { key: 'cashier',            label: 'Cashier',            color: 'bg-cyan-600' },
  { key: 'insurance_approval', label: 'Insurance / TPA Coordinator', color: 'bg-teal-600' },
  { key: 'purchase_officer',   label: 'Purchase Officer',   color: 'bg-indigo-600' },
  { key: 'inventory_manager',  label: 'Inventory Manager',  color: 'bg-lime-600' },
  { key: 'hr_manager',         label: 'HR Manager',         color: 'bg-fuchsia-600' },
];

export const SEED_USERS = [
  { id: 'u1',  email: 'admin@jyothihospital.in',     password: 'Admin@123', name: 'System Admin',         role: 'admin' },
  { id: 'u2',  email: 'doctor@jyothihospital.in',    password: 'Admin@123', name: 'Dr. Arjun Krishnan',    role: 'doctor', department: 'Cardiology' },
  { id: 'u3',  email: 'chief@jyothihospital.in',     password: 'Admin@123', name: 'Dr. Vasudevan Iyer',    role: 'chief_doctor', department: 'Internal Medicine' },
  { id: 'u4',  email: 'nurse@jyothihospital.in',     password: 'Admin@123', name: 'Sr. Mary Lakshmi',      role: 'nurse' },
  { id: 'u5',  email: 'reception@jyothihospital.in', password: 'Admin@123', name: 'Priya Subramanian',     role: 'receptionist' },
  { id: 'u6',  email: 'pharmacist@jyothihospital.in',password: 'Admin@123', name: 'Karthik Ravi',          role: 'pharmacist' },
  { id: 'u7',  email: 'lab@jyothihospital.in',       password: 'Admin@123', name: 'Suresh Venkatesan',     role: 'lab_tech' },
  { id: 'u8',  email: 'finance@jyothihospital.in',   password: 'Admin@123', name: 'Anjali Menon',          role: 'finance' },
  { id: 'u9',  email: 'cashier@jyothihospital.in',   password: 'Admin@123', name: 'Vikram Reddy',          role: 'cashier' },
  { id: 'u10', email: 'tpa@jyothihospital.in',       password: 'Admin@123', name: 'Deepa Nair',            role: 'insurance_approval' },
  { id: 'u11', email: 'accountant@jyothihospital.in',password: 'Admin@123', name: 'Ramesh Chandrasekhar',  role: 'accountant' },
  { id: 'u12', email: 'purchase@jyothihospital.in',  password: 'Admin@123', name: 'Sandhya Pillai',        role: 'purchase_officer' },
  { id: 'u13', email: 'inventory@jyothihospital.in', password: 'Admin@123', name: 'Murali Mohan',          role: 'inventory_manager' },
  { id: 'u14', email: 'hr@jyothihospital.in',        password: 'Admin@123', name: 'Kavitha Balasubramanian', role: 'hr_manager' },
];

export const DEPARTMENTS = [
  { key: 'emergency',   name: 'Emergency / Casualty', color: 'red' },
  { key: 'opd',         name: 'General OPD',          color: 'blue' },
  { key: 'cardiology',  name: 'Cardiology',           color: 'rose' },
  { key: 'orthopedics', name: 'Orthopaedics',         color: 'amber' },
  { key: 'gynecology',  name: 'Obstetrics & Gynaecology', color: 'pink' },
  { key: 'pediatrics',  name: 'Paediatrics',          color: 'cyan' },
  { key: 'radiology',   name: 'Radiology / Imaging',  color: 'indigo' },
  { key: 'internal',    name: 'Internal Medicine',    color: 'emerald' },
];

export const DOCTORS = [
  { id: 'd1',  name: 'Dr. Arjun Krishnan',       department: 'cardiology',  specialty: 'Interventional Cardiologist', qualifications: 'MD, DM (Cardio)' },
  { id: 'd2',  name: 'Dr. Vasudevan Iyer',       department: 'internal',    specialty: 'Internal Medicine',           qualifications: 'MD (General Medicine)' },
  { id: 'd3',  name: 'Dr. Meera Raghavan',       department: 'gynecology',  specialty: 'OB/GYN, Laparoscopy',         qualifications: 'MS, MRCOG' },
  { id: 'd4',  name: 'Dr. Sanjay Pillai',        department: 'orthopedics', specialty: 'Joint Replacement Surgeon',   qualifications: 'MS (Ortho), Fellowship Joint' },
  { id: 'd5',  name: 'Dr. Aishwarya Murthy',     department: 'pediatrics',  specialty: 'Paediatrician',               qualifications: 'MD (Paediatrics)' },
  { id: 'd6',  name: 'Dr. Rajesh Selvaraj',      department: 'emergency',   specialty: 'Emergency Medicine',          qualifications: 'MBBS, MEM' },
  { id: 'd7',  name: 'Dr. Lakshmi Subramanian',  department: 'radiology',   specialty: 'Consultant Radiologist',      qualifications: 'MD (Radio Diagnosis)' },
  { id: 'd8',  name: 'Dr. Nithin Kumar',         department: 'opd',         specialty: 'Family Physician',            qualifications: 'MBBS, DFM' },
  { id: 'd9',  name: 'Dr. Priya Bhaskar',        department: 'cardiology',  specialty: 'Non-Invasive Cardiologist',   qualifications: 'DNB (Cardio)' },
  { id: 'd10', name: 'Dr. Hari Narayanan',       department: 'internal',    specialty: 'Diabetologist',               qualifications: 'MD, Fellowship Diabetes' },
];

// ─────────────────────────────────────────────────────────────────
// INSURERS — Indian health insurers + TPAs + government schemes
// ─────────────────────────────────────────────────────────────────
export const INSURANCE_COMPANIES = [
  // Standalone health insurers
  { key: 'star_health',     name: 'Star Health & Allied Insurance',        category: 'health' },
  { key: 'niva_bupa',       name: 'Niva Bupa Health Insurance',            category: 'health' },
  { key: 'care_health',     name: 'Care Health Insurance (Religare)',      category: 'health' },
  { key: 'manipal_cigna',   name: 'ManipalCigna Health Insurance',         category: 'health' },
  { key: 'aditya_birla',    name: 'Aditya Birla Health Insurance',         category: 'health' },

  // General insurers (offer health policies)
  { key: 'hdfc_ergo',       name: 'HDFC ERGO General Insurance',           category: 'general' },
  { key: 'bajaj_allianz',   name: 'Bajaj Allianz General Insurance',       category: 'general' },
  { key: 'tata_aig',        name: 'Tata AIG General Insurance',            category: 'general' },
  { key: 'icici_lombard',   name: 'ICICI Lombard General Insurance',       category: 'general' },
  { key: 'reliance_general',name: 'Reliance General Insurance',            category: 'general' },
  { key: 'sbi_general',     name: 'SBI General Insurance',                 category: 'general' },

  // Public-sector insurers (PSU)
  { key: 'new_india',       name: 'New India Assurance (PSU)',             category: 'psu' },
  { key: 'national_ins',    name: 'National Insurance (PSU)',              category: 'psu' },
  { key: 'united_india',    name: 'United India Insurance (PSU)',          category: 'psu' },
  { key: 'oriental',        name: 'Oriental Insurance (PSU)',              category: 'psu' },

  // Government schemes
  { key: 'pmjay',           name: 'Ayushman Bharat PM-JAY',                category: 'govt' },
  { key: 'cghs',            name: 'CGHS — Central Govt Health Scheme',     category: 'govt' },
  { key: 'echs',            name: 'ECHS — Ex-Servicemen Contributory',     category: 'govt' },
  { key: 'esic',            name: 'ESIC — Employees State Insurance',      category: 'govt' },
  { key: 'cmchis',          name: 'CMCHIS — TN Chief Minister Scheme',     category: 'govt' },

  // Third-Party Administrators
  { key: 'medi_assist',     name: 'Medi Assist (TPA)',                     category: 'tpa' },
  { key: 'md_india',        name: 'MD India Healthcare (TPA)',             category: 'tpa' },
  { key: 'fhpl',            name: 'Family Health Plan (FHPL) (TPA)',       category: 'tpa' },
  { key: 'health_india',    name: 'Health India TPA',                      category: 'tpa' },
  { key: 'vidal',           name: 'Vidal Health Insurance TPA',            category: 'tpa' },
];

// ─────────────────────────────────────────────────────────────────
// PATIENTS — Indian names, Aadhaar/PAN/ABHA, INR pricing context
// ─────────────────────────────────────────────────────────────────
export const SEED_PATIENTS = [
  { id: 'p1',  mrn: 'JH-100001', name: 'Suresh Iyer',              dob: '1968-05-14', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '4823 5612 9078', pan: 'ABCPI1234K', abha: '12-3456-7890-1234', phone: '9840012345', area: 'T. Nagar, Chennai',          bloodGroup: 'B+',  insurance: { company: 'star_health',  policyNumber: 'SH/CHN/55421',  memberId: 'STR-100001' }, allergies: ['Sulfa'],        emergencyContact: '9840012300' },
  { id: 'p2',  mrn: 'JH-100002', name: 'Lakshmi Narayanan',        dob: '1985-09-22', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '6712 8934 5621', pan: 'AAAPL5678M', abha: '12-3456-7890-2345', phone: '9840023456', area: 'Adyar, Chennai',             bloodGroup: 'A+',  insurance: { company: 'niva_bupa',    policyNumber: 'NB/INC/998123', memberId: 'NB-100002' },  allergies: [],                emergencyContact: '9840023400' },
  { id: 'p3',  mrn: 'JH-100003', name: 'Mohammed Ashraf',          dob: '1978-11-05', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '2345 6789 0123', pan: 'BMKPM4521N', abha: '',                   phone: '9840034567', area: 'Triplicane, Chennai',        bloodGroup: 'B+',  insurance: { company: 'care_health',  policyNumber: 'CHI/441221',     memberId: 'CHI-100003' }, allergies: ['Penicillin'],   emergencyContact: '9840034500' },
  { id: 'p4',  mrn: 'JH-100004', name: 'Anitha Govindarajan',      dob: '1995-01-18', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '7821 4569 0033', pan: 'GVAPA9876R', abha: '12-3456-7890-4567', phone: '9840045678', area: 'Anna Nagar, Chennai',        bloodGroup: 'AB+', insurance: { company: 'pmjay',        policyNumber: 'PMJAY-TN-882104',memberId: 'PMJAY-100004' },allergies: [],                emergencyContact: '9840045600' },
  { id: 'p5',  mrn: 'JH-100005', name: 'Ramaswamy Pillai',         dob: '1955-09-30', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '9087 6543 2109', pan: 'PWRPR1122K', abha: '12-3456-7890-5678', phone: '9840056789', area: 'Mylapore, Chennai',          bloodGroup: 'O-',  insurance: { company: 'hdfc_ergo',    policyNumber: 'HE/HLT/220110', memberId: 'HE-100005' },  allergies: ['Aspirin'],      emergencyContact: '9840056700' },
  { id: 'p6',  mrn: 'JH-100006', name: 'Fathima Begum',            dob: '1989-04-25', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '5544 3322 1100', pan: 'FBKPF3344L', abha: '',                   phone: '9840067890', area: 'Royapettah, Chennai',        bloodGroup: 'A-',  insurance: { company: 'bajaj_allianz',policyNumber: 'BA/HEALTH/110203',memberId: 'BA-100006' }, allergies: [],                emergencyContact: '9840067800' },
  { id: 'p7',  mrn: 'JH-100007', name: 'James Wilson',             dob: '1972-08-14', gender: 'male',   nationality: 'British (OCI)', idType: 'passport', idNumber: 'GBR8842231', pan: 'WLSPJ7788H', abha: '',           phone: '9840078901', area: 'Besant Nagar, Chennai',      bloodGroup: 'B-',  insurance: { company: 'tata_aig',     policyNumber: 'TA/119922',      memberId: 'TA-100007' },  allergies: [],                emergencyContact: '9840078800' },
  { id: 'p8',  mrn: 'JH-100008', name: 'Bhaskaran Nair',           dob: '1948-12-08', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '1122 3344 5566', pan: 'BNKPB5544T', abha: '12-3456-7890-8901', phone: '9840089012', area: 'Velachery, Chennai',         bloodGroup: 'O+',  insurance: { company: 'cghs',         policyNumber: 'CGHS-TN-CHN-998800',memberId: 'CGHS-100008' },allergies: ['Latex'],        emergencyContact: '9840089000' },
  { id: 'p9',  mrn: 'JH-100009', name: 'Diya Krishnan',            dob: '2018-06-15', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '8877 6655 4433', pan: '',           abha: '12-3456-7890-9012', phone: '9840090123', area: 'Tambaram, Chennai',          bloodGroup: 'A+',  insurance: { company: 'star_health',  policyNumber: 'SH/FAM/330011', memberId: 'STR-100009' }, allergies: [],                emergencyContact: '9840090100' },
  { id: 'p10', name: 'Rajesh Kumar Sharma', mrn: 'JH-100010', dob: '1980-02-19', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '3344 5566 7788', pan: 'RKSPS9988J', abha: '12-3456-7891-0123', phone: '9840101234', area: 'Porur, Chennai',             bloodGroup: 'B+',  insurance: { company: 'icici_lombard',policyNumber: 'IL/HLT/887766', memberId: 'IL-100010' },  allergies: [],                emergencyContact: '9840101200' },
  { id: 'p11', mrn: 'JH-100011', name: 'Maria Joseph',             dob: '1990-10-03', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '6655 7788 9900', pan: 'MJSPM6655P', abha: '12-3456-7891-1234', phone: '9840112345', area: 'Vadapalani, Chennai',        bloodGroup: 'O+',  insurance: { company: 'new_india',    policyNumber: 'NIA/665544',     memberId: 'NIA-100011' }, allergies: ['Iodine'],       emergencyContact: '9840112300' },
  { id: 'p12', mrn: 'JH-100012', name: 'Karthikeyan Velu',         dob: '2002-05-27', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '4433 2211 0099', pan: 'KVLPK4422Q', abha: '12-3456-7891-2345', phone: '9840123456', area: 'Guindy, Chennai',            bloodGroup: 'AB-', insurance: { company: 'manipal_cigna',policyNumber: 'MC/998877',     memberId: 'MC-100012' },  allergies: [],                emergencyContact: '9840123400' },
  { id: 'p13', mrn: 'JH-100013', name: 'Saraswathi Bai',           dob: '1962-03-09', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '7766 5544 3322', pan: 'SBKPS7766F', abha: '12-3456-7891-3456', phone: '9840134567', area: 'Nungambakkam, Chennai',      bloodGroup: 'A+',  insurance: { company: 'united_india', policyNumber: 'UII/223344',     memberId: 'UII-100013' }, allergies: ['Penicillin'],   emergencyContact: '9840134500' },
  { id: 'p14', mrn: 'JH-100014', name: 'Ahmed Hussain',            dob: '1987-09-12', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '8899 0011 2233', pan: 'AHMPH8899V', abha: '',                   phone: '9840145678', area: 'Chrompet, Chennai',          bloodGroup: 'O+',  insurance: { company: 'aditya_birla', policyNumber: 'AB/554433',      memberId: 'AB-100014' },  allergies: [],                emergencyContact: '9840145600' },
  { id: 'p15', mrn: 'JH-100015', name: 'Olivia Brown',             dob: '1998-01-30', gender: 'female', nationality: 'Australian', idType: 'passport', idNumber: 'AUS5523198', pan: '',         abha: '',                   phone: '9840156789', area: 'ECR, Chennai',               bloodGroup: 'B+',  insurance: { company: 'tata_aig',     policyNumber: 'TA-INTL/883399', memberId: 'TA-100015' },  allergies: [],                emergencyContact: '9840156700' },
  { id: 'p16', mrn: 'JH-100016', name: 'Bharath Sundaram',         dob: '1975-07-04', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '5544 6677 8899', pan: 'BSDPB5544H', abha: '12-3456-7891-6789', phone: '9840167890', area: 'Saidapet, Chennai',          bloodGroup: 'A-',  insurance: { company: 'reliance_general',policyNumber: 'RG/110099',   memberId: 'RG-100016' },  allergies: [],                emergencyContact: '9840167800' },
  { id: 'p17', mrn: 'JH-100017', name: 'Reshma Pillai',            dob: '1993-11-21', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '6677 8899 0011', pan: 'RPLPR6677A', abha: '12-3456-7891-7890', phone: '9840178901', area: 'Kotturpuram, Chennai',       bloodGroup: 'O+',  insurance: { company: 'sbi_general',  policyNumber: 'SBI/665522',     memberId: 'SBI-100017' }, allergies: ['Codeine'],      emergencyContact: '9840178800' },
  { id: 'p18', mrn: 'JH-100018', name: 'Hari Govindan',            dob: '1948-04-17', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '1122 2233 4455', pan: 'HGNPH1122D', abha: '12-3456-7891-8901', phone: '9840189012', area: 'Pallavaram, Chennai',        bloodGroup: 'AB+', insurance: { company: 'echs',         policyNumber: 'ECHS-TN-998800', memberId: 'ECHS-100018' },allergies: [],                emergencyContact: '9840189000' },
  { id: 'p19', mrn: 'JH-100019', name: 'Yamuna Raghavan',          dob: '2010-08-08', gender: 'female', nationality: 'Indian',  idType: 'aadhaar',  idNumber: '2233 3344 5566', pan: '',           abha: '12-3456-7891-9012', phone: '9840190123', area: 'Mogappair, Chennai',         bloodGroup: 'O+',  insurance: { company: 'cmchis',       policyNumber: 'CMCHIS-TN-112233',memberId: 'CMCHIS-100019' }, allergies: ['Eggs'],         emergencyContact: '9840190100' },
  { id: 'p20', mrn: 'JH-100020', name: 'Faizal Rahman',            dob: '1983-12-25', gender: 'male',   nationality: 'Indian',  idType: 'aadhaar',  idNumber: '5566 3322 9988', pan: 'FRZPF5566B', abha: '12-3456-7892-0123', phone: '9840201234', area: 'Kilpauk, Chennai',           bloodGroup: 'A+',  insurance: { company: 'star_health',  policyNumber: 'SH/IND/227733', memberId: 'STR-100020' }, allergies: [],                emergencyContact: '9840201200' },
];

export const SEED_APPOINTMENTS = [
  { id: 'a1',  patientId: 'p1',  doctorId: 'd1',  department: 'cardiology',  date: today, time: '09:00', status: 'waiting',     channel: 'walk-in',  token: 'C-001' },
  { id: 'a2',  patientId: 'p2',  doctorId: 'd3',  department: 'gynecology',  date: today, time: '09:30', status: 'in_progress', channel: 'web',      token: 'G-001' },
  { id: 'a3',  patientId: 'p3',  doctorId: 'd2',  department: 'internal',    date: today, time: '10:00', status: 'waiting',     channel: 'whatsapp', token: 'I-001' },
  { id: 'a4',  patientId: 'p4',  doctorId: 'd1',  department: 'cardiology',  date: today, time: '10:30', status: 'waiting',     channel: 'walk-in',  token: 'C-002' },
  { id: 'a5',  patientId: 'p5',  doctorId: 'd9',  department: 'cardiology',  date: today, time: '11:00', status: 'done',        channel: 'web',      token: 'C-003' },
  { id: 'a6',  patientId: 'p6',  doctorId: 'd3',  department: 'gynecology',  date: today, time: '11:30', status: 'waiting',     channel: 'walk-in',  token: 'G-002' },
  { id: 'a7',  patientId: 'p7',  doctorId: 'd8',  department: 'opd',         date: today, time: '12:00', status: 'waiting',     channel: 'walk-in',  token: 'O-001' },
  { id: 'a8',  patientId: 'p8',  doctorId: 'd4',  department: 'orthopedics', date: today, time: '12:30', status: 'waiting',     channel: 'referral', token: 'OR-001' },
  { id: 'a9',  patientId: 'p9',  doctorId: 'd5',  department: 'pediatrics',  date: today, time: '13:00', status: 'waiting',     channel: 'web',      token: 'P-001' },
  { id: 'a10', patientId: 'p10', doctorId: 'd2',  department: 'internal',    date: today, time: '13:30', status: 'waiting',     channel: 'walk-in',  token: 'I-002' },
  { id: 'a11', patientId: 'p11', doctorId: 'd6',  department: 'emergency',   date: today, time: '14:00', status: 'in_progress', channel: 'walk-in',  token: 'E-001' },
  { id: 'a12', patientId: 'p12', doctorId: 'd4',  department: 'orthopedics', date: today, time: '14:30', status: 'waiting',     channel: 'walk-in',  token: 'OR-002' },
  { id: 'a13', patientId: 'p13', doctorId: 'd1',  department: 'cardiology',  date: today, time: '15:00', status: 'waiting',     channel: 'web',      token: 'C-004' },
  { id: 'a14', patientId: 'p14', doctorId: 'd8',  department: 'opd',         date: today, time: '15:30', status: 'waiting',     channel: 'whatsapp', token: 'O-002' },
  { id: 'a15', patientId: 'p15', doctorId: 'd5',  department: 'pediatrics',  date: today, time: '16:00', status: 'waiting',     channel: 'walk-in',  token: 'P-002' },
];

export const ICD10_CODES = [
  { code: 'I10',     desc: 'Essential (primary) hypertension' },
  { code: 'E11.9',   desc: 'Type 2 diabetes mellitus without complications' },
  { code: 'J06.9',   desc: 'Acute upper respiratory infection, unspecified' },
  { code: 'K21.9',   desc: 'Gastro-esophageal reflux disease' },
  { code: 'M54.5',   desc: 'Low back pain' },
  { code: 'R51',     desc: 'Headache' },
  { code: 'J45.909', desc: 'Unspecified asthma, uncomplicated' },
  { code: 'N39.0',   desc: 'Urinary tract infection, site not specified' },
  { code: 'A09',     desc: 'Infectious gastroenteritis (common in tropics)' },
  { code: 'B54',     desc: 'Unspecified malaria' },
  { code: 'A91',     desc: 'Dengue haemorrhagic fever' },
  { code: 'F41.9',   desc: 'Anxiety disorder, unspecified' },
  { code: 'I25.10',  desc: 'Atherosclerotic heart disease' },
  { code: 'E78.5',   desc: 'Hyperlipidaemia' },
];

// ─────────────────────────────────────────────────────────────────
// DRUG INVENTORY — Indian brand names + INR prices + HSN 3004
// ─────────────────────────────────────────────────────────────────
// HSN 3004 = medicaments; GST 5% for essentials (Schedule I), 12% for most others
export const DRUG_INVENTORY = [
  { id: 'dr1',  name: 'Dolo 650 (Paracetamol 650mg)',     hsn: '3004', gstRate: 12, stock: 540, reorder: 100, expiry: '2027-08-15', price: 2.50,  category: 'Analgesic',     manufacturer: 'Micro Labs',     interactions: [] },
  { id: 'dr2',  name: 'Mox 500 (Amoxicillin 500mg)',      hsn: '3004', gstRate: 12, stock: 220, reorder: 80,  expiry: '2026-11-30', price: 8.50,  category: 'Antibiotic',    manufacturer: 'Sun Pharma',     interactions: ['Methotrexate'] },
  { id: 'dr3',  name: 'Glycomet 850 (Metformin 850mg)',   hsn: '3004', gstRate: 5,  stock: 380, reorder: 150, expiry: '2027-02-22', price: 3.20,  category: 'Antidiabetic',  manufacturer: 'USV',            interactions: ['IV contrast'] },
  { id: 'dr4',  name: 'Atorlip 20 (Atorvastatin 20mg)',   hsn: '3004', gstRate: 12, stock: 60,  reorder: 80,  expiry: '2026-09-10', price: 7.50,  category: 'Statin',        manufacturer: 'Cipla',          interactions: ['Grapefruit', 'Erythromycin'] },
  { id: 'dr5',  name: 'Listril 10 (Lisinopril 10mg)',     hsn: '3004', gstRate: 12, stock: 175, reorder: 100, expiry: '2027-05-18', price: 4.80,  category: 'ACE Inhibitor', manufacturer: 'Torrent',        interactions: ['Potassium', 'NSAIDs'] },
  { id: 'dr6',  name: 'Omez 20 (Omeprazole 20mg)',        hsn: '3004', gstRate: 12, stock: 410, reorder: 150, expiry: '2027-01-12', price: 3.80,  category: 'PPI',           manufacturer: 'Dr. Reddy\'s',    interactions: ['Clopidogrel'] },
  { id: 'dr7',  name: 'Asthalin Inhaler (Salbutamol)',    hsn: '3004', gstRate: 12, stock: 95,  reorder: 50,  expiry: '2026-12-08', price: 145.0, category: 'Bronchodilator',manufacturer: 'Cipla',          interactions: [] },
  { id: 'dr8',  name: 'Alerid 10 (Cetirizine 10mg)',      hsn: '3004', gstRate: 12, stock: 320, reorder: 100, expiry: '2027-04-25', price: 2.20,  category: 'Antihistamine', manufacturer: 'Cipla',          interactions: [] },
  { id: 'dr9',  name: 'Brufen 400 (Ibuprofen 400mg)',     hsn: '3004', gstRate: 12, stock: 25,  reorder: 100, expiry: '2026-08-30', price: 3.50,  category: 'NSAID',         manufacturer: 'Abbott India',   interactions: ['Warfarin', 'Lisinopril'] },
  { id: 'dr10', name: 'Lantus Vial (Insulin Glargine)',   hsn: '3004', gstRate: 5,  stock: 48,  reorder: 30,  expiry: '2026-07-15', price: 850.0, category: 'Insulin',       manufacturer: 'Sanofi India',   interactions: [] },
  { id: 'dr11', name: 'Ecosprin 75 (Aspirin 75mg)',       hsn: '3004', gstRate: 5,  stock: 460, reorder: 150, expiry: '2027-10-01', price: 1.20,  category: 'Antiplatelet',  manufacturer: 'USV',            interactions: ['Warfarin', 'Ibuprofen'] },
  { id: 'dr12', name: 'Amlong 5 (Amlodipine 5mg)',        hsn: '3004', gstRate: 12, stock: 240, reorder: 100, expiry: '2027-03-20', price: 5.40,  category: 'CCB',           manufacturer: 'Micro Labs',     interactions: ['Simvastatin'] },
];

export const SEED_PRESCRIPTIONS = [
  { id: 'rx1', patientId: 'p1', doctorId: 'd1', date: today, status: 'pending',   items: [{ drugId: 'dr11', name: 'Ecosprin 75',        dose: '1 tab', freq: 'OD',  duration: '30 days', instructions: 'After breakfast' }, { drugId: 'dr4',  name: 'Atorlip 20',     dose: '1 tab', freq: 'HS', duration: '30 days', instructions: 'At bedtime' }] },
  { id: 'rx2', patientId: 'p3', doctorId: 'd2', date: today, status: 'pending',   items: [{ drugId: 'dr3',  name: 'Glycomet 850',       dose: '1 tab', freq: 'BID', duration: '90 days', instructions: 'With meals' }] },
  { id: 'rx3', patientId: 'p5', doctorId: 'd9', date: today, status: 'dispensed', items: [{ drugId: 'dr5',  name: 'Listril 10',         dose: '1 tab', freq: 'OD',  duration: '30 days', instructions: 'Morning' }] },
  { id: 'rx4', patientId: 'p4', doctorId: 'd1', date: today, status: 'pending',   items: [{ drugId: 'dr1',  name: 'Dolo 650',           dose: '1 tab', freq: 'TID', duration: '5 days',  instructions: 'After food' }, { drugId: 'dr2',  name: 'Mox 500',         dose: '1 cap', freq: 'TID', duration: '7 days',  instructions: 'Complete course' }] },
  { id: 'rx5', patientId: 'p9', doctorId: 'd5', date: today, status: 'pending',   items: [{ drugId: 'dr1',  name: 'Crocin Syrup',       dose: '5 ml',  freq: 'QID', duration: '3 days',  instructions: 'Paediatric syrup' }] },
  { id: 'rx6', patientId: 'p13',doctorId: 'd1', date: today, status: 'pending',   items: [{ drugId: 'dr12', name: 'Amlong 5',           dose: '1 tab', freq: 'OD',  duration: '30 days', instructions: 'Morning' }] },
];

// HSN/SAC for healthcare services: 999312 (exempt). Lab tests: 9993 (exempt).
export const LAB_TESTS = [
  { code: 'CBC',         name: 'Complete Blood Count (CBC)',         price: 250,  sac: '9993', gstRate: 0, category: 'Hematology' },
  { code: 'CMP',         name: 'Comprehensive Metabolic Panel',      price: 450,  sac: '9993', gstRate: 0, category: 'Chemistry' },
  { code: 'HbA1c',       name: 'Glycated Haemoglobin (HbA1c)',       price: 380,  sac: '9993', gstRate: 0, category: 'Diabetes' },
  { code: 'LIPID',       name: 'Lipid Profile',                      price: 420,  sac: '9993', gstRate: 0, category: 'Chemistry' },
  { code: 'UA',          name: 'Urine Routine & Microscopy',         price: 120,  sac: '9993', gstRate: 0, category: 'Microbiology' },
  { code: 'COVID-RTPCR', name: 'COVID-19 RT-PCR',                    price: 499,  sac: '9993', gstRate: 0, category: 'Virology' },
  { code: 'DENGUE-NS1',  name: 'Dengue NS1 Antigen',                 price: 650,  sac: '9993', gstRate: 0, category: 'Virology' },
  { code: 'XRAY-CHEST',  name: 'X-Ray Chest (PA View)',              price: 350,  sac: '9993', gstRate: 0, category: 'Radiology' },
  { code: 'US-ABD',      name: 'Ultrasound Abdomen',                 price: 1200, sac: '9993', gstRate: 0, category: 'Radiology' },
  { code: 'TSH',         name: 'TSH (Thyroid)',                      price: 320,  sac: '9993', gstRate: 0, category: 'Endocrine' },
  { code: 'ECG',         name: 'Electrocardiogram (ECG)',            price: 250,  sac: '9993', gstRate: 0, category: 'Cardiac' },
  { code: 'WIDAL',       name: 'Widal Test (Typhoid)',               price: 200,  sac: '9993', gstRate: 0, category: 'Microbiology' },
];

export const SEED_LAB_ORDERS = [
  { id: 'lab1', patientId: 'p1', doctorId: 'd1', date: today, tests: ['LIPID','HbA1c','ECG'], urgency: 'routine', status: 'pending',     results: null },
  { id: 'lab2', patientId: 'p3', doctorId: 'd2', date: today, tests: ['CBC','HbA1c'],         urgency: 'routine', status: 'in_progress', results: null },
  { id: 'lab3', patientId: 'p5', doctorId: 'd9', date: today, tests: ['CMP','LIPID'],         urgency: 'urgent',  status: 'completed',   results: { CMP: 'Within normal limits', LIPID: 'Total: 220 mg/dL, LDL: 145 mg/dL, HDL: 42 mg/dL — Borderline high' } },
  { id: 'lab4', patientId: 'p11',doctorId: 'd6', date: today, tests: ['CBC','UA','DENGUE-NS1'],urgency: 'STAT',   status: 'pending',     results: null },
  { id: 'lab5', patientId: 'p4', doctorId: 'd1', date: today, tests: ['CBC'],                 urgency: 'routine', status: 'completed',   results: { CBC: 'WBC: 9.8 ×10³/μL, RBC: 4.6 ×10⁶/μL, Hb: 13.2 g/dL, Plt: 245 ×10³/μL — Within normal range' } },
  { id: 'lab6', patientId: 'p13',doctorId: 'd1', date: today, tests: ['LIPID','TSH'],         urgency: 'routine', status: 'pending',     results: null },
  { id: 'lab7', patientId: 'p7', doctorId: 'd8', date: today, tests: ['CMP'],                 urgency: 'routine', status: 'in_progress', results: null },
  { id: 'lab8', patientId: 'p8', doctorId: 'd4', date: today, tests: ['XRAY-CHEST'],          urgency: 'urgent',  status: 'pending',     results: null },
];

export const SEED_VITALS = [
  { id: 'v1', patientId: 'p2', date: today, bp: '118/76', hr: 72, temp: 36.6, weight: 64, spo2: 98, recordedBy: 'u4' },
  { id: 'v2', patientId: 'p1', date: today, bp: '142/92', hr: 88, temp: 36.8, weight: 88, spo2: 96, recordedBy: 'u4' },
  { id: 'v3', patientId: 'p11',date: today, bp: '125/80', hr: 100,temp: 38.4, weight: 56, spo2: 95, recordedBy: 'u4' },
];

// ─────────────────────────────────────────────────────────────────
// BILLS — Indian tax invoice format with CGST + SGST, HSN/SAC
// ─────────────────────────────────────────────────────────────────
export const SEED_BILLS = [
  {
    id: 'b1', patientId: 'p5', date: today,
    invoiceNo: 'JH/2026/05/00001',
    invoiceType: 'tax_invoice',
    placeOfSupply: '33-Tamil Nadu',
    items: [
      { desc: 'Cardiology Consultation', sacOrHsn: '999312', qty: 1,  rate: 800,  amount: 800,  gstRate: 0,  cgst: 0,    sgst: 0,    total: 800   },
      { desc: 'Lab: CMP + Lipid Profile', sacOrHsn: '9993', qty: 1,  rate: 870,  amount: 870,  gstRate: 0,  cgst: 0,    sgst: 0,    total: 870   },
      { desc: 'Listril 10 × 30 tabs',     sacOrHsn: '3004', qty: 30, rate: 4.80, amount: 144,  gstRate: 12, cgst: 8.64, sgst: 8.64, total: 161.28 },
    ],
    subtotal: 1814, totalCgst: 8.64, totalSgst: 8.64, totalIgst: 0, total: 1831.28,
    insuranceCovered: 1465, patientPays: 366.28, status: 'paid',
  },
  {
    id: 'b2', patientId: 'p2', date: today,
    invoiceNo: 'JH/2026/05/00002',
    invoiceType: 'bill_of_supply',
    placeOfSupply: '33-Tamil Nadu',
    items: [
      { desc: 'OB/GYN Consultation', sacOrHsn: '999312', qty: 1, rate: 1000, amount: 1000, gstRate: 0, cgst: 0, sgst: 0, total: 1000 },
    ],
    subtotal: 1000, totalCgst: 0, totalSgst: 0, totalIgst: 0, total: 1000,
    insuranceCovered: 800, patientPays: 200, status: 'pending',
  },
];

export const SEED_NOTIFICATIONS = [
  { id: 'n1', type: 'lab',       title: 'Lab Result Ready',     desc: 'Patient Ramaswamy Pillai — Lipid Profile',          time: '2h ago', read: false },
  { id: 'n2', type: 'insurance', title: 'Pre-auth Approved',    desc: 'Star Health — Patient Suresh Iyer (ACS workup)',     time: '3h ago', read: false },
  { id: 'n3', type: 'pharmacy',  title: 'Low Stock Alert',      desc: 'Brufen 400mg — only 25 units left',                  time: '5h ago', read: false },
  { id: 'n4', type: 'pharmacy',  title: 'Low Stock Alert',      desc: 'Atorlip 20 — only 60 units left',                    time: '5h ago', read: false },
];

// ─────────────────────────────────────────────────────────────────
// ACCOUNTING — Chart of Accounts with GST liability accounts
// ─────────────────────────────────────────────────────────────────
export const CHART_OF_ACCOUNTS = [
  { code: '1000', name: 'Cash on Hand',           type: 'Asset',     balance: 248500 },
  { code: '1010', name: 'Bank — HDFC Current',    type: 'Asset',     balance: 4250000 },
  { code: '1020', name: 'Bank — SBI Current',     type: 'Asset',     balance: 1850000 },
  { code: '1100', name: 'Accounts Receivable',    type: 'Asset',     balance: 685000 },
  { code: '1110', name: 'Input CGST',             type: 'Asset',     balance: 42800 },
  { code: '1111', name: 'Input SGST',             type: 'Asset',     balance: 42800 },
  { code: '1112', name: 'Input IGST',             type: 'Asset',     balance: 18500 },
  { code: '1200', name: 'Pharmacy Inventory',     type: 'Asset',     balance: 528000 },
  { code: '1210', name: 'Medical Supplies',       type: 'Asset',     balance: 312500 },
  { code: '1500', name: 'Medical Equipment',      type: 'Asset',     balance: 12500000 },
  { code: '2000', name: 'Accounts Payable',       type: 'Liability', balance: 425000 },
  { code: '2050', name: 'TDS Payable',            type: 'Liability', balance: 38500 },
  { code: '2100', name: 'Salaries Payable',       type: 'Liability', balance: 850000 },
  { code: '2110', name: 'EPF Payable',            type: 'Liability', balance: 92000 },
  { code: '2111', name: 'ESI Payable',            type: 'Liability', balance: 18500 },
  { code: '2112', name: 'Professional Tax (TN)',  type: 'Liability', balance: 4800 },
  { code: '2200', name: 'Output CGST',            type: 'Liability', balance: 28500 },
  { code: '2201', name: 'Output SGST',            type: 'Liability', balance: 28500 },
  { code: '2202', name: 'Output IGST',            type: 'Liability', balance: 5200 },
  { code: '3000', name: 'Owner Equity',           type: 'Equity',    balance: 15000000 },
  { code: '4000', name: 'Consultation Income',    type: 'Revenue',   balance: 1850000 },
  { code: '4010', name: 'Pharmacy Sales',         type: 'Revenue',   balance: 685000 },
  { code: '4020', name: 'Lab Income',             type: 'Revenue',   balance: 495000 },
  { code: '4030', name: 'Surgery / OT Income',    type: 'Revenue',   balance: 1420000 },
  { code: '4040', name: 'Radiology Income',       type: 'Revenue',   balance: 385000 },
  { code: '5000', name: 'Salaries & Wages',       type: 'Expense',   balance: 850000 },
  { code: '5050', name: 'Doctor Consulting Fees', type: 'Expense',   balance: 420000 },
  { code: '5100', name: 'Drug Purchases',         type: 'Expense',   balance: 385000 },
  { code: '5200', name: 'Utilities (EB/Water)',   type: 'Expense',   balance: 78500 },
  { code: '5300', name: 'Rent',                   type: 'Expense',   balance: 165000 },
  { code: '5400', name: 'Housekeeping',           type: 'Expense',   balance: 48000 },
];

export const SEED_JOURNAL_ENTRIES = [
  { id: 'je1', date: today, ref: 'JE/2026/05/0001', desc: 'Cashier daily collection',           lines: [{ acct: '1000', dr: 22650, cr: 0 }, { acct: '4000', dr: 0, cr: 22650 }],   postedBy: 'u11' },
  { id: 'je2', date: today, ref: 'JE/2026/05/0002', desc: 'Drug purchase from Sun Pharma',       lines: [{ acct: '1200', dr: 84000, cr: 0 }, { acct: '1110', dr: 5040, cr: 0 }, { acct: '1111', dr: 5040, cr: 0 }, { acct: '2000', dr: 0, cr: 94080 }], postedBy: 'u11' },
  { id: 'je3', date: today, ref: 'JE/2026/05/0003', desc: 'May salaries accrual',                lines: [{ acct: '5000', dr: 850000,cr: 0 }, { acct: '2100', dr: 0, cr: 850000 }],  postedBy: 'u11' },
  { id: 'je4', date: today, ref: 'JE/2026/05/0004', desc: 'Star Health claim received',          lines: [{ acct: '1010', dr: 165000,cr: 0 }, { acct: '1100', dr: 0, cr: 165000 }], postedBy: 'u11' },
  { id: 'je5', date: today, ref: 'JE/2026/05/0005', desc: 'TDS deducted on prof. fees',          lines: [{ acct: '5050', dr: 50000, cr: 0 }, { acct: '2050', dr: 0, cr: 5000  }, { acct: '1000', dr: 0, cr: 45000 }],  postedBy: 'u11' },
];

// ─────────────────────────────────────────────────────────────────
// VENDORS — Indian suppliers with GSTIN, PAN, payment terms
// ─────────────────────────────────────────────────────────────────
export const SEED_VENDORS = [
  { id: 'vn1', name: 'Sun Pharmaceutical Industries Ltd',  category: 'Pharmaceuticals', contact: 'Mr. Vijay Mehta',     phone: '02224678910', email: 'b2b@sunpharma.com',       gstin: '27AAACS3142N1ZH', pan: 'AAACS3142N', state: 'Maharashtra', balance: 168500, paymentTerms: 'Net 30' },
  { id: 'vn2', name: 'Cipla Ltd',                           category: 'Pharmaceuticals', contact: 'Mrs. Pooja Shah',     phone: '02225678901', email: 'orders@cipla.com',         gstin: '27AAACC4567P1ZK', pan: 'AAACC4567P', state: 'Maharashtra', balance: 92000,  paymentTerms: 'Net 30' },
  { id: 'vn3', name: 'Dr. Reddy\'s Laboratories Ltd',       category: 'Pharmaceuticals', contact: 'Mr. Anand Krishnan',  phone: '04023456789', email: 'b2b@drreddys.com',         gstin: '36AAACD9876R1ZL', pan: 'AAACD9876R', state: 'Telangana',   balance: 56700,  paymentTerms: 'Net 45' },
  { id: 'vn4', name: 'Romsons Scientific & Surgical',       category: 'Medical Supplies',contact: 'Mr. Rakesh Gupta',    phone: '01125678901', email: 'sales@romsons.com',        gstin: '07AAACR2345B1ZM', pan: 'AAACR2345B', state: 'Delhi',       balance: 38500,  paymentTerms: 'Net 30' },
  { id: 'vn5', name: '3M India Ltd',                        category: 'Medical Supplies',contact: 'Ms. Divya Iyer',      phone: '08023456789', email: 'india.healthcare@3m.com',  gstin: '29AAACT3389M1ZP', pan: 'AAACT3389M', state: 'Karnataka',   balance: 0,      paymentTerms: 'Net 60' },
  { id: 'vn6', name: 'Becton Dickinson India Pvt Ltd',      category: 'Medical Supplies',contact: 'Mr. Naveen Bhat',     phone: '01244678901', email: 'india@bd.com',             gstin: '06AAACB4421X1ZR', pan: 'AAACB4421X', state: 'Haryana',     balance: 24500,  paymentTerms: 'Net 45' },
  { id: 'vn7', name: 'GE Healthcare India Pvt Ltd',         category: 'Imaging',         contact: 'Dr. Aravind Menon',   phone: '08067891234', email: 'sa.support.in@ge.com',     gstin: '29AAACG7890H1ZS', pan: 'AAACG7890H', state: 'Karnataka',   balance: 0,      paymentTerms: 'Net 90' },
  { id: 'vn8', name: 'Apollo Hospitals Procurement',        category: 'GPO',             contact: 'Procurement Desk',    phone: '04428293333', email: 'gpo@apollohospitals.com',  gstin: '33AAACA5500P1ZT', pan: 'AAACA5500P', state: 'Tamil Nadu',  balance: 0,      paymentTerms: 'Net 60' },
];

export const SEED_PURCHASE_ORDERS = [
  { id: 'po1', poNo: 'PO/2026/05/0001', vendorId: 'vn1', date: today, status: 'received', approval: 'approved', subtotal: 84000,  cgst: 5040, sgst: 0,    igst: 5040, total: 94080,  items: [{ name: 'Dolo 650 (1000 tabs)', qty: 20, unitPrice: 2100 }, { name: 'Mox 500 (500 caps)', qty: 20, unitPrice: 2100 }],          requestedBy: 'u6',  approvedBy: 'u1', notes: 'Monthly restock — inter-state (Maharashtra→TN), so IGST applies', interState: true },
  { id: 'po2', poNo: 'PO/2026/05/0002', vendorId: 'vn4', date: today, status: 'sent',     approval: 'approved', subtotal: 38500,  cgst: 0,    sgst: 0,    igst: 4620, total: 43120,  items: [{ name: 'Surgical Gloves (Box of 100)', qty: 50, unitPrice: 250 }, { name: 'Syringes 5ml (Box of 100)', qty: 40, unitPrice: 200 }, { name: 'Gauze Rolls', qty: 100, unitPrice: 60 }], requestedBy: 'u4',  approvedBy: 'u1', notes: 'Inter-state (Delhi→TN), IGST', interState: true },
  { id: 'po3', poNo: 'PO/2026/05/0003', vendorId: 'vn7', date: today, status: 'pending',  approval: 'pending',  subtotal: 2850000,cgst: 0,    sgst: 0,    igst: 513000,total: 3363000,items: [{ name: 'Hematology Analyzer (Sysmex)', qty: 1, unitPrice: 2850000 }],                                                                                                                                                            requestedBy: 'u7',  approvedBy: null, notes: 'CapEx — Board approval required', interState: true },
  { id: 'po4', poNo: 'PO/2026/05/0004', vendorId: 'vn2', date: today, status: 'received', approval: 'approved', subtotal: 165000, cgst: 0,    sgst: 0,    igst: 8250, total: 173250, items: [{ name: 'Lantus Vial (Insulin Glargine)', qty: 200, unitPrice: 825 }],                                                                                                                                                          requestedBy: 'u6',  approvedBy: 'u1', notes: 'Cold chain — delivered today', interState: true },
  { id: 'po5', poNo: 'PO/2026/05/0005', vendorId: 'vn8', date: today, status: 'draft',    approval: 'draft',    subtotal: 86000,  cgst: 5160, sgst: 5160, igst: 0,    total: 96320,  items: [{ name: 'IV Fluids NS 1L',        qty: 200, unitPrice: 80 }, { name: 'IV Cannulas 22G (Box of 50)', qty: 30, unitPrice: 2333 }],                                                                                                       requestedBy: 'u12', approvedBy: null, notes: 'Intra-state (Apollo TN→Jyothi TN), CGST+SGST', interState: false },
];

// ─────────────────────────────────────────────────────────────────
// SUPPLY CHAIN
// ─────────────────────────────────────────────────────────────────
export const SEED_WAREHOUSES = [
  { id: 'wh1', name: 'Main Pharmacy Store',     location: 'Ground Floor, Block A', manager: 'Karthik Ravi' },
  { id: 'wh2', name: 'Surgical Supplies Store', location: 'First Floor, Block B',  manager: 'Murali Mohan' },
  { id: 'wh3', name: 'Lab Reagents Store',      location: 'Basement, Block C',     manager: 'Suresh Venkatesan' },
  { id: 'wh4', name: 'General Stores',          location: 'Service Block',         manager: 'Murali Mohan' },
];

export const SEED_SUPPLY_ITEMS = [
  { id: 'si1',  sku: 'GL-001',  name: 'Surgical Gloves (Latex, M)',           hsn: '4015', unit: 'Box',  whId: 'wh2', stock: 240, reorder: 80,  unitCost: 250,  gstRate: 12, category: 'Consumables' },
  { id: 'si2',  sku: 'SY-005',  name: 'Disposable Syringes 5ml (BD)',         hsn: '9018', unit: 'Box',  whId: 'wh2', stock: 180, reorder: 100, unitCost: 200,  gstRate: 12, category: 'Consumables' },
  { id: 'si3',  sku: 'SY-010',  name: 'Disposable Syringes 10ml (BD)',        hsn: '9018', unit: 'Box',  whId: 'wh2', stock: 95,  reorder: 100, unitCost: 240,  gstRate: 12, category: 'Consumables' },
  { id: 'si4',  sku: 'GZ-001',  name: 'Gauze Rolls 4-inch (Romsons)',         hsn: '3005', unit: 'Pc',   whId: 'wh2', stock: 320, reorder: 150, unitCost: 60,   gstRate: 12, category: 'Consumables' },
  { id: 'si5',  sku: 'IV-NS1',  name: 'IV Fluid Normal Saline 1L (Baxter)',   hsn: '3004', unit: 'Bag',  whId: 'wh2', stock: 80,  reorder: 100, unitCost: 80,   gstRate: 12, category: 'IV Fluids' },
  { id: 'si6',  sku: 'CN-22G',  name: 'IV Cannula 22G (BD Venflon)',          hsn: '9018', unit: 'Box',  whId: 'wh2', stock: 60,  reorder: 30,  unitCost: 2333, gstRate: 12, category: 'Consumables' },
  { id: 'si7',  sku: 'MS-N95',  name: 'N95 Respirator Mask',                  hsn: '6307', unit: 'Pc',   whId: 'wh2', stock: 1450,reorder: 500, unitCost: 35,   gstRate: 5,  category: 'PPE' },
  { id: 'si8',  sku: 'MS-SUR',  name: 'Surgical Mask 3-ply',                  hsn: '6307', unit: 'Box',  whId: 'wh2', stock: 220, reorder: 100, unitCost: 120,  gstRate: 5,  category: 'PPE' },
  { id: 'si9',  sku: 'RG-CBC',  name: 'CBC Reagent Kit (Sysmex)',             hsn: '3822', unit: 'Kit',  whId: 'wh3', stock: 18,  reorder: 10,  unitCost: 8500, gstRate: 12, category: 'Lab Reagents' },
  { id: 'si10', sku: 'RG-LIP',  name: 'Lipid Panel Reagent (Roche)',          hsn: '3822', unit: 'Kit',  whId: 'wh3', stock: 12,  reorder: 8,   unitCost: 6200, gstRate: 12, category: 'Lab Reagents' },
  { id: 'si11', sku: 'XR-FLM',  name: 'X-Ray Film 14×17 (Carestream)',        hsn: '3701', unit: 'Box',  whId: 'wh4', stock: 24,  reorder: 15,  unitCost: 3800, gstRate: 12, category: 'Imaging' },
  { id: 'si12', sku: 'BD-SHT',  name: 'Disposable Bedsheets',                 hsn: '6307', unit: 'Pc',   whId: 'wh4', stock: 540, reorder: 200, unitCost: 65,   gstRate: 5,  category: 'Linen' },
];

export const SEED_STOCK_MOVEMENTS = [
  { id: 'sm1', date: today, itemId: 'si1', whId: 'wh2', type: 'in',  qty: 50,  reason: 'GRN/2026/05/0002 from Romsons',         refType: 'GRN', userId: 'u13' },
  { id: 'sm2', date: today, itemId: 'si4', whId: 'wh2', type: 'in',  qty: 100, reason: 'GRN/2026/05/0002 from Romsons',         refType: 'GRN', userId: 'u13' },
  { id: 'sm3', date: today, itemId: 'si2', whId: 'wh2', type: 'out', qty: 12,  reason: 'Issue to Casualty / ER',                refType: 'Issue', userId: 'u4' },
  { id: 'sm4', date: today, itemId: 'si7', whId: 'wh2', type: 'out', qty: 40,  reason: 'Issue to ER + ICU',                     refType: 'Issue', userId: 'u4' },
  { id: 'sm5', date: today, itemId: 'si9', whId: 'wh3', type: 'out', qty: 1,   reason: 'Daily lab consumption',                 refType: 'Issue', userId: 'u7' },
];

export const SEED_GRNS = [
  { id: 'grn1', grnNo: 'GRN/2026/05/0001', poId: 'po1', date: today, vendorId: 'vn1', receivedBy: 'u6',  status: 'completed', items: [{ name: 'Dolo 650',           orderedQty: 20, receivedQty: 20 }, { name: 'Mox 500', orderedQty: 20, receivedQty: 20 }] },
  { id: 'grn2', grnNo: 'GRN/2026/05/0002', poId: 'po2', date: today, vendorId: 'vn4', receivedBy: 'u13', status: 'completed', items: [{ name: 'Surgical Gloves',    orderedQty: 50, receivedQty: 50 }, { name: 'Syringes 5ml', orderedQty: 40, receivedQty: 40 }, { name: 'Gauze Rolls', orderedQty: 100, receivedQty: 100 }] },
  { id: 'grn3', grnNo: 'GRN/2026/05/0003', poId: 'po4', date: today, vendorId: 'vn2', receivedBy: 'u6',  status: 'completed', items: [{ name: 'Lantus Vial',        orderedQty: 200,receivedQty: 198 }] },
];

// ─────────────────────────────────────────────────────────────────
// HR — Indian salaries (INR), PAN/Aadhaar, EPF/ESI eligibility
// ─────────────────────────────────────────────────────────────────
export const SEED_EMPLOYEES = [
  { id: 'em1',  empNo: 'JH/EMP/001', name: 'Dr. Arjun Krishnan',          userId: 'u2',  department: 'Cardiology',        designation: 'Consultant Cardiologist',    joinDate: '2019-03-15', nationality: 'Indian',         idType: 'aadhaar', idNumber: '4823 5612 9078', pan: 'ABCPK1234R', basicSalary: 180000, allowances: 45000, status: 'active', leaveBalance: 21 },
  { id: 'em2',  empNo: 'JH/EMP/002', name: 'Dr. Vasudevan Iyer',          userId: 'u3',  department: 'Internal Medicine', designation: 'Chief Medical Officer',      joinDate: '2017-08-01', nationality: 'Indian',         idType: 'aadhaar', idNumber: '5821 9034 6712', pan: 'AVIYR5678P', basicSalary: 250000, allowances: 80000, status: 'active', leaveBalance: 18 },
  { id: 'em3',  empNo: 'JH/EMP/003', name: 'Sr. Mary Lakshmi',            userId: 'u4',  department: 'Nursing',           designation: 'Senior Staff Nurse',         joinDate: '2020-05-22', nationality: 'Indian',         idType: 'aadhaar', idNumber: '7712 3344 9088', pan: 'MLKPA3344M', basicSalary: 22000,  allowances: 5500,  status: 'active', leaveBalance: 15 },
  { id: 'em4',  empNo: 'JH/EMP/004', name: 'Priya Subramanian',           userId: 'u5',  department: 'Reception',         designation: 'Front Office Coordinator',   joinDate: '2021-01-10', nationality: 'Indian',         idType: 'aadhaar', idNumber: '6611 4422 8855', pan: 'PSMPS4422S', basicSalary: 18000,  allowances: 3500,  status: 'active', leaveBalance: 22 },
  { id: 'em5',  empNo: 'JH/EMP/005', name: 'Karthik Ravi',                userId: 'u6',  department: 'Pharmacy',          designation: 'Chief Pharmacist',           joinDate: '2018-09-12', nationality: 'Indian',         idType: 'aadhaar', idNumber: '8899 5566 1122', pan: 'KRVPK5566K', basicSalary: 48000,  allowances: 12000, status: 'active', leaveBalance: 17 },
  { id: 'em6',  empNo: 'JH/EMP/006', name: 'Suresh Venkatesan',           userId: 'u7',  department: 'Laboratory',        designation: 'Senior Lab Technician',      joinDate: '2019-11-05', nationality: 'Indian',         idType: 'aadhaar', idNumber: '5544 7788 0033', pan: 'SVNPS7788V', basicSalary: 32000,  allowances: 8000,  status: 'active', leaveBalance: 19 },
  { id: 'em7',  empNo: 'JH/EMP/007', name: 'Anjali Menon',                userId: 'u8',  department: 'Finance',           designation: 'Finance Officer',            joinDate: '2020-02-18', nationality: 'Indian',         idType: 'aadhaar', idNumber: '3322 8899 0066', pan: 'AMNPM8899A', basicSalary: 42000,  allowances: 10000, status: 'active', leaveBalance: 14 },
  { id: 'em8',  empNo: 'JH/EMP/008', name: 'Vikram Reddy',                userId: 'u9',  department: 'Cashier',           designation: 'Senior Cashier',             joinDate: '2022-06-01', nationality: 'Indian',         idType: 'aadhaar', idNumber: '2244 6655 8800', pan: 'VRDPV6655V', basicSalary: 22000,  allowances: 4000,  status: 'active', leaveBalance: 20 },
  { id: 'em9',  empNo: 'JH/EMP/009', name: 'Deepa Nair',                  userId: 'u10', department: 'Insurance / TPA',   designation: 'TPA Coordinator',            joinDate: '2021-09-15', nationality: 'Indian',         idType: 'aadhaar', idNumber: '4455 6677 8899', pan: 'DNRPD6677D', basicSalary: 32000,  allowances: 6500,  status: 'active', leaveBalance: 16 },
  { id: 'em10', empNo: 'JH/EMP/010', name: 'Ramesh Chandrasekhar',        userId: 'u11', department: 'Accounting',        designation: 'Senior Accountant',          joinDate: '2018-04-20', nationality: 'Indian',         idType: 'aadhaar', idNumber: '6677 8899 0011', pan: 'RCHPR8899R', basicSalary: 48000,  allowances: 11000, status: 'active', leaveBalance: 18 },
  { id: 'em11', empNo: 'JH/EMP/011', name: 'Sandhya Pillai',              userId: 'u12', department: 'Procurement',       designation: 'Purchase Officer',           joinDate: '2022-03-10', nationality: 'Indian',         idType: 'aadhaar', idNumber: '3344 5566 7788', pan: 'SPLPS5566S', basicSalary: 38000,  allowances: 8500,  status: 'active', leaveBalance: 22 },
  { id: 'em12', empNo: 'JH/EMP/012', name: 'Murali Mohan',                userId: 'u13', department: 'Inventory',         designation: 'Inventory Manager',          joinDate: '2020-12-01', nationality: 'Indian',         idType: 'aadhaar', idNumber: '2233 4455 6677', pan: 'MMHPM4455M', basicSalary: 42000,  allowances: 9000,  status: 'active', leaveBalance: 17 },
  { id: 'em13', empNo: 'JH/EMP/013', name: 'Kavitha Balasubramanian',     userId: 'u14', department: 'Human Resources',   designation: 'HR Manager',                 joinDate: '2017-05-15', nationality: 'Indian',         idType: 'aadhaar', idNumber: '5566 7788 9900', pan: 'KBSPK7788K', basicSalary: 55000,  allowances: 14000, status: 'active', leaveBalance: 15 },
  { id: 'em14', empNo: 'JH/EMP/014', name: 'Jenny Thomas',                userId: null,  department: 'Nursing',           designation: 'Staff Nurse',                joinDate: '2023-02-20', nationality: 'Indian',         idType: 'aadhaar', idNumber: '4456 7890 1230', pan: 'JTHPJ7890J', basicSalary: 19000,  allowances: 4500,  status: 'active', leaveBalance: 24 },
  { id: 'em15', empNo: 'JH/EMP/015', name: 'Manjunath Bhat',              userId: null,  department: 'Maintenance',       designation: 'Biomedical Engineer',        joinDate: '2021-07-08', nationality: 'Indian',         idType: 'aadhaar', idNumber: '2887 7665 5443', pan: 'MBHPM7665M', basicSalary: 36000,  allowances: 8000,  status: 'active', leaveBalance: 19 },
];

export const SEED_ATTENDANCE = [
  { id: 'at1', empId: 'em1',  date: today, clockIn: '07:55', clockOut: null,    status: 'present' },
  { id: 'at2', empId: 'em2',  date: today, clockIn: '07:48', clockOut: null,    status: 'present' },
  { id: 'at3', empId: 'em3',  date: today, clockIn: '06:55', clockOut: '15:10', status: 'present' },
  { id: 'at4', empId: 'em4',  date: today, clockIn: '08:02', clockOut: null,    status: 'present' },
  { id: 'at5', empId: 'em5',  date: today, clockIn: '08:15', clockOut: null,    status: 'late' },
  { id: 'at6', empId: 'em6',  date: today, clockIn: '07:40', clockOut: null,    status: 'present' },
  { id: 'at7', empId: 'em7',  date: today, clockIn: '08:05', clockOut: null,    status: 'present' },
  { id: 'at8', empId: 'em8',  date: today, clockIn: null,    clockOut: null,    status: 'absent' },
  { id: 'at9', empId: 'em10', date: today, clockIn: '07:50', clockOut: null,    status: 'present' },
  { id: 'at10',empId: 'em11', date: today, clockIn: '08:00', clockOut: null,    status: 'present' },
  { id: 'at11',empId: 'em12', date: today, clockIn: '07:30', clockOut: null,    status: 'present' },
  { id: 'at12',empId: 'em13', date: today, clockIn: '08:10', clockOut: null,    status: 'present' },
  { id: 'at13',empId: 'em14', date: today, clockIn: null,    clockOut: null,    status: 'on_leave' },
];

export const SEED_LEAVE_REQUESTS = [
  { id: 'lr1', empId: 'em14', type: 'earned',   fromDate: today, toDate: '2026-05-08', days: 7, reason: 'Family function',         status: 'approved', approvedBy: 'u14', requestedAt: '2026-04-25' },
  { id: 'lr2', empId: 'em5',  type: 'sick',     fromDate: '2026-05-04', toDate: '2026-05-05', days: 2, reason: 'Viral fever',      status: 'pending',  approvedBy: null,  requestedAt: today },
  { id: 'lr3', empId: 'em8',  type: 'casual',   fromDate: today, toDate: today,        days: 1, reason: 'Personal errand',          status: 'pending',  approvedBy: null,  requestedAt: today },
  { id: 'lr4', empId: 'em3',  type: 'earned',   fromDate: '2026-06-01', toDate: '2026-06-14', days: 14,reason: 'Annual leave',     status: 'approved', approvedBy: 'u14', requestedAt: '2026-04-20' },
];

// Indian payroll: Basic + Allowances - (EPF 12% of basic capped at ₹15K, ESI 0.75% if gross ≤ ₹21K, TDS, Prof Tax TN)
export const SEED_PAYROLL = [
  { id: 'py1', month: '2026-04', empId: 'em1',  basic: 180000, allowances: 45000, epf: 1800, esi: 0,    pt: 208, tds: 22500, deductions: 1500, netPay: 198992, status: 'paid'    },
  { id: 'py2', month: '2026-04', empId: 'em2',  basic: 250000, allowances: 80000, epf: 1800, esi: 0,    pt: 208, tds: 38000, deductions: 2200, netPay: 287792, status: 'paid'    },
  { id: 'py3', month: '2026-04', empId: 'em3',  basic: 22000,  allowances: 5500,  epf: 1800, esi: 0,    pt: 158, tds: 0,     deductions: 200,  netPay: 25342,  status: 'paid'    },
  { id: 'py4', month: '2026-04', empId: 'em4',  basic: 18000,  allowances: 3500,  epf: 1800, esi: 161,  pt: 158, tds: 0,     deductions: 200,  netPay: 19181,  status: 'paid'    },
  { id: 'py5', month: '2026-04', empId: 'em5',  basic: 48000,  allowances: 12000, epf: 1800, esi: 0,    pt: 208, tds: 1200,  deductions: 400,  netPay: 56392,  status: 'paid'    },
  { id: 'py6', month: '2026-04', empId: 'em6',  basic: 32000,  allowances: 8000,  epf: 1800, esi: 0,    pt: 208, tds: 0,     deductions: 300,  netPay: 37692,  status: 'paid'    },
  { id: 'py7', month: '2026-04', empId: 'em7',  basic: 42000,  allowances: 10000, epf: 1800, esi: 0,    pt: 208, tds: 800,   deductions: 350,  netPay: 48842,  status: 'paid'    },
  { id: 'py8', month: '2026-04', empId: 'em8',  basic: 22000,  allowances: 4000,  epf: 1800, esi: 0,    pt: 158, tds: 0,     deductions: 200,  netPay: 23842,  status: 'paid'    },
  { id: 'py9', month: '2026-04', empId: 'em9',  basic: 32000,  allowances: 6500,  epf: 1800, esi: 0,    pt: 208, tds: 0,     deductions: 250,  netPay: 36242,  status: 'paid'    },
  { id: 'py10',month: '2026-04', empId: 'em10', basic: 48000,  allowances: 11000, epf: 1800, esi: 0,    pt: 208, tds: 1100,  deductions: 400,  netPay: 55492,  status: 'paid'    },
  { id: 'py11',month: '2026-05', empId: 'em1',  basic: 180000, allowances: 45000, epf: 1800, esi: 0,    pt: 208, tds: 22500, deductions: 1500, netPay: 198992, status: 'pending' },
  { id: 'py12',month: '2026-05', empId: 'em2',  basic: 250000, allowances: 80000, epf: 1800, esi: 0,    pt: 208, tds: 38000, deductions: 2200, netPay: 287792, status: 'pending' },
  { id: 'py13',month: '2026-05', empId: 'em3',  basic: 22000,  allowances: 5500,  epf: 1800, esi: 0,    pt: 158, tds: 0,     deductions: 200,  netPay: 25342,  status: 'pending' },
];

// ─────────────────────────────────────────────────────────────────
// HR — Recruitment (job openings + applicants)
// ─────────────────────────────────────────────────────────────────
export const SEED_JOB_OPENINGS = [
  { id: 'jo1', code: 'JH/JOB/2026/001', title: 'Consultant Cardiologist',     department: 'Cardiology',     type: 'Full-time',  openings: 2, status: 'open',   postedDate: '2026-04-10', closeDate: '2026-06-01', salaryRange: '180000-280000', description: 'NMC-registered Cardiologist with 5+ years experience, DM/DNB Cardiology mandatory.' },
  { id: 'jo2', code: 'JH/JOB/2026/002', title: 'Staff Nurse — ICU',           department: 'Nursing',        type: 'Full-time',  openings: 4, status: 'open',   postedDate: '2026-04-15', closeDate: '2026-05-30', salaryRange: '22000-32000',    description: 'BSc Nursing + INC registration. ICU experience preferred.' },
  { id: 'jo3', code: 'JH/JOB/2026/003', title: 'Lab Technician',              department: 'Laboratory',     type: 'Full-time',  openings: 1, status: 'open',   postedDate: '2026-04-20', closeDate: '2026-05-25', salaryRange: '22000-36000',    description: 'DMLT / BSc MLT, 2+ years hospital lab experience.' },
  { id: 'jo4', code: 'JH/JOB/2026/004', title: 'Clinical Pharmacist',         department: 'Pharmacy',       type: 'Full-time',  openings: 2, status: 'open',   postedDate: '2026-04-22', closeDate: '2026-06-15', salaryRange: '32000-52000',    description: 'PharmD or BPharm + PCI registration, hospital pharmacy experience preferred.' },
  { id: 'jo5', code: 'JH/JOB/2026/005', title: 'Insurance / TPA Coordinator', department: 'Insurance',      type: 'Full-time',  openings: 1, status: 'on_hold',postedDate: '2026-04-01', closeDate: '2026-05-15', salaryRange: '28000-42000',    description: 'TPA liaison experience, fluent Tamil + English, knowledge of Star/HDFC/Bajaj workflows.' },
  { id: 'jo6', code: 'JH/JOB/2026/006', title: 'Receptionist (Tamil/English)',department: 'Reception',      type: 'Full-time',  openings: 1, status: 'closed', postedDate: '2026-03-15', closeDate: '2026-04-15', salaryRange: '16000-22000',    description: 'Filled — closed.' },
  { id: 'jo7', code: 'JH/JOB/2026/007', title: 'Biomedical Engineer',         department: 'Maintenance',    type: 'Contract',   openings: 1, status: 'open',   postedDate: '2026-04-25', closeDate: '2026-06-30', salaryRange: '32000-48000',    description: 'Maintain imaging + lab equipment, vendor coordination.' },
];

export const SEED_APPLICANTS = [
  { id: 'ap1',  name: 'Dr. Senthil Kumar',        jobId: 'jo1', stage: 'interview', appliedAt: '2026-04-12', email: 'senthil.k@example.com', phone: '9840001201', nationality: 'Indian', experience: 9,  rating: 4 },
  { id: 'ap2',  name: 'Dr. Heba El-Sayed',         jobId: 'jo1', stage: 'screening', appliedAt: '2026-04-18', email: 'heba.s@example.com',     phone: '9840001202', nationality: 'Egyptian (OCI)', experience: 6,  rating: 3 },
  { id: 'ap3',  name: 'Dr. Naveen Bhargava',       jobId: 'jo1', stage: 'offer',     appliedAt: '2026-04-11', email: 'naveen.b@example.com',   phone: '9840001203', nationality: 'Indian', experience: 12, rating: 5 },
  { id: 'ap4',  name: 'Reshma Pillai',             jobId: 'jo2', stage: 'hired',     appliedAt: '2026-04-16', email: 'r.pillai@example.com',   phone: '9840001204', nationality: 'Indian', experience: 5,  rating: 4 },
  { id: 'ap5',  name: 'Anjana Sharma',             jobId: 'jo2', stage: 'interview', appliedAt: '2026-04-19', email: 'a.sharma@example.com',   phone: '9840001205', nationality: 'Indian', experience: 4,  rating: 4 },
  { id: 'ap6',  name: 'Meera Sundaram',            jobId: 'jo2', stage: 'applied',   appliedAt: today,        email: 'meera.s@example.com',    phone: '9840001206', nationality: 'Indian', experience: 2,  rating: null },
  { id: 'ap7',  name: 'Manoj Kumar',               jobId: 'jo2', stage: 'rejected',  appliedAt: '2026-04-20', email: 'manoj.k@example.com',    phone: '9840001207', nationality: 'Indian', experience: 1,  rating: 2 },
  { id: 'ap8',  name: 'Sadia Hussain',             jobId: 'jo3', stage: 'interview', appliedAt: '2026-04-22', email: 's.hussain@example.com',  phone: '9840001208', nationality: 'Indian', experience: 7,  rating: 4 },
  { id: 'ap9',  name: 'Kishore Selvam',            jobId: 'jo3', stage: 'screening', appliedAt: today,        email: 'k.selvam@example.com',   phone: '9840001209', nationality: 'Indian', experience: 3,  rating: 3 },
  { id: 'ap10', name: 'Dr. Lavanya Iyer',          jobId: 'jo4', stage: 'offer',     appliedAt: '2026-04-23', email: 'lavanya.i@example.com',  phone: '9840001210', nationality: 'Indian', experience: 8,  rating: 5 },
  { id: 'ap11', name: 'Ahmed Yaseen',              jobId: 'jo4', stage: 'applied',   appliedAt: today,        email: 'ahmed.y@example.com',    phone: '9840001211', nationality: 'Indian', experience: 5,  rating: null },
  { id: 'ap12', name: 'George Mathews',            jobId: 'jo7', stage: 'screening', appliedAt: '2026-04-26', email: 'g.mathews@example.com',  phone: '9840001212', nationality: 'Indian', experience: 8,  rating: 4 },
];

// ─────────────────────────────────────────────────────────────────
// HR — Documents (India: Aadhaar, PAN, NMC/INC/PCI/CDSCO licenses)
// ─────────────────────────────────────────────────────────────────
export const SEED_HR_DOCUMENTS = [
  { id: 'hd1',  empId: 'em1',  type: 'Aadhaar',             docNo: '4823 5612 9078',    issueDate: '2018-03-15', expiryDate: '2099-12-31', status: 'active' },
  { id: 'hd2',  empId: 'em1',  type: 'PAN',                 docNo: 'ABCPK1234R',         issueDate: '2010-08-01', expiryDate: '2099-12-31', status: 'active' },
  { id: 'hd3',  empId: 'em1',  type: 'NMC / TNMC Registration', docNo: 'TNMC-42883',     issueDate: '2010-08-01', expiryDate: '2027-08-01', status: 'active' },
  { id: 'hd4',  empId: 'em1',  type: 'Employment Contract', docNo: 'JH/EMP-CON/001',     issueDate: '2019-03-15', expiryDate: '2027-03-15', status: 'active' },
  { id: 'hd5',  empId: 'em2',  type: 'NMC / TNMC Registration', docNo: 'TNMC-22141',     issueDate: '2008-02-15', expiryDate: '2027-02-15', status: 'active' },
  { id: 'hd6',  empId: 'em3',  type: 'INC Registration',    docNo: 'TN-INC-N-9912',      issueDate: '2018-04-10', expiryDate: '2026-04-10', status: 'expired' },
  { id: 'hd7',  empId: 'em3',  type: 'Aadhaar',             docNo: '7712 3344 9088',     issueDate: '2014-05-20', expiryDate: '2099-12-31', status: 'active' },
  { id: 'hd8',  empId: 'em5',  type: 'PCI Registration',    docNo: 'TN-PCI-PHM-3322',    issueDate: '2014-01-08', expiryDate: '2027-01-08', status: 'active' },
  { id: 'hd9',  empId: 'em6',  type: 'INC / DMLT Registration', docNo: 'TN-DMLT-7733',   issueDate: '2013-11-20', expiryDate: '2026-05-20', status: 'expiring' },
  { id: 'hd10', empId: 'em14', type: 'Aadhaar',             docNo: '4456 7890 1230',     issueDate: '2014-08-12', expiryDate: '2099-12-31', status: 'active' },
  { id: 'hd11', empId: 'em14', type: 'INC Registration',    docNo: 'TN-INC-N-5588',      issueDate: '2014-09-01', expiryDate: '2027-09-01', status: 'active' },
  { id: 'hd12', empId: 'em15', type: 'Aadhaar',             docNo: '2887 7665 5443',     issueDate: '2015-04-08', expiryDate: '2099-12-31', status: 'active' },
  { id: 'hd13', empId: 'em15', type: 'Biomedical Engineering Diploma', docNo: 'BME-9988', issueDate: '2014-07-15', expiryDate: '2099-12-31', status: 'active' },
  { id: 'hd14', empId: 'em5',  type: 'FSSAI License (Pharmacy)', docNo: 'FSSAI-CHN-3322-2026',issueDate: '2024-06-12', expiryDate: '2026-06-12', status: 'expiring' },
];

export const SEED_PERFORMANCE_REVIEWS = [
  { id: 'pr1', empId: 'em1',  period: '2025 Annual', rating: 5, status: 'completed', reviewer: 'u3',  date: '2026-01-15', strengths: 'Exceptional clinical skills; strong patient outcomes; mentors junior staff.', improvements: 'Documentation timeliness can improve.', goals: 'Lead 2 NABH quality improvement projects in 2026.' },
  { id: 'pr2', empId: 'em2',  period: '2025 Annual', rating: 5, status: 'completed', reviewer: 'u1',  date: '2026-01-20', strengths: 'Strategic leadership; departmental KPIs all green.',                               improvements: 'Delegate more administrative tasks.',     goals: 'Launch NABH-accredited internship program.' },
  { id: 'pr3', empId: 'em3',  period: '2025 Annual', rating: 4, status: 'completed', reviewer: 'u14', date: '2026-02-05', strengths: 'Reliable; excellent patient communication; calm under pressure.',                  improvements: 'Update BLS certification.',                goals: 'Complete ICU specialization.' },
  { id: 'pr4', empId: 'em5',  period: '2025 Annual', rating: 4, status: 'completed', reviewer: 'u14', date: '2026-02-12', strengths: 'Strong inventory control; reduced expiry waste 20%.',                              improvements: 'More cross-training with junior pharmacists.', goals: 'Implement bar-code dispensing system.' },
  { id: 'pr5', empId: 'em7',  period: '2025 Annual', rating: 4, status: 'completed', reviewer: 'u1',  date: '2026-02-20', strengths: 'Closes books on time; clean audit findings; GST filings always on time.',          improvements: 'Faster ad-hoc reporting turnaround.',      goals: 'Deploy budget vs actuals dashboard.' },
  { id: 'pr6', empId: 'em4',  period: '2026 Mid-Year',rating: null, status: 'draft', reviewer: 'u14', date: today,        strengths: '',                                                                                  improvements: '',                                          goals: '' },
  { id: 'pr7', empId: 'em6',  period: '2026 Mid-Year',rating: null, status: 'draft', reviewer: 'u14', date: today,        strengths: '',                                                                                  improvements: '',                                          goals: '' },
];

export const SEED_TRAININGS = [
  { id: 'tr1', name: 'Basic Life Support (BLS)',          category: 'Mandatory', empId: 'em3',  assignedDate: '2026-04-01', dueDate: '2026-05-15', status: 'in_progress', score: null },
  { id: 'tr2', name: 'Advanced Cardiac Life Support (ACLS)', category: 'Mandatory', empId: 'em1', assignedDate: '2026-03-10', dueDate: '2026-05-10', status: 'completed',   score: 92 },
  { id: 'tr3', name: 'Infection Prevention & Control (NABH)', category: 'Mandatory', empId: 'em3', assignedDate: '2026-03-15', dueDate: '2026-04-30', status: 'completed',   score: 88 },
  { id: 'tr4', name: 'Infection Prevention & Control (NABH)', category: 'Mandatory', empId: 'em14',assignedDate: '2026-04-01', dueDate: '2026-05-15', status: 'overdue',     score: null },
  { id: 'tr5', name: 'IRDAI / TPA Claim Coding',           category: 'Specialty', empId: 'em9',  assignedDate: '2026-04-05', dueDate: '2026-05-30', status: 'in_progress', score: null },
  { id: 'tr6', name: 'EPF / ESI / Labour Law Update',      category: 'HR',        empId: 'em13', assignedDate: '2026-03-20', dueDate: '2026-05-20', status: 'completed',   score: 95 },
  { id: 'tr7', name: 'CDSCO Pharmacovigilance',            category: 'Specialty', empId: 'em5',  assignedDate: '2026-04-10', dueDate: '2026-06-10', status: 'in_progress', score: null },
  { id: 'tr8', name: 'Patient Safety & Risk Management (NABH)', category: 'Mandatory', empId: 'em2', assignedDate: '2026-04-12', dueDate: '2026-06-12', status: 'in_progress', score: null },
];
