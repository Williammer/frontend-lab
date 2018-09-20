// 1. array type with enum used
enum ProgrammingLevel {
  Low = "beginner",
  Regular = "experienced",
  Expert = "genius"
}
const myCurrentAndDreamLv: string[] = [
  ProgrammingLevel.Regular,
  ProgrammingLevel.Expert
];
console.log("1. ---- myCurrentAndDreamLv: ", myCurrentAndDreamLv);

// 2.1 any type
let god: any;
god = "small";
console.log("2. ---- god string: ", god.toUpperCase());

// 2.2 unknown type
let blackhole: unknown;
blackhole = "littleHole";
console.log("2. ---- blackhole string: ", (blackhole as string).toUpperCase());
blackhole = () => {
  return "emptyness";
};
const blackholeResponse = (blackhole as Function)();
console.log("2. ---- blackhole function: ", blackholeResponse);

// 3. default fucntion param value & optional function param
function add(a: number, b: number = 0, c?: number): number {
  return a + b;
}

const addResult = add(1);
console.log("3. ---- addResult: ", addResult);

// 4. interface
interface RealMan {
  height: number;
  readonly name: string;
  blood: number;
  skills: string[];
  fashion?: number;
  quirks?: string[];
}
function showManName(params: RealMan): string {
  return params.name;
}

const manName = showManName({
  height: 175,
  name: "william",
  blood: 100,
  skills: ["programming", "basketball", "singing"]
});
console.log("4. ---- manName: ", manName);

// 5. class
class William implements RealMan {
  height: number;
  readonly name: string = "William";
  blood: number;
  skills: string[];
  fashion?: number;
  quirks: string[] = ["mas", "tired"];

  constructor({ height, blood, skills, fashion = 0, quirks = [] }) {
    this.height = height;
    this.blood = blood;
    this.skills = skills;
    fashion && (this.fashion = fashion);
    this.quirks = this.quirks.concat(quirks);
  }

  showProfile(includingQuirks: boolean): RealMan {
    const { height, name, blood, skills, fashion, quirks } = this;
    const baseProfile = { height, name, blood, skills };
    const withFashion = fashion ? { ...baseProfile, fashion } : baseProfile;
    return includingQuirks ? { ...withFashion, quirks } : withFashion;
  }
}

const will = new William({
  height: 172,
  blood: 100,
  skills: ["programming", "basketball", "singing"],
  quirks: ["hateHK"]
});
console.log("5. ---- will profile: ", will.showProfile(true));
