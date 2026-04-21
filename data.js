/**
 * ============================================================
 *  DentalOS — data.js
 *  Capa de datos centralizada (simulación de backend)
 *  Versión: 1.0.0
 *
 *  ARQUITECTURA:
 *  Este archivo actúa como una API local. Cuando estés listo
 *  para conectar un backend real, reemplaza cada función por
 *  un fetch() a tu endpoint REST correspondiente.
 *
 *  Ejemplo de migración futura:
 *    LOCAL:  getPatientById(id)  →  return DB.patients.find(...)
 *    API:    getPatientById(id)  →  return fetch(`/api/v1/patients/${id}`)
 * ============================================================
 */

'use strict';

// ============================================================
// 1. UTILIDADES INTERNAS
// ============================================================

/** Genera un UUID v4 simple para IDs de nuevos registros */
function _uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

/** Clona profundo un objeto para evitar mutaciones accidentales */
function _clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/** Formatea fecha Date → 'YYYY-MM-DD' */
function _toDateStr(date) {
  return date.toISOString().split('T')[0];
}

/** Log de operaciones (reemplazar con logger real en producción) */
function _log(action, payload) {
  console.log(`[DentalOS DB] ${action}`, payload);
}


// ============================================================
// 2. BASE DE DATOS EN MEMORIA
// ============================================================

const DB = {

  // ----------------------------------------------------------
  // CLÍNICA (multitenancy ready)
  // ----------------------------------------------------------
  clinica: {
    id:        'clinica-001',
    nombre:    'Clínica Dental Rodríguez',
    ruc:       '20601234567',
    telefono:  '056-223344',
    direccion: 'Av. Cutervo 450, Ica, Perú',
    plan:      'profesional',   // 'basico' | 'profesional'
    activo:    true,
    createdAt: '2024-01-10',
  },

  // ----------------------------------------------------------
  // USUARIOS
  // ----------------------------------------------------------
  usuarios: [
    {
      id:           'usr-001',
      clinicaId:    'clinica-001',
      nombre:       'Carlos Rodríguez',
      email:        'doctor@dentalos.pe',
      passwordHash: '[hash-bcrypt]',       // nunca texto plano
      rol:          'admin',               // 'admin' | 'doctor' | 'recepcionista'
      activo:       true,
      createdAt:    '2024-01-10',
      updatedAt:    '2024-01-10',
    },
    {
      id:           'usr-002',
      clinicaId:    'clinica-001',
      nombre:       'Laura Sánchez',
      email:        'doctora@dentalos.pe',
      passwordHash: '[hash-bcrypt]',
      rol:          'doctor',
      activo:       true,
      createdAt:    '2024-02-01',
      updatedAt:    '2024-02-01',
    },
    {
      id:           'usr-003',
      clinicaId:    'clinica-001',
      nombre:       'Rosa Mendoza',
      email:        'recepcion@dentalos.pe',
      passwordHash: '[hash-bcrypt]',
      rol:          'recepcionista',
      activo:       true,
      createdAt:    '2024-02-15',
      updatedAt:    '2024-02-15',
    },
  ],

  // ----------------------------------------------------------
  // PACIENTES
  // ----------------------------------------------------------
  pacientes: [
    {
      id:              'pac-001',
      clinicaId:       'clinica-001',
      nombre:          'Ana',
      apellido:        'García Torres',
      dni:             '72341856',
      fechaNacimiento: '1990-06-15',
      sexo:            'femenino',
      telefono:        '987654321',
      email:           'ana.garcia@gmail.com',
      direccion:       'Jr. Los Rosales 245, Ica',
      alergias:        'Ninguna conocida',
      observaciones:   '',
      activo:          true,
      createdAt:       '2024-01-15',
      updatedAt:       '2026-04-15',
    },
    {
      id:              'pac-002',
      clinicaId:       'clinica-001',
      nombre:          'Carlos',
      apellido:        'Mendoza Paredes',
      dni:             '48923715',
      fechaNacimiento: '1985-03-22',
      sexo:            'masculino',
      telefono:        '956321874',
      email:           'carlos.m@hotmail.com',
      direccion:       'Av. Los Álamos 890, Ica',
      alergias:        'Ibuprofeno',
      observaciones:   'Paciente con historial de ansiedad dental.',
      activo:          true,
      createdAt:       '2024-02-10',
      updatedAt:       '2026-04-14',
    },
    {
      id:              'pac-003',
      clinicaId:       'clinica-001',
      nombre:          'Lucía',
      apellido:        'Ríos Vargas',
      dni:             '61027384',
      fechaNacimiento: '1992-03-12',
      sexo:            'femenino',
      telefono:        '945112678',
      email:           'lucia.rios@gmail.com',
      direccion:       'Av. Los Álamos 342, Urb. Santa Rosa, Ica',
      alergias:        'Penicilina, Ibuprofeno',
      observaciones:   'Hipertensión controlada. Precaución con vasoconstrictores.',
      activo:          true,
      createdAt:       '2024-01-20',
      updatedAt:       '2026-04-14',
    },
    {
      id:              'pac-004',
      clinicaId:       'clinica-001',
      nombre:          'Miguel',
      apellido:        'Quispe Apaza',
      dni:             '55839201',
      fechaNacimiento: '1998-11-05',
      sexo:            'masculino',
      telefono:        '998773442',
      email:           'mquispe@outlook.com',
      direccion:       'Calle Moquegua 120, Ica',
      alergias:        'Ninguna conocida',
      observaciones:   '',
      activo:          true,
      createdAt:       '2024-03-05',
      updatedAt:       '2026-04-10',
    },
    {
      id:              'pac-005',
      clinicaId:       'clinica-001',
      nombre:          'Sofía',
      apellido:        'Palma Castillo',
      dni:             '79234516',
      fechaNacimiento: '1995-07-28',
      sexo:            'femenino',
      telefono:        '912445009',
      email:           'sofia.palma@gmail.com',
      direccion:       'Jr. Lima 567, Ica',
      alergias:        'Ninguna conocida',
      observaciones:   'Preferir citas en la mañana.',
      activo:          true,
      createdAt:       '2024-04-01',
      updatedAt:       '2026-04-08',
    },
    {
      id:              'pac-006',
      clinicaId:       'clinica-001',
      nombre:          'Roberto',
      apellido:        'Flores Mamani',
      dni:             '34561029',
      fechaNacimiento: '1978-12-01',
      sexo:            'masculino',
      telefono:        '976330215',
      email:           'r.flores@gmail.com',
      direccion:       'Av. San Martín 234, Ica',
      alergias:        'Aspirina',
      observaciones:   'Diabetes tipo 2 controlada. Cicatrización más lenta.',
      activo:          true,
      createdAt:       '2024-02-20',
      updatedAt:       '2026-04-05',
    },
    {
      id:              'pac-007',
      clinicaId:       'clinica-001',
      nombre:          'Valeria',
      apellido:        'Torres Cano',
      dni:             '82017435',
      fechaNacimiento: '2001-04-14',
      sexo:            'femenino',
      telefono:        '964887553',
      email:           'vtorres@yahoo.com',
      direccion:       'Jr. Callao 89, Ica',
      alergias:        'Ninguna conocida',
      observaciones:   '',
      activo:          true,
      createdAt:       '2024-05-10',
      updatedAt:       '2026-03-28',
    },
    {
      id:              'pac-008',
      clinicaId:       'clinica-001',
      nombre:          'José',
      apellido:        'Huanca Ramos',
      dni:             '67412938',
      fechaNacimiento: '1988-09-30',
      sexo:            'masculino',
      telefono:        '931220774',
      email:           'jose.h@gmail.com',
      direccion:       'Av. Ayacucho 445, Ica',
      alergias:        'Ninguna conocida',
      observaciones:   'Endodoncia en curso, sesión 2 de 3.',
      activo:          true,
      createdAt:       '2024-06-01',
      updatedAt:       '2026-03-22',
    },
    {
      id:              'pac-016',
      clinicaId:       'clinica-001',
      nombre:          'Gustavo',
      apellido:        'Ramos Díaz',
      dni:             '36490218',
      fechaNacimiento: '1975-02-14',
      sexo:            'masculino',
      telefono:        '918882467',
      email:           'gramos@gmail.com',
      direccion:       'Jr. Independencia 33, Ica',
      alergias:        'Ninguna conocida',
      observaciones:   'Inactivo por cambio de residencia.',
      activo:          false,
      createdAt:       '2023-08-01',
      updatedAt:       '2025-11-30',
    },
  ],

  // ----------------------------------------------------------
  // CITAS
  // ----------------------------------------------------------
  citas: [
    // ── HOY: Sábado 19 abr 2026 ──
    {
      id:          'cit-001',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-001',
      doctorId:    'usr-001',
      fecha:       '2026-04-19',
      horaInicio:  '09:00',
      horaFin:     '09:30',
      motivo:      'Control mensual',
      estado:      'confirmada',   // 'programada'|'confirmada'|'en_sala'|'atendida'|'cancelada'|'no_asistio'
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-16',
      updatedAt:   '2026-04-19',
    },
    {
      id:          'cit-002',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-003',
      doctorId:    'usr-001',
      fecha:       '2026-04-19',
      horaInicio:  '10:00',
      horaFin:     '11:00',
      motivo:      'Revisión de brackets',
      estado:      'en_sala',
      notasRecepcion: 'Paciente ya en sala 1.',
      createdBy:   'usr-003',
      createdAt:   '2026-04-15',
      updatedAt:   '2026-04-19',
    },
    {
      id:          'cit-003',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-004',
      doctorId:    'usr-001',
      fecha:       '2026-04-19',
      horaInicio:  '11:30',
      horaFin:     '12:00',
      motivo:      'Primera consulta',
      estado:      'programada',
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-17',
      updatedAt:   '2026-04-17',
    },
    {
      id:          'cit-004',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-005',
      doctorId:    'usr-001',
      fecha:       '2026-04-19',
      horaInicio:  '14:00',
      horaFin:     '14:30',
      motivo:      'Blanqueamiento dental',
      estado:      'programada',
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-18',
      updatedAt:   '2026-04-18',
    },
    {
      id:          'cit-005',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-006',
      doctorId:    'usr-001',
      fecha:       '2026-04-19',
      horaInicio:  '15:00',
      horaFin:     '16:00',
      motivo:      'Control post-operatorio',
      estado:      'cancelada',
      notasRecepcion: 'Paciente canceló por enfermedad.',
      createdBy:   'usr-003',
      createdAt:   '2026-04-14',
      updatedAt:   '2026-04-19',
    },
    // ── Esta semana ──
    {
      id:          'cit-006',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-002',
      doctorId:    'usr-001',
      fecha:       '2026-04-14',
      horaInicio:  '10:00',
      horaFin:     '11:00',
      motivo:      'Extracción molar',
      estado:      'atendida',
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-10',
      updatedAt:   '2026-04-14',
    },
    {
      id:          'cit-007',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-003',
      doctorId:    'usr-001',
      fecha:       '2026-04-14',
      horaInicio:  '11:30',
      horaFin:     '12:00',
      motivo:      'Ajuste de brackets',
      estado:      'atendida',
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-10',
      updatedAt:   '2026-04-14',
    },
    {
      id:          'cit-008',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-008',
      doctorId:    'usr-001',
      fecha:       '2026-04-16',
      horaInicio:  '16:00',
      horaFin:     '17:00',
      motivo:      'Endodoncia sesión 2',
      estado:      'atendida',
      notasRecepcion: 'Rx panorámica lista.',
      createdBy:   'usr-003',
      createdAt:   '2026-04-12',
      updatedAt:   '2026-04-16',
    },
    // ── Próxima semana ──
    {
      id:          'cit-009',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-001',
      doctorId:    'usr-001',
      fecha:       '2026-04-22',
      horaInicio:  '09:00',
      horaFin:     '09:30',
      motivo:      'Revisión preventiva',
      estado:      'programada',
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-19',
      updatedAt:   '2026-04-19',
    },
    {
      id:          'cit-010',
      clinicaId:   'clinica-001',
      pacienteId:  'pac-007',
      doctorId:    'usr-002',
      fecha:       '2026-04-23',
      horaInicio:  '10:30',
      horaFin:     '11:00',
      motivo:      'Control ortodoncia',
      estado:      'programada',
      notasRecepcion: '',
      createdBy:   'usr-003',
      createdAt:   '2026-04-19',
      updatedAt:   '2026-04-19',
    },
  ],

  // ----------------------------------------------------------
  // HISTORIAS CLÍNICAS
  // ----------------------------------------------------------
  historias: [
    {
      id:                  'hc-001',
      clinicaId:           'clinica-001',
      pacienteId:          'pac-003',
      citaId:              'cit-007',
      doctorId:            'usr-001',
      fechaAtencion:       '2026-04-14',
      motivoConsulta:      'Ajuste mensual de brackets',
      diagnostico:         'Progreso ortodóntico adecuado, leve apiñamiento inferior',
      tratamiento:         'Ajuste de arco superior e inferior, cambio de ligaduras',
      medicamentos:        '',
      proximaCitaSugerida: '2026-05-14',
      observaciones:       'Recomendar uso de hilo dental con enhebrador.',
      createdAt:           '2026-04-14',
      updatedAt:           '2026-04-14',
    },
    {
      id:                  'hc-002',
      clinicaId:           'clinica-001',
      pacienteId:          'pac-002',
      citaId:              'cit-006',
      doctorId:            'usr-001',
      fechaAtencion:       '2026-04-14',
      motivoConsulta:      'Dolor agudo en molar inferior derecho',
      diagnostico:         'Caries profunda con afectación pulpar en pieza 46',
      tratamiento:         'Extracción del molar 46 bajo anestesia local',
      medicamentos:        'Amoxicilina 500mg cada 8h por 5 días, Paracetamol 500mg PRN',
      proximaCitaSugerida: '2026-04-21',
      observaciones:       'Revisión post-extracción en 7 días.',
      createdAt:           '2026-04-14',
      updatedAt:           '2026-04-14',
    },
    {
      id:                  'hc-003',
      clinicaId:           'clinica-001',
      pacienteId:          'pac-001',
      citaId:              null,
      doctorId:            'usr-001',
      fechaAtencion:       '2026-03-10',
      motivoConsulta:      'Limpieza de rutina semestral',
      diagnostico:         'Acumulación de sarro leve en sector anterior inferior',
      tratamiento:         'Profilaxis dental, detartraje ultrasónico y pulido',
      medicamentos:        '',
      proximaCitaSugerida: '2026-09-10',
      observaciones:       'Recomendar cepillado 3 veces al día con técnica de Bass.',
      createdAt:           '2026-03-10',
      updatedAt:           '2026-03-10',
    },
  ],

  // ----------------------------------------------------------
  // PAGOS
  // ----------------------------------------------------------
  pagos: [
    {
      id:            'pag-001',
      clinicaId:     'clinica-001',
      pacienteId:    'pac-003',
      citaId:        'cit-007',
      concepto:      'Control ortodoncia abril',
      monto:         80.00,
      metodoPago:    'yape',     // 'efectivo'|'tarjeta'|'transferencia'|'yape'|'plin'
      estado:        'pagado',   // 'pendiente'|'pagado'|'anulado'
      fechaPago:     '2026-04-14',
      registradoPor: 'usr-003',
      notas:         '',
      createdAt:     '2026-04-14',
      updatedAt:     '2026-04-14',
    },
    {
      id:            'pag-002',
      clinicaId:     'clinica-001',
      pacienteId:    'pac-002',
      citaId:        'cit-006',
      concepto:      'Extracción molar + medicación',
      monto:         250.00,
      metodoPago:    'tarjeta',
      estado:        'pagado',
      fechaPago:     '2026-04-14',
      registradoPor: 'usr-003',
      notas:         '',
      createdAt:     '2026-04-14',
      updatedAt:     '2026-04-14',
    },
    {
      id:            'pag-003',
      clinicaId:     'clinica-001',
      pacienteId:    'pac-008',
      citaId:        'cit-008',
      concepto:      'Endodoncia sesión 2/3',
      monto:         350.00,
      metodoPago:    'efectivo',
      estado:        'pagado',
      fechaPago:     '2026-04-16',
      registradoPor: 'usr-003',
      notas:         '',
      createdAt:     '2026-04-16',
      updatedAt:     '2026-04-16',
    },
    {
      id:            'pag-004',
      clinicaId:     'clinica-001',
      pacienteId:    'pac-001',
      citaId:        'cit-001',
      concepto:      'Control mensual',
      monto:         60.00,
      metodoPago:    'pendiente',
      estado:        'pendiente',
      fechaPago:     null,
      registradoPor: 'usr-003',
      notas:         'Paciente pagará al término de la cita.',
      createdAt:     '2026-04-19',
      updatedAt:     '2026-04-19',
    },
    {
      id:            'pag-005',
      clinicaId:     'clinica-001',
      pacienteId:    'pac-003',
      citaId:        'cit-002',
      concepto:      'Revisión de brackets',
      monto:         80.00,
      metodoPago:    'pendiente',
      estado:        'pendiente',
      fechaPago:     null,
      registradoPor: 'usr-003',
      notas:         '',
      createdAt:     '2026-04-19',
      updatedAt:     '2026-04-19',
    },
    {
      id:            'pag-006',
      clinicaId:     'clinica-001',
      pacienteId:    'pac-004',
      citaId:        'cit-003',
      concepto:      'Primera consulta',
      monto:         40.00,
      metodoPago:    'pendiente',
      estado:        'pendiente',
      fechaPago:     null,
      registradoPor: 'usr-003',
      notas:         '',
      createdAt:     '2026-04-19',
      updatedAt:     '2026-04-19',
    },
  ],
};


// ============================================================
// 3. HELPERS PRIVADOS
// ============================================================

function _now() { return new Date().toISOString(); }

function _validateRequired(data, fields) {
  const missing = fields.filter(f => !data[f] && data[f] !== 0);
  if (missing.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missing.join(', ')}`);
  }
}

function _buildResponse(ok, data, error = null) {
  return { ok, data: ok ? data : null, error, timestamp: _now() };
}


// ============================================================
// 4. API — PACIENTES
// ============================================================

/**
 * Retorna todos los pacientes de la clínica.
 * @param {object} [filters] - { activo: boolean, search: string }
 * @returns {object} { ok, data: Paciente[], error }
 *
 * → API real: GET /api/v1/patients?activo=true&search=ana
 */
function getPatients(filters = {}) {
  try {
    let result = _clone(DB.pacientes);

    if (filters.activo !== undefined) {
      result = result.filter(p => p.activo === filters.activo);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        `${p.nombre} ${p.apellido}`.toLowerCase().includes(q) ||
        p.dni.includes(q) ||
        (p.email || '').toLowerCase().includes(q)
      );
    }

    // Enriquecer: añadir nombre completo y edad calculada
    result = result.map(_enrichPatient);

    return _buildResponse(true, result);
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Retorna un paciente por su ID.
 * @param {string} id
 * @returns {object} { ok, data: Paciente, error }
 *
 * → API real: GET /api/v1/patients/:id
 */
function getPatientById(id) {
  try {
    const patient = DB.pacientes.find(p => p.id === id);
    if (!patient) throw new Error(`Paciente con id '${id}' no encontrado.`);
    return _buildResponse(true, _enrichPatient(_clone(patient)));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Crea un nuevo paciente.
 * @param {object} data - Campos del paciente
 * @returns {object} { ok, data: Paciente, error }
 *
 * → API real: POST /api/v1/patients
 */
function createPatient(data) {
  try {
    _validateRequired(data, ['nombre', 'apellido', 'dni', 'telefono']);

    const exists = DB.pacientes.find(p => p.dni === data.dni);
    if (exists) throw new Error(`Ya existe un paciente con DNI ${data.dni}.`);

    const newPatient = {
      id:              _uuid(),
      clinicaId:       'clinica-001',
      nombre:          data.nombre.trim(),
      apellido:        data.apellido.trim(),
      dni:             data.dni.trim(),
      fechaNacimiento: data.fechaNacimiento || null,
      sexo:            data.sexo || null,
      telefono:        data.telefono.trim(),
      email:           (data.email || '').trim(),
      direccion:       (data.direccion || '').trim(),
      alergias:        (data.alergias || '').trim(),
      observaciones:   (data.observaciones || '').trim(),
      activo:          true,
      createdAt:       _now(),
      updatedAt:       _now(),
    };

    DB.pacientes.push(newPatient);
    _log('createPatient', { id: newPatient.id, nombre: newPatient.nombre });
    return _buildResponse(true, _enrichPatient(_clone(newPatient)));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Actualiza campos de un paciente existente.
 * @param {string} id
 * @param {object} data - Solo los campos a actualizar
 * @returns {object} { ok, data: Paciente, error }
 *
 * → API real: PATCH /api/v1/patients/:id
 */
function updatePatient(id, data) {
  try {
    const idx = DB.pacientes.findIndex(p => p.id === id);
    if (idx === -1) throw new Error(`Paciente '${id}' no encontrado.`);

    // No permitir cambiar campos de sistema
    const forbidden = ['id', 'clinicaId', 'createdAt'];
    forbidden.forEach(f => delete data[f]);

    DB.pacientes[idx] = { ...DB.pacientes[idx], ...data, updatedAt: _now() };
    _log('updatePatient', { id });
    return _buildResponse(true, _enrichPatient(_clone(DB.pacientes[idx])));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Desactiva un paciente (eliminación lógica).
 * @param {string} id
 * @returns {object} { ok, data: { id, activo }, error }
 *
 * → API real: PATCH /api/v1/patients/:id/deactivate
 */
function deactivatePatient(id) {
  return updatePatient(id, { activo: false });
}

/** Enriquece un paciente con campos calculados */
function _enrichPatient(p) {
  p.nombreCompleto = `${p.nombre} ${p.apellido}`;
  if (p.fechaNacimiento) {
    const hoy  = new Date();
    const nac  = new Date(p.fechaNacimiento);
    let edad   = hoy.getFullYear() - nac.getFullYear();
    const m    = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    p.edad = edad;
  }
  return p;
}


// ============================================================
// 5. API — CITAS
// ============================================================

/**
 * Retorna citas filtradas.
 * @param {object} [filters] - { pacienteId, doctorId, fecha, estado, desde, hasta }
 * @returns {object} { ok, data: Cita[], error }
 *
 * → API real: GET /api/v1/appointments?pacienteId=x&fecha=2026-04-19
 */
function getAppointments(filters = {}) {
  try {
    let result = _clone(DB.citas);

    if (filters.pacienteId) result = result.filter(c => c.pacienteId === filters.pacienteId);
    if (filters.doctorId)   result = result.filter(c => c.doctorId   === filters.doctorId);
    if (filters.fecha)      result = result.filter(c => c.fecha       === filters.fecha);
    if (filters.estado)     result = result.filter(c => c.estado      === filters.estado);
    if (filters.desde)      result = result.filter(c => c.fecha >= filters.desde);
    if (filters.hasta)      result = result.filter(c => c.fecha <= filters.hasta);

    result = result
      .sort((a, b) => a.fecha.localeCompare(b.fecha) || a.horaInicio.localeCompare(b.horaInicio))
      .map(_enrichAppointment);

    return _buildResponse(true, result);
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Retorna todas las citas de un paciente específico.
 * @param {string} pacienteId
 * @returns {object} { ok, data: Cita[], error }
 *
 * → API real: GET /api/v1/appointments?pacienteId=:id
 */
function getAppointmentsByPatient(pacienteId) {
  return getAppointments({ pacienteId });
}

/**
 * Retorna todas las citas de un día específico.
 * @param {string} fecha - Formato 'YYYY-MM-DD'
 * @returns {object} { ok, data: Cita[], error }
 *
 * → API real: GET /api/v1/appointments?fecha=2026-04-19
 */
function getAppointmentsByDay(fecha) {
  return getAppointments({ fecha });
}

/**
 * Retorna citas en un rango de fechas.
 * @param {string} desde - 'YYYY-MM-DD'
 * @param {string} hasta - 'YYYY-MM-DD'
 * @returns {object} { ok, data: Cita[], error }
 *
 * → API real: GET /api/v1/appointments?desde=x&hasta=y
 */
function getAppointmentsByRange(desde, hasta) {
  return getAppointments({ desde, hasta });
}

/**
 * Retorna una cita por ID.
 * @param {string} id
 * @returns {object} { ok, data: Cita, error }
 *
 * → API real: GET /api/v1/appointments/:id
 */
function getAppointmentById(id) {
  try {
    const cita = DB.citas.find(c => c.id === id);
    if (!cita) throw new Error(`Cita '${id}' no encontrada.`);
    return _buildResponse(true, _enrichAppointment(_clone(cita)));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Crea una nueva cita con validación de solapamiento.
 * @param {object} data
 * @returns {object} { ok, data: Cita, error }
 *
 * → API real: POST /api/v1/appointments
 */
function createAppointment(data) {
  try {
    _validateRequired(data, ['pacienteId', 'doctorId', 'fecha', 'horaInicio', 'horaFin', 'motivo']);

    // Verificar que el paciente existe
    const paciente = DB.pacientes.find(p => p.id === data.pacienteId);
    if (!paciente) throw new Error(`Paciente '${data.pacienteId}' no existe.`);

    // Verificar solapamiento de horario para el doctor
    const overlap = DB.citas.find(c =>
      c.doctorId  === data.doctorId &&
      c.fecha     === data.fecha    &&
      c.estado   !== 'cancelada'   &&
      c.estado   !== 'no_asistio'  &&
      c.horaInicio < data.horaFin  &&
      c.horaFin   > data.horaInicio
    );
    if (overlap) {
      throw new Error(
        `El doctor ya tiene una cita de ${overlap.horaInicio} a ${overlap.horaFin} ese día.`
      );
    }

    const newCita = {
      id:             _uuid(),
      clinicaId:      'clinica-001',
      pacienteId:     data.pacienteId,
      doctorId:       data.doctorId,
      fecha:          data.fecha,
      horaInicio:     data.horaInicio,
      horaFin:        data.horaFin,
      motivo:         data.motivo.trim(),
      estado:         'programada',
      notasRecepcion: (data.notasRecepcion || '').trim(),
      createdBy:      data.createdBy || 'usr-001',
      createdAt:      _now(),
      updatedAt:      _now(),
    };

    DB.citas.push(newCita);
    _log('createAppointment', { id: newCita.id, fecha: newCita.fecha, hora: newCita.horaInicio });
    return _buildResponse(true, _enrichAppointment(_clone(newCita)));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Actualiza campos de una cita existente.
 * @param {string} id
 * @param {object} data
 * @returns {object} { ok, data: Cita, error }
 *
 * → API real: PATCH /api/v1/appointments/:id
 */
function updateAppointment(id, data) {
  try {
    const idx = DB.citas.findIndex(c => c.id === id);
    if (idx === -1) throw new Error(`Cita '${id}' no encontrada.`);

    const forbidden = ['id', 'clinicaId', 'createdAt', 'createdBy'];
    forbidden.forEach(f => delete data[f]);

    DB.citas[idx] = { ...DB.citas[idx], ...data, updatedAt: _now() };
    _log('updateAppointment', { id, estado: DB.citas[idx].estado });
    return _buildResponse(true, _enrichAppointment(_clone(DB.citas[idx])));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Cambia el estado de una cita (atajo conveniente).
 * @param {string} id
 * @param {string} estado - 'programada'|'confirmada'|'en_sala'|'atendida'|'cancelada'|'no_asistio'
 * @returns {object} { ok, data: Cita, error }
 */
function changeAppointmentStatus(id, estado) {
  const VALID = ['programada','confirmada','en_sala','atendida','cancelada','no_asistio'];
  if (!VALID.includes(estado)) {
    return _buildResponse(false, null, `Estado '${estado}' no es válido.`);
  }
  return updateAppointment(id, { estado });
}

/** Enriquece una cita con datos del paciente y doctor */
function _enrichAppointment(c) {
  const pac = DB.pacientes.find(p => p.id === c.pacienteId);
  const doc = DB.usuarios.find(u => u.id === c.doctorId);
  c.pacienteNombre = pac ? `${pac.nombre} ${pac.apellido}` : 'Desconocido';
  c.doctorNombre   = doc ? doc.nombre : 'Desconocido';
  c.duracionMin    = _timeDiffMinutes(c.horaInicio, c.horaFin);
  return c;
}

function _timeDiffMinutes(inicio, fin) {
  const [hI, mI] = inicio.split(':').map(Number);
  const [hF, mF] = fin.split(':').map(Number);
  return (hF * 60 + mF) - (hI * 60 + mI);
}


// ============================================================
// 6. API — HISTORIA CLÍNICA
// ============================================================

/**
 * Retorna registros clínicos de un paciente.
 * @param {string} pacienteId
 * @returns {object} { ok, data: Historia[], error }
 *
 * → API real: GET /api/v1/clinical-records?pacienteId=x
 */
function getClinicalRecordsByPatient(pacienteId) {
  try {
    const records = _clone(DB.historias)
      .filter(h => h.pacienteId === pacienteId)
      .sort((a, b) => b.fechaAtencion.localeCompare(a.fechaAtencion))
      .map(h => {
        const doc = DB.usuarios.find(u => u.id === h.doctorId);
        h.doctorNombre = doc ? doc.nombre : 'Desconocido';
        return h;
      });

    return _buildResponse(true, records);
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Crea un registro clínico.
 * @param {object} data
 * @returns {object} { ok, data: Historia, error }
 *
 * → API real: POST /api/v1/clinical-records
 */
function createClinicalRecord(data) {
  try {
    _validateRequired(data, ['pacienteId', 'doctorId', 'fechaAtencion', 'motivoConsulta', 'diagnostico', 'tratamiento']);

    const newRecord = {
      id:                  _uuid(),
      clinicaId:           'clinica-001',
      pacienteId:          data.pacienteId,
      citaId:              data.citaId || null,
      doctorId:            data.doctorId,
      fechaAtencion:       data.fechaAtencion,
      motivoConsulta:      data.motivoConsulta.trim(),
      diagnostico:         data.diagnostico.trim(),
      tratamiento:         data.tratamiento.trim(),
      medicamentos:        (data.medicamentos || '').trim(),
      proximaCitaSugerida: data.proximaCitaSugerida || null,
      observaciones:       (data.observaciones || '').trim(),
      createdAt:           _now(),
      updatedAt:           _now(),
    };

    DB.historias.push(newRecord);
    _log('createClinicalRecord', { id: newRecord.id, pacienteId: newRecord.pacienteId });
    return _buildResponse(true, _clone(newRecord));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}


// ============================================================
// 7. API — PAGOS
// ============================================================

/**
 * Retorna pagos filtrados.
 * @param {object} [filters] - { pacienteId, estado, desde, hasta }
 * @returns {object} { ok, data: Pago[], error }
 *
 * → API real: GET /api/v1/payments
 */
function getPayments(filters = {}) {
  try {
    let result = _clone(DB.pagos);

    if (filters.pacienteId) result = result.filter(p => p.pacienteId === filters.pacienteId);
    if (filters.estado)     result = result.filter(p => p.estado === filters.estado);
    if (filters.desde)      result = result.filter(p => (p.fechaPago || '') >= filters.desde);
    if (filters.hasta)      result = result.filter(p => (p.fechaPago || '') <= filters.hasta);

    result = result
      .sort((a, b) => (b.fechaPago || b.createdAt).localeCompare(a.fechaPago || a.createdAt))
      .map(p => {
        const pac = DB.pacientes.find(x => x.id === p.pacienteId);
        p.pacienteNombre = pac ? `${pac.nombre} ${pac.apellido}` : 'Desconocido';
        return p;
      });

    return _buildResponse(true, result);
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Retorna pagos de un paciente.
 * @param {string} pacienteId
 * @returns {object} { ok, data: Pago[], error }
 */
function getPaymentsByPatient(pacienteId) {
  return getPayments({ pacienteId });
}

/**
 * Crea un nuevo pago.
 * @param {object} data
 * @returns {object} { ok, data: Pago, error }
 *
 * → API real: POST /api/v1/payments
 */
function createPayment(data) {
  try {
    _validateRequired(data, ['pacienteId', 'concepto', 'monto', 'metodoPago']);

    const METODOS = ['efectivo','tarjeta','transferencia','yape','plin','pendiente'];
    if (!METODOS.includes(data.metodoPago)) {
      throw new Error(`Método de pago '${data.metodoPago}' no válido.`);
    }

    const newPago = {
      id:            _uuid(),
      clinicaId:     'clinica-001',
      pacienteId:    data.pacienteId,
      citaId:        data.citaId || null,
      concepto:      data.concepto.trim(),
      monto:         parseFloat(data.monto),
      metodoPago:    data.metodoPago,
      estado:        data.metodoPago === 'pendiente' ? 'pendiente' : 'pagado',
      fechaPago:     data.metodoPago !== 'pendiente' ? (data.fechaPago || _toDateStr(new Date())) : null,
      registradoPor: data.registradoPor || 'usr-001',
      notas:         (data.notas || '').trim(),
      createdAt:     _now(),
      updatedAt:     _now(),
    };

    DB.pagos.push(newPago);
    _log('createPayment', { id: newPago.id, monto: newPago.monto, estado: newPago.estado });
    return _buildResponse(true, _clone(newPago));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Marca un pago pendiente como pagado.
 * @param {string} id
 * @param {string} metodoPago
 * @returns {object} { ok, data: Pago, error }
 *
 * → API real: PATCH /api/v1/payments/:id/pay
 */
function markPaymentAsPaid(id, metodoPago) {
  try {
    const idx = DB.pagos.findIndex(p => p.id === id);
    if (idx === -1) throw new Error(`Pago '${id}' no encontrado.`);
    if (DB.pagos[idx].estado === 'pagado') throw new Error('Este pago ya fue registrado como pagado.');

    DB.pagos[idx] = {
      ...DB.pagos[idx],
      estado:     'pagado',
      metodoPago: metodoPago || DB.pagos[idx].metodoPago,
      fechaPago:  _toDateStr(new Date()),
      updatedAt:  _now(),
    };

    _log('markPaymentAsPaid', { id });
    return _buildResponse(true, _clone(DB.pagos[idx]));
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}


// ============================================================
// 8. API — REPORTES / DASHBOARD
// ============================================================

/**
 * Resumen del día para el dashboard.
 * @param {string} fecha - 'YYYY-MM-DD'
 * @returns {object} { ok, data: DashboardSummary, error }
 *
 * → API real: GET /api/v1/dashboard/summary?fecha=x
 */
function getDashboardSummary(fecha) {
  try {
    const citasHoy   = DB.citas.filter(c => c.fecha === fecha);
    const pagosHoy   = DB.pagos.filter(p => p.fechaPago === fecha);
    const pendientes = DB.pagos.filter(p => p.estado === 'pendiente');

    const hoy  = new Date();
    const mesI = `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}-01`;
    const mesF = fecha;
    const pagosMes = DB.pagos.filter(p => p.fechaPago >= mesI && p.fechaPago <= mesF && p.estado === 'pagado');

    const summary = {
      fecha,
      citasHoy: {
        total:      citasHoy.length,
        atendidas:  citasHoy.filter(c => c.estado === 'atendida').length,
        enSala:     citasHoy.filter(c => c.estado === 'en_sala').length,
        pendientes: citasHoy.filter(c => ['programada','confirmada'].includes(c.estado)).length,
        canceladas: citasHoy.filter(c => c.estado === 'cancelada').length,
      },
      pagos: {
        cobradasHoy:     pagosHoy.reduce((s, p) => s + p.monto, 0),
        totalPendiente:  pendientes.reduce((s, p) => s + p.monto, 0),
        cantidadPendiente: pendientes.length,
        totalMes:        pagosMes.reduce((s, p) => s + p.monto, 0),
      },
      pacientesNuevos: {
        estaSemanaNuevos: DB.pacientes.filter(p => {
          const d = new Date(p.createdAt);
          const hoy = new Date();
          const lunes = new Date(hoy);
          lunes.setDate(hoy.getDate() - hoy.getDay() + 1);
          return d >= lunes;
        }).length,
      },
      proximasCitas: _clone(DB.citas)
        .filter(c => c.fecha === fecha && ['programada','confirmada','en_sala'].includes(c.estado))
        .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
        .map(_enrichAppointment),
    };

    return _buildResponse(true, summary);
  } catch (e) {
    return _buildResponse(false, null, e.message);
  }
}

/**
 * Retorna datos del usuario actual (mock de sesión).
 * @returns {object} { ok, data: Usuario, error }
 *
 * → API real: GET /api/v1/auth/me
 */
function getCurrentUser() {
  const user = _clone(DB.usuarios.find(u => u.id === 'usr-001'));
  delete user.passwordHash;
  return _buildResponse(true, user);
}


// ============================================================
// 9. EXPORTAR API PÚBLICA
// ============================================================

const DentalOS = {
  // Pacientes
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deactivatePatient,

  // Citas
  getAppointments,
  getAppointmentById,
  getAppointmentsByPatient,
  getAppointmentsByDay,
  getAppointmentsByRange,
  createAppointment,
  updateAppointment,
  changeAppointmentStatus,

  // Historia clínica
  getClinicalRecordsByPatient,
  createClinicalRecord,

  // Pagos
  getPayments,
  getPaymentsByPatient,
  createPayment,
  markPaymentAsPaid,

  // Dashboard
  getDashboardSummary,
  getCurrentUser,

  // Acceso directo a DB (solo para debug — en producción no exponer)
  _db: DB,
};

// Exponer globalmente (compatible con browser y Node.js)
if (typeof window !== 'undefined') window.DentalOS = DentalOS;
// Node.js / CommonJS export (solo si existe module)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = DentalOS;
}
