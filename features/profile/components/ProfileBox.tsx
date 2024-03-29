import { ParsedHTML } from '@/components/elements/content/parseHTML'
import { Container } from '@/components/layouts/container/Container'
import { Profile } from '../types/Profile'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Image from 'next/image'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { ProfileTitleContent } from './ProfileTitleContent'
import { getAge } from '../libs/getAge'
import SchoolIcon from '@mui/icons-material/School'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import classNames from 'classnames'
import { useMediaQuery, useTheme } from '@mui/material'
import { XIcon } from '@/components/elements/icon/XIcon'

export type ProfileBoxProps = {
  profile: Profile | null
  className?: string
}

export const ProfileBox: React.FC<ProfileBoxProps> = ({
  profile,
  className,
}) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div className={classNames(className)}>
      <div className="mb:pb-0 relative z-10 pb-[40px] md:pb-0">
        <figure>
          <Image
            src={profile?.profileImage?.url ?? ''}
            width={parseInt(profile?.profileImage?.width ?? '')}
            height={parseInt(profile?.profileImage?.height ?? '')}
            alt={profile?.firstName ?? '' + profile?.lastName ?? ''}
            placeholder={
              profile?.profileImage?.blurDataURL ? 'blur' : undefined
            }
            blurDataURL={profile?.profileImage?.blurDataURL}
            style={{
              // layout: responsive
              width: md ? '250px' : '180px',
              height: md ? '250px' : '180px',
              // fade in
              transition: '0.2s',
              objectFit: 'cover',
            }}
            className="mx-auto rounded-full"
            sizes="50vw"
          />
        </figure>
      </div>
      <div className="relative -mt-32 overflow-hidden bg-white/50 pb-16 pt-24 md:pt-32">
        {/* gradation */}
        <div className="h-full overflow-hidden">
          <div
            className="absolute -left-[15%] top-[60%] bottom-1/2 h-[130%] w-[70%]  min-w-[768px] -translate-y-1/2"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, #00DACD -150%, rgba(217, 217, 217, 0) 100%)',
            }}
          ></div>
          <div
            className="absolute -right-[25%] top-[40%] bottom-1/2 h-[120%] w-[90%]  min-w-[768px] -translate-y-1/2"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, #0075FF -170%, rgba(217, 217, 217, 0) 100%)',
            }}
          ></div>
        </div>
        <Container className="mt-4 px-4">
          <div className="flex flex-col gap-5">
            <h2 className="flex flex-wrap justify-center gap-x-[.75em] text-center text-7xl md:flex-nowrap">
              <span className="inline-block">{profile?.handleName}</span>
            </h2>
            <div>
              <div className="mx-auto flex items-center justify-center gap-x-12">
                <div>
                  <a
                    href={`https://twitter.com/${profile?.twitter}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <XIcon />
                  </a>
                </div>
                <div>
                  <a
                    href={`https://github.com/${profile?.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon fontSize="large" />
                  </a>
                </div>
              </div>
            </div>
            <div className="my-4">
              <ParsedHTML html={profile?.content} />
            </div>
            <div>
              <div className="flex flex-col gap-8">
                <ProfileTitleContent
                  title="基本情報"
                  icon={<PersonOutlineIcon />}
                  className="flex gap-3"
                >
                  <span>
                    {profile?.sei} {profile?.mei}
                  </span>
                  {/* <span>({getAge(new Date(profile?.birthday ?? ''))})</span> */}
                </ProfileTitleContent>
                {/* <ProfileTitleContent title="所属" icon={<SchoolIcon />}>
                  {profile?.university} {profile?.faculty} {profile?.grade}年
                </ProfileTitleContent> */}
                {profile?.jobs && (
                  <ProfileTitleContent
                    title="技術領域"
                    icon={<WorkOutlineIcon />}
                  >
                    <ul className="ml-5 list-disc">
                      {profile?.jobs.map((job) => (
                        <li key={job.name}>{job.name}</li>
                      ))}
                    </ul>
                  </ProfileTitleContent>
                )}
                {profile?.qualifications && (
                  <ProfileTitleContent title="資格">
                    <ul className="ml-5 list-disc">
                      {profile?.qualifications.map((qualification) => (
                        <li key={qualification.name}>{qualification.name}</li>
                      ))}
                    </ul>
                  </ProfileTitleContent>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
