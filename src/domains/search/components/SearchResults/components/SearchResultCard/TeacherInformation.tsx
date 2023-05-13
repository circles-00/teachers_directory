import { type FC } from 'react'
import { ButtonContained } from '@components'
import { Service } from './Service'

const services = ['Proof reading', 'Tutoring', 'Editing']

interface ITeacherInformationProps {}

export const TeacherInformation: FC<ITeacherInformationProps> = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-2 md:ml-4">
          <div className="mt-4 flex flex-col gap-3 md:mt-0 md:flex-row">
            <h3 className="text-xl font-bold">Janice T.</h3>
            <h3 className="text-xl font-bold text-primary">
              English Literature Teacher
            </h3>
          </div>

          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-[#797995]">Soho, London</p>
            <p className="text-[#797995]">Full-Time</p>
          </div>
        </div>

        <div className="mr-auto ml-auto mt-6 md:mr-0 md:mt-0">
          <ButtonContained className="h-14 px-10">Get in touch</ButtonContained>
          <h1 className="mt-2 text-center text-sm font-bold text-[#DF1642]">
            Available now
          </h1>
        </div>
      </div>
      <hr className="ml-4 mt-7 fill-[#D6DFE5]" />
      <p className="pl-4 text-sm font-bold">About me</p>
      <p className="mt-2 pl-4 text-sm md:pr-40">
        Maecenas tempus, ligula eget dapibus viverra, tellus risus fringilla
        lacus, a pellentesque lorem quam vitae dolor. Ut ut sapien quis tortor
        fringilla interdum. Nam at gravida sem. In ultricies ante non enim
        rhoncus, gravida tempor dolor varius. Cras vitae sapien et neque
        tristique vehicula volutpat vitae ante. Ut convallis id dui nec...
      </p>
      <p className="mt-10 pl-4 text-sm font-bold">Services I offer</p>
      <div className="mt-1 flex gap-2 pl-3  ">
        {services.map((service, index) => (
          <Service key={index} service={service} />
        ))}
      </div>
    </div>
  )
}
