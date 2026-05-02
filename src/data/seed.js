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
  { key: 'accountant', label: 'Accountant', color: 'bg-amber-700' },
  { key: 'cashier', label: 'Cashier', color: 'bg-cyan-600' },
  { key: 'insurance_approval', label: 'Insurance Approval', color: 'bg-teal-600' },
  { key: 'purchase_officer', label: 'Purchase Officer', color: 'bg-indigo-600' },
  { key: 'inventory_manager', label: 'Inventory Manager', color: 'bg-lime-600' },
  { key: 'hr_manager', label: 'HR Manager', color: 'bg-fuchsia-600' },
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
  { id: 'u11', email: 'accountant@hospital.com',password: 'Admin@123', name: 'Hisham Al-Bishi',      nameAr: 'هشام البيشي',           role: 'accountant' },
  { id: 'u12', email: 'purchase@hospital.com',  password: 'Admin@123', name: 'Rana Al-Subaie',       nameAr: 'رنا السبيعي',           role: 'purchase_officer' },
  { id: 'u13', email: 'inventory@hospital.com', password: 'Admin@123', name: 'Talal Al-Juhani',      nameAr: 'طلال الجهني',           role: 'inventory_manager' },
  { id: 'u14', email: 'hr@hospital.com',        password: 'Admin@123', name: 'Maha Al-Shamrani',     nameAr: 'مها الشمراني',          role: 'hr_manager' },
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

// CCHI-licensed insurers + major TPAs operating in KSA.
// Existing patient records reference the original 5 by key — do not rename them.
export const INSURANCE_COMPANIES = [
  // Primary cooperative health insurers
  { key: 'bupa',         name: 'Bupa Arabia',                          nameAr: 'بوبا العربية',                  category: 'primary' },
  { key: 'tawuniya',     name: 'Tawuniya (NCCI)',                      nameAr: 'التعاونية',                     category: 'primary' },
  { key: 'medgulf',      name: 'Medgulf',                              nameAr: 'ميدغلف',                        category: 'primary' },
  { key: 'axa',          name: 'AXA Cooperative',                      nameAr: 'أكسا التعاونية',                category: 'primary' },
  { key: 'rajhi',        name: 'Al Rajhi Takaful',                     nameAr: 'الراجحي تكافل',                 category: 'takaful' },
  { key: 'saico',        name: 'SAICO',                                nameAr: 'سايكو',                         category: 'primary' },
  { key: 'walaa',        name: 'Walaa Cooperative Insurance',          nameAr: 'ولاء للتأمين التعاوني',          category: 'primary' },
  { key: 'allianz_sf',   name: 'Allianz Saudi Fransi',                 nameAr: 'أليانز السعودي الفرنسي',         category: 'primary' },
  { key: 'malath',       name: 'Malath Cooperative Insurance',         nameAr: 'ملاذ للتأمين',                   category: 'primary' },
  { key: 'wataniya',     name: 'Wataniya Insurance',                   nameAr: 'الوطنية للتأمين',                category: 'primary' },
  { key: 'salama',       name: 'Salama Cooperative Insurance',         nameAr: 'سلامة للتأمين التعاوني',          category: 'takaful' },
  { key: 'arabian_shield',name:'Arabian Shield Cooperative Insurance', nameAr: 'الدرع العربي',                   category: 'primary' },
  { key: 'al_sagr',      name: 'Al Sagr Cooperative Insurance',        nameAr: 'الصقر للتأمين التعاوني',          category: 'primary' },
  { key: 'solidarity',   name: 'Solidarity Saudi Takaful',             nameAr: 'سوليدرتي تكافل',                 category: 'takaful' },
  { key: 'buruj',        name: 'Buruj Cooperative Insurance',          nameAr: 'بروج للتأمين التعاوني',           category: 'primary' },
  { key: 'gulf_union',   name: 'Gulf Union Al Ahlia Cooperative',      nameAr: 'الاتحاد الخليجي الأهلية',         category: 'primary' },
  { key: 'uca',          name: 'United Cooperative Assurance (UCA)',   nameAr: 'المتحدة للتأمين التعاوني',        category: 'primary' },
  { key: 'enaya',        name: 'Saudi Enaya Cooperative Insurance',    nameAr: 'عناية السعودية',                  category: 'primary' },
  { key: 'al_etihad',    name: 'Al-Etihad Cooperative Insurance',      nameAr: 'الاتحاد للتأمين التعاوني',        category: 'primary' },
  { key: 'acig',         name: 'ACIG Cooperative Insurance',           nameAr: 'مجموعة التأمين العربية التعاونية', category: 'primary' },

  // Third-Party Administrators (claims processing on behalf of insurers)
  { key: 'nextcare',     name: 'NEXtCARE (GIG)',                       nameAr: 'نكست كير',                      category: 'tpa' },
  { key: 'mednet',       name: 'MedNet Saudi Arabia',                  nameAr: 'ميدنت السعودية',                 category: 'tpa' },
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

// ─────────────────────────────────────────────────────────────────
// ACCOUNTING — Chart of Accounts, Journal Entries
// ─────────────────────────────────────────────────────────────────
export const CHART_OF_ACCOUNTS = [
  { code: '1000', name: 'Cash on Hand',         nameAr: 'النقدية',                 type: 'Asset',     balance: 145200 },
  { code: '1010', name: 'Bank — Al Rajhi',      nameAr: 'البنك - الراجحي',         type: 'Asset',     balance: 1840500 },
  { code: '1020', name: 'Bank — SNB',           nameAr: 'البنك - الأهلي',          type: 'Asset',     balance: 920100 },
  { code: '1100', name: 'Accounts Receivable',  nameAr: 'العملاء (مدينون)',        type: 'Asset',     balance: 412300 },
  { code: '1200', name: 'Pharmacy Inventory',   nameAr: 'مخزون الصيدلية',          type: 'Asset',     balance: 285600 },
  { code: '1210', name: 'Medical Supplies',     nameAr: 'المستلزمات الطبية',       type: 'Asset',     balance: 198400 },
  { code: '1500', name: 'Medical Equipment',    nameAr: 'الأجهزة الطبية',          type: 'Asset',     balance: 3450000 },
  { code: '2000', name: 'Accounts Payable',     nameAr: 'الموردون (دائنون)',       type: 'Liability', balance: 326800 },
  { code: '2100', name: 'Salaries Payable',     nameAr: 'الرواتب المستحقة',        type: 'Liability', balance: 412000 },
  { code: '2200', name: 'VAT Payable',          nameAr: 'ضريبة القيمة المضافة',    type: 'Liability', balance: 89400 },
  { code: '3000', name: 'Owner Equity',         nameAr: 'حقوق الملكية',            type: 'Equity',    balance: 4500000 },
  { code: '4000', name: 'Consultation Revenue', nameAr: 'إيرادات الكشوفات',        type: 'Revenue',   balance: 845000 },
  { code: '4010', name: 'Pharmacy Revenue',     nameAr: 'إيرادات الصيدلية',        type: 'Revenue',   balance: 312000 },
  { code: '4020', name: 'Lab Revenue',          nameAr: 'إيرادات المختبر',         type: 'Revenue',   balance: 224500 },
  { code: '4030', name: 'Surgery Revenue',      nameAr: 'إيرادات العمليات',        type: 'Revenue',   balance: 678000 },
  { code: '5000', name: 'Salaries Expense',     nameAr: 'مصاريف الرواتب',          type: 'Expense',   balance: 412000 },
  { code: '5100', name: 'Drug Purchases',       nameAr: 'مشتريات الأدوية',         type: 'Expense',   balance: 188000 },
  { code: '5200', name: 'Utilities',            nameAr: 'مرافق',                   type: 'Expense',   balance: 42500 },
  { code: '5300', name: 'Rent',                 nameAr: 'إيجار',                   type: 'Expense',   balance: 85000 },
];

export const SEED_JOURNAL_ENTRIES = [
  { id: 'je1', date: today, ref: 'JE-2026-001', desc: 'Cashier daily collection',  lines: [{ acct: '1000', dr: 4530,  cr: 0 }, { acct: '4000', dr: 0, cr: 4530 }],  postedBy: 'u11' },
  { id: 'je2', date: today, ref: 'JE-2026-002', desc: 'Drug purchase from MedCo',  lines: [{ acct: '1200', dr: 18000, cr: 0 }, { acct: '2000', dr: 0, cr: 18000 }], postedBy: 'u11' },
  { id: 'je3', date: today, ref: 'JE-2026-003', desc: 'April salaries accrual',    lines: [{ acct: '5000', dr: 412000,cr: 0 }, { acct: '2100', dr: 0, cr: 412000 }],postedBy: 'u11' },
  { id: 'je4', date: today, ref: 'JE-2026-004', desc: 'Bupa claim received',       lines: [{ acct: '1010', dr: 88200, cr: 0 }, { acct: '1100', dr: 0, cr: 88200 }], postedBy: 'u11' },
];

// ─────────────────────────────────────────────────────────────────
// PURCHASE — Vendors, Purchase Orders
// ─────────────────────────────────────────────────────────────────
export const SEED_VENDORS = [
  { id: 'vn1', name: 'Saudi MedCo Pharmaceuticals',  nameAr: 'الشركة السعودية للأدوية',  category: 'Pharmaceuticals',  contact: 'Faisal Al-Anqari',     phone: '0114567890', email: 'sales@saudimedco.sa',   vatNo: '300012345600003', balance: 142000, paymentTerms: 'Net 30' },
  { id: 'vn2', name: 'Gulf Medical Supplies',        nameAr: 'الخليج للمستلزمات الطبية',  category: 'Medical Supplies',  contact: 'Mariam Al-Shaibani',  phone: '0125678901', email: 'orders@gulfmedical.sa', vatNo: '300023456700003', balance: 86500,  paymentTerms: 'Net 45' },
  { id: 'vn3', name: 'Riyadh Lab Equipment Co.',     nameAr: 'الرياض لأجهزة المختبرات',   category: 'Lab Equipment',    contact: 'Sami Al-Khalifa',      phone: '0114678912', email: 'info@riyadhlab.sa',     vatNo: '300034567800003', balance: 0,      paymentTerms: 'Net 60' },
  { id: 'vn4', name: 'Bupa Arabia (Insurance)',      nameAr: 'بوبا العربية',              category: 'Insurance',        contact: 'Account Manager',      phone: '8001284444',  email: 'corporate@bupa.com.sa', vatNo: '300045678900003', balance: 0,      paymentTerms: 'N/A' },
  { id: 'vn5', name: 'Al Salama Cleaning Services',  nameAr: 'السلامة لخدمات التنظيف',    category: 'Services',         contact: 'Nawaf Al-Subhi',       phone: '0556789012', email: 'contracts@alsalama.sa', vatNo: '300056789000003', balance: 12500,  paymentTerms: 'Net 30' },
  { id: 'vn6', name: 'Tamer Group',                  nameAr: 'مجموعة تامر',                category: 'Pharmaceuticals',  contact: 'Khaled Bin Tamer',     phone: '0122678901', email: 'b2b@tamergroup.com',    vatNo: '300067890100003', balance: 56700,  paymentTerms: 'Net 30' },
  { id: 'vn7', name: 'Siemens Healthineers KSA',     nameAr: 'سيمنز هيلثينيرز',            category: 'Imaging',          contact: 'Dr. Karim Mostafa',    phone: '0112789012', email: 'sa.support@siemens.com',vatNo: '300078901200003', balance: 0,      paymentTerms: 'Net 90' },
  { id: 'vn8', name: 'NUPCO',                        nameAr: 'الشركة الوطنية للشراء الموحد',category: 'GPO',             contact: 'Procurement Desk',     phone: '8001183333',  email: 'cs@nupco.com',          vatNo: '300089012300003', balance: 0,      paymentTerms: 'Net 60' },
];

export const SEED_PURCHASE_ORDERS = [
  { id: 'po1', poNo: 'PO-2026-0001', vendorId: 'vn1', date: today, status: 'received', approval: 'approved', total: 18000, vat: 2700, items: [{ name: 'Paracetamol 500mg (1000 tabs)', qty: 20, unitPrice: 450 }, { name: 'Amoxicillin 500mg (500 caps)', qty: 20, unitPrice: 450 }], requestedBy: 'u6', approvedBy: 'u1', notes: 'Monthly restock' },
  { id: 'po2', poNo: 'PO-2026-0002', vendorId: 'vn2', date: today, status: 'sent',     approval: 'approved', total: 8200,  vat: 1230, items: [{ name: 'Surgical Gloves (Box of 100)', qty: 50, unitPrice: 45 }, { name: 'Syringes 5ml (Box of 100)', qty: 40, unitPrice: 35 }, { name: 'Gauze Rolls', qty: 100, unitPrice: 12 }], requestedBy: 'u4', approvedBy: 'u1', notes: 'Replenishment' },
  { id: 'po3', poNo: 'PO-2026-0003', vendorId: 'vn3', date: today, status: 'pending',  approval: 'pending',  total: 145000,vat: 21750,items: [{ name: 'Hematology Analyzer', qty: 1, unitPrice: 145000 }], requestedBy: 'u7', approvedBy: null, notes: 'CapEx - awaiting board approval' },
  { id: 'po4', poNo: 'PO-2026-0004', vendorId: 'vn6', date: today, status: 'received', approval: 'approved', total: 32400, vat: 4860, items: [{ name: 'Insulin Glargine (Vial)', qty: 60, unitPrice: 540 }], requestedBy: 'u6', approvedBy: 'u1', notes: 'Cold chain - delivered today' },
  { id: 'po5', poNo: 'PO-2026-0005', vendorId: 'vn8', date: today, status: 'draft',    approval: 'draft',    total: 12300, vat: 1845, items: [{ name: 'IV Fluids Normal Saline 1L', qty: 200, unitPrice: 18 }, { name: 'Cannulas 22G (Box of 50)', qty: 30, unitPrice: 290 }], requestedBy: 'u12', approvedBy: null, notes: 'Quarterly bulk via NUPCO' },
];

// ─────────────────────────────────────────────────────────────────
// SUPPLY CHAIN — Warehouses, Items, Stock Movements, GRN
// ─────────────────────────────────────────────────────────────────
export const SEED_WAREHOUSES = [
  { id: 'wh1', name: 'Main Pharmacy Store',     nameAr: 'مستودع الصيدلية الرئيسي',    location: 'Ground Floor, Block A', manager: 'Omar Al-Zahrani' },
  { id: 'wh2', name: 'Surgical Supplies Store', nameAr: 'مستودع المستلزمات الجراحية', location: 'First Floor, Block B',  manager: 'Talal Al-Juhani' },
  { id: 'wh3', name: 'Lab Reagents Store',      nameAr: 'مستودع كواشف المختبر',       location: 'Basement, Block C',     manager: 'Mohammed Al-Qahtani' },
  { id: 'wh4', name: 'General Stores',          nameAr: 'المستودع العام',             location: 'Service Block',         manager: 'Talal Al-Juhani' },
];

export const SEED_SUPPLY_ITEMS = [
  { id: 'si1',  sku: 'GL-001',  name: 'Surgical Gloves (Latex, M)',     nameAr: 'قفازات جراحية',          unit: 'Box',  whId: 'wh2', stock: 240, reorder: 80,  unitCost: 45,  category: 'Consumables' },
  { id: 'si2',  sku: 'SY-005',  name: 'Syringes 5ml',                   nameAr: 'حقن 5 مل',                unit: 'Box',  whId: 'wh2', stock: 180, reorder: 100, unitCost: 35,  category: 'Consumables' },
  { id: 'si3',  sku: 'SY-010',  name: 'Syringes 10ml',                  nameAr: 'حقن 10 مل',               unit: 'Box',  whId: 'wh2', stock: 95,  reorder: 100, unitCost: 42,  category: 'Consumables' },
  { id: 'si4',  sku: 'GZ-001',  name: 'Gauze Rolls 4-inch',             nameAr: 'لفائف شاش',               unit: 'Pc',   whId: 'wh2', stock: 320, reorder: 150, unitCost: 12,  category: 'Consumables' },
  { id: 'si5',  sku: 'IV-NS1',  name: 'IV Fluid Normal Saline 1L',      nameAr: 'محاليل ملحية وريدية',     unit: 'Bag',  whId: 'wh2', stock: 80,  reorder: 100, unitCost: 18,  category: 'IV Fluids' },
  { id: 'si6',  sku: 'CN-22G',  name: 'IV Cannula 22G',                 nameAr: 'قسطرة وريدية',            unit: 'Box',  whId: 'wh2', stock: 60,  reorder: 30,  unitCost: 290, category: 'Consumables' },
  { id: 'si7',  sku: 'MS-N95',  name: 'N95 Respirator Mask',            nameAr: 'كمامة N95',               unit: 'Pc',   whId: 'wh2', stock: 1450,reorder: 500, unitCost: 8,   category: 'PPE' },
  { id: 'si8',  sku: 'MS-SUR',  name: 'Surgical Mask 3-ply',            nameAr: 'كمامة جراحية',            unit: 'Box',  whId: 'wh2', stock: 220, reorder: 100, unitCost: 28,  category: 'PPE' },
  { id: 'si9',  sku: 'RG-CBC',  name: 'CBC Reagent Kit',                nameAr: 'كاشف تعداد الدم',         unit: 'Kit',  whId: 'wh3', stock: 18,  reorder: 10,  unitCost: 480, category: 'Lab Reagents' },
  { id: 'si10', sku: 'RG-LIP',  name: 'Lipid Panel Reagent',            nameAr: 'كاشف الدهون',             unit: 'Kit',  whId: 'wh3', stock: 12,  reorder: 8,   unitCost: 360, category: 'Lab Reagents' },
  { id: 'si11', sku: 'XR-FLM',  name: 'X-Ray Film Cassette 14×17',      nameAr: 'فيلم أشعة',               unit: 'Box',  whId: 'wh4', stock: 24,  reorder: 15,  unitCost: 220, category: 'Imaging' },
  { id: 'si12', sku: 'BD-SHT',  name: 'Bedsheets (Disposable)',         nameAr: 'شراشف للاستخدام مرة واحدة', unit: 'Pc',   whId: 'wh4', stock: 540, reorder: 200, unitCost: 15,  category: 'Linen' },
];

export const SEED_STOCK_MOVEMENTS = [
  { id: 'sm1', date: today, itemId: 'si1', whId: 'wh2', type: 'in',  qty: 50,  reason: 'GRN-2026-0002 from Gulf Medical Supplies', refType: 'GRN', userId: 'u13' },
  { id: 'sm2', date: today, itemId: 'si4', whId: 'wh2', type: 'in',  qty: 100, reason: 'GRN-2026-0002 from Gulf Medical Supplies', refType: 'GRN', userId: 'u13' },
  { id: 'sm3', date: today, itemId: 'si2', whId: 'wh2', type: 'out', qty: 12,  reason: 'Issue to Emergency Department',            refType: 'Issue', userId: 'u4' },
  { id: 'sm4', date: today, itemId: 'si7', whId: 'wh2', type: 'out', qty: 40,  reason: 'Issue to ER + ICU',                        refType: 'Issue', userId: 'u4' },
  { id: 'sm5', date: today, itemId: 'si9', whId: 'wh3', type: 'out', qty: 1,   reason: 'Daily lab consumption',                    refType: 'Issue', userId: 'u7' },
];

export const SEED_GRNS = [
  { id: 'grn1', grnNo: 'GRN-2026-0001', poId: 'po1', date: today, vendorId: 'vn1', receivedBy: 'u6',  status: 'completed', items: [{ name: 'Paracetamol 500mg', orderedQty: 20, receivedQty: 20 }, { name: 'Amoxicillin 500mg', orderedQty: 20, receivedQty: 20 }] },
  { id: 'grn2', grnNo: 'GRN-2026-0002', poId: 'po2', date: today, vendorId: 'vn2', receivedBy: 'u13', status: 'completed', items: [{ name: 'Surgical Gloves',    orderedQty: 50, receivedQty: 50 }, { name: 'Syringes 5ml',     orderedQty: 40, receivedQty: 40 }, { name: 'Gauze Rolls', orderedQty: 100, receivedQty: 100 }] },
  { id: 'grn3', grnNo: 'GRN-2026-0003', poId: 'po4', date: today, vendorId: 'vn6', receivedBy: 'u6',  status: 'completed', items: [{ name: 'Insulin Glargine',   orderedQty: 60, receivedQty: 58 }] },
];

// ─────────────────────────────────────────────────────────────────
// HR — Employees, Attendance, Leave, Payroll
// ─────────────────────────────────────────────────────────────────
export const SEED_EMPLOYEES = [
  { id: 'em1',  empNo: 'EMP-001', name: 'Dr. Ahmed Al-Rashidi',   nameAr: 'د. أحمد الرشيدي',     userId: 'u2',  department: 'Cardiology',  designation: 'Consultant Cardiologist', joinDate: '2019-03-15', nationality: 'Saudi',     iqamaOrId: '1023456789', basicSalary: 35000, allowances: 8000,  status: 'active', leaveBalance: 21 },
  { id: 'em2',  empNo: 'EMP-002', name: 'Dr. Khalid Al-Saud',     nameAr: 'د. خالد آل سعود',     userId: 'u3',  department: 'Internal Medicine', designation: 'Chief Medical Officer', joinDate: '2017-08-01', nationality: 'Saudi', iqamaOrId: '1098876543', basicSalary: 48000, allowances: 12000, status: 'active', leaveBalance: 18 },
  { id: 'em3',  empNo: 'EMP-003', name: 'Nurse Fatimah Hassan',   nameAr: 'الممرضة فاطمة حسن',   userId: 'u4',  department: 'Nursing',     designation: 'Senior Staff Nurse',     joinDate: '2020-05-22', nationality: 'Filipina',  iqamaOrId: '2334455667', basicSalary: 9500,  allowances: 2500,  status: 'active', leaveBalance: 15 },
  { id: 'em4',  empNo: 'EMP-004', name: 'Sara Al-Mutairi',        nameAr: 'سارة المطيري',        userId: 'u5',  department: 'Reception',   designation: 'Front Office Coordinator',joinDate: '2021-01-10', nationality: 'Saudi',    iqamaOrId: '1112233445', basicSalary: 7500,  allowances: 1500,  status: 'active', leaveBalance: 22 },
  { id: 'em5',  empNo: 'EMP-005', name: 'Omar Al-Zahrani',        nameAr: 'عمر الزهراني',        userId: 'u6',  department: 'Pharmacy',    designation: 'Chief Pharmacist',        joinDate: '2018-09-12', nationality: 'Saudi',    iqamaOrId: '1099887766', basicSalary: 18000, allowances: 4000,  status: 'active', leaveBalance: 17 },
  { id: 'em6',  empNo: 'EMP-006', name: 'Mohammed Al-Qahtani',    nameAr: 'محمد القحطاني',       userId: 'u7',  department: 'Laboratory',  designation: 'Senior Lab Technician',   joinDate: '2019-11-05', nationality: 'Saudi',    iqamaOrId: '1188776655', basicSalary: 12000, allowances: 3000,  status: 'active', leaveBalance: 19 },
  { id: 'em7',  empNo: 'EMP-007', name: 'Layla Al-Otaibi',        nameAr: 'ليلى العتيبي',        userId: 'u8',  department: 'Finance',     designation: 'Finance Officer',          joinDate: '2020-02-18', nationality: 'Saudi',    iqamaOrId: '1077889911', basicSalary: 14500, allowances: 3500,  status: 'active', leaveBalance: 14 },
  { id: 'em8',  empNo: 'EMP-008', name: 'Yousef Al-Dosari',       nameAr: 'يوسف الدوسري',        userId: 'u9',  department: 'Cashier',     designation: 'Senior Cashier',           joinDate: '2022-06-01', nationality: 'Saudi',    iqamaOrId: '1556633229', basicSalary: 8000,  allowances: 1500,  status: 'active', leaveBalance: 20 },
  { id: 'em9',  empNo: 'EMP-009', name: 'Nadia Al-Harbi',         nameAr: 'نادية الحربي',        userId: 'u10', department: 'Insurance',   designation: 'Insurance Officer',        joinDate: '2021-09-15', nationality: 'Saudi',    iqamaOrId: '1445566778', basicSalary: 11000, allowances: 2500,  status: 'active', leaveBalance: 16 },
  { id: 'em10', empNo: 'EMP-010', name: 'Hisham Al-Bishi',        nameAr: 'هشام البيشي',         userId: 'u11', department: 'Accounting',  designation: 'Senior Accountant',        joinDate: '2018-04-20', nationality: 'Saudi',    iqamaOrId: '1667788990', basicSalary: 16000, allowances: 3500,  status: 'active', leaveBalance: 18 },
  { id: 'em11', empNo: 'EMP-011', name: 'Rana Al-Subaie',         nameAr: 'رنا السبيعي',         userId: 'u12', department: 'Procurement', designation: 'Purchase Officer',         joinDate: '2022-03-10', nationality: 'Saudi',    iqamaOrId: '1334455667', basicSalary: 12500, allowances: 2500,  status: 'active', leaveBalance: 22 },
  { id: 'em12', empNo: 'EMP-012', name: 'Talal Al-Juhani',        nameAr: 'طلال الجهني',         userId: 'u13', department: 'Inventory',   designation: 'Inventory Manager',        joinDate: '2020-12-01', nationality: 'Saudi',    iqamaOrId: '1223344556', basicSalary: 13500, allowances: 3000,  status: 'active', leaveBalance: 17 },
  { id: 'em13', empNo: 'EMP-013', name: 'Maha Al-Shamrani',       nameAr: 'مها الشمراني',        userId: 'u14', department: 'Human Resources', designation: 'HR Manager',           joinDate: '2017-05-15', nationality: 'Saudi',    iqamaOrId: '1556677889', basicSalary: 17500, allowances: 4000,  status: 'active', leaveBalance: 15 },
  { id: 'em14', empNo: 'EMP-014', name: 'Aisha Hassan',           nameAr: 'عائشة حسن',           userId: null,  department: 'Nursing',     designation: 'Staff Nurse',              joinDate: '2023-02-20', nationality: 'Egyptian', iqamaOrId: '2456789012', basicSalary: 8500,  allowances: 2000,  status: 'active', leaveBalance: 24 },
  { id: 'em15', empNo: 'EMP-015', name: 'Rajesh Kumar',           nameAr: 'راجيش كومار',         userId: null,  department: 'Maintenance', designation: 'Biomedical Engineer',      joinDate: '2021-07-08', nationality: 'Indian',   iqamaOrId: '2887766554', basicSalary: 11000, allowances: 2500,  status: 'active', leaveBalance: 19 },
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
  { id: 'lr1', empId: 'em14', type: 'annual',  fromDate: today, toDate: '2026-05-08', days: 7, reason: 'Family vacation',         status: 'approved', approvedBy: 'u14', requestedAt: '2026-04-25' },
  { id: 'lr2', empId: 'em5',  type: 'sick',    fromDate: '2026-05-04', toDate: '2026-05-05', days: 2, reason: 'Flu symptoms',     status: 'pending',  approvedBy: null,  requestedAt: today },
  { id: 'lr3', empId: 'em8',  type: 'casual',  fromDate: today, toDate: today,        days: 1, reason: 'Personal errand',         status: 'pending',  approvedBy: null,  requestedAt: today },
  { id: 'lr4', empId: 'em3',  type: 'annual',  fromDate: '2026-06-01', toDate: '2026-06-14', days: 14,reason: 'Annual leave',     status: 'approved', approvedBy: 'u14', requestedAt: '2026-04-20' },
];

export const SEED_PAYROLL = [
  { id: 'py1', month: '2026-04', empId: 'em1',  basic: 35000, allowances: 8000,  deductions: 1200, gosi: 1750,  netPay: 40050, status: 'paid'    },
  { id: 'py2', month: '2026-04', empId: 'em2',  basic: 48000, allowances: 12000, deductions: 1500, gosi: 2400,  netPay: 56100, status: 'paid'    },
  { id: 'py3', month: '2026-04', empId: 'em3',  basic: 9500,  allowances: 2500,  deductions: 300,  gosi: 0,     netPay: 11700, status: 'paid'    },
  { id: 'py4', month: '2026-04', empId: 'em4',  basic: 7500,  allowances: 1500,  deductions: 200,  gosi: 375,   netPay: 8425,  status: 'paid'    },
  { id: 'py5', month: '2026-04', empId: 'em5',  basic: 18000, allowances: 4000,  deductions: 600,  gosi: 900,   netPay: 20500, status: 'paid'    },
  { id: 'py6', month: '2026-04', empId: 'em6',  basic: 12000, allowances: 3000,  deductions: 400,  gosi: 600,   netPay: 14000, status: 'paid'    },
  { id: 'py7', month: '2026-04', empId: 'em7',  basic: 14500, allowances: 3500,  deductions: 450,  gosi: 725,   netPay: 16825, status: 'paid'    },
  { id: 'py8', month: '2026-04', empId: 'em8',  basic: 8000,  allowances: 1500,  deductions: 200,  gosi: 400,   netPay: 8900,  status: 'paid'    },
  { id: 'py9', month: '2026-04', empId: 'em9',  basic: 11000, allowances: 2500,  deductions: 350,  gosi: 550,   netPay: 12600, status: 'paid'    },
  { id: 'py10',month: '2026-04', empId: 'em10', basic: 16000, allowances: 3500,  deductions: 500,  gosi: 800,   netPay: 18200, status: 'paid'    },
  { id: 'py11',month: '2026-05', empId: 'em1',  basic: 35000, allowances: 8000,  deductions: 1200, gosi: 1750,  netPay: 40050, status: 'pending' },
  { id: 'py12',month: '2026-05', empId: 'em2',  basic: 48000, allowances: 12000, deductions: 1500, gosi: 2400,  netPay: 56100, status: 'pending' },
  { id: 'py13',month: '2026-05', empId: 'em3',  basic: 9500,  allowances: 2500,  deductions: 300,  gosi: 0,     netPay: 11700, status: 'pending' },
];

// ─────────────────────────────────────────────────────────────────
// HR — Recruitment (Job Openings + Applicants)
// ─────────────────────────────────────────────────────────────────
export const SEED_JOB_OPENINGS = [
  { id: 'jo1', code: 'JOB-2026-001', title: 'Cardiologist Consultant',     titleAr: 'استشاري قلب',           department: 'Cardiology',    type: 'Full-time',  openings: 2, status: 'open',   postedDate: '2026-04-10', closeDate: '2026-06-01', salaryRange: '38000-48000', description: 'KSA-licensed Cardiologist with 5+ years experience, SCFHS registration mandatory.' },
  { id: 'jo2', code: 'JOB-2026-002', title: 'Staff Nurse — ICU',            titleAr: 'ممرض/ة عناية مركزة',   department: 'Nursing',       type: 'Full-time',  openings: 4, status: 'open',   postedDate: '2026-04-15', closeDate: '2026-05-30', salaryRange: '8500-11000',  description: 'BSc Nursing + Saudi Council license. ICU experience preferred.' },
  { id: 'jo3', code: 'JOB-2026-003', title: 'Lab Technician',               titleAr: 'فني مختبر',             department: 'Laboratory',    type: 'Full-time',  openings: 1, status: 'open',   postedDate: '2026-04-20', closeDate: '2026-05-25', salaryRange: '9000-13000',  description: 'BSc Medical Laboratory Sciences, SCFHS license.' },
  { id: 'jo4', code: 'JOB-2026-004', title: 'Pharmacist',                   titleAr: 'صيدلي',                 department: 'Pharmacy',      type: 'Full-time',  openings: 2, status: 'open',   postedDate: '2026-04-22', closeDate: '2026-06-15', salaryRange: '11000-16000', description: 'PharmD, SFDA registered, hospital pharmacy experience preferred.' },
  { id: 'jo5', code: 'JOB-2026-005', title: 'Insurance Claims Officer',     titleAr: 'مسؤول مطالبات التأمين',department: 'Insurance',     type: 'Full-time',  openings: 1, status: 'on_hold',postedDate: '2026-04-01', closeDate: '2026-05-15', salaryRange: '8000-12000',  description: 'CCHI experience, fluent Arabic + English.' },
  { id: 'jo6', code: 'JOB-2026-006', title: 'Receptionist (Bilingual)',     titleAr: 'موظف استقبال',          department: 'Reception',     type: 'Full-time',  openings: 1, status: 'closed', postedDate: '2026-03-15', closeDate: '2026-04-15', salaryRange: '6500-8500',   description: 'Filled — closed.' },
  { id: 'jo7', code: 'JOB-2026-007', title: 'Biomedical Engineer',          titleAr: 'مهندس طبي حيوي',       department: 'Maintenance',   type: 'Contract',   openings: 1, status: 'open',   postedDate: '2026-04-25', closeDate: '2026-06-30', salaryRange: '10000-14000', description: 'Maintain imaging + lab equipment, vendor coordination.' },
];

export const SEED_APPLICANTS = [
  { id: 'ap1',  name: 'Dr. Mansour Al-Zahrani',  jobId: 'jo1', stage: 'interview',  appliedAt: '2026-04-12', email: 'm.zahrani@example.com',     phone: '0555111201', nationality: 'Saudi',     experience: 9,  rating: 4 },
  { id: 'ap2',  name: 'Dr. Heba El-Sayed',       jobId: 'jo1', stage: 'screening',  appliedAt: '2026-04-18', email: 'heba.s@example.com',         phone: '0555111202', nationality: 'Egyptian',  experience: 6,  rating: 3 },
  { id: 'ap3',  name: 'Dr. Imran Khan',          jobId: 'jo1', stage: 'offer',      appliedAt: '2026-04-11', email: 'imran.k@example.com',        phone: '0555111203', nationality: 'Pakistani', experience: 12, rating: 5 },
  { id: 'ap4',  name: 'Joycelyn Reyes',          jobId: 'jo2', stage: 'hired',      appliedAt: '2026-04-16', email: 'jo.reyes@example.com',       phone: '0555111204', nationality: 'Filipina',  experience: 5,  rating: 4 },
  { id: 'ap5',  name: 'Anita Sharma',            jobId: 'jo2', stage: 'interview',  appliedAt: '2026-04-19', email: 'a.sharma@example.com',       phone: '0555111205', nationality: 'Indian',    experience: 4,  rating: 4 },
  { id: 'ap6',  name: 'Maryam Al-Otaibi',        jobId: 'jo2', stage: 'applied',    appliedAt: today,        email: 'm.otaibi@example.com',       phone: '0555111206', nationality: 'Saudi',     experience: 2,  rating: null },
  { id: 'ap7',  name: 'Bilal Al-Harbi',          jobId: 'jo2', stage: 'rejected',   appliedAt: '2026-04-20', email: 'bilal.h@example.com',        phone: '0555111207', nationality: 'Saudi',     experience: 1,  rating: 2 },
  { id: 'ap8',  name: 'Sadia Hussain',           jobId: 'jo3', stage: 'interview',  appliedAt: '2026-04-22', email: 's.hussain@example.com',      phone: '0555111208', nationality: 'Pakistani', experience: 7,  rating: 4 },
  { id: 'ap9',  name: 'Khalil Al-Subaie',        jobId: 'jo3', stage: 'screening',  appliedAt: today,        email: 'k.subaie@example.com',       phone: '0555111209', nationality: 'Saudi',     experience: 3,  rating: 3 },
  { id: 'ap10', name: 'Dr. Layla Al-Nasser',     jobId: 'jo4', stage: 'offer',      appliedAt: '2026-04-23', email: 'l.nasser@example.com',       phone: '0555111210', nationality: 'Saudi',     experience: 8,  rating: 5 },
  { id: 'ap11', name: 'Ahmed Yaseen',            jobId: 'jo4', stage: 'applied',    appliedAt: today,        email: 'ahmed.y@example.com',        phone: '0555111211', nationality: 'Sudanese',  experience: 5,  rating: null },
  { id: 'ap12', name: 'George Mathews',          jobId: 'jo7', stage: 'screening',  appliedAt: '2026-04-26', email: 'g.mathews@example.com',      phone: '0555111212', nationality: 'Indian',    experience: 8,  rating: 4 },
];

// ─────────────────────────────────────────────────────────────────
// HR — Documents & Compliance (Iqama, license expiry — KSA critical)
// ─────────────────────────────────────────────────────────────────
export const SEED_HR_DOCUMENTS = [
  { id: 'hd1',  empId: 'em1',  type: 'Iqama',           docNo: 'IQ-1023456789',  issueDate: '2024-03-15', expiryDate: '2026-06-12', status: 'active' },
  { id: 'hd2',  empId: 'em1',  type: 'SCFHS License',   docNo: 'SCFHS-CARD-882',  issueDate: '2023-08-01', expiryDate: '2026-08-01', status: 'active' },
  { id: 'hd3',  empId: 'em1',  type: 'Employment Contract', docNo: 'EMP-CON-001',issueDate: '2019-03-15', expiryDate: '2027-03-15', status: 'active' },
  { id: 'hd4',  empId: 'em2',  type: 'Iqama',           docNo: 'IQ-1098876543',  issueDate: '2025-01-10', expiryDate: '2027-01-10', status: 'active' },
  { id: 'hd5',  empId: 'em2',  type: 'SCFHS License',   docNo: 'SCFHS-IM-441',    issueDate: '2024-02-15', expiryDate: '2027-02-15', status: 'active' },
  { id: 'hd6',  empId: 'em3',  type: 'Iqama',           docNo: 'IQ-2334455667',  issueDate: '2024-05-20', expiryDate: '2026-05-20', status: 'expiring' },
  { id: 'hd7',  empId: 'em3',  type: 'SCFHS License',   docNo: 'SCFHS-RN-9912',   issueDate: '2023-04-10', expiryDate: '2026-04-10', status: 'expired' },
  { id: 'hd8',  empId: 'em3',  type: 'Passport',        docNo: 'PH-N4422198',     issueDate: '2020-06-15', expiryDate: '2030-06-14', status: 'active' },
  { id: 'hd9',  empId: 'em5',  type: 'SFDA License',    docNo: 'SFDA-PHM-3322',   issueDate: '2024-01-08', expiryDate: '2027-01-08', status: 'active' },
  { id: 'hd10', empId: 'em6',  type: 'SCFHS License',   docNo: 'SCFHS-LAB-7733',  issueDate: '2023-11-20', expiryDate: '2026-05-20', status: 'expiring' },
  { id: 'hd11', empId: 'em14', type: 'Iqama',           docNo: 'IQ-2456789012',  issueDate: '2024-08-12', expiryDate: '2026-05-15', status: 'expiring' },
  { id: 'hd12', empId: 'em14', type: 'SCFHS License',   docNo: 'SCFHS-RN-5588',   issueDate: '2024-09-01', expiryDate: '2027-09-01', status: 'active' },
  { id: 'hd13', empId: 'em15', type: 'Iqama',           docNo: 'IQ-2887766554',  issueDate: '2025-04-08', expiryDate: '2027-04-08', status: 'active' },
  { id: 'hd14', empId: 'em15', type: 'Engineering License', docNo: 'SCE-BIO-9988',issueDate: '2024-07-15', expiryDate: '2027-07-15', status: 'active' },
];

// ─────────────────────────────────────────────────────────────────
// HR — Performance Reviews
// ─────────────────────────────────────────────────────────────────
export const SEED_PERFORMANCE_REVIEWS = [
  { id: 'pr1', empId: 'em1',  period: '2025 Annual', rating: 5, status: 'completed', reviewer: 'u3',  date: '2026-01-15', strengths: 'Exceptional clinical skills; strong patient outcomes; mentors junior staff.', improvements: 'Documentation timeliness can improve.', goals: 'Lead 2 quality improvement projects in 2026.' },
  { id: 'pr2', empId: 'em2',  period: '2025 Annual', rating: 5, status: 'completed', reviewer: 'u1',  date: '2026-01-20', strengths: 'Strategic leadership; departmental KPIs all green.',                               improvements: 'Delegate more administrative tasks.',     goals: 'Launch teaching residency program.' },
  { id: 'pr3', empId: 'em3',  period: '2025 Annual', rating: 4, status: 'completed', reviewer: 'u14', date: '2026-02-05', strengths: 'Reliable; excellent patient communication; calm under pressure.',                  improvements: 'Update BLS certification.',                goals: 'Complete ICU specialization.' },
  { id: 'pr4', empId: 'em5',  period: '2025 Annual', rating: 4, status: 'completed', reviewer: 'u14', date: '2026-02-12', strengths: 'Strong inventory control; reduced expiry waste 20%.',                              improvements: 'More cross-training with junior pharmacists.', goals: 'Implement automated dispensing system.' },
  { id: 'pr5', empId: 'em7',  period: '2025 Annual', rating: 4, status: 'completed', reviewer: 'u1',  date: '2026-02-20', strengths: 'Closes books on time; clean audit findings.',                                       improvements: 'Faster ad-hoc reporting turnaround.',      goals: 'Deploy budget vs actuals dashboard.' },
  { id: 'pr6', empId: 'em4',  period: '2026 Mid-Year',rating: null, status: 'draft', reviewer: 'u14', date: today,        strengths: '',                                                                                  improvements: '',                                          goals: '' },
  { id: 'pr7', empId: 'em6',  period: '2026 Mid-Year',rating: null, status: 'draft', reviewer: 'u14', date: today,        strengths: '',                                                                                  improvements: '',                                          goals: '' },
];

// ─────────────────────────────────────────────────────────────────
// HR — Training & Certifications
// ─────────────────────────────────────────────────────────────────
export const SEED_TRAININGS = [
  { id: 'tr1', name: 'Basic Life Support (BLS)',       category: 'Mandatory', empId: 'em3',  assignedDate: '2026-04-01', dueDate: '2026-05-15', status: 'in_progress', score: null },
  { id: 'tr2', name: 'Advanced Cardiac Life Support',  category: 'Mandatory', empId: 'em1',  assignedDate: '2026-03-10', dueDate: '2026-05-10', status: 'completed',   score: 92 },
  { id: 'tr3', name: 'Infection Prevention & Control', category: 'Mandatory', empId: 'em3',  assignedDate: '2026-03-15', dueDate: '2026-04-30', status: 'completed',   score: 88 },
  { id: 'tr4', name: 'Infection Prevention & Control', category: 'Mandatory', empId: 'em14', assignedDate: '2026-04-01', dueDate: '2026-05-15', status: 'overdue',     score: null },
  { id: 'tr5', name: 'CCHI Compliance & Coding',       category: 'Specialty', empId: 'em9',  assignedDate: '2026-04-05', dueDate: '2026-05-30', status: 'in_progress', score: null },
  { id: 'tr6', name: 'GOSI & Saudi Labor Law Update',  category: 'HR',        empId: 'em13', assignedDate: '2026-03-20', dueDate: '2026-05-20', status: 'completed',   score: 95 },
  { id: 'tr7', name: 'SFDA Pharmacovigilance',         category: 'Specialty', empId: 'em5',  assignedDate: '2026-04-10', dueDate: '2026-06-10', status: 'in_progress', score: null },
  { id: 'tr8', name: 'Patient Safety & Risk Mgmt',     category: 'Mandatory', empId: 'em2',  assignedDate: '2026-04-12', dueDate: '2026-06-12', status: 'in_progress', score: null },
];

