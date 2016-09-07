enum Class {
    Bard,
    Cleric,
    Druid,
    Paladin,
    Ranger,
    Sorcerer,
    Warlock,
    Wizard,
}


enum SpellSchool {
    Abjuration,
    Conjuration,
    Divination,
    Enchantment,
    Evocation,
    Illusion,
    Necromancy,
    Transmutation,
}

enum AoeShape {
    Sphere,
    Hemisphere,
    Cone,
    Cube,
    RectangularPrism,
}

class SpellComponent {
    v: boolean;
    s: boolean;
    m: boolean;

    constructor(v: boolean, s: boolean, m: boolean) {
        this.v = v;
        this.s = s;
        this.m = m;
    }
}


class Card {
    name: string;
    level: number;
    isRitual: boolean;
    school: SpellSchool;
    classes: Array<Class>;
    description: string;
    
    castingTime: string;
    duration: string;
    rangeInFeet: number;
    components: SpellComponent;
    materials: string;


    constructor(name: string, level: number, school: SpellSchool, isRitual: boolean) {
        this.name = name;
        this.level = level;
        this.school = school;
        this.isRitual = isRitual;
    }

    IsClass(spellClass: Class): boolean {
        for (let c of this.classes) {
            if (spellClass == c) {
                return true;
            }
        }
        return false;
    }
}
