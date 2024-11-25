export interface Skill {
    name: string,
    description: string,
    scaling?: string[][]
}

export interface SkillWithSplash extends Skill {
    splash: string
}