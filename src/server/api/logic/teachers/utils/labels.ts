type TCompletenessStepLabel = {
  title: string
  isOptional?: boolean
}

export const EProfileCompletenessLabels: Record<
  string,
  TCompletenessStepLabel
> = {
  profile: { title: 'Your teaching profile' },
  subjects: { title: 'Subjects you teach' },
  qualifications: { title: 'Your qualification', isOptional: true },
  experience: { title: 'Your teaching life' },
  availability: { title: 'Availability?' },
  otherServices: { title: 'Other services I offer', isOptional: true },
  location: { title: 'Where do you live?' },
  badges: { title: 'Badges' },
}
