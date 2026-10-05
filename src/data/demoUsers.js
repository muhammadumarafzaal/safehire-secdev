/**
 * SafeHire Demo Users & Institutional Data Store
 * Provides mock users and role permissions for Development Activity 2.
 */

export const DEMO_USERS = {
  student: {
    id: 'user-student-01',
    name: 'Muhammad Umar Afzaal',
    email: 'm.umar@nu.edu.pk',
    password: 'SafeHire#2026!Sec',
    role: 'Student Job Seeker',
    roleKey: 'student',
    rollNo: '23F-3106',
    university: 'FAST-NUCES, Lahore',
    degree: 'BS Computer Science',
    cgpa: '3.78',
    phone: '+92 300 1234567',
    maskedPhone: '+92 3•• ••• ••21',
    cnic: '35201-1234567-1',
    maskedCnic: '35201-•••••••-7',
    avatarInitials: 'UA',
    transcriptHash: '8f3ac829910debe7432b49b924523bfd8c02e1b93f18a29e4726e643bb2a013c',
    auditId: '0x8F22A',
    isVerified: true
  },
  officer: {
    id: 'user-officer-01',
    name: 'Dr. Tariq Mahmood',
    email: 'placement.officer@nu.edu.pk',
    password: 'Officer#2026!Safe',
    role: 'Placement Officer',
    roleKey: 'officer',
    officerId: 'PO-FAST-092',
    department: 'Directorate of Career Services & Transcript Verification',
    university: 'FAST-NUCES, Lahore',
    phone: '+92 42 111 128 128',
    maskedPhone: '+92 42 ••• ••• •28',
    avatarInitials: 'TM',
    signingKeyId: 'FAST-ED25519-2026',
    clearanceLevel: 'Level-3 Institutional Registrar'
  }
};

/**
 * Initial student verification queue for Placement Officer review
 */
export const INITIAL_VERIFICATION_QUEUE = [
  {
    id: 'REQ-3093',
    name: 'Musa Rehan',
    rollNo: '23F-3093',
    degree: 'BS Computer Science',
    cgpa: '3.82',
    submittedAt: '2026-10-04 14:15 PKT',
    status: 'pending', // 'pending' | 'verified'
    auditHash: null,
    academicNotes: 'Completed SSD & Cryptography electives. Official transcript uploaded from academic portal.'
  },
  {
    id: 'REQ-3112',
    name: 'Ayesha Khan',
    rollNo: '23F-3112',
    degree: 'BS Software Engineering',
    cgpa: '3.65',
    submittedAt: '2026-10-04 16:30 PKT',
    status: 'pending',
    auditHash: null,
    academicNotes: 'Dean honor list recipient. Transcripts verified with examination controller.'
  },
  {
    id: 'REQ-3045',
    name: 'Bilawal Siddiqui',
    rollNo: '23F-3045',
    degree: 'BS Data Science',
    cgpa: '3.71',
    submittedAt: '2026-10-05 09:20 PKT',
    status: 'pending',
    auditHash: null,
    academicNotes: 'Advanced Machine Learning and Database Systems completed.'
  },
  {
    id: 'REQ-3106',
    name: 'Muhammad Umar Afzaal',
    rollNo: '23F-3106',
    degree: 'BS Computer Science',
    cgpa: '3.78',
    submittedAt: '2026-09-30 16:40 PKT',
    status: 'verified',
    auditHash: '8f3ac829910debe7432b49b924523bfd8c02e1b93f18a29e4726e643bb2a013c',
    auditId: '0x8F22A',
    academicNotes: 'Institutional transcript cryptographically verified and anchored on immutable ledger.'
  }
];

/**
 * Corporate listings vetting state for Placement Officer
 */
export const INITIAL_COMPANY_VETTING = [
  {
    id: 'COMP-01',
    name: 'Systems Limited',
    domain: 'Enterprise Cloud & Cybersecurity',
    status: 'approved',
    internships: 2,
    slaCompliance: '100%',
    auditDigest: '0xSYS-77A1'
  },
  {
    id: 'COMP-02',
    name: 'Careem Engineering',
    domain: 'Super-App Infrastructure & AppSec',
    status: 'approved',
    internships: 1,
    slaCompliance: '98%',
    auditDigest: '0xCRM-9942'
  },
  {
    id: 'COMP-03',
    name: 'Afiniti Pakistan',
    domain: 'AI Behavioral Telemetry & Backend',
    status: 'approved',
    internships: 1,
    slaCompliance: '96%',
    auditDigest: '0xAFN-108C'
  },
  {
    id: 'COMP-04',
    name: 'Netsol Technologies',
    domain: 'FinTech & LLM Security Operations',
    status: 'approved',
    internships: 1,
    slaCompliance: '100%',
    auditDigest: '0xNET-55F3'
  },
  {
    id: 'COMP-05',
    name: 'Apex Data Labs (Unvetted)',
    domain: 'Third-party recruitment contractor',
    status: 'pending_review',
    internships: 1,
    slaCompliance: 'Under Review',
    auditDigest: '0xAPX-UNVET'
  }
];
