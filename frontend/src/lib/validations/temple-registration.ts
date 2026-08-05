import * as Yup from 'yup';

export const templeRegistrationValidationSchema = Yup.object().shape({
  templeName: Yup.string()
    .required('Temple name is required')
    .min(3, 'Temple name must be at least 3 characters')
    .max(100, 'Temple name must not exceed 100 characters'),

  deityName: Yup.string()
    .required('Deity / Presiding God is required')
    .min(2, 'Deity name must be at least 2 characters')
    .max(100, 'Deity name must not exceed 100 characters'),

  yearOfEstablishment: Yup.string()
    .required('Year of establishment is required')
    .matches(/^\d{4}$/, 'Please enter a valid year (YYYY)')
    .test('year', 'Year cannot be in the future', function(value) {
      if (!value) return false;
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return year <= currentYear;
    }),

  templeType: Yup.string()
    .required('Temple type is required'),

  templeTrust: Yup.string()
    .required('Temple trust / organization name is required')
    .min(2, 'Must be at least 2 characters')
    .max(100, 'Must not exceed 100 characters'),

  registrationNumber: Yup.string()
    .max(50, 'Registration number must not exceed 50 characters')
    .optional(),

  templePhoto: Yup.mixed()
    .required('Temple photo is required')
    .test('fileSize', 'File size must be less than 5MB', (value: any) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only image files are allowed (JPG, PNG)', (value: any) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),

  fullAddress: Yup.string()
    .required('Full address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters'),

  city: Yup.string()
    .required('City/Town is required')
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name must not exceed 50 characters'),

  state: Yup.string()
    .required('State is required'),

  pinCode: Yup.string()
    .required('PIN code is required')
    .matches(/^\d{6}$/, 'PIN code must be 6 digits'),

  googleMapsLink: Yup.string()
    .url('Please enter a valid URL')
    .optional(),

  contactPersonName: Yup.string()
    .required('Contact person name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),

  contactPhone: Yup.string()
    .required('Contact phone is required')
    .matches(/^[\d\s\-\+\(\)]{10,}$/, 'Please enter a valid phone number'),

  contactEmail: Yup.string()
    .required('Contact email is required')
    .email('Please enter a valid email address'),

  dailyOpeningTime: Yup.string()
    .required('Daily opening time is required'),

  dailyClosingTime: Yup.string()
    .required('Daily closing time is required'),

  specialAartiTimings: Yup.string()
    .required('Special Aarti timings are required')
    .min(5, 'Please provide at least 5 characters')
    .max(300, 'Description must not exceed 300 characters'),

  servicesOffered: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one service'),

  templeDescription: Yup.string()
    .required('Temple description is required')
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must not exceed 1000 characters'),

  templePhotos: Yup.array()
    .of(Yup.mixed())
    .optional(),

  certification1: Yup.boolean()
    .required('You must certify the accuracy of the information')
    .oneOf([true], 'You must certify the accuracy of the information'),

  certification2: Yup.boolean()
    .required('You must agree to Terms of Service and Privacy Policy')
    .oneOf([true], 'You must agree to Terms of Service and Privacy Policy'),

  certification3: Yup.boolean()
    .optional(),
});

export type TempleRegistrationFormData = Yup.InferType<typeof templeRegistrationValidationSchema>;
