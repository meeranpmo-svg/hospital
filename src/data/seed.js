// Seed data for Hospital ERP - realistic Saudi hospital data
const today = new Date().toISOString().slice(0, 10);

export const ROLES = [
  { key: 'admin', label: 'Admin', color: 'bg-gray-800' },
  { key: 'doctor', label: 'Doctor', color: 'bg-emerald-600' },
  { key: 'chief_doctor', label: 'Chief Doctor', color: 'bg-emerald-800' },
  { key: 'nurse', label: 'Nurse', color: 'bg-pink-600' },
  { key: 'receptionist', label: 'Receptionist', color: 'bg-blue-600' },
  { key: 'pharmacist', label: 'Pharmacist', color: 'bg-purple-600' },
  { key: 'lab_tech', label: 'Lab Technician', color: 'bg-orange-600' },
  { key: 'finance', label: 'Finance Officer', color: 'bg-yellow-600' },
  { key: 'cashier', label: 'Cashier', color: 'bg-cyan-600' },
  { key: 'insurance_approval', label: 'Insurance Approval', color: 'bg-teal-600' },
];

export const SEED_USERS = [
  { id: 'u1',  email: 'admin@hospital.com',     password: 'Admin@123', name: 'System Admin',         nameAr: 'مدير النظام',           role: 'admin' },
  { id: 'u2',  email: 'doctor@hospital.com',    password: 'Admin@123', name: 'Dr. Ahmed Al-Rashidi', nameAr: 'د. أحمد الرشيدي',       role: 'doctor', department: 'Cardiology' },
  { id: 'u3',  email: 'chief@hospital.com',     password: 'Admin@123', name: 'Dr. Khalid Al-Saud',   nameAr: 'د. خالد آل سعود',       role: 'chief_doctor', department: 'Internal Medicine' },
  { id: 'u4',  email: 'nurse@hospital.com',     password: 'Admin@123', name: 'Nurse Fatimah Hassan', nameAr: 'الممرضة فاطمة حسن',     role: 'nurse' },
  { id: 'u5',  email: 'reception@hospital.com', password: 'Admin@123', name: 'Sara Al-Mutairi',      nameAr: 'سارة المطيري',          role: 'receptionist' },
  { id: 'u6',  email: 'pharmacist@hospital.com',password: 'Admin@123', name: 'Omar Al-Zahrani',      nameAr: 'عمر الزهراني',          role: 'pharmacist' },
  { id: 'u7',  email: 'lab@hospital.com',       password: 'Admin@123', name: 'Mohammed Al-Qahtani',  nameAr: 'محمد القحطاني',         role: 'lab_tech' },
  { id: 'u8',  email: 'finance@hospital.com',   password: 'Admin@123', name: 'Layla Al-Otaibi',      nameAr: 'ليلى العتيبي',          role: 'finance' },
  { id: 'u9',  email: 'cashier@hospital.com',   password: 'Admin@123', name: 'Yousef Al-Dosari',     nameAr: 'يوسف الدوسري',          role: 'cashier' },
  { id: 'u10', email: 'insurance@hospital.com', password: 'Admin@123', name: 'Nadia Al-Harbi',       nameAr: 'نادية الحربي',          role: 'insurance_approval' },
];

export const DEPARTMENTS = [
  { key: 'emergency',   name: 'Emergency',          nameAr: 'الطوارئ',          color: 'red' },
  { key: 'opd',         name: 'OPD',                nameAr: 'العيادات الخارجية', color: 'blue' },
  { key: 'cardiology',  name: 'Cardiology',         nameAr: 'القلب',            color: 'rose' },
  { key: 'orthopedics', name: 'Orthopedics',        nameAr: 'العظام',           color: 'amber' },
  { key: 'gynecology',  name: 'Gynecology',         nameAr: 'النساء والولادة',  color: 'pink' },
  { key: 'pediatrics',  name: 'Pediatrics',         nameAr: 'الأطفال',          color: 'cyan' },
  { key: 'radiology',   name: 'Radiology',          nameAr: 'الأشعة',           color: 'indigo' },
  { key: 'internal',    name: 'Internal Medicine',  nameAr: 'الباطنة',          color: 'emerald' },
];

export const DOCTORS = [
  { id: 'd1',  name: 'Dr. Ahmed Al-Rashidi',   nameAr: 'د. أحمد الرشيدي',     department: 'cardiology',  specialty: 'Cardiologist' },
  { id: 'd2',  name: 'Dr. Khalid Al-Saud',     nameAr: 'د. خالد آل سعود',     department: 'internal',    specialty: 'Internal Medicine' },
  { id: 'd3',  name: 'Dr. Maha Al-Anzi',       nameAr: 'د. مها العنزي',       department: 'gynecology',  specialty: 'OB/GYN' },
  { id: 'd4',  name: 'Dr. Saleh Al-Ghamdi',    nameAr: 'د. صالح الغامدي',     department: 'orthopedics', specialty: 'Orthopedic Surgeon' },
  { id: 'd5',  name: 'Dr. Reem Al-Sulaiman',   nameAr: 'د. ريم السليمان',     department: 'pediatrics',  specialty: 'Pediatrician' },
  { id: 'd6',  name: 'Dr. Tariq Al-Shehri',    nameAr: 'د. طارق الشهري',      department: 'emergency',   specialty: 'ER Physician' },
  { id: 'd7',  name: 'Dr. Hala Al-Najjar',     nameAr: 'د. هالة النجار',      department: 'radiology',   specialty: 'Radiologist' },
  { id: 'd8',  name: 'Dr. Nasser Al-Maliki',   nameAr: 'د. ناصر المالكي',     department: 'opd',         specialty: 'GP' },
  { id: 'd9',  name: 'Dr. Amal Al-Faisal',     nameAr: 'د. أمل الفيصل',       department: 'cardiology',  specialty: 'Cardiologist' },
  { id: 'd10', name: 'Dr. Fahad Al-Qurashi',   nameAr: 'د. فهد القرشي',       department: 'internal',    specialty: 'Internal Medicine' },
];

export const INSURANCE_COMPANIES = [
  { key: 'bupa',     name: 'Bupa Arabia',     nameAr: 'بوبا العربية' },
  { key: 'tawuniya', name: 'Tawuniya',        nameAr: 'التعاونية' },
  { key: 'medgulf',  name: 'Medgulf',         nameAr: 'ميدغلف' },
  { key: 'axa',      name: 'AXA Cooperative', nameAr: 'أكسا التعاونية' },
  { key: 'rajhi',    name: 'Al Rajhi Takaful',nameAr: 'الراجحي تكافل' },
];

export const SEED_PATIENTS = [
  { id: 'p1',  mrn: 'MRN-100001', name: 'Abdullah Al-Otaibi',     nameAr: 'عبدالله العتيبي',    dob: '1985-03-12', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1023456789', phone: '0555123456', bloodGroup: 'O+',  insurance: { company: 'bupa',     policyNumber: 'BUP-553421', cchiId: 'CCHI-100001' }, allergies: ['Penicillin'], emergencyContact: '0555111222' },
  { id: 'p2',  mrn: 'MRN-100002', name: 'Norah Al-Sulaiman',      nameAr: 'نورة السليمان',      dob: '1992-07-22', gender: 'female', nationality: 'Saudi',         idType: 'national', idNumber: '1098765432', phone: '0555234567', bloodGroup: 'A+',  insurance: { company: 'tawuniya', policyNumber: 'TAW-998123', cchiId: 'CCHI-100002' }, allergies: [],             emergencyContact: '0555222333' },
  { id: 'p3',  mrn: 'MRN-100003', name: 'Mohammed Khan',          nameAr: 'محمد خان',           dob: '1978-11-05', gender: 'male',   nationality: 'Pakistani',     idType: 'iqama',    idNumber: '2345678901', phone: '0566123456', bloodGroup: 'B+',  insurance: { company: 'medgulf',  policyNumber: 'MED-441221', cchiId: 'CCHI-100003' }, allergies: ['Sulfa'],      emergencyContact: '0566333444' },
  { id: 'p4',  mrn: 'MRN-100004', name: 'Aisha Hassan',           nameAr: 'عائشة حسن',          dob: '1995-01-18', gender: 'female', nationality: 'Egyptian',      idType: 'iqama',    idNumber: '2456789012', phone: '0566234567', bloodGroup: 'AB+', insurance: { company: 'bupa',     policyNumber: 'BUP-882104', cchiId: 'CCHI-100004' }, allergies: [],             emergencyContact: '0566444555' },
  { id: 'p5',  mrn: 'MRN-100005', name: 'Ali Al-Harbi',           nameAr: 'علي الحربي',         dob: '1968-09-30', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1011223344', phone: '0555345678', bloodGroup: 'O-',  insurance: { company: 'rajhi',    policyNumber: 'RAJ-220110', cchiId: 'CCHI-100005' }, allergies: ['Aspirin'],    emergencyContact: '0555555666' },
  { id: 'p6',  mrn: 'MRN-100006', name: 'Fatimah Al-Dosari',      nameAr: 'فاطمة الدوسري',      dob: '1989-04-25', gender: 'female', nationality: 'Saudi',         idType: 'national', idNumber: '1077889911', phone: '0555456789', bloodGroup: 'A-',  insurance: { company: 'tawuniya', policyNumber: 'TAW-110203', cchiId: 'CCHI-100006' }, allergies: [],             emergencyContact: '0555777888' },
  { id: 'p7',  mrn: 'MRN-100007', name: 'James Wilson',           nameAr: 'جيمس ويلسون',        dob: '1972-08-14', gender: 'male',   nationality: 'British',       idType: 'passport', idNumber: 'GBR8842231',  phone: '0590123456', bloodGroup: 'B-',  insurance: { company: 'axa',      policyNumber: 'AXA-119922', cchiId: '' },             allergies: [],             emergencyContact: '0590999000' },
  { id: 'p8',  mrn: 'MRN-100008', name: 'Khalid Al-Mutairi',      nameAr: 'خالد المطيري',       dob: '1955-12-08', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1099887766', phone: '0555567890', bloodGroup: 'O+',  insurance: { company: 'bupa',     policyNumber: 'BUP-554477', cchiId: 'CCHI-100008' }, allergies: ['Latex'],      emergencyContact: '0555888999' },
  { id: 'p9',  mrn: 'MRN-100009', name: 'Salma Al-Qahtani',       nameAr: 'سلمى القحطاني',      dob: '2018-06-15', gender: 'female', nationality: 'Saudi',         idType: 'national', idNumber: '1188776655', phone: '0555678901', bloodGroup: 'A+',  insurance: { company: 'medgulf',  policyNumber: 'MED-330011', cchiId: 'CCHI-100009' }, allergies: [],             emergencyContact: '0555111000' },
  { id: 'p10', mrn: 'MRN-100010', name: 'Rajesh Kumar',           nameAr: 'راجيش كومار',        dob: '1980-02-19', gender: 'male',   nationality: 'Indian',        idType: 'iqama',    idNumber: '2887766554', phone: '0566345678', bloodGroup: 'B+',  insurance: { company: 'tawuniya', policyNumber: 'TAW-887766', cchiId: 'CCHI-100010' }, allergies: [],             emergencyContact: '0566123987' },
  { id: 'p11', mrn: 'MRN-100011', name: 'Maria Santos',           nameAr: 'ماريا سانتوس',       dob: '1990-10-03', gender: 'female', nationality: 'Filipina',      idType: 'iqama',    idNumber: '2334455667', phone: '0566456789', bloodGroup: 'O+',  insurance: { company: 'bupa',     policyNumber: 'BUP-665544', cchiId: 'CCHI-100011' }, allergies: ['Iodine'],     emergencyContact: '0566567890' },
  { id: 'p12', mrn: 'MRN-100012', name: 'Sultan Al-Ghamdi',       nameAr: 'سلطان الغامدي',      dob: '2002-05-27', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1334455667', phone: '0555789012', bloodGroup: 'AB-', insurance: { company: 'rajhi',    policyNumber: 'RAJ-998877', cchiId: 'CCHI-100012' }, allergies: [],             emergencyContact: '0555890123' },
  { id: 'p13', mrn: 'MRN-100013', name: 'Hessa Al-Faisal',        nameAr: 'حصة الفيصل',         dob: '1962-03-09', gender: 'female', nationality: 'Saudi',         idType: 'national', idNumber: '1556677889', phone: '0555890124', bloodGroup: 'A+',  insurance: { company: 'tawuniya', policyNumber: 'TAW-223344', cchiId: 'CCHI-100013' }, allergies: ['Penicillin'], emergencyContact: '0555901234' },
  { id: 'p14', mrn: 'MRN-100014', name: 'Ahmed Mostafa',          nameAr: 'أحمد مصطفى',         dob: '1987-09-12', gender: 'male',   nationality: 'Egyptian',      idType: 'iqama',    idNumber: '2778899001', phone: '0566567891', bloodGroup: 'O+',  insurance: { company: 'medgulf',  policyNumber: 'MED-554433', cchiId: 'CCHI-100014' }, allergies: [],             emergencyContact: '0566678901' },
  { id: 'p15', mrn: 'MRN-100015', name: 'Olivia Brown',           nameAr: 'أوليفيا براون',      dob: '1998-01-30', gender: 'female', nationality: 'Australian',    idType: 'passport', idNumber: 'AUS5523198',  phone: '0590234567', bloodGroup: 'B+',  insurance: { company: 'axa',      policyNumber: 'AXA-883399', cchiId: '' },             allergies: [],             emergencyContact: '0590345678' },
  { id: 'p16', mrn: 'MRN-100016', name: 'Bandar Al-Anzi',         nameAr: 'بندر العنزي',        dob: '1975-07-04', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1445566778', phone: '0555012345', bloodGroup: 'A-',  insurance: { company: 'bupa',     policyNumber: 'BUP-110099', cchiId: 'CCHI-100016' }, allergies: [],             emergencyContact: '0555123450' },
  { id: 'p17', mrn: 'MRN-100017', name: 'Reem Al-Najjar',         nameAr: 'ريم النجار',         dob: '1993-11-21', gender: 'female', nationality: 'Saudi',         idType: 'national', idNumber: '1667788990', phone: '0555345671', bloodGroup: 'O+',  insurance: { company: 'tawuniya', policyNumber: 'TAW-665522', cchiId: 'CCHI-100017' }, allergies: ['Codeine'],    emergencyContact: '0555456712' },
  { id: 'p18', mrn: 'MRN-100018', name: 'Hassan Al-Yami',         nameAr: 'حسن اليامي',         dob: '1948-04-17', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1112233445', phone: '0555567812', bloodGroup: 'AB+', insurance: { company: 'medgulf',  policyNumber: 'MED-998800', cchiId: 'CCHI-100018' }, allergies: [],             emergencyContact: '0555678123' },
  { id: 'p19', mrn: 'MRN-100019', name: 'Yara Al-Shehri',         nameAr: 'يارا الشهري',        dob: '2010-08-08', gender: 'female', nationality: 'Saudi',         idType: 'national', idNumber: '1223344556', phone: '0555678123', bloodGroup: 'O+',  insurance: { company: 'rajhi',    policyNumber: 'RAJ-112233', cchiId: 'CCHI-100019' }, allergies: ['Eggs'],       emergencyContact: '0555789234' },
  { id: 'p20', mrn: 'MRN-100020', name: 'Faisal Al-Maliki',       nameAr: 'فيصل المالكي',       dob: '1983-12-25', gender: 'male',   nationality: 'Saudi',         idType: 'national', idNumber: '1556633229', phone: '0555789234', bloodGroup: 'A+',  insurance: { company: 'bupa',     policyNumber: 'BUP-227733', cchiId: 'CCHI-100020' }, allergies: [],             emergencyContact: '0555890345' },
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
  { code: 'K21.9',   desc: 'Gastro-esophageal reflux disease without esophagitis' },
  { code: 'M54.5',   desc: 'Low back pain' },
  { code: 'R51',     desc: 'Headache' },
  { code: 'J45.909', desc: 'Unspecified asthma, uncomplicated' },
  { code: 'N39.0',   desc: 'Urinary tract infection, site not specified' },
  { code: 'B34.9',   desc: 'Viral infection, unspecified' },
  { code: 'F41.9',   desc: 'Anxiety disorder, unspecified' },
  { code: 'I25.10',  desc: 'Atherosclerotic heart disease' },
  { code: 'E78.5',   desc: 'Hyperlipidemia, unspecified' },
];

export const DRUG_INVENTORY = [
  { id: 'dr1',  name: 'Paracetamol 500mg',     nameAr: 'باراسيتامول 500 ملغ',  stock: 540, reorder: 100, expiry: '2027-08-15', price: 0.50,  category: 'Analgesic',     interactions: [] },
  { id: 'dr2',  name: 'Amoxicillin 500mg',     nameAr: 'أموكسيسيلين 500 ملغ',  stock: 220, reorder: 80,  expiry: '2026-11-30', price: 1.20,  category: 'Antibiotic',    interactions: ['Methotrexate'] },
  { id: 'dr3',  name: 'Metformin 850mg',       nameAr: 'ميتفورمين 850 ملغ',    stock: 380, reorder: 150, expiry: '2027-02-22', price: 0.80,  category: 'Antidiabetic',  interactions: ['Contrast dye'] },
  { id: 'dr4',  name: 'Atorvastatin 20mg',     nameAr: 'أتورفاستاتين 20 ملغ',  stock: 60,  reorder: 80,  expiry: '2026-09-10', price: 1.50,  category: 'Statin',        interactions: ['Grapefruit juice', 'Erythromycin'] },
  { id: 'dr5',  name: 'Lisinopril 10mg',       nameAr: 'ليزينوبريل 10 ملغ',    stock: 175, reorder: 100, expiry: '2027-05-18', price: 1.10,  category: 'ACE Inhibitor', interactions: ['Potassium', 'NSAIDs'] },
  { id: 'dr6',  name: 'Omeprazole 20mg',       nameAr: 'أوميبرازول 20 ملغ',    stock: 410, reorder: 150, expiry: '2027-01-12', price: 0.90,  category: 'PPI',           interactions: ['Clopidogrel'] },
  { id: 'dr7',  name: 'Salbutamol Inhaler',    nameAr: 'سالبوتامول بخاخ',      stock: 95,  reorder: 50,  expiry: '2026-12-08', price: 12.0,  category: 'Bronchodilator',interactions: [] },
  { id: 'dr8',  name: 'Cetirizine 10mg',       nameAr: 'سيتيريزين 10 ملغ',     stock: 320, reorder: 100, expiry: '2027-04-25', price: 0.60,  category: 'Antihistamine', interactions: [] },
  { id: 'dr9',  name: 'Ibuprofen 400mg',       nameAr: 'إيبوبروفين 400 ملغ',   stock: 25,  reorder: 100, expiry: '2026-08-30', price: 0.70,  category: 'NSAID',         interactions: ['Warfarin', 'Lisinopril'] },
  { id: 'dr10', name: 'Insulin Glargine',      nameAr: 'إنسولين جلارجين',      stock: 48,  reorder: 30,  expiry: '2026-07-15', price: 85.0,  category: 'Insulin',       interactions: [] },
  { id: 'dr11', name: 'Aspirin 81mg',          nameAr: 'أسبرين 81 ملغ',        stock: 460, reorder: 150, expiry: '2027-10-01', price: 0.30,  category: 'Antiplatelet',  interactions: ['Warfarin', 'Ibuprofen'] },
  { id: 'dr12', name: 'Amlodipine 5mg',        nameAr: 'أملوديبين 5 ملغ',      stock: 240, reorder: 100, expiry: '2027-03-20', price: 1.30,  category: 'CCB',           interactions: ['Simvastatin'] },
];

export const SEED_PRESCRIPTIONS = [
  { id: 'rx1', patientId: 'p1', doctorId: 'd1', date: today, status: 'pending',   items: [{ drugId: 'dr11', name: 'Aspirin 81mg',     dose: '1 tab',  freq: 'OD',  duration: '30 days', instructions: 'After breakfast' }, { drugId: 'dr4',  name: 'Atorvastatin 20mg', dose: '1 tab', freq: 'HS', duration: '30 days', instructions: 'At bedtime' }] },
  { id: 'rx2', patientId: 'p3', doctorId: 'd2', date: today, status: 'pending',   items: [{ drugId: 'dr3',  name: 'Metformin 850mg',   dose: '1 tab',  freq: 'BID', duration: '90 days', instructions: 'With meals' }] },
  { id: 'rx3', patientId: 'p5', doctorId: 'd9', date: today, status: 'dispensed', items: [{ drugId: 'dr5',  name: 'Lisinopril 10mg',   dose: '1 tab',  freq: 'OD',  duration: '30 days', instructions: 'Morning' }] },
  { id: 'rx4', patientId: 'p4', doctorId: 'd1', date: today, status: 'pending',   items: [{ drugId: 'dr1',  name: 'Paracetamol 500mg', dose: '1 tab',  freq: 'TID', duration: '5 days',  instructions: 'After food' }, { drugId: 'dr2',  name: 'Amoxicillin 500mg', dose: '1 cap', freq: 'TID', duration: '7 days',  instructions: 'Complete course' }] },
  { id: 'rx5', patientId: 'p9', doctorId: 'd5', date: today, status: 'pending',   items: [{ drugId: 'dr1',  name: 'Paracetamol 500mg', dose: '5 ml',   freq: 'QID', duration: '3 days',  instructions: 'Pediatric syrup' }] },
  { id: 'rx6', patientId: 'p13',doctorId: 'd1', date: today, status: 'pending',   items: [{ drugId: 'dr12', name: 'Amlodipine 5mg',    dose: '1 tab',  freq: 'OD',  duration: '30 days', instructions: 'Morning' }] },
];

export const LAB_TESTS = [
  { code: 'CBC',         name: 'Complete Blood Count', nameAr: 'تعداد الدم الكامل',      price: 80,  category: 'Hematology' },
  { code: 'CMP',         name: 'Comprehensive Metabolic Panel', nameAr: 'لوحة الأيض', price: 120, category: 'Chemistry' },
  { code: 'HbA1c',       name: 'Glycated Hemoglobin',  nameAr: 'الهيموجلوبين السكري',    price: 90,  category: 'Diabetes' },
  { code: 'LIPID',       name: 'Lipid Panel',          nameAr: 'لوحة الدهون',            price: 100, category: 'Chemistry' },
  { code: 'UA',          name: 'Urinalysis',           nameAr: 'تحليل البول',            price: 50,  category: 'Microbiology' },
  { code: 'COVID-AG',    name: 'COVID-19 Antigen',     nameAr: 'كوفيد-19 مولد ضد',       price: 75,  category: 'Virology' },
  { code: 'XRAY-CHEST',  name: 'X-Ray Chest',          nameAr: 'أشعة سينية للصدر',       price: 150, category: 'Radiology' },
  { code: 'US-ABD',      name: 'Ultrasound Abdomen',   nameAr: 'موجات صوتية للبطن',      price: 220, category: 'Radiology' },
  { code: 'TSH',         name: 'Thyroid Stimulating Hormone', nameAr: 'هرمون الغدة الدرقية', price: 85, category: 'Endocrine' },
  { code: 'ECG',         name: 'Electrocardiogram',    nameAr: 'تخطيط القلب',            price: 110, category: 'Cardiac' },
];

export const SEED_LAB_ORDERS = [
  { id: 'lab1', patientId: 'p1', doctorId: 'd1', date: today, tests: ['LIPID','HbA1c','ECG'], urgency: 'routine', status: 'pending', results: null },
  { id: 'lab2', patientId: 'p3', doctorId: 'd2', date: today, tests: ['CBC','HbA1c'],         urgency: 'routine', status: 'in_progress', results: null },
  { id: 'lab3', patientId: 'p5', doctorId: 'd9', date: today, tests: ['CMP','LIPID'],         urgency: 'urgent',  status: 'completed', results: { CMP: 'Normal', LIPID: 'LDL: 145, HDL: 42, Total: 220 — Borderline high' } },
  { id: 'lab4', patientId: 'p11',doctorId: 'd6', date: today, tests: ['CBC','UA','COVID-AG'], urgency: 'STAT',    status: 'pending', results: null },
  { id: 'lab5', patientId: 'p4', doctorId: 'd1', date: today, tests: ['CBC'],                 urgency: 'routine', status: 'completed', results: { CBC: 'WBC: 9.8, RBC: 4.6, Hgb: 13.2, Platelets: 245 — Within normal range' } },
  { id: 'lab6', patientId: 'p13',doctorId: 'd1', date: today, tests: ['LIPID','TSH'],         urgency: 'routine', status: 'pending', results: null },
  { id: 'lab7', patientId: 'p7', doctorId: 'd8', date: today, tests: ['CMP'],                 urgency: 'routine', status: 'in_progress', results: null },
  { id: 'lab8', patientId: 'p8', doctorId: 'd4', date: today, tests: ['XRAY-CHEST'],          urgency: 'urgent',  status: 'pending', results: null },
];

export const SEED_VITALS = [
  { id: 'v1', patientId: 'p2', date: today, bp: '118/76', hr: 72, temp: 36.6, weight: 64, spo2: 98, recordedBy: 'u4' },
  { id: 'v2', patientId: 'p1', date: today, bp: '142/92', hr: 88, temp: 36.8, weight: 88, spo2: 96, recordedBy: 'u4' },
  { id: 'v3', patientId: 'p11',date: today, bp: '125/80', hr: 100,temp: 38.4, weight: 56, spo2: 95, recordedBy: 'u4' },
];

export const SEED_BILLS = [
  { id: 'b1', patientId: 'p5', date: today, items: [{ desc: 'Cardiology Consultation', amount: 200 }, { desc: 'Lab: CMP + LIPID', amount: 220 }, { desc: 'Pharmacy: Lisinopril', amount: 33 }], total: 453, insuranceCovered: 362.4, patientPays: 90.6, status: 'paid' },
  { id: 'b2', patientId: 'p2', date: today, items: [{ desc: 'GYN Consultation', amount: 250 }],                                                                                            total: 250, insuranceCovered: 200,   patientPays: 50,   status: 'pending' },
];

export const SEED_NOTIFICATIONS = [
  { id: 'n1', type: 'lab',       title: 'Lab Result Ready',           titleAr: 'نتيجة المختبر جاهزة',      desc: 'Patient Ali Al-Harbi — Lipid Panel',    time: '2h ago', read: false },
  { id: 'n2', type: 'insurance', title: 'Pre-auth Approved',          titleAr: 'موافقة مسبقة',             desc: 'Bupa Arabia — Patient Abdullah Al-Otaibi',time: '3h ago', read: false },
  { id: 'n3', type: 'pharmacy',  title: 'Low Stock Alert',            titleAr: 'تنبيه مخزون منخفض',        desc: 'Ibuprofen 400mg — only 25 units left',  time: '5h ago', read: false },
  { id: 'n4', type: 'pharmacy',  title: 'Low Stock Alert',            titleAr: 'تنبيه مخزون منخفض',        desc: 'Atorvastatin 20mg — only 60 units left',time: '5h ago', read: false },
];
