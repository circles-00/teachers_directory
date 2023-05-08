import { type NextPage } from 'next'
import { FilterPanel, type Item, type TFilterItem } from '@domains/search'
import { SearchResults } from '@domains/search/components/SearchResults'
import { useState } from 'react'

const filterItems: Item[] = [
  {
    title: 'Teaching availablity',
    items: [
      {
        title: 'Now',
        value: 'now',
      },
      {
        title: 'Future',
        value: 'future',
      },
    ],
  },
  {
    title: 'Position',
    items: [
      {
        title: 'Leadership/Management',
        value: 'leadershipManagement',
        count: 266,
        subItems: [
          {
            title: 'Head teacher',
            value: 'headTeacher',
            count: 196,
          },
          {
            title: 'Deputy',
            value: 'deputy',
            count: 11,
          },
          {
            title: 'Assistant',
            value: 'assistant',
            count: 59,
          },
        ],
      },
      {
        title: 'Teaching/Lecturing',
        value: 'teachingLecturing',
        count: 475,
        subItems: [
          {
            title: 'Teacher',
            value: 'teacher',
            count: 401,
          },
          {
            title: 'Head of department',
            value: 'headOfDepartment',
            count: 41,
          },
          {
            title: 'Tutor',
            value: 'tutor',
            count: 28,
          },
          {
            title: 'Teaching Assistant',
            value: 'teachingAssistant',
            count: 28,
          },
          {
            title: 'Lecturer',
            value: 'lecturer',
            count: 28,
          },
          {
            title: 'SENDCo',
            value: 'sendCo',
            count: 28,
          },
        ],
      },
      {
        title: 'Non-teaching/Support',
        value: 'nonTeachingSupport',
        count: 24,
        subItems: [
          {
            title: 'Other Support Position',
            value: 'otherSupportPosition',
            count: 16,
          },
          {
            title: 'Learning support',
            value: 'learningSupport',
            count: 16,
          },
          {
            title: 'Administrative/Clerk',
            value: 'administrativeClerk',
            count: 16,
          },
          {
            title: 'Technician',
            value: 'technician',
            count: 16,
          },
          {
            title: 'Lorem',
            value: 'lorem',
            count: 16,
          },
          {
            title: 'IT Manger / Technician',
            value: 'itMangerTechnician',
            count: 16,
          },
          {
            title: 'Cover Supervisor',
            value: 'coverSupervisor',
            count: 16,
          },
          {
            title: 'Specialist',
            value: 'specialist',
            count: 16,
          },
          {
            title: 'Caretaker/Groundperson',
            value: 'caretakerGroundperson',
            count: 16,
          },
          {
            title: 'Examiner',
            value: 'examiner',
            count: 16,
          },
          {
            title: 'Secretary/Receptionist',
            value: 'secretaryReceptionist',
            count: 16,
          },
          {
            title: 'Behaviour Manager/Specialist',
            value: 'behaviourManagerSpecialist',
            count: 16,
          },
          {
            title: 'Cleaner',
            value: 'cleaner',
            count: 16,
          },
          {
            title: 'Mentor',
            value: 'mentor',
            count: 16,
          },
          {
            title: 'Premises Manger/Housekeeper',
            value: 'premisesMangerHousekeeper',
            count: 16,
          },
          {
            title: 'Business Manager /Bursar',
            value: 'businessManagerBursar',
            count: 16,
          },
          {
            title: 'Support Manager',
            value: 'supportManager',
            count: 16,
          },
          {
            title: 'Human Resources',
            value: 'humanResources',
            count: 16,
          },
          {
            title: 'Housemaster/mistress',
            value: 'housemasterMistress',
            count: 16,
          },
          {
            title: 'Boarding Supervisor',
            value: 'boardingSupervisor',
            count: 16,
          },
          {
            title: 'Librarian',
            value: 'librarian',
            count: 16,
          },
          {
            title: 'Canteen Supervisor',
            value: 'canteenSupervisor',
            count: 16,
          },
          {
            title: 'Tuckshop Convenor',
            value: 'tuckshopConvenor',
            count: 16,
          },
          {
            title: 'Data Manager / Analyst',
            value: 'dataManagerAnalyst',
            count: 16,
          },
          {
            title: 'Speech and Language Therapist',
            value: 'speechAndLanguageTherapist',
            count: 16,
          },
          {
            title: 'Advisor / Consultant',
            value: 'advisorConsultant',
            count: 16,
          },
          {
            title: 'Career Advisor',
            value: 'careerAdvisor',
            count: 16,
          },
          {
            title: 'Occupational Therapist',
            value: 'occupationalTherapist',
            count: 16,
          },
          {
            title: 'Guidance Counsellor',
            value: 'guidanceCounsellor',
            count: 16,
          },
          {
            title: 'Matron/Nurse',
            value: 'matronNurse',
            count: 16,
          },
          {
            title: 'Educational Psychologists',
            value: 'educationalPsychologists',
            count: 16,
          },
          {
            title: 'Officer Manager',
            value: 'officerManager',
            count: 16,
          },
          {
            title: 'Personal Assistant to Headteacher',
            value: 'personalAssistantToHeadteacher',
            count: 16,
          },
          {
            title: 'Data Services/Timetabling',
            value: 'dataServicesTimetabling',
            count: 16,
          },
          {
            title: 'Driver',
            value: 'driver',
            count: 16,
          },
          {
            title: 'Health Care worker',
            value: 'healthCareWorker',
            count: 16,
          },
          {
            title: 'Chaplin/Priest',
            value: 'chaplinPriest',
            count: 16,
          },
          {
            title: 'Literacy Worker',
            value: 'literacyWorker',
            count: 16,
          },
        ],
      },
    ],
  },
  {
    title: 'Looking for',
    items: [
      {
        title: 'Full-time',
        value: 'fullTime',
        count: 564,
      },
      {
        title: 'Part-time',
        value: 'partTime',
        count: 87,
      },
      {
        title: 'Fixed term',
        value: 'fixedTerm',
        count: 87,
      },
      {
        title: 'Supply work',
        value: 'supplyWork',
        count: 135,
      },
      {
        title: 'Temporary',
        value: 'temporary',
        count: 87,
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        title: 'Qualified Teacher',
        value: 'qualifiedTeacher',
      },
      {
        title: 'Enhanced DBS',
        value: 'enhancedDBS',
      },
      {
        title: 'Gender',
        value: 'gender',
        subItems: [
          {
            title: 'Male',
            value: 'male',
          },
          {
            title: 'Female',
            value: 'female',
          },
          {
            title: 'Other',
            value: 'other',
          },
        ],
      },
      {
        title: 'Examiner',
        value: 'examiner',
        subItems: [
          {
            title: 'AQA',
            value: 'aqa',
          },
          {
            title: 'OCR',
            value: 'ocr',
          },
          {
            title: 'Edexcel',
            value: 'edexcel',
          },
          {
            title: 'CCEA',
            value: 'ccea',
          },
          {
            title: 'WJEC/Eduqas',
            value: 'wjecEduqas',
          },
        ],
      },
      {
        title: 'NQT (ECT)',
        value: 'nqtEct',
      },
    ],
  },
]

const Search: NextPage = () => {
  const [selectedFilters, setSelectedFilters] = useState<TFilterItem[]>([])
  console.log({ selectedFilters })

  const addFilter = (item: TFilterItem) => {
    if (selectedFilters) {
      setSelectedFilters([...selectedFilters, item])
    }
  }

  const removeFilter = (item: TFilterItem) => {
    if (selectedFilters) {
      // TODO: Compare by id in the future
      setSelectedFilters(selectedFilters.filter((i) => i.title !== item.title))
    }
  }

  const onChange = (item: TFilterItem) => {
    if (selectedFilters?.find((i) => i.title === item.title)) {
      removeFilter(item)
    } else {
      addFilter(item)
    }
  }

  return (
    <div className="mt-10 flex flex-col gap-10 py-4 md:flex-row 2xl:mx-10">
      <div className="flex flex-col gap-4 md:w-1/4">
        {filterItems.map((filterItem, index) => (
          <FilterPanel
            key={index}
            filterItem={filterItem}
            onChange={onChange}
            selectedFilters={selectedFilters}
          />
        ))}
      </div>
      <SearchResults
        removeFilter={removeFilter}
        selectedFilters={selectedFilters}
      />
    </div>
  )
}

export default Search
