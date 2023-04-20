import { useLabels } from '@utils'

export const useFooterData = () => {
  const { labels } = useLabels()

  const homeLinks = [
    { title: labels.search, href: '/search' },
    { title: labels.aboutUs, href: '/about-us' },
    { title: labels.contactUs, href: '/contact-us' },
  ]

  const legalLinks = [
    { title: labels.searchTeachers, href: '/search' },
    { title: labels.jobSearch, href: '/search-jobs' },
  ]

  const contactLinks = [
    {
      title: `hello@${labels.appUrl}`,
      href: `mailto:hello@${labels.appUrl}`,
      isEmail: true,
    },
    {
      title: labels.location,
      href: '/location',
    },
  ]

  return { homeLinks, legalLinks, contactLinks }
}
