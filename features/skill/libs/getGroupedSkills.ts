import { Skill, GroupedSkill } from '../types'

export const groupedSkillsInitialValue: GroupedSkill[] = [
  {
    title: 'FRONTEND',
    skills: [],
  },
  {
    title: 'BACKEND',
    skills: [],
  },
  {
    title: 'OTHERS',
    skills: [],
  },
  {
    title: 'TOOLS',
    skills: [],
  },
]

export const getGroupedSkills = (skills: Skill[] | null): GroupedSkill[] => {
  const groupedSkills = groupedSkillsInitialValue

  skills?.forEach((skill) => {
    if (skill.parent) {
      // 親スキルが存在する場合
      const parentSkill = skills.find((s) => s.id === skill?.parent?.id)
      if (parentSkill == undefined) return

      // groupedSkillsに親スキルのグループが存在するかどうか確認する
      const groupedSkill = groupedSkills.find(
        (groupedSkill) => groupedSkill.title === parentSkill.title,
      )
      if (groupedSkill == undefined) {
        // 親スキルのグループが存在しない場合、当該グループを新規追加する
        // まず、親スキルのカテゴリーを取得する
        const parentCategoryGroupSKilIndex = groupedSkills.findIndex(
          (groupedSkill) => groupedSkill.title === parentSkill.category[0],
        )

        // 親スキルのカテゴリーのグループの直後に挿入する
        // NOTE: 一つのカテゴリーに複数のサブグループが存在する場合、それらの並び順は追加の降順になる
        groupedSkills.splice(parentCategoryGroupSKilIndex + 1, 0, {
          title: parentSkill.title,
          skills: [skill],
          parent: parentSkill.category[0],
        })
      } else {
        // 親スキルのグループが存在する場合
        groupedSkill?.skills.push(skill)
      }
    } else {
      // カテゴリーのスキルに追加する
      const groupedSkill = groupedSkills.find(
        (groupSkill) => groupSkill.title === skill.category[0],
      )
      // カテゴリーにスキルを追加
      groupedSkill?.skills.push(skill)
    }
  })

  return groupedSkills
}
