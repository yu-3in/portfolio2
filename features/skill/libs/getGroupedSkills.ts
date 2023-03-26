import { Skill, GroupedSkill } from '../types'

export const groupedSkillsInitialValue: GroupedSkill[] = [
  {
    title: 'フロントエンド',
    skills: [],
    subGroupSkills: [],
  },
  {
    title: 'バックエンド',
    skills: [],
    subGroupSkills: [],
  },
  {
    title: 'その他',
    skills: [],
    subGroupSkills: [],
  },
  {
    title: 'ツール',
    skills: [],
    subGroupSkills: [],
  },
]

export const getGroupedSkills = (skills: Skill[] | null): GroupedSkill[] => {
  const groupedSkills = groupedSkillsInitialValue

  skills?.forEach((skill) => {
    if (skill.parent) {
      // 親スキルが存在すれば、親スキルのカテゴリーに追加する
      // 親スキルを取得
      const parentSkill = skills.find((s) => s.id === skill?.parent?.id)
      if (parentSkill === undefined) return

      // カテゴリーのgroupedSkillを取得
      const groupedSkill = groupedSkills.find(
        (groupedSkill) => groupedSkill.title === skill.category[0],
      )

      // groupedSkillsに親カテゴリーのグループが存在するかどうか確認
      const parentGroupedSkill = groupedSkill?.subGroupSkills.find(
        (subGroupSkill) => subGroupSkill.title === parentSkill?.title,
      )
      if (parentGroupedSkill) {
        // 親スキルのグループが存在する場合、そのまま追加する
        parentGroupedSkill.skills.push(skill)
      } else {
        // 親スキルのグループが存在しない場合、当該グループを作成してから追加する
        // NOTE: skillが属するカテゴリーの配下に追加する
        groupedSkill?.subGroupSkills.push({
          title: parentSkill.title,
          skills: [skill],
          subGroupSkills: [],
        })
      }
    } else {
      // カテゴリーにスキルを追加
      const groupedSkill = groupedSkills.find(
        (groupedSkill) => groupedSkill.title === skill.category[0],
      )
      if (groupedSkill) {
        groupedSkill.skills.push(skill)
      }
    }
  })

  return groupedSkills
}
