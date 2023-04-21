import { type FC, useState } from 'react'
import { ButtonOutlined } from '../../../../../../../components'
import { Header } from '../../../../Header'
import { Qualification } from './Qualification'

interface IQualifications {
  title: string
  description: string
  custom?: boolean
}

export const Qualifications: FC<IQualifications> = ({
  title,
  description,
  custom,
}) => {
  const [qualificationForms, setQualificationForms] = useState([
    {
      university: '',
      course: '',
      grade: '',
    },
  ])

  const addQualification = () => {
    setQualificationForms([
      ...qualificationForms,
      { university: '', course: '', grade: '' },
    ])
  }

  const removeQualification = (index: number) => {
    const newQualifications = [...qualificationForms]
    newQualifications.splice(index, 1)
    setQualificationForms(newQualifications)
  }

  return (
    <div>
      <Header title={title} description={description} />
      <div className="mt-10">
        {qualificationForms.map((subject, index, array) => (
          <Qualification
            index={index}
            onRemove={removeQualification}
            key={index}
            numberOfQualifications={array.length}
            custom={custom}
          />
        ))}
      </div>
      <ButtonOutlined
        onClick={addQualification}
        className="mt-8 mr-auto w-28 text-primary"
      >
        Add Item
      </ButtonOutlined>
    </div>
  )
}
