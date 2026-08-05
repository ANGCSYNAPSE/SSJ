import * as Yup from 'yup';

export const artistRegistrationValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must not exceed 50 characters'),

  emailAddress: Yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address'),

  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]{10,}$/, 'Please enter a valid phone number'),

  dateOfBirth: Yup.string()
    .required('Date of birth is required')
    .matches(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/\d{4}$/, 'Please enter date in DD/MM/YYYY format'),

  gender: Yup.string()
    .required('Gender is required'),

  city: Yup.string()
    .required('City is required')
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name must not exceed 50 characters'),

  state: Yup.string()
    .required('State is required'),

  profilePhoto: Yup.mixed()
    .required('Profile photo is required')
    .test('fileSize', 'File size must be less than 2MB', (value: any) => {
      if (!value) return false;
      return value.size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Only image files are allowed (JPG, PNG)', (value: any) => {
      if (!value) return false;
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),

  artistType: Yup.string()
    .required('Artist type is required'),

  experience: Yup.string()
    .required('Experience is required'),

  bio: Yup.string()
    .required('Bio is required')
    .min(20, 'Bio must be at least 20 characters')
    .max(500, 'Bio must not exceed 500 characters'),

  agreeToTerms: Yup.boolean()
    .required('You must agree to the terms')
    .oneOf([true], 'You must agree to the terms'),
});

export type ArtistRegistrationFormData = Yup.InferType<typeof artistRegistrationValidationSchema>;
