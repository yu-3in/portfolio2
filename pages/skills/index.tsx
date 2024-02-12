// import Meta from '@/components/Meta'
// import { SectionHeading } from '@/components/elements/heading'
// import { Container } from '@/components/layouts/container/Container'
// import { GradientContainer } from '@/components/layouts/container/GradientContainer'
// import { Footer } from '@/components/layouts/footer'
// import { getSkills } from '@/features/skill/apis/getSkills'
// import { SkillGroupStack } from '@/features/skill/components'
// import { addBlurDataURLToSkill } from '@/features/skill/libs/addBlurDataURLToSkill'
// import { getGroupedSkills } from '@/features/skill/libs/getGroupedSkills'
// import { GroupedSkill, Skill } from '@/features/skill/types'
// import { NextPage, GetStaticProps } from 'next'

// export type SkillsPageProps = {
//   skills: Skill[] | null
//   groupedSkills: GroupedSkill[] | null
// }

// const SkillsPage: NextPage<SkillsPageProps> = ({ skills, groupedSkills }) => {
//   return (
//     <GradientContainer
//       fromColor="rgba(190, 255, 250, 0.51)"
//       toColor="rgba(172, 240, 244, 0.91)"
//       direction="to-b"
//       className="relative h-full min-h-screen pt-40"
//     >
//       <Meta pageTitle="Skills" />
//       <Container className="pb-20">
//         <SectionHeading>Skills</SectionHeading>
//         <SkillGroupStack variant="default" groupedSkills={groupedSkills} />
//       </Container>
//       <Footer />
//     </GradientContainer>
//   )
// }

// export default SkillsPage

// export const getStaticProps: GetStaticProps<SkillsPageProps> = async () => {
//   // skills
//   let skills = await getSkills()
//   // Add blurDataURL
//   skills = skills != null ? await addBlurDataURLToSkill(skills) : null
//   // skill groups
//   let groupedSkills = getGroupedSkills(skills)

//   return {
//     props: { skills, groupedSkills },
//   }
// }
