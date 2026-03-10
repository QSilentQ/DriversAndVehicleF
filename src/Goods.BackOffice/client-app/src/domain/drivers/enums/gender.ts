export enum Gender {
  Male = 1,
  Female = 2
}

export namespace Gender {
  export const getDisplayName = (category: Gender): string => {
    switch (category) {
      case Gender.Male:
        return 'Мужской';
      case Gender.Female:
        return 'Женский';
    }
  }
}